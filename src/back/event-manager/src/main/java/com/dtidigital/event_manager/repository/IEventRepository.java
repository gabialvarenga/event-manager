package com.dtidigital.event_manager.repository;

import com.dtidigital.event_manager.model.Event;
import com.dtidigital.event_manager.enums.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IEventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByCategory(EventCategory category);
    
    List<Event> findByEventDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Event> findByEventDateAfter(LocalDate date);
    
    List<Event> findByOrganizerContainingIgnoreCase(String organizer);
    
    List<Event> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT e FROM Event e WHERE e.eventDate >= :startDate AND e.eventDate <= :endDate")
    List<Event> findEventsByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT e FROM Event e WHERE e.category = :category AND e.eventDate >= :currentDate")
    List<Event> findUpcomingEventsByCategory(@Param("category") EventCategory category, @Param("currentDate") LocalDate currentDate);
}