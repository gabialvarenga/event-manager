package com.dtidigital.event_manager.service;

import com.dtidigital.event_manager.enums.EventCategory;
import com.dtidigital.event_manager.exception.EventNotFoundException;
import com.dtidigital.event_manager.model.Event;
import com.dtidigital.event_manager.repository.IEventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private IEventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    private Event testEvent;

    @BeforeEach
    void setUp() {
        testEvent = new Event();
        testEvent.setId(1L);
        testEvent.setName("Test Event");
        testEvent.setEventDate(LocalDate.now().plusDays(1));
        testEvent.setStartTime(LocalTime.of(10, 0));
        testEvent.setEndTime(LocalTime.of(12, 0));
        testEvent.setLocation("Test Location");
        testEvent.setOrganizer("Test Organizer");
        testEvent.setCapacity(100);
        testEvent.setDescription("Test Description");
        testEvent.setPrice(BigDecimal.valueOf(50.00));
        testEvent.setCategory(EventCategory.CONFERENCE);
    }

    @Test
    void testGetAllEvents() {
        List<Event> events = Arrays.asList(testEvent);
        when(eventRepository.findAll()).thenReturn(events);

        List<Event> result = eventService.getAllEvents();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testEvent, result.get(0));
        verify(eventRepository, times(1)).findAll();
    }

    @Test
    void testGetEventById_Found() {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(testEvent));

        Optional<Event> result = eventService.getEventById(1L);

        assertTrue(result.isPresent());
        assertEquals(testEvent, result.get());
        verify(eventRepository, times(1)).findById(1L);
    }

    @Test
    void testGetEventById_NotFound() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        Optional<Event> result = eventService.getEventById(1L);

        assertFalse(result.isPresent());
        verify(eventRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveEvent() {
        when(eventRepository.save(any(Event.class))).thenReturn(testEvent);

        Event result = eventService.saveEvent(testEvent);

        assertNotNull(result);
        assertEquals(testEvent, result);
        verify(eventRepository, times(1)).save(testEvent);
    }

    @Test
    void testUpdateEvent_Success() {
        Event updatedEvent = new Event();
        updatedEvent.setName("Updated Event");
        updatedEvent.setEventDate(LocalDate.now().plusDays(2));
        updatedEvent.setStartTime(LocalTime.of(14, 0));
        updatedEvent.setEndTime(LocalTime.of(16, 0));
        updatedEvent.setLocation("Updated Location");
        updatedEvent.setOrganizer("Updated Organizer");
        updatedEvent.setCapacity(200);
        updatedEvent.setDescription("Updated Description");
        updatedEvent.setPrice(BigDecimal.valueOf(75.00));
        updatedEvent.setCategory(EventCategory.WORKSHOP);

        when(eventRepository.findById(1L)).thenReturn(Optional.of(testEvent));
        when(eventRepository.save(any(Event.class))).thenReturn(testEvent);

        Event result = eventService.updateEvent(1L, updatedEvent);

        assertNotNull(result);
        verify(eventRepository, times(1)).findById(1L);
        verify(eventRepository, times(1)).save(testEvent);
    }

    @Test
    void testUpdateEvent_NotFound() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EventNotFoundException.class, () -> {
            eventService.updateEvent(1L, testEvent);
        });
        verify(eventRepository, times(1)).findById(1L);
        verify(eventRepository, never()).save(any(Event.class));
    }

    @Test
    void testDeleteEvent_Success() {
        when(eventRepository.existsById(1L)).thenReturn(true);

        assertDoesNotThrow(() -> eventService.deleteEvent(1L));

        verify(eventRepository, times(1)).existsById(1L);
        verify(eventRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteEvent_NotFound() {
        when(eventRepository.existsById(anyLong())).thenReturn(false);
 
        assertThrows(EventNotFoundException.class, () -> {
            eventService.deleteEvent(1L);
        });
        verify(eventRepository, times(1)).existsById(1L);
        verify(eventRepository, never()).deleteById(anyLong());
    }

    @Test
    void testGetEventsByCategory() {
        List<Event> events = Arrays.asList(testEvent);
        when(eventRepository.findByCategory(EventCategory.CONFERENCE)).thenReturn(events);

        List<Event> result = eventService.getEventsByCategory(EventCategory.CONFERENCE);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testEvent, result.get(0));
        verify(eventRepository, times(1)).findByCategory(EventCategory.CONFERENCE);
    }

    @Test
    void testGetEventsByDateRange() {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(7);
        List<Event> events = Arrays.asList(testEvent);
        when(eventRepository.findByEventDateBetween(startDate, endDate)).thenReturn(events);

        List<Event> result = eventService.getEventsByDateRange(startDate, endDate);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventRepository, times(1)).findByEventDateBetween(startDate, endDate);
    }

    @Test
    void testGetEventsByOrganizer() {
        String organizer = "Test Organizer";
        List<Event> events = Arrays.asList(testEvent);
        when(eventRepository.findByOrganizerContainingIgnoreCase(organizer)).thenReturn(events);

        List<Event> result = eventService.getEventsByOrganizer(organizer);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventRepository, times(1)).findByOrganizerContainingIgnoreCase(organizer);
    }
}
