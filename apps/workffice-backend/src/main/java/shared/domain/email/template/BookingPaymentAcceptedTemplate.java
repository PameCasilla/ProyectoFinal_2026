package shared.domain.email.template;

import lombok.AllArgsConstructor;

import java.util.HashMap;

import static java.lang.String.format;

@AllArgsConstructor
public class BookingPaymentAcceptedTemplate implements Template {
    public static String TEMPLATE_NAME = "BOOKING_PAYMENT_ACCEPTED";

    private final String  host;
    private final String  bookingId;
    private final String  officeName;
    private final String  bookingScheduleDate;
    private final String  bookingScheduleTime;
    private final Integer bookingHoursQuantity;
    private final Float   totalPrice;
    private final String  province;
    private final String  city;
    private final String  zipCode;
    private final String  street;

    @Override
    public String templateName() {
        return TEMPLATE_NAME;
    }

    @Override
    public String subject() {
        return "Tu reserva se registró exitosamente";
    }

    @Override
    public HashMap<String, String> substitutionData() {
        Float pricePerHour = totalPrice / bookingHoursQuantity;
        return new HashMap<>() {{
            put("booking_url", host + "/admin/booking?id=" + bookingId);
            put("booking_id", bookingId);
            put("office_branch_location", format("%s, %s %s - %s", province, city, zipCode, street));
            put("office_name", officeName);
            put("booking_schedule_date", bookingScheduleDate);
            put("booking_schedule_time", bookingScheduleTime);
            put("price_per_hour", pricePerHour.toString());
            put("booking_hours_quantity", bookingHoursQuantity.toString());
            put("total_price", totalPrice.toString());
        }};
    }

    @Override
    public String plainTextBody() {
        HashMap<String, String> data = substitutionData();
        return format(
            "Tu reserva se registró exitosamente.%nReserva: %s%nOficina: %s%nFecha: %s%nHorario: %s"
                + "%nDuracion: %s horas%nPrecio por hora: $%s%nTotal: $%s%nUbicacion: %s%nVer reserva: %s",
            data.get("booking_id"),
            data.get("office_name"),
            data.get("booking_schedule_date"),
            data.get("booking_schedule_time"),
            data.get("booking_hours_quantity"),
            data.get("price_per_hour"),
            data.get("total_price"),
            data.get("office_branch_location"),
            data.get("booking_url")
        );
    }
}
