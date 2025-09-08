// Configurações da API
export const API_CONFIG = {
  BASE_URL: 'https://event-manager-grkf.onrender.com/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Categorias de eventos
export const EVENT_CATEGORIES = [
  { value: 'CONFERENCE', label: 'Conferência', icon: '🎤', color: '#667eea' },
  { value: 'WORKSHOP', label: 'Workshop', icon: '🛠️', color: '#764ba2' },
  { value: 'SEMINAR', label: 'Seminário', icon: '📚', color: '#f093fb' },
  { value: 'MEETUP', label: 'Meetup', icon: '👥', color: '#4facfe' },
  { value: 'HACKATHON', label: 'Hackathon', icon: '💻', color: '#43e97b' },
  { value: 'TRAINING', label: 'Treinamento', icon: '🎓', color: '#fa709a' },
  { value: 'NETWORKING', label: 'Networking', icon: '🤝', color: '#fee140' },
  { value: 'PRESENTATION', label: 'Apresentação', icon: '📊', color: '#38f9d7' },
  { value: 'COURSE', label: 'Curso', icon: '📖', color: '#f5576c' },
  { value: 'OTHER', label: 'Outro', icon: '📅', color: '#6c757d' },
];

// Status de eventos
export const EVENT_STATUS = {
  PAST: 'past',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  FUTURE: 'future',
  UNKNOWN: 'unknown',
};

// Cores do tema
export const THEME_COLORS = {
  primary: '#1E88E5',
  secondary: '#FF6B35',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  background: '#f8f9fa',
  surface: '#ffffff',
};

// Rotas da aplicação
export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  CREATE_EVENT: '/create',
  EVENT_DETAIL: '/events/:id',
};

// Mensagens do sistema
export const MESSAGES = {
  SUCCESS: {
    EVENT_CREATED: 'Evento criado com sucesso!',
    EVENT_UPDATED: 'Evento atualizado com sucesso!',
    EVENT_DELETED: 'Evento deletado com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro inesperado',
    NETWORK: 'Erro de conexão com o servidor',
    NOT_FOUND: 'Evento não encontrado',
    VALIDATION: 'Dados inválidos',
  },
  INFO: {
    LOADING: 'Carregando...',
    NO_EVENTS: 'Nenhum evento encontrado',
    EMPTY_SEARCH: 'Digite para pesquisar eventos',
  },
};
