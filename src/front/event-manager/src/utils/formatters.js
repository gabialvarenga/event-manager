// Utilitários para formatação de dados

// Formatar data para exibição
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formatar data compacta
export const formatDateCompact = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Formatar horário
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // Se já está no formato HH:mm, retorna como está
  if (timeString.includes(':')) {
    return timeString;
  }
  
  // Se está em outro formato, tenta converter
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatar preço
export const formatPrice = (price) => {
  if (!price) return 'Gratuito';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

// Formatar capacidade
export const formatCapacity = (capacity) => {
  if (!capacity) return '';
  
  return `${capacity} ${capacity === 1 ? 'pessoa' : 'pessoas'}`;
};

// Calcular duração do evento
export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '';
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours === 0) {
    return `${diffMinutes}min`;
  } else if (diffMinutes === 0) {
    return `${diffHours}h`;
  } else {
    return `${diffHours}h ${diffMinutes}min`;
  }
};

// Verificar se evento é no futuro
export const isFutureEvent = (eventDate) => {
  if (!eventDate) return false;
  
  const event = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return event > today;
};

// Verificar se evento é hoje
export const isToday = (eventDate) => {
  if (!eventDate) return false;
  
  const event = new Date(eventDate);
  const today = new Date();
  
  return event.toDateString() === today.toDateString();
};

// Verificar se evento é amanhã
export const isTomorrow = (eventDate) => {
  if (!eventDate) return false;
  
  const event = new Date(eventDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return event.toDateString() === tomorrow.toDateString();
};

// Obter status do evento
export const getEventStatus = (eventDate) => {
  if (!eventDate) return 'unknown';
  
  const event = new Date(eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (event < today) {
    return 'past';
  } else if (isToday(eventDate)) {
    return 'today';
  } else if (isTomorrow(eventDate)) {
    return 'tomorrow';
  } else {
    return 'future';
  }
};

// Obter cor do status
export const getStatusColor = (status) => {
  switch (status) {
    case 'past':
      return '#6c757d'; // Cinza
    case 'today':
      return '#dc3545'; // Vermelho
    case 'tomorrow':
      return '#fd7e14'; // Laranja
    case 'future':
      return '#28a745'; // Verde
    default:
      return '#6c757d';
  }
};

// Obter texto do status
export const getStatusText = (status) => {
  switch (status) {
    case 'past':
      return 'Evento realizado';
    case 'today':
      return 'Hoje';
    case 'tomorrow':
      return 'Amanhã';
    case 'future':
      return 'Evento futuro';
    default:
      return 'Status desconhecido';
  }
};

// Truncar texto
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

// Capitalizar primeira letra
export const capitalize = (text) => {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Gerar ID único
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce para search
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

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar telefone brasileiro
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone);
};

// Formatar data para input
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Formatar horário para input
export const formatTimeForInput = (timeString) => {
  if (!timeString) return '';
  
  // Se já está no formato HH:mm, retorna como está
  if (timeString.match(/^\d{2}:\d{2}$/)) {
    return timeString;
  }
  
  // Tenta extrair HH:mm de outros formatos
  const timeMatch = timeString.match(/(\d{2}):(\d{2})/);
  if (timeMatch) {
    return `${timeMatch[1]}:${timeMatch[2]}`;
  }
  
  return timeString;
};

// Converter data/hora para ISO string
export const toISODateTime = (date, time) => {
  if (!date || !time) return null;
  
  return `${date}T${time}:00`;
};

// Calcular dias até o evento
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

// Obter saudação baseada no horário
export const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Bom dia';
  } else if (hour < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
};

// Obter ícone para categoria
export const getCategoryIcon = (category) => {
  const icons = {
    CONFERENCE: '🎤',
    WORKSHOP: '🛠️',
    SEMINAR: '📚',
    MEETUP: '👥',
    HACKATHON: '💻',
    TRAINING: '🎓',
    NETWORKING: '🤝',
    PRESENTATION: '📊',
    COURSE: '📖',
    OTHER: '📅'
  };
  
  return icons[category] || '📅';
};

// Obter cor para categoria
export const getCategoryColor = (category) => {
  const colors = {
    CONFERENCE: '#667eea',
    WORKSHOP: '#764ba2',
    SEMINAR: '#f093fb',
    MEETUP: '#4facfe',
    HACKATHON: '#43e97b',
    TRAINING: '#fa709a',
    NETWORKING: '#fee140',
    PRESENTATION: '#38f9d7',
    COURSE: '#f5576c',
    OTHER: '#6c757d'
  };
  
  return colors[category] || '#6c757d';
};

export default {
  formatDate,
  formatDateCompact,
  formatTime,
  formatPrice,
  formatCapacity,
  calculateDuration,
  isFutureEvent,
  isToday,
  isTomorrow,
  getEventStatus,
  getStatusColor,
  getStatusText,
  truncateText,
  capitalize,
  generateId,
  debounce,
  isValidEmail,
  isValidPhone,
  formatDateForInput,
  formatTimeForInput,
  toISODateTime,
  daysUntilEvent,
  getGreeting,
  getCategoryIcon,
  getCategoryColor
};
