package booking.infrastructure.mercadopago;

import booking.application.dto.booking.BookingError;
import booking.application.dto.booking.BookingPreferenceInformation;
import booking.application.dto.membership_acquisition.MembershipAcquisitionError;
import booking.application.dto.membership_acquisition.MembershipAcquisitionPreference;
import booking.domain.payment_preference.PaymentPreference;
import booking.domain.payment_preference.PreferenceCreator;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import com.mercadopago.resources.datastructures.preference.PaymentMethods;
import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import static java.lang.String.format;

@Component
public class MercadoPagoPreferenceCreator implements PreferenceCreator {

    private final Environment env;
    private final Logger logger =
            LoggerFactory.getLogger(MercadoPagoPreferenceCreator.class);

    private Preference preference;

    public MercadoPagoPreferenceCreator(Environment env) {
        this.env = env;
    }

    public void setPreference(Preference preference) {
        // Used by existing tests.
        this.preference = preference;
    }

    @Override
    public Either<BookingError, PaymentPreference> createForBooking(
            BookingPreferenceInformation info
    ) {
        try {
            MercadoPago.SDK.setAccessToken(
                    env.getProperty("MERCADO_PAGO_ACCESS_TOKEN")
            );
        } catch (MPConfException e) {
            logger.error("Could not configure Mercado Pago", e);
            return Either.left(BookingError.MERCADO_PAGO_ERROR);
        }

        PaymentMethods paymentMethods = new PaymentMethods();
        paymentMethods.setExcludedPaymentTypes("ticket", "atm");

        Item item = new Item();
        item.setId(info.getBookingId())
                .setTitle(info.getOfficeName())
                .setQuantity(1)
                .setCurrencyId(
                        env.getProperty("MERCADO_PAGO_CURRENCY", "ARS")
                )
                .setDescription(info.getDescription())
                .setUnitPrice(info.getPrice());

        Payer payer = new Payer();
        payer.setEmail(info.getRenterEmail());

        Preference newPreference =
                preference != null ? preference : new Preference();

        String returnUrl = format(
                "%s/admin/booking?id=%s",
                env.getProperty("CLIENT_HOST"),
                info.getBookingId()
        );

        newPreference.setStatementDescriptor("WORKFFICE");
        newPreference.setBackUrls(new BackUrls(
                returnUrl,
                returnUrl + "&payment_result=pending",
                returnUrl + "&payment_result=failure"
        ));
        newPreference.setExternalReference(info.getBookingId());
        newPreference.setPaymentMethods(paymentMethods);
        newPreference.setPayer(payer);
        newPreference.appendItem(item);
        newPreference.setNotificationUrl(format(
                "%s/api/bookings/%s/mp_notifications/?source_news=webhooks",
                env.getProperty("SERVER_HOST"),
                info.getBookingId()
        ));

        try {
            newPreference.save();
            return Either.right(
                    PaymentPreference.of(newPreference.getId())
            );
        } catch (MPException e) {
            logger.error("Could not create booking payment preference", e);
            return Either.left(BookingError.MERCADO_PAGO_ERROR);
        }
    }

    @Override
    public Either<MembershipAcquisitionError, PaymentPreference>
    createForMembership(MembershipAcquisitionPreference info) {
        try {
            MercadoPago.SDK.setAccessToken(
                    env.getProperty("MERCADO_PAGO_ACCESS_TOKEN")
            );
        } catch (MPConfException e) {
            logger.error("Could not configure Mercado Pago", e);
            return Either.left(
                    MembershipAcquisitionError.MERCADO_PAGO_ERROR
            );
        }

        PaymentMethods paymentMethods = new PaymentMethods();
        paymentMethods.setExcludedPaymentTypes("ticket", "atm");

        Item item = new Item();
        item.setId(info.getMembershipAcquisitionId())
                .setTitle("Membresia Workffice")
                .setQuantity(1)
                .setCurrencyId(
                        env.getProperty("MERCADO_PAGO_CURRENCY", "ARS")
                )
                .setDescription(info.getDescription())
                .setUnitPrice(info.getPrice());

        Payer payer = new Payer();
        payer.setEmail(info.getBuyerEmail());

        Preference newPreference =
                preference != null ? preference : new Preference();

        String returnUrl = format(
                "%s/admin/membership_acquisitions?id=%s",
                env.getProperty("CLIENT_HOST"),
                info.getMembershipAcquisitionId()
        );

        newPreference.setStatementDescriptor("WORKFFICE");
        newPreference.setBackUrls(new BackUrls(
                returnUrl,
                returnUrl + "&payment_result=pending",
                returnUrl + "&payment_result=failure"
        ));
        newPreference.setExternalReference(
                info.getMembershipAcquisitionId()
        );
        newPreference.setPaymentMethods(paymentMethods);
        newPreference.setPayer(payer);
        newPreference.appendItem(item);
        newPreference.setNotificationUrl(format(
                "%s/api/membership_acquisitions/%s/mp_notifications/?source_news=webhooks",
                env.getProperty("SERVER_HOST"),
                info.getMembershipAcquisitionId()
        ));

        try {
            newPreference.save();
            return Either.right(
                    PaymentPreference.of(newPreference.getId())
            );
        } catch (MPException e) {
            logger.error("Could not create membership payment preference", e);
            return Either.left(
                    MembershipAcquisitionError.MERCADO_PAGO_ERROR
            );
        }
    }
}