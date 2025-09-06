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
      console.error('Erro ao carregar eventos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar eventos na inicialização
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Buscar evento por ID
  const getEvent = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const event = await eventService.getEventById(id);
      return event;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar novo evento
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

  // Atualizar evento
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

  // Deletar evento
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

  // Buscar eventos por categoria
  const getEventsByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await eventService.getEventsByCategory(category);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar eventos futuros
  const getUpcomingEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await eventService.getUpcomingEvents();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar eventos por nome
  const searchEvents = useCallback(async (query, filters = {}) => {
    if (!query?.trim() && Object.keys(filters).length === 0) {
      return events;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let results = [];
      
      if (query?.trim()) {
        // Buscar por nome primeiro
        results = await eventService.searchEventsByName(query);
      } else {
        // Se não há query, usar todos os eventos
        results = [...events];
      }
      
      // Aplicar filtros adicionais
      if (filters.category) {
        results = results.filter(event => event.category === filters.category);
      }
      
      if (filters.organizer) {
        results = results.filter(event => 
          event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())
        );
      }
      
      if (filters.location) {
        results = results.filter(event => 
          event.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        results = results.filter(event => {
          const eventDate = new Date(event.eventDate);
          return eventDate >= startDate;
        });
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        results = results.filter(event => {
          const eventDate = new Date(event.eventDate);
          return eventDate <= endDate;
        });
      }
      
      if (filters.minPrice !== undefined) {
        results = results.filter(event => 
          event.price === null || event.price >= filters.minPrice
        );
      }
      
      if (filters.maxPrice !== undefined) {
        results = results.filter(event => 
          event.price === null || event.price <= filters.maxPrice
        );
      }
      
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [events]);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    loadEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByCategory,
    getUpcomingEvents,
    searchEvents,
    clearError
  };
};

export default useEvents;
