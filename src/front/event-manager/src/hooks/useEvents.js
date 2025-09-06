import { useState, useEffect, useCallback } from 'react';
import { eventService } from '../services/eventService';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todos os eventos
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicializar
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Operações CRUD
  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id, eventData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedEvent = await eventService.updateEvent(id, eventData);
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === id ? updatedEvent : event
        )
      );
      return updatedEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await eventService.deleteEvent(id);
      setEvents(prevEvents => 
        prevEvents.filter(event => event.id !== id)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca e filtros
  const searchEvents = useCallback(async (query, filters = {}) => {
    if (!query?.trim() && Object.keys(filters).length === 0) {
      return events;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let results = [];
      
      if (query?.trim()) {
        results = await eventService.searchEventsByName(query);
      } else {
        results = [...events];
      }
      
      // Aplicar filtros locais
      results = applyFilters(results, filters);
      
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [events]);

  const getUpcomingEvents = useCallback(async () => {
    try {
      return await eventService.getUpcomingEvents();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
    getUpcomingEvents,
    clearError,
  };
};

// Função auxiliar para aplicar filtros
const applyFilters = (results, filters) => {
  let filtered = [...results];

  if (filters.category) {
    filtered = filtered.filter(event => event.category === filters.category);
  }

  if (filters.organizer) {
    filtered = filtered.filter(event => 
      event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())
    );
  }

  if (filters.location) {
    filtered = filtered.filter(event => 
      event.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.startDate) {
    const startDate = new Date(filters.startDate);
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate >= startDate;
    });
  }

  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate <= endDate;
    });
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(event => 
      event.price === null || event.price >= filters.minPrice
    );
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(event => 
      event.price === null || event.price <= filters.maxPrice
    );
  }

  return filtered;
};

export default useEvents;
