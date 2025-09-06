import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  alpha,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  DollarSign,
  FileText,
  Tag,
  Save,
  Loader
} from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { EVENT_CATEGORIES, validateEvent, formatEventForAPI } from '../../services/eventService';
import { getCategoryIcon, getCategoryColor } from '../../utils/formatters';

dayjs.locale('pt-br');

const EventForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  event = null, 
  loading = false 
}) => {
  const theme = useTheme();
  const isEdit = Boolean(event);

  const [formData, setFormData] = useState({
    name: '',
    eventDate: null,
    startTime: null,
    endTime: null,
    location: '',
    organizer: '',
    capacity: '',
    description: '',
    price: '',
    category: ''
  });

  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  // Preencher form quando receber evento para edição
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        eventDate: event.eventDate ? dayjs(event.eventDate) : null,
        startTime: event.startTime ? dayjs(`2000-01-01T${event.startTime}`) : null,
        endTime: event.endTime ? dayjs(`2000-01-01T${event.endTime}`) : null,
        location: event.location || '',
        organizer: event.organizer || '',
        capacity: event.capacity?.toString() || '',
        description: event.description || '',
        price: event.price?.toString() || '',
        category: event.category || ''
      });
    } else {
      // Resetar form para novo evento
      setFormData({
        name: '',
        eventDate: null,
        startTime: null,
        endTime: null,
        location: '',
        organizer: '',
        capacity: '',
        description: '',
        price: '',
        category: ''
      });
    }
    setErrors([]);
    setFieldErrors({});
  }, [event, open]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleDateChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const eventData = {
      name: formData.name,
      eventDate: formData.eventDate?.format('YYYY-MM-DD'),
      startTime: formData.startTime?.format('HH:mm'),
      endTime: formData.endTime?.format('HH:mm'),
      location: formData.location,
      organizer: formData.organizer,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category
    };

    const validationErrors = validateEvent(eventData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      
      // Mapear erros para campos específicos
      const newFieldErrors = {};
      validationErrors.forEach(error => {
        if (error.includes('nome')) newFieldErrors.name = error;
        if (error.includes('data')) newFieldErrors.eventDate = error;
        if (error.includes('início')) newFieldErrors.startTime = error;
        if (error.includes('término')) newFieldErrors.endTime = error;
        if (error.includes('local')) newFieldErrors.location = error;
        if (error.includes('organizador')) newFieldErrors.organizer = error;
        if (error.includes('capacidade')) newFieldErrors.capacity = error;
        if (error.includes('preço')) newFieldErrors.price = error;
      });
      setFieldErrors(newFieldErrors);
      
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const eventData = formatEventForAPI({
      name: formData.name,
      eventDate: formData.eventDate?.format('YYYY-MM-DD'),
      startTime: formData.startTime?.format('HH:mm'),
      endTime: formData.endTime?.format('HH:mm'),
      location: formData.location,
      organizer: formData.organizer,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category || null
    });

    try {
      await onSubmit(eventData);
      onClose();
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const selectedCategory = EVENT_CATEGORIES.find(cat => cat.value === formData.category);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={24} />
            <Typography variant="h6" component="div">
              {isEdit ? 'Editar Evento' : 'Criar Novo Evento'}
            </Typography>
          </Box>
          
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': { 
                backgroundColor: alpha(theme.palette.common.white, 0.1) 
              }
            }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {/* Erros de validação */}
          {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Corrija os seguintes erros:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Nome do Evento */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Evento"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FileText size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Data do Evento */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data do Evento"
                value={formData.eventDate}
                onChange={handleDateChange('eventDate')}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldErrors.eventDate,
                    helperText: fieldErrors.eventDate,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Calendar size={20} color={theme.palette.text.secondary} />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }
                  }
                }}
              />
            </Grid>

            {/* Categoria */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange('category')}
                  label="Categoria"
                  startAdornment={
                    <InputAdornment position="start">
                      <Tag size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {EVENT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{getCategoryIcon(category.value)}</span>
                        <span>{category.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Horários */}
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Horário de Início"
                value={formData.startTime}
                onChange={handleDateChange('startTime')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldErrors.startTime,
                    helperText: fieldErrors.startTime,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Clock size={20} color={theme.palette.text.secondary} />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Horário de Término"
                value={formData.endTime}
                onChange={handleDateChange('endTime')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldErrors.endTime,
                    helperText: fieldErrors.endTime,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Clock size={20} color={theme.palette.text.secondary} />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }
                  }
                }}
              />
            </Grid>

            {/* Local */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local do Evento"
                value={formData.location}
                onChange={handleInputChange('location')}
                error={!!fieldErrors.location}
                helperText={fieldErrors.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapPin size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Organizador */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organizador"
                value={formData.organizer}
                onChange={handleInputChange('organizer')}
                error={!!fieldErrors.organizer}
                helperText={fieldErrors.organizer}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Capacidade */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacidade"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange('capacity')}
                error={!!fieldErrors.capacity}
                helperText={fieldErrors.capacity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Users size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Preço */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preço (opcional)"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange('price')}
                error={!!fieldErrors.price}
                helperText={fieldErrors.price || "Deixe em branco para evento gratuito"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Preview da Categoria */}
            {selectedCategory && (
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Categoria selecionada:
                  </Typography>
                  <Chip
                    label={`${getCategoryIcon(selectedCategory.value)} ${selectedCategory.label}`}
                    sx={{
                      backgroundColor: alpha(getCategoryColor(selectedCategory.value), 0.1),
                      color: getCategoryColor(selectedCategory.value),
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Grid>
            )}

            {/* Descrição */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição (opcional)"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange('description')}
                helperText="Descreva os detalhes do evento (máximo 500 caracteres)"
                inputProps={{ maxLength: 500 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Typography 
                variant="caption" 
                color="textSecondary"
                sx={{ float: 'right', mt: 0.5 }}
              >
                {formData.description.length}/500
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <Loader className="spin" size={18} /> : <Save size={18} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              }
            }}
          >
            {loading ? 'Salvando...' : (isEdit ? 'Atualizar Evento' : 'Criar Evento')}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EventForm;
