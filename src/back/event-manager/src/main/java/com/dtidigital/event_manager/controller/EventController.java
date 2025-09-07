package com.dtidigital.event_manager.controller;

import com.dtidigital.event_manager.model.Event;
import com.dtidigital.event_manager.enums.EventCategory;
import com.dtidigital.event_manager.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") 
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    // Listar todos os eventos
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    // Buscar evento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(event -> ResponseEntity.ok(event))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Cadastrar novo evento
    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
        Event savedEvent = eventService.saveEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }
    
    // Atualizar evento
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody Event eventDetails) {
        try {
            Event updatedEvent = eventService.updateEvent(id, eventDetails);
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Deletar evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Buscar eventos por categoria
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable EventCategory category) {
        List<Event> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(events);
    }
    
    // Buscar eventos por período
    @GetMapping("/date-range")
    public ResponseEntity<List<Event>> getEventsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Event> events = eventService.getEventsByDateRange(startDate, endDate);
        return ResponseEntity.ok(events);
    }
    
    // Buscar eventos por organizador
    @GetMapping("/organizer")
    public ResponseEntity<List<Event>> getEventsByOrganizer(@RequestParam String organizer) {
        List<Event> events = eventService.getEventsByOrganizer(organizer);
        return ResponseEntity.ok(events);
    }
    
    // Buscar eventos por nome
    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEventsByName(@RequestParam String name) {
        List<Event> events = eventService.searchEventsByName(name);
        return ResponseEntity.ok(events);
    }
    
    // Buscar eventos por nome ou ID
    @GetMapping("/search/global")
    public ResponseEntity<List<Event>> searchEventsByNameOrId(@RequestParam String query) {
        List<Event> events = eventService.searchEventsByNameOrId(query);
        return ResponseEntity.ok(events);
    }
    
    // Buscar eventos futuros por categoria
    @GetMapping("/upcoming/category/{category}")
    public ResponseEntity<List<Event>> getUpcomingEventsByCategory(@PathVariable EventCategory category) {
        List<Event> events = eventService.getUpcomingEventsByCategory(category);
        return ResponseEntity.ok(events);
    }
}
