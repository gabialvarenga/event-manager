import { EVENT_CATEGORIES, EVENT_STATUS } from '../constants';

// Formatação de data
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateCompact = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Formatação de horário
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  if (timeString.includes(':')) {
    return timeString;
  }
  
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Formatação de preço
export const formatPrice = (price) => {
  if (!price || price === 0) return 'Gratuito';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Formatação de capacidade
export const formatCapacity = (capacity) => {
  if (!capacity) return '';
  
  return `${capacity} ${capacity === 1 ? 'pessoa' : 'pessoas'}`;
};

// Status do evento
export const getEventStatus = (eventDate) => {
  if (!eventDate) return EVENT_STATUS.UNKNOWN;
  
  const event = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (event < today) {
    return EVENT_STATUS.PAST;
  } else if (isToday(eventDate)) {
    return EVENT_STATUS.TODAY;
  } else if (isTomorrow(eventDate)) {
    return EVENT_STATUS.TOMORROW;
  } else {
    return EVENT_STATUS.FUTURE;
  }
};

export const getStatusColor = (status) => {
  const colors = {
    [EVENT_STATUS.PAST]: '#6c757d',
    [EVENT_STATUS.TODAY]: '#dc3545',
    [EVENT_STATUS.TOMORROW]: '#fd7e14',
    [EVENT_STATUS.FUTURE]: '#28a745',
  };
  
  return colors[status] || '#6c757d';
};

export const getStatusText = (status) => {
  const texts = {
    [EVENT_STATUS.PAST]: 'Evento realizado',
    [EVENT_STATUS.TODAY]: 'Hoje',
    [EVENT_STATUS.TOMORROW]: 'Amanhã',
    [EVENT_STATUS.FUTURE]: 'Evento futuro',
  };
  
  return texts[status] || 'Status desconhecido';
};

// Categoria helpers
export const getCategoryInfo = (categoryValue) => {
  return EVENT_CATEGORIES.find(cat => cat.value === categoryValue) || EVENT_CATEGORIES[EVENT_CATEGORIES.length - 1];
};

export const getCategoryIcon = (categoryValue) => {
  const icons = {
    'tecnologia': '💻',
    'musica': '🎵',
    'esporte': '⚽',
    'educacao': '📚',
    'arte': '🎨',
    'negocio': '💼',
    'alimentacao': '🍽️',
    'saude': '🏥',
    'familia': '👨‍👩‍👧‍👦',
    'social': '🤝',
    'outro': '📅'
  };
  
  return icons[categoryValue] || icons['outro'];
};

export const getCategoryColor = (categoryValue) => {
  const colors = {
    'tecnologia': '#2196F3',
    'musica': '#9C27B0',
    'esporte': '#4CAF50',
    'educacao': '#FF9800',
    'arte': '#E91E63',
    'negocio': '#607D8B',
    'alimentacao': '#FF5722',
    'saude': '#00BCD4',
    'familia': '#795548',
    'social': '#FFC107',
    'outro': '#9E9E9E'
  };
  
  return colors[categoryValue] || colors['outro'];
};

// Verificações de data
export const isToday = (dateString) => {
  if (!dateString) return false;
  
  const event = new Date(dateString);
  const today = new Date();
  
  return event.toDateString() === today.toDateString();
};

export const isTomorrow = (dateString) => {
  if (!dateString) return false;
  
  const event = new Date(dateString);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return event.toDateString() === tomorrow.toDateString();
};

export const daysUntilEvent = (eventDate) => {
  if (!eventDate) return null;
  
  const event = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);
  
  const diffTime = event.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Utilitários gerais
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
