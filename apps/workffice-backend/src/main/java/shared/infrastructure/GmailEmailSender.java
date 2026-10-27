package shared.infrastructure;

import java.nio.charset.StandardCharsets;
import java.util.List;
import javax.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import shared.domain.email.EmailSender;
import shared.domain.email.Message;
import shared.domain.email.template.EmailTemplates;

@Component
public class GmailEmailSender implements EmailSender {
    private static final Logger LOGGER = LoggerFactory.getLogger(GmailEmailSender.class);
    private final JavaMailSender sender;
    private final EmailTemplates templates;
    private final String from;

    public GmailEmailSender(JavaMailSender sender, EmailTemplates templates,
            @Value("${EMAIL_FROM:workffice2026@gmail.com}") String from) {
        this.sender = sender;
        this.templates = templates;
        this.from = from;
    }

    @Async
    @Override
    public void send(Message message) {
        sendOne(message);
    }

    private void sendOne(Message message) {
        try {
            var mime = sender.createMimeMessage();
            var helper = new MimeMessageHelper(mime, true, StandardCharsets.UTF_8.name());
            helper.setFrom(from);
            helper.setTo(message.recipient());
            helper.setSubject(message.subject());
            helper.setText(message.body(), templates.render(message.template()));
            sender.send(mime);
            LOGGER.info("SMTP accepted {} email", message.template().templateName());
        } catch (MessagingException | MailException | IllegalArgumentException | IllegalStateException exception) {
            // No automatic retries: a timeout may occur after Gmail accepted the email.
            LOGGER.error("Failed to send {} email ({}). Check SMTP settings and provider status.",
                    message.template().templateName(), exception.getClass().getSimpleName());
            throw new IllegalStateException("Email delivery failed", exception);
        }
    }

    @Async
    @Override
    public void sendBatch(List<Message> messages) {
        for (Message message : messages) {
            try {
                sendOne(message);
            } catch (IllegalStateException exception) {
                // One failed recipient must not prevent delivery to the remaining recipients.
            }
        }
    }
}
