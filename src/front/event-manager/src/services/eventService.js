import axios from 'axios';

// Configuração base do Axios
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging de requests (desenvolvimento)
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para handling de responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Categorias de eventos disponíveis
export const EVENT_CATEGORIES = [
  { value: 'CONFERENCE', label: 'Conferência' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'SEMINAR', label: 'Seminário' },
  { value: 'MEETUP', label: 'Meetup' },
  { value: 'HACKATHON', label: 'Hackathon' },
  { value: 'TRAINING', label: 'Treinamento' },
  { value: 'NETWORKING', label: 'Networking' },
  { value: 'PRESENTATION', label: 'Apresentação' },
  { value: 'COURSE', label: 'Curso' },
  { value: 'OTHER', label: 'Outro' },
];

// Estrutura do Event (baseado no modelo Java)
// Event: {
//   id?: number;
//   name: string;
//   eventDate: string;
//   startTime: string;
//   endTime: string;
//   location: string;
//   organizer: string;
//   capacity: number;
//   description?: string;
//   price?: number;
//   category?: string;
// }

// Estrutura para validação de erros
// ApiError: {
//   message: string;
//   field?: string;
//   code?: string;
// }

class EventService {
  // Listar todos os eventos
  async getAllEvents() {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar evento por ID
  async getEventById(id) {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Criar novo evento
  async createEvent(event) {
    try {
      const response = await api.post('/events', event);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Atualizar evento
  async updateEvent(id, event) {
    try {
      const response = await api.put(`/events/${id}`, event);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Deletar evento
  async deleteEvent(id) {
    try {
      await api.delete(`/events/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos por categoria
  async getEventsByCategory(category) {
    try {
      const response = await api.get(`/events/category/${category}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos futuros
  async getUpcomingEvents() {
    try {
      const response = await api.get('/events/upcoming');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos por período
  async getEventsByDateRange(startDate, endDate) {
    try {
      const response = await api.get('/events/date-range', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos por organizador
  async getEventsByOrganizer(organizer) {
    try {
      const response = await api.get('/events/organizer', {
        params: { organizer }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos por nome
  async searchEventsByName(name) {
    try {
      const response = await api.get('/events/search', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Buscar eventos futuros por categoria
  async getUpcomingEventsByCategory(category) {
    try {
      const response = await api.get(`/events/upcoming/category/${category}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handler de erros centralizado
  handleError(error) {
    if (error.response) {
      // Erro de resposta do servidor
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 404) {
        return new Error('Evento não encontrado');
      } else if (status === 400) {
        // Erro de validação
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((err) => err.defaultMessage || err.message).join(', ');
          return new Error(`Erro de validação: ${messages}`);
        }
        return new Error(data.message || 'Dados inválidos');
      } else if (status === 500) {
        return new Error('Erro interno do servidor');
      }
      
      return new Error(data.message || `Erro ${status}`);
    } else if (error.request) {
      // Erro de rede
      return new Error('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    } else {
      // Erro de configuração
      return new Error(error.message || 'Erro desconhecido');
    }
  }
}

// Instância singleton do serviço
export const eventService = new EventService();

// Funções utilitárias para validação
export const validateEvent = (event) => {
  const errors = [];

  if (!event.name || event.name.trim().length < 3) {
    errors.push('Nome do evento deve ter pelo menos 3 caracteres');
  }

  if (!event.eventDate) {
    errors.push('Data do evento é obrigatória');
  } else {
    const eventDate = new Date(event.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate <= today) {
      errors.push('Data do evento deve ser futura');
    }
  }

  if (!event.startTime) {
    errors.push('Horário de início é obrigatório');
  }

  if (!event.endTime) {
    errors.push('Horário de término é obrigatório');
  }

  if (event.startTime && event.endTime && event.startTime >= event.endTime) {
    errors.push('Horário de início deve ser anterior ao horário de término');
  }

  if (!event.location || event.location.trim().length === 0) {
    errors.push('Local é obrigatório');
  }

  if (!event.organizer || event.organizer.trim().length === 0) {
    errors.push('Organizador é obrigatório');
  }

  if (!event.capacity || event.capacity < 1) {
    errors.push('Capacidade deve ser pelo menos 1');
  }

  if (event.price && event.price < 0) {
    errors.push('Preço não pode ser negativo');
  }

  return errors;
};

// Função para formatar dados antes do envio
export const formatEventForAPI = (event) => {
  return {
    ...event,
    name: event.name?.trim(),
    location: event.location?.trim(),
    organizer: event.organizer?.trim(),
    description: event.description?.trim() || undefined,
    price: event.price || undefined,
    capacity: event.capacity ? Number(event.capacity) : undefined,
  };
};

export default eventService;
