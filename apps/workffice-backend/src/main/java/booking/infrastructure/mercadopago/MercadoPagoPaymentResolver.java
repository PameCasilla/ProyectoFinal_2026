package booking.infrastructure.mercadopago;

import backoffice.application.dto.office_branch.OfficeBranchResponse;
import backoffice.application.office_branch.OfficeBranchFinder;
import backoffice.domain.office_branch.OfficeBranchId;
import booking.application.booking.BookingEmailNotificator;
import booking.domain.booking.Booking;
import booking.domain.booking.BookingId;
import booking.domain.booking.BookingRepository;
import booking.domain.booking.PaymentInformation;
import booking.domain.membership_acquisiton.MembershipAcquisition;
import booking.domain.membership_acquisiton.MembershipAcquisitionId;
import booking.domain.membership_acquisiton.MembershipAcquisitionRepository;
import com.google.common.collect.ImmutableList;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.datastructures.payment.FeeDetail;
import io.vavr.control.Option;
import java.math.BigDecimal;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import shared.domain.EventBus;

@Service
public class MercadoPagoPaymentResolver {

    private final Environment env;
    private final Logger logger;
    private final BookingRepository bookingRepo;
    private final MembershipAcquisitionRepository membershipAcquisitionRepo;
    private final BookingEmailNotificator emailNotificator;
    private final OfficeBranchFinder officeBranchFinder;
    private final EventBus eventBus;

    private final List<Payment.Status> failedPaymentStatuses =
            ImmutableList.of(
                    Payment.Status.cancelled,
                    Payment.Status.rejected,
                    Payment.Status.refunded,
                    Payment.Status.charged_back
            );

    public MercadoPagoPaymentResolver(
            Environment env,
            BookingRepository bookingRepo,
            MembershipAcquisitionRepository membershipAcquisitionRepo,
            BookingEmailNotificator emailNotificator,
            OfficeBranchFinder officeBranchFinder,
            EventBus eventBus
    ) {
        this.env = env;
        this.logger = LoggerFactory.getLogger(getClass());
        this.bookingRepo = bookingRepo;
        this.membershipAcquisitionRepo = membershipAcquisitionRepo;
        this.emailNotificator = emailNotificator;
        this.officeBranchFinder = officeBranchFinder;
        this.eventBus = eventBus;
    }

