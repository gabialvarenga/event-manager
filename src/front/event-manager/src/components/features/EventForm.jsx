import React, { useState, useEffect } from "react";
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
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  Loader,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { EVENT_CATEGORIES, MESSAGES } from "../../constants";
import { validateEvent, formatEventForAPI } from "../../utils/validation";

dayjs.locale("pt-br");

const EventForm = ({
  open = false,
  onClose,
  onSubmit,
  event = null,
  loading = false,
  isPage = false,
}) => {
  const theme = useTheme();
  const isEdit = Boolean(event?.id);

  const [formData, setFormData] = useState({
    name: "",
    eventDate: null,
    startTime: null,
    endTime: null,
    location: "",
    organizer: "",
    capacity: "",
    description: "",
    price: "",
    category: "",
  });

  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        eventDate: event.eventDate ? dayjs(event.eventDate) : null,
        startTime: event.startTime
          ? dayjs(`2000-01-01T${event.startTime}`)
          : null,
        endTime: event.endTime ? dayjs(`2000-01-01T${event.endTime}`) : null,
        location: event.location || "",
        organizer: event.organizer || "",
        capacity: event.capacity?.toString() || "",
        description: event.description || "",
        price: event.price?.toString() || "",
        category: event.category || "",
      });
    } else {
      setFormData({
        name: "",
        eventDate: null,
        startTime: null,
        endTime: null,
        location: "",
        organizer: "",
        capacity: "",
        description: "",
        price: "",
        category: "",
      });
    }
    setErrors([]);
    setFieldErrors({});
    setTouched({});
  }, [event, open]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Limpar erro do campo quando usuário começar a digitar
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleDateChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    const newFieldErrors = { ...fieldErrors };
    
    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          newFieldErrors.name = 'Nome do evento é obrigatório';
        } else {
          delete newFieldErrors.name;
        }
        break;
      case 'eventDate':
        if (!formData.eventDate) {
          newFieldErrors.eventDate = 'Data do evento é obrigatória';
        } else {
          delete newFieldErrors.eventDate;
        }
        break;
      case 'startTime':
        if (!formData.startTime) {
          newFieldErrors.startTime = 'Horário de início é obrigatório';
        } else {
          delete newFieldErrors.startTime;
        }
        break;
      case 'endTime':
        if (!formData.endTime) {
          newFieldErrors.endTime = 'Horário de término é obrigatório';
        } else {
          delete newFieldErrors.endTime;
        }
        break;
      case 'location':
        if (!formData.location.trim()) {
          newFieldErrors.location = 'Local do evento é obrigatório';
        } else {
          delete newFieldErrors.location;
        }
        break;
      case 'organizer':
        if (!formData.organizer.trim()) {
          newFieldErrors.organizer = 'Organizador é obrigatório';
        } else {
          delete newFieldErrors.organizer;
        }
        break;
      case 'capacity':
        if (!formData.capacity || parseInt(formData.capacity) <= 0) {
          newFieldErrors.capacity = 'Capacidade deve ser maior que zero';
        } else {
          delete newFieldErrors.capacity;
        }
        break;
      case 'category':
        if (!formData.category) {
          newFieldErrors.category = 'Categoria é obrigatória';
        } else {
          delete newFieldErrors.category;
        }
        break;
    }
    
    setFieldErrors(newFieldErrors);
  };

  const validateForm = () => {
    const eventData = {
      name: formData.name,
      eventDate: formData.eventDate?.format("YYYY-MM-DD"),
      startTime: formData.startTime?.format("HH:mm"),
      endTime: formData.endTime?.format("HH:mm"),
      location: formData.location,
      organizer: formData.organizer,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category,
    };

    const validationErrors = validateEvent(eventData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      // Mapear erros para campos específicos
      const newFieldErrors = {};
      validationErrors.forEach((error) => {
        if (error.includes("nome")) newFieldErrors.name = error;
        if (error.includes("data")) newFieldErrors.eventDate = error;
        if (error.includes("início")) newFieldErrors.startTime = error;
        if (error.includes("término")) newFieldErrors.endTime = error;
        if (error.includes("local")) newFieldErrors.location = error;
        if (error.includes("organizador")) newFieldErrors.organizer = error;
        if (error.includes("capacidade")) newFieldErrors.capacity = error;
        if (error.includes("preço")) newFieldErrors.price = error;
      });
      setFieldErrors(newFieldErrors);

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventData = formatEventForAPI({
      name: formData.name,
      eventDate: formData.eventDate?.format("YYYY-MM-DD"),
      startTime: formData.startTime?.format("HH:mm"),
      endTime: formData.endTime?.format("HH:mm"),
      location: formData.location,
      organizer: formData.organizer,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category || null,
    });

    try {
      await onSubmit(eventData);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setErrors([error.message || MESSAGES.ERROR.GENERIC]);
    }
  };

  const handleClose = () => {
    if (onClose && !loading) {
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {isPage ? (
        <Box
          sx={{
            maxWidth: 700,
            mx: "auto",
            my: 0,
            p: { xs: 2, sm: 4 },
            background: "rgba(255,255,255,0.95)",
            borderRadius: 3,
            boxShadow: 3,
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Calendar size={28} color="#1E88E5" />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1E88E5" }}>
              {isEdit ? "Editar Evento" : "Criar Novo Evento"}
            </Typography>
          </Box>
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
            {/*  o Evento*/}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Evento"
                value={formData.name}
                onChange={handleInputChange("name")}
                onBlur={handleBlur("name")}
                error={!!fieldErrors.name}
                helperText={fieldErrors.name || "Digite o nome do evento"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FileText
                        size={20}
                        color={theme.palette.text.secondary}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Data e Horários*/}
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Data do Evento"
                value={formData.eventDate}
                onChange={handleDateChange("eventDate")}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!fieldErrors.eventDate,
                    helperText: fieldErrors.eventDate || "Selecione a data",
                    onBlur: handleBlur("eventDate"),
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Calendar
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TimePicker
                label="Horário de Início"
                value={formData.startTime}
                onChange={handleDateChange("startTime")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!fieldErrors.startTime,
                    helperText: fieldErrors.startTime || "Hora de início",
                    onBlur: handleBlur("startTime"),
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Clock
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TimePicker
                label="Horário de Término"
                value={formData.endTime}
                onChange={handleDateChange("endTime")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!fieldErrors.endTime,
                    helperText: fieldErrors.endTime || "Hora de término",
                    onBlur: handleBlur("endTime"),
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Clock
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />
            </Grid>

            {/* Local e Organizador */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Local do Evento"
                value={formData.location}
                onChange={handleInputChange("location")}
                onBlur={handleBlur("location")}
                error={!!fieldErrors.location}
                helperText={fieldErrors.location || "Digite o local do evento"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapPin size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organizador"
                value={formData.organizer}
                onChange={handleInputChange("organizer")}
                onBlur={handleBlur("organizer")}
                error={!!fieldErrors.organizer}
                helperText={fieldErrors.organizer || "Nome do organizador"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Categoria, Capacidade e Preço */}
            <Grid item xs={12} sm={4}>
              <FormControl 
                fullWidth 
                required 
                error={!!fieldErrors.category}
                sx={{ minWidth: "170px" }}
              >
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange("category")}
                  onBlur={handleBlur("category")}
                  label="Categoria"
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {EVENT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {fieldErrors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {fieldErrors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Capacidade"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange("capacity")}
                onBlur={handleBlur("capacity")}
                error={!!fieldErrors.capacity}
                helperText={fieldErrors.capacity || "Número de participantes"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Users size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Preço (opcional)"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange("price")}
                error={!!fieldErrors.price}
                helperText={
                  fieldErrors.price || "Deixe em branco para evento gratuito"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DollarSign
                        size={20}
                        color={theme.palette.text.secondary}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            {/* Descrição */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição (opcional)"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange("description")}
                helperText="Descreva os detalhes do evento (máximo 500 caracteres)"
                inputProps={{ maxLength: 500 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ float: "right", mt: 0.5 }}
              >
                {formData.description.length}/500
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              startIcon={
                loading ? (
                  <Loader className="spin" size={18} />
                ) : (
                  <Save size={18} />
                )
              }
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1E88E5 0%, #1976D2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
                },
              }}
            >
              {loading
                ? "Salvando..."
                : isEdit
                ? "Atualizar Evento"
                : "Criar Evento"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e2e8f0",
              pb: 2,
              position: "sticky",
              top: 0,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              {isEdit ? "Editar Evento" : "Criar Novo Evento"}
            </Typography>
            <IconButton
              onClick={handleClose}
              disabled={loading}
                sx={{ color: "text.secondary", marginLeft: "auto" }}
            >
              <X size={24} />
            </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            <Box sx={{ height: 24 }} />
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Nome do Evento - Linha completa */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome do Evento"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    onBlur={handleBlur("name")}
                    error={!!fieldErrors.name}
                    helperText={fieldErrors.name || "Digite o nome do evento"}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FileText
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Data e Horários - Na mesma linha */}
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    label="Data do Evento"
                    value={formData.eventDate}
                    onChange={handleDateChange("eventDate")}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!fieldErrors.eventDate,
                        helperText: fieldErrors.eventDate || "Selecione a data",
                        onBlur: handleBlur("eventDate"),
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Calendar
                                size={20}
                                color={theme.palette.text.secondary}
                              />
                            </InputAdornment>
                          ),
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TimePicker
                    label="Horário de Início"
                    value={formData.startTime}
                    onChange={handleDateChange("startTime")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!fieldErrors.startTime,
                        helperText: fieldErrors.startTime || "Hora de início",
                        onBlur: handleBlur("startTime"),
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Clock
                                size={20}
                                color={theme.palette.text.secondary}
                              />
                            </InputAdornment>
                          ),
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TimePicker
                    label="Horário de Término"
                    value={formData.endTime}
                    onChange={handleDateChange("endTime")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!fieldErrors.endTime,
                        helperText: fieldErrors.endTime || "Hora de término",
                        onBlur: handleBlur("endTime"),
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Clock
                                size={20}
                                color={theme.palette.text.secondary}
                              />
                            </InputAdornment>
                          ),
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Local e Organizador */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Local do Evento"
                    value={formData.location}
                    onChange={handleInputChange("location")}
                    onBlur={handleBlur("location")}
                    error={!!fieldErrors.location}
                    helperText={fieldErrors.location || "Digite o local do evento"}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapPin
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Organizador"
                    value={formData.organizer}
                    onChange={handleInputChange("organizer")}
                    onBlur={handleBlur("organizer")}
                    error={!!fieldErrors.organizer}
                    helperText={fieldErrors.organizer || "Nome do organizador"}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {/* Categoria, Capacidade e Preço */}
                <Grid item xs={12} sm={4}>
                  <FormControl 
                    fullWidth 
                    required 
                    error={!!fieldErrors.category}
                    sx={{ minWidth: "170px" }}
                  >
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={handleInputChange("category")}
                      onBlur={handleBlur("category")}
                      label="Categoria"
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      {EVENT_CATEGORIES.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <span>{category.icon}</span>
                            <span>{category.label}</span>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldErrors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                        {fieldErrors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Capacidade"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange("capacity")}
                    onBlur={handleBlur("capacity")}
                    error={!!fieldErrors.capacity}
                    helperText={fieldErrors.capacity || "Número de participantes"}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Users
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Preço (opcional)"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange("price")}
                    error={!!fieldErrors.price}
                    helperText={
                      fieldErrors.price ||
                      "Deixe em branco para evento gratuito"
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DollarSign
                            size={20}
                            color={theme.palette.text.secondary}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição (opcional)"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange("description")}
                    helperText="Descreva os detalhes do evento (máximo 500 caracteres)"
                    inputProps={{ maxLength: 500 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ float: "right", mt: 0.5 }}
                  >
                    {formData.description.length}/500
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              startIcon={
                loading ? (
                  <Loader className="spin" size={18} />
                ) : (
                  <Save size={18} />
                )
              }
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1E88E5 0%, #1976D2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
                },
              }}
            >
              {loading
                ? "Salvando..."
                : isEdit
                ? "Atualizar Evento"
                : "Criar Evento"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </LocalizationProvider>
  );
};

export default EventForm;
