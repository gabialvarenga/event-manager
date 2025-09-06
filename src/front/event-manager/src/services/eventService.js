import axios from 'axios';
import { API_CONFIG, MESSAGES } from '../constants';

// Configuração do cliente HTTP
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Interceptors
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Handler de erros centralizado
const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 404:
        return new Error(MESSAGES.ERROR.NOT_FOUND);
      case 400:
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((err) => err.defaultMessage || err.message).join(', ');
          return new Error(`${MESSAGES.ERROR.VALIDATION}: ${messages}`);
        }
        return new Error(data.message || MESSAGES.ERROR.VALIDATION);
      case 500:
        return new Error('Erro interno do servidor');
      default:
        return new Error(data.message || `Erro ${status}`);
    }
  } else if (error.request) {
    return new Error(MESSAGES.ERROR.NETWORK);
  } else {
    return new Error(error.message || MESSAGES.ERROR.GENERIC);
  }
};

// Serviço de eventos
export const eventService = {
  async getAllEvents() {
    try {
      const response = await apiClient.get('/events');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getEventById(id) {
    try {
      const response = await apiClient.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async createEvent(event) {
    try {
      const response = await apiClient.post('/events', event);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateEvent(id, event) {
    try {
      const response = await apiClient.put(`/events/${id}`, event);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async deleteEvent(id) {
    try {
      await apiClient.delete(`/events/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getUpcomingEvents() {
    try {
      const response = await apiClient.get('/events/upcoming');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async searchEventsByName(name) {
    try {
      const response = await apiClient.get('/events/search', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getEventsByCategory(category) {
    try {
      const response = await apiClient.get(`/events/category/${category}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