    private void validatePayment(
            Payment payment,
            String reference,
            Float amount
    ) {
        String collector = env.getProperty(
                "MERCADO_PAGO_COLLECTOR_ID",
                ""
        );

        String currency = env.getProperty(
                "MERCADO_PAGO_CURRENCY",
                "ARS"
        );

        if (collector.isBlank() ||
                !reference.equals(payment.getExternalReference()) ||
                payment.getTransactionAmount() == null ||
                amount == null ||
                new BigDecimal(payment.getTransactionAmount().toString())
                        .compareTo(new BigDecimal(amount.toString())) != 0 ||
                payment.getCurrencyId() == null ||
                !currency.equals(payment.getCurrencyId().name()) ||
                !collector.equals(String.valueOf(payment.getCollectorId()))) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Payment does not match purchase"
            );
        }
    }

    private Option<Payment> obtainPayment(
            MercadoPagoPaymentNotification notification
    ) {
        try {
            MercadoPago.SDK.setAccessToken(
                    env.getProperty("MERCADO_PAGO_ACCESS_TOKEN")
            );
        } catch (MPConfException e) {
            logger.error("Could not configure Mercado Pago", e);
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Payment lookup unavailable",
                    e
            );
        }

        try {
            Payment payment = Payment.findById(
                    notification.getData().getId()
            );

            if (payment == null ||
                    payment.getId() == null ||
                    payment.getStatus() == null) {
                throw new ResponseStatusException(
                        HttpStatus.SERVICE_UNAVAILABLE,
                        "Payment lookup incomplete"
                );
            }

            return Option.of(payment);
        } catch (MPException e) {
            logger.error("Could not retrieve Mercado Pago payment", e);
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Payment lookup unavailable",
                    e
            );
        }
    }

    private PaymentInformation paymentInformation(Payment payment) {
        Float providerFee = payment.getFeeDetails() == null
                ? 0f
                : payment.getFeeDetails()
                        .stream()
                        .filter(fee ->
                                FeeDetail.Type.mercadopago_fee.equals(
                                        fee.getType()
                                )
                        )
                        .map(FeeDetail::getAmount)
                        .findFirst()
                        .orElse(0f);

        return new PaymentInformation(
                payment.getId(),
                payment.getTransactionAmount(),
                providerFee,
                payment.getCurrencyId().name(),
                payment.getPaymentMethodId(),
                payment.getPaymentTypeId() == null
                        ? ""
                        : payment.getPaymentTypeId().name()
        );
    }

    private void handlePaymentAccepted(
            Booking booking,
            Payment payment
    ) {
        booking.markAsScheduled(paymentInformation(payment));

        bookingRepo.update(booking)
                .onSuccess(v -> {
                    var officeBranchLocation = officeBranchFinder
                            .find(OfficeBranchId.fromString(
                                    booking.office().officeBranchId()
                            ))
                            .map(OfficeBranchResponse::getLocation)
                            .getOrElse(new OfficeBranchResponse.Location(
                                    "N/A",
                                    "",
                                    "",
                                    ""
                            ));

                    eventBus.publish(booking.bookingConfirmedEvent());

                    emailNotificator.sendBookingPaymentAcceptedEmail(
                            booking.renterEmail(),
                            booking.id(),
                            booking.office().name(),
                            booking.startScheduleTime(),
                            booking.endScheduleTime(),
                            booking.amountOfHours(),
                            payment.getTransactionAmount(),
                            officeBranchLocation
                    );
                })
                .onFailure(error -> {
                    throw new ResponseStatusException(
                            HttpStatus.SERVICE_UNAVAILABLE,
                            "Payment persistence failed",
                            error
                    );
                });
    }

    private void updateBooking(
            BookingId bookingId,
            Payment payment
    ) {
        bookingRepo.findById(bookingId)
                .filter(Booking::isPending)
                .peek(booking -> {
                    if (Payment.Status.approved.equals(payment.getStatus())) {
                        validatePayment(
                                payment,
                                bookingId.toString(),
                                booking.totalAmount().floatValue()
                        );
                        handlePaymentAccepted(booking, payment);
                    } else if (failedPaymentStatuses.contains(
                            payment.getStatus()
                    )) {
                        emailNotificator.sendBookingPaymentFailedEmail(
                                booking.renterEmail()
                        );
                    }
                });
    }

    public synchronized void handleNotification(
            String bookingId,
            MercadoPagoPaymentNotification notification
    ) {
        final BookingId id;

        try {
            id = BookingId.fromString(bookingId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid booking id",
                    e
            );
        }

        obtainPayment(notification)
                .peek(payment -> updateBooking(id, payment));
    }

    public synchronized void handleNotificationForMembershipAcquisition(
            String membershipAcquisitionId,
            MercadoPagoPaymentNotification notification
    ) {
        final MembershipAcquisitionId id;

        try {
            id = MembershipAcquisitionId.fromString(
                    membershipAcquisitionId
            );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid membership acquisition id",
                    e
            );
        }

        obtainPayment(notification)
                .peek(payment -> updateMembershipAcquisition(id, payment));
    }

    private void updateMembershipAcquisition(
            MembershipAcquisitionId id,
            Payment payment
    ) {
        membershipAcquisitionRepo.findById(id)
                .filter(MembershipAcquisition::isPending)
                .peek(membershipAcquisition -> {
                    if (Payment.Status.approved.equals(payment.getStatus())) {
                        validatePayment(
                                payment,
                                id.toString(),
                                membershipAcquisition
                                        .createPaymentPreference()
                                        .getPrice()
                        );

                        membershipAcquisition.buy(
                                paymentInformation(payment)
                        );

                        membershipAcquisitionRepo
                                .update(membershipAcquisition)
                                .onFailure(error -> {
                                    throw new ResponseStatusException(
                                            HttpStatus.SERVICE_UNAVAILABLE,
                                            "Payment persistence failed",
                                            error
                                    );
                                });
                    } else if (failedPaymentStatuses.contains(
                            payment.getStatus()
                    )) {
                        logger.warn(
                                "Membership payment was not accepted: {}",
                                payment.getId()
                        );
                    }
                });
    }
}