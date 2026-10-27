package shared.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class SpringEmailConfig {
    @Bean
    public JavaMailSender gmailMailSender(Environment env) {
        String username = env.getProperty("EMAIL_USERNAME", "workffice2026@gmail.com").trim();
        String password = env.getProperty("EMAIL_PASSWORD", "").replace(" ", "");
        if (username.isBlank() || password.isBlank() || password.contains("YOUR_")) {
            throw new IllegalStateException("Set EMAIL_USERNAME and EMAIL_PASSWORD (Google App Password) in the backend .env");
        }
        String from = env.getProperty("EMAIL_FROM", "workffice2026@gmail.com").trim();
        if (!from.equalsIgnoreCase(username)) {
            throw new IllegalStateException("EMAIL_FROM must match EMAIL_USERNAME for Gmail SMTP");
        }
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(env.getProperty("EMAIL_HOST", "smtp.gmail.com"));
        sender.setPort(env.getProperty("EMAIL_PORT", Integer.class, 587));
        sender.setUsername(username);
        sender.setPassword(password);
        sender.setDefaultEncoding("UTF-8");
        var properties = sender.getJavaMailProperties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.starttls.required", "true");
        properties.setProperty("mail.smtp.ssl.checkserveridentity", "true");
        properties.setProperty("mail.smtp.connectiontimeout", "10000");
        properties.setProperty("mail.smtp.timeout", "15000");
        properties.setProperty("mail.smtp.writetimeout", "15000");
        properties.setProperty("mail.debug", "false");
        return sender;
    }
}
