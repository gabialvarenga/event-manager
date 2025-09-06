// Validação de evento
export const validateEvent = (event) => {
  const errors = [];

  // Nome
  if (!event.name?.trim() || event.name.trim().length < 3) {
    errors.push('Nome do evento deve ter pelo menos 3 caracteres');
  }

  // Data
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

  // Horários
  if (!event.startTime) {
    errors.push('Horário de início é obrigatório');
  }

  if (!event.endTime) {
    errors.push('Horário de término é obrigatório');
  }

  if (event.startTime && event.endTime && event.startTime >= event.endTime) {
    errors.push('Horário de início deve ser anterior ao horário de término');
  }

  // Local
  if (!event.location?.trim()) {
    errors.push('Local é obrigatório');
  }

  // Organizador
  if (!event.organizer?.trim()) {
    errors.push('Organizador é obrigatório');
  }

  // Capacidade
  if (!event.capacity || event.capacity < 1) {
    errors.push('Capacidade deve ser pelo menos 1');
  }

  // Preço
  if (event.price && event.price < 0) {
    errors.push('Preço não pode ser negativo');
  }

  return errors;
};

// Validação de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de telefone brasileiro
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone);
};

// Formatação para API
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
