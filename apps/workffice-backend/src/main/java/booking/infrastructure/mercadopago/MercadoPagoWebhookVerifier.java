package booking.infrastructure.mercadopago;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class MercadoPagoWebhookVerifier {

    private final Environment env;

    public MercadoPagoWebhookVerifier(Environment env) {
        this.env = env;
    }

    public void verify(
            HttpServletRequest request,
            MercadoPagoPaymentNotification notification
    ) {
        String secret = env.getProperty(
                "MERCADO_PAGO_WEBHOOK_SECRET",
                ""
        );

        if (secret.isBlank() || secret.startsWith("REPLACE_")) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Webhook secret is not configured"
            );
        }

        String dataId = request.getParameter("data.id");
        String signature = request.getHeader("x-signature");
        String requestId = request.getHeader("x-request-id");

        if (dataId == null ||
                dataId.isBlank() ||
                signature == null ||
                requestId == null ||
                requestId.isBlank() ||
                notification == null ||
                notification.getData() == null ||
                !dataId.equals(notification.getData().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid notification"
            );
        }

        String timestamp = null;
        List<String> hashes = new ArrayList<>();

        for (String part : signature.split(",")) {
            String[] pair = part.trim().split("=", 2);

            if (pair.length != 2) {
                continue;
            }

            if ("ts".equals(pair[0])) {
                timestamp = pair[1];
            } else if ("v1".equals(pair[0])) {
                hashes.add(pair[1]);
            }
        }

        if (timestamp == null ||
                !timestamp.matches("[0-9]+") ||
                hashes.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid signature"
            );
        }

        String manifest =
                "id:" + dataId.toLowerCase(Locale.ROOT) +
                ";request-id:" + requestId +
                ";ts:" + timestamp + ";";

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            ));

            byte[] expected = mac.doFinal(
                    manifest.getBytes(StandardCharsets.UTF_8)
            );

            for (String hash : hashes) {
                if (!hash.matches("[a-fA-F0-9]{64}")) {
                    continue;
                }

                byte[] actual = new byte[32];

                for (int i = 0; i < actual.length; i++) {
                    actual[i] = (byte) Integer.parseInt(
                            hash.substring(i * 2, i * 2 + 2),
                            16
                    );
                }

                if (MessageDigest.isEqual(expected, actual)) {
                    return;
                }
            }
        } catch (GeneralSecurityException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Signature verification unavailable",
                    e
            );
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid signature"
        );
    }
}