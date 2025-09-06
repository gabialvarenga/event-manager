package com.dtidigital.event_manager.service;

import com.dtidigital.event_manager.exception.EventNotFoundException;
import com.dtidigital.event_manager.model.Event;
import com.dtidigital.event_manager.enums.EventCategory;
import com.dtidigital.event_manager.repository.IEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private IEventRepository eventRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }
    
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new EventNotFoundException("Evento não encontrado com ID: " + id));
        
        event.setName(eventDetails.getName());
        event.setEventDate(eventDetails.getEventDate());
        event.setStartTime(eventDetails.getStartTime());
        event.setEndTime(eventDetails.getEndTime());
        event.setLocation(eventDetails.getLocation());
        event.setOrganizer(eventDetails.getOrganizer());
        event.setCapacity(eventDetails.getCapacity());
        event.setDescription(eventDetails.getDescription());
        event.setPrice(eventDetails.getPrice());
        event.setCategory(eventDetails.getCategory());
        
        return eventRepository.save(event);
    }
    
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new EventNotFoundException("Evento não encontrado com ID: " + id);
        }
        eventRepository.deleteById(id);
    }
    
    // Métodos de busca adicionais
    public List<Event> getEventsByCategory(EventCategory category) {
        return eventRepository.findByCategory(category);
    }
    
    public List<Event> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        return eventRepository.findByEventDateBetween(startDate, endDate);
    }
    
    public List<Event> getUpcomingEvents() {
        return eventRepository.findByEventDateAfter(LocalDate.now());
    }
    
    public List<Event> getEventsByOrganizer(String organizer) {
        return eventRepository.findByOrganizerContainingIgnoreCase(organizer);
    }
    
    public List<Event> searchEventsByName(String name) {
        return eventRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Event> getUpcomingEventsByCategory(EventCategory category) {
        return eventRepository.findUpcomingEventsByCategory(category, LocalDate.now());
    }
}