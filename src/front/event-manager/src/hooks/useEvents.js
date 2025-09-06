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
  const searchEvents = useCallback(async (name) => {
    if (!name.trim()) {
      return events;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await eventService.searchEventsByName(name);
      return data;
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
