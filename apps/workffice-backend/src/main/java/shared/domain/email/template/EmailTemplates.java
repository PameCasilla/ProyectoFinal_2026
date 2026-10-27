package shared.domain.email.template;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

@Component
public class EmailTemplates {
    private static final Map<String, String> FILES = Map.of(
            "ACCOUNT_CONFIRMATION", "account-confirmation",
            "COLLABORATOR_INVITATION", "collaborator-invitation",
            "PASSWORD_RESET", "password-reset",
            "BOOKING_PAYMENT_FAILED", "booking-payment-failed",
            "BOOKING_PAYMENT_ACCEPTED", "booking-payment-accepted",
            "OFFICE_HOLDER_NEWS", "office-holder-news");
    private static final Pattern VARIABLE = Pattern.compile("\\{\\{([a-z_]+)\\}\\}");

    public String render(Template template) {
        String name = FILES.get(template.templateName());
        if (name == null) {
            throw new IllegalArgumentException("Unknown email template: " + template.templateName());
        }
        try (var input = new ClassPathResource("email/" + name + ".html").getInputStream()) {
            String html = new String(input.readAllBytes(), StandardCharsets.UTF_8);
            var variables = template.substitutionData();
            Matcher matcher = VARIABLE.matcher(html);
            StringBuffer result = new StringBuffer();
            while (matcher.find()) {
                String value = variables.get(matcher.group(1));
                if (value == null) {
                    throw new IllegalArgumentException("Missing email variable: " + matcher.group(1));
                }
                matcher.appendReplacement(result, Matcher.quoteReplacement(HtmlUtils.htmlEscape(value, "UTF-8")));
            }
            matcher.appendTail(result);
            return result.toString();
        } catch (IOException exception) {
            throw new IllegalStateException("Cannot read email template: " + name, exception);
        }
    }
}
