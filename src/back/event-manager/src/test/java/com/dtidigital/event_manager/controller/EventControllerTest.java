package com.dtidigital.event_manager.controller;

import com.dtidigital.event_manager.enums.EventCategory;
import com.dtidigital.event_manager.model.Event;
import com.dtidigital.event_manager.service.EventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void testGetAllEvents() throws Exception {
     
        List<Event> events = Arrays.asList(testEvent);
        when(eventService.getAllEvents()).thenReturn(events);

       
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test Event"))
                .andExpect(jsonPath("$[0].organizer").value("Test Organizer"));

        verify(eventService, times(1)).getAllEvents();
    }

    @Test
    void testGetEventById_Found() throws Exception {
     
        when(eventService.getEventById(1L)).thenReturn(Optional.of(testEvent));

       
        mockMvc.perform(get("/api/events/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Event"));

        verify(eventService, times(1)).getEventById(1L);
    }

    @Test
    void testGetEventById_NotFound() throws Exception {
     
        when(eventService.getEventById(anyLong())).thenReturn(Optional.empty());

       
        mockMvc.perform(get("/api/events/999"))
                .andExpect(status().isNotFound());

        verify(eventService, times(1)).getEventById(999L);
    }

    @Test
    void testCreateEvent() throws Exception {
     
        when(eventService.saveEvent(any(Event.class))).thenReturn(testEvent);

       
        mockMvc.perform(post("/api/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testEvent)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Event"));

        verify(eventService, times(1)).saveEvent(any(Event.class));
    }

    @Test
    void testUpdateEvent_Success() throws Exception {
     
        Event updatedEvent = new Event();
        updatedEvent.setId(1L);
        updatedEvent.setName("Updated Event");
        updatedEvent.setEventDate(LocalDate.now().plusDays(1));
        updatedEvent.setStartTime(LocalTime.of(10, 0));
        updatedEvent.setEndTime(LocalTime.of(12, 0));
        updatedEvent.setLocation("Updated Location");
        updatedEvent.setOrganizer("Updated Organizer");
        updatedEvent.setCapacity(150);
        updatedEvent.setDescription("Updated Description");
        updatedEvent.setPrice(BigDecimal.valueOf(75.00));
        updatedEvent.setCategory(EventCategory.WORKSHOP);

        when(eventService.updateEvent(eq(1L), any(Event.class))).thenReturn(updatedEvent);

       
        mockMvc.perform(put("/api/events/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedEvent)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Updated Event"));

        verify(eventService, times(1)).updateEvent(eq(1L), any(Event.class));
    }

    @Test
    void testUpdateEvent_NotFound() throws Exception {
     
        when(eventService.updateEvent(eq(999L), any(Event.class)))
                .thenThrow(new RuntimeException("Event not found"));

       
        mockMvc.perform(put("/api/events/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testEvent)))
                .andExpect(status().isNotFound());

        verify(eventService, times(1)).updateEvent(eq(999L), any(Event.class));
    }

    @Test
    void testDeleteEvent_Success() throws Exception {
     
        doNothing().when(eventService).deleteEvent(1L);

       
        mockMvc.perform(delete("/api/events/1"))
                .andExpect(status().isNoContent());

        verify(eventService, times(1)).deleteEvent(1L);
    }

    @Test
    void testDeleteEvent_NotFound() throws Exception {
     
        doThrow(new RuntimeException("Event not found")).when(eventService).deleteEvent(999L);

       
        mockMvc.perform(delete("/api/events/999"))
                .andExpect(status().isNotFound());

        verify(eventService, times(1)).deleteEvent(999L);
    }

    @Test
    void testGetEventsByCategory() throws Exception {
     
        List<Event> events = Arrays.asList(testEvent);
        when(eventService.getEventsByCategory(EventCategory.CONFERENCE)).thenReturn(events);

       
        mockMvc.perform(get("/api/events/category/CONFERENCE"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].category").value("CONFERENCE"));

        verify(eventService, times(1)).getEventsByCategory(EventCategory.CONFERENCE);
    }

    @Test
    void testGetEventsByDateRange() throws Exception {
     
        List<Event> events = Arrays.asList(testEvent);
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(7);
        when(eventService.getEventsByDateRange(startDate, endDate)).thenReturn(events);

       
        mockMvc.perform(get("/api/events/date-range")
                .param("startDate", startDate.toString())
                .param("endDate", endDate.toString()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(eventService, times(1)).getEventsByDateRange(startDate, endDate);
    }

    @Test
    void testGetEventsByOrganizer() throws Exception {
     
        List<Event> events = Arrays.asList(testEvent);
        when(eventService.getEventsByOrganizer("Test Organizer")).thenReturn(events);

       
        mockMvc.perform(get("/api/events/organizer")
                .param("organizer", "Test Organizer"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(eventService, times(1)).getEventsByOrganizer("Test Organizer");
    }

    @Test
    void testSearchEventsByName() throws Exception {
     
        List<Event> events = Arrays.asList(testEvent);
        when(eventService.searchEventsByName("Test")).thenReturn(events);

       
        mockMvc.perform(get("/api/events/search")
                .param("name", "Test"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(eventService, times(1)).searchEventsByName("Test");
    }
}
