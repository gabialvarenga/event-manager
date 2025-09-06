package com.dtidigital.event_manager.model;

import com.dtidigital.event_manager.enums.EventCategory;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @NotNull(message = "Event date is required")
    @Future(message = "Event date must be in the future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate eventDate;

    @NotNull(message = "Start time is required")
    @JsonFormat(pattern = "HH:mm")
    @Column(nullable = false)
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    @JsonFormat(pattern = "HH:mm")
    @Column(nullable = false)
    private LocalTime endTime;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Column(nullable = false, length = 200)
    private String location;

    @NotBlank(message = "Organizer is required")
    @Size(max = 200, message = "Organizer must not exceed 200 characters")
    @Column(nullable = false, length = 200)
    private String organizer;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Column(nullable = false)
    private Integer capacity;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(length = 500)
    private String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    @Digits(integer = 8, fraction = 2, message = "Price must have at most 8 integer digits and 2 decimals")
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private EventCategory category;


    /**
     * Valida se o horário de início é anterior ao horário de término
     */
    @AssertTrue(message = "Start time must be before end time")
    public boolean isValidTimeRange() {
        if (startTime == null || endTime == null) {
            return true; // Validação será tratada pelas anotações @NotNull
        }
        return startTime.isBefore(endTime);
    }
}