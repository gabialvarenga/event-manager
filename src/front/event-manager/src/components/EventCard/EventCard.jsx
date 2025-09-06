import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Button,
  alpha,
  useTheme
} from '@mui/material';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  User
} from 'lucide-react';
import {
  formatDate,
  formatTime,
  formatPrice,
  formatCapacity,
  calculateDuration,
  getEventStatus,
  getStatusColor,
  getStatusText,
  getCategoryIcon,
  getCategoryColor,
  truncateText
} from '../../utils/formatters';

const EventCard = ({ 
  event, 
  onEdit, 
  onDelete, 
  onView, 
  showActions = true,
  compact = false 
}) => {
  const theme = useTheme();
  const status = getEventStatus(event.eventDate);
  const statusColor = getStatusColor(status);
  const statusText = getStatusText(status);
  const categoryColor = getCategoryColor(event.category);
  const categoryIcon = getCategoryIcon(event.category);
  const duration = calculateDuration(event.startTime, event.endTime);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(event);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(event);
  };

  const handleView = () => {
    onView?.(event);
  };

  return (
    <Card
      onClick={handleView}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          '& .event-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${categoryColor}, ${alpha(categoryColor, 0.7)})`,
        }
      }}
    >
      {/* Header com Status */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        <Chip
          label={statusText}
          size="small"
          sx={{
            backgroundColor: alpha(statusColor, 0.1),
            color: statusColor,
            fontWeight: 600,
            fontSize: '0.75rem',
            border: `1px solid ${alpha(statusColor, 0.3)}`,
          }}
        />
      </Box>

      {/* Categoria */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 2,
        }}
      >
        <Chip
          label={`${categoryIcon} ${event.category?.replace('_', ' ') || 'Evento'}`}
          size="small"
          sx={{
            backgroundColor: alpha(categoryColor, 0.1),
            color: categoryColor,
            fontWeight: 600,
            fontSize: '0.75rem',
            border: `1px solid ${alpha(categoryColor, 0.3)}`,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 6, pb: 1 }}>
        {/* Título */}
        <Typography 
          variant={compact ? "h6" : "h5"} 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            lineHeight: 1.2,
            mb: 2,
            minHeight: compact ? 'auto' : '3.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.name}
        </Typography>

        {/* Informações principais */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Data e Hora */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={16} color={theme.palette.primary.main} />
            <Typography variant="body2" color="textSecondary">
              {formatDate(event.eventDate)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={16} color={theme.palette.primary.main} />
            <Typography variant="body2" color="textSecondary">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
              {duration && (
                <Chip 
                  label={duration} 
                  size="small" 
                  variant="outlined"
                  sx={{ ml: 1, fontSize: '0.7rem', height: 20 }}
                />
              )}
            </Typography>
          </Box>

          {/* Local */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapPin size={16} color={theme.palette.primary.main} />
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.location}
            </Typography>
          </Box>

          {/* Organizador */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <User size={16} color={theme.palette.primary.main} />
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.organizer}
            </Typography>
          </Box>

          {/* Capacidade e Preço */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" color="textSecondary">
                {formatCapacity(event.capacity)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DollarSign size={16} color={theme.palette.success.main} />
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                {formatPrice(event.price)}
              </Typography>
            </Box>
          </Box>

          {/* Descrição */}
          {event.description && !compact && (
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{
                mt: 1,
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {truncateText(event.description, 120)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardActions 
          className="event-actions"
          sx={{ 
            justifyContent: 'space-between',
            px: 2,
            pb: 2,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Button
            size="small"
            startIcon={<Eye size={16} />}
            onClick={handleView}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Ver Detalhes
          </Button>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Editar evento">
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Edit size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Excluir evento">
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{
                  color: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default EventCard;
