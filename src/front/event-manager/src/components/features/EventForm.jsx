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
  OutlinedInput,
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
    let error = "";
    
    switch (field) {
      case "name":
        if (!formData.name?.trim()) {
          error = "Nome do evento é obrigatório";
        }
        break;
      case "eventDate":
        if (!formData.eventDate) {
          error = "Data do evento é obrigatória";
        }
        break;
      case "location":
        if (!formData.location?.trim()) {
          error = "Local do evento é obrigatório";
        }
        break;
      case "organizer":
        if (!formData.organizer?.trim()) {
          error = "Organizador é obrigatório";
        }
        break;
      case "capacity":
        if (!formData.capacity || formData.capacity <= 0) {
          error = "Capacidade deve ser maior que zero";
        }
        break;
      case "category":
        if (!formData.category) {
          error = "Categoria é obrigatória";
        }
        break;
      case "startTime":
        if (!formData.startTime) {
          error = "Horário de início é obrigatório";
        }
        break;
      case "endTime":
        if (!formData.endTime) {
          error = "Horário de término é obrigatório";
        }
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return error;
  };

  const validateForm = () => {
    const newErrors = [];
    const newFieldErrors = {};

    // Validar campos obrigatórios
    if (!formData.name?.trim()) {
      newErrors.push("Nome do evento é obrigatório");
      newFieldErrors.name = "Nome do evento é obrigatório";
    }

    if (!formData.eventDate) {
      newErrors.push("Data do evento é obrigatória");
      newFieldErrors.eventDate = "Data do evento é obrigatória";
    }

    if (!formData.location?.trim()) {
      newErrors.push("Local do evento é obrigatório");
      newFieldErrors.location = "Local do evento é obrigatório";
    }

    if (!formData.organizer?.trim()) {
      newErrors.push("Organizador é obrigatório");
      newFieldErrors.organizer = "Organizador é obrigatório";
    }

    if (!formData.capacity || formData.capacity <= 0) {
      newErrors.push("Capacidade deve ser maior que zero");
      newFieldErrors.capacity = "Capacidade deve ser maior que zero";
    }

    if (!formData.category) {
      newErrors.push("Categoria é obrigatória");
      newFieldErrors.category = "Categoria é obrigatória";
    }

    if (!formData.startTime) {
      newErrors.push("Horário de início é obrigatório");
      newFieldErrors.startTime = "Horário de início é obrigatório";
    }

    if (!formData.endTime) {
      newErrors.push("Horário de término é obrigatório");
      newFieldErrors.endTime = "Horário de término é obrigatório";
    }

    // Validações adicionais
    if (formData.eventDate && dayjs(formData.eventDate).isBefore(dayjs(), 'day')) {
      newErrors.push("Data do evento não pode ser no passado");
      newFieldErrors.eventDate = "Data do evento não pode ser no passado";
    }

    if (formData.startTime && formData.endTime) {
      if (dayjs(formData.endTime).isBefore(formData.startTime)) {
        newErrors.push("Horário de término deve ser após o horário de início");
        newFieldErrors.endTime = "Horário de término deve ser após o horário de início";
      }
    }

    if (formData.price && parseFloat(formData.price) < 0) {
      newErrors.push("Preço não pode ser negativo");
      newFieldErrors.price = "Preço não pode ser negativo";
    }

    setErrors(newErrors);
    setFieldErrors(newFieldErrors);

    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
            maxWidth: 900,
            mx: "auto",
            my: 0,
            p: { xs: 2, sm: 6 },
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
              <FormControl fullWidth sx={{ minWidth: "170px" }}>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-label"
                  value={formData.category}
                  onChange={handleInputChange("category")}
                  label="Categoria"
                  input={
                    <OutlinedInput
                      startAdornment={
                        <InputAdornment position="start">
                          <Tag size={20} color="#718096" />
                        </InputAdornment>
                      }
                      label="Categoria"
                    />
                  }
                  sx={{
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  {EVENT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {fieldErrors.category}
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
        /*POP-UP */

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
              minWidth: 900,
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

          <DialogContent sx={{ p: 10 }}>
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
              <Grid>
                {/* Nome do Evento*/}
                <Grid item xs={12} container rowSpacing={30}>
                  <TextField
                    fullWidth
                    label="Nome do Evento"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    onBlur={handleBlur("name")}
                    error={!!fieldErrors.name}
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
                        mb: 3,
                      },
                    }}
                  />
                </Grid>

                {/* Data */}
                <Grid container rowSpacing={30}>
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
                        onBlur: handleBlur("eventDate"),
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          mb: 3,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TimePicker
                    label="Horário de Início"
                    value={formData.startTime}
                    onChange={handleDateChange("startTime")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!fieldErrors.startTime,
                        onBlur: handleBlur("startTime"),
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          mb: 3,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TimePicker
                    label="Horário de Término"
                    value={formData.endTime}
                    onChange={handleDateChange("endTime")}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!fieldErrors.endTime,
                        onBlur: handleBlur("endTime"),
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          mb: 3,
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Local e Organizador */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Local do Evento"
                    value={formData.location}
                    onChange={handleInputChange("location")}
                    onBlur={handleBlur("location")}
                    error={!!fieldErrors.location}
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
                      mb: 3,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Organizador"
                    value={formData.organizer}
                    onChange={handleInputChange("organizer")}
                    onBlur={handleBlur("organizer")}
                    error={!!fieldErrors.organizer}
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
                      mb: 3,
                    }}
                  />
                </Grid>

                {/* Categoria, Capacidade e Preço */}
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ minWidth: "170px" }}>
                    <InputLabel id="categoria-label">Categoria</InputLabel>

                    <Select
                      labelId="categoria-label"
                      value={formData.category}
                      onChange={handleInputChange("category")}
                      label="Categoria"
                      input={
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <Tag size={20} color="#718096" />
                            </InputAdornment>
                          }
                          label="Categoria"
                        />
                      }
                      sx={{
                        borderRadius: 2,
                        mb: 3,
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
                    {fieldErrors.category}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Capacidade"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange("capacity")}
                    onBlur={handleBlur("capacity")}
                    error={!!fieldErrors.capacity}
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
                      mb: 3,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Preço (opcional)"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange("price")}
                    error={!!fieldErrors.price}
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
                      mb: 3,
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
                    helperText="(máximo 500 caracteres)"
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
