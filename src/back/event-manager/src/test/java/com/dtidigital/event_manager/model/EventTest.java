package com.dtidigital.event_manager.model;

import com.dtidigital.event_manager.enums.EventCategory;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class EventTest {

    @Test
    void testEventCreation() {
        
        Event event = new Event();
        event.setId(1L);
        event.setName("Test Event");
        event.setEventDate(LocalDate.now().plusDays(1));
        event.setStartTime(LocalTime.of(10, 0));
        event.setEndTime(LocalTime.of(12, 0));
        event.setLocation("Test Location");
        event.setOrganizer("Test Organizer");
        event.setCapacity(100);
        event.setDescription("Test Description");
        event.setPrice(BigDecimal.valueOf(50.00));
        event.setCategory(EventCategory.CONFERENCE);

        // Then
        assertNotNull(event);
        assertEquals(1L, event.getId());
        assertEquals("Test Event", event.getName());
        assertEquals(LocalDate.now().plusDays(1), event.getEventDate());
        assertEquals(LocalTime.of(10, 0), event.getStartTime());
        assertEquals(LocalTime.of(12, 0), event.getEndTime());
        assertEquals("Test Location", event.getLocation());
        assertEquals("Test Organizer", event.getOrganizer());
        assertEquals(100, event.getCapacity());
        assertEquals("Test Description", event.getDescription());
        assertEquals(BigDecimal.valueOf(50.00), event.getPrice());
        assertEquals(EventCategory.CONFERENCE, event.getCategory());
    }

    @Test
    void testIsValidTimeRange_ValidRange() {
        
        Event event = new Event();
        event.setStartTime(LocalTime.of(10, 0));
        event.setEndTime(LocalTime.of(12, 0));

        
        assertTrue(event.isValidTimeRange());
    }

    @Test
    void testIsValidTimeRange_InvalidRange() {
        
        Event event = new Event();
        event.setStartTime(LocalTime.of(12, 0));
        event.setEndTime(LocalTime.of(10, 0));

        
        assertFalse(event.isValidTimeRange());
    }

    @Test
    void testIsValidTimeRange_NullTimes() {
        
        Event event = new Event();
        event.setStartTime(null);
        event.setEndTime(null);

        
        assertTrue(event.isValidTimeRange());
    }

    @Test
    void testEventConstructorWithAllArgs() {
        Event event = new Event(
            1L,
            "Test Event",
            LocalDate.now().plusDays(1),
            LocalTime.of(10, 0),
            LocalTime.of(12, 0),
            "Test Location",
            "Test Organizer",
            100,
            "Test Description",
            BigDecimal.valueOf(50.00),
            EventCategory.WORKSHOP
        );

        // Then
        assertNotNull(event);
        assertEquals("Test Event", event.getName());
        assertEquals(EventCategory.WORKSHOP, event.getCategory());
    }

    @Test
    void testEventNoArgsConstructor() {
        // When
        Event event = new Event();

        // Then
        assertNotNull(event);
        assertNull(event.getId());
        assertNull(event.getName());
    }
}
