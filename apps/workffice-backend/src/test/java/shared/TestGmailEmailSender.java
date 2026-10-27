package shared;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;
import javax.mail.Multipart;
import org.junit.jupiter.api.Test;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mock.env.MockEnvironment;
import shared.domain.email.Message;
import shared.domain.email.template.*;
import shared.infrastructure.GmailEmailSender;
import shared.infrastructure.config.SpringEmailConfig;
import static org.assertj.core.api.Assertions.*;

public class TestGmailEmailSender {
    @Test
    void sendsAllSixTemplatesAsHtmlWithPlainTextAlternatives() throws Exception {
        GreenMail smtp = new GreenMail(new ServerSetup(0, "127.0.0.1", "smtp"));
        smtp.start();
        try {
            JavaMailSenderImpl mail = new JavaMailSenderImpl();
            mail.setHost("127.0.0.1");
            mail.setPort(smtp.getSmtp().getPort());
            GmailEmailSender sender = new GmailEmailSender(mail, new EmailTemplates(), "workffice2026@gmail.com");
            Template[] templates = {
                new AccountConfirmationTemplate("token-123", "http://localhost:3000"),
                new CollaboratorInvitationTemplate("http://localhost:3000", "Office", "token"),
                new PasswordResetTemplate("token", "http://localhost:3000"),
                new BookingPaymentFailedTemplate(),
                new BookingPaymentAcceptedTemplate("http://localhost:3000", "booking-1", "Office", "2026-10-20", "10:00", 2, 200f, "Province", "City", "1000", "Street"),
                OfficeHolderNewsTemplate.of("Novedades", "Título", "Línea uno\nLínea dos")
            };
            for (Template template : templates) {
                sender.send(Message.builder().recipient("recipient@example.com").template(template).build());
            }
            assertThat(smtp.getReceivedMessages()).hasSize(6);
            for (var message : smtp.getReceivedMessages()) {
                assertThat(message.getFrom()[0].toString()).isEqualTo("workffice2026@gmail.com");
                String content = flatten(message);
                assertThat(content).contains("text/plain", "text/html", "Workffice").doesNotContain("{{");
            }
            assertThat(flatten(smtp.getReceivedMessages()[0]))
                .contains("http://localhost:3000/auth/confirmation?token=token-123");
        } finally {
            smtp.stop();
        }
    }

    @Test
    void escapesUserContentWithoutExpandingInjectedPlaceholders() {
        String html = new EmailTemplates().render(OfficeHolderNewsTemplate.of("News", "<script>bad</script>", "{{url}} & <b>text</b>"));
        assertThat(html).contains("&lt;script&gt;", "&amp;", "&lt;b&gt;", "{{url}}").doesNotContain("<script>", "<b>text");
    }

    @Test
    void requiresAppPasswordAndConfiguresSecureSmtp() {
        SpringEmailConfig config = new SpringEmailConfig();
        assertThatThrownBy(() -> config.gmailMailSender(new MockEnvironment()))
            .isInstanceOf(IllegalStateException.class).hasMessageContaining("EMAIL_PASSWORD");
        var env = new MockEnvironment().withProperty("EMAIL_USERNAME", "workffice2026@gmail.com")
            .withProperty("EMAIL_PASSWORD", "abcd efgh ijkl mnop");
        JavaMailSenderImpl mail = (JavaMailSenderImpl) config.gmailMailSender(env);
        assertThat(mail.getHost()).isEqualTo("smtp.gmail.com");
        assertThat(mail.getPort()).isEqualTo(587);
        assertThat(mail.getPassword()).isEqualTo("abcdefghijklmnop");
        assertThat(mail.getJavaMailProperties().getProperty("mail.smtp.starttls.required")).isEqualTo("true");
    }

    private String flatten(javax.mail.Part part) throws Exception {
        String text = part.getContentType() + "\n";
        Object content = part.getContent();
        if (content instanceof Multipart) {
            Multipart multi = (Multipart) content;
            for (int i = 0; i < multi.getCount(); i++) text += flatten(multi.getBodyPart(i));
        } else text += content.toString();
        return text;
    }
}
