import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  User,
} from 'lucide-react';
import {
  formatDate,
  formatTime,
  formatPrice,
  formatCapacity,
  getEventStatus,
  getStatusColor,
  getStatusText,
  getCategoryInfo,
  truncateText,
} from '../../utils/formatters';

const EventCard = ({
  event,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  compact = false,
}) => {
  const theme = useTheme();
  const status = getEventStatus(event.eventDate);
  const statusColor = getStatusColor(status);
  const statusText = getStatusText(status);
  const categoryInfo = getCategoryInfo(event.category);

  return (
    <Card 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        cursor: showActions ? 'default' : 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(30, 136, 229, 0.15)',
        },
      }}
      onClick={!showActions && onView ? onView : undefined}
    >
      {/* Header do Card */}
      <Box sx={{ 
        p: 2, 
        background: `linear-gradient(135deg, ${categoryInfo.color}15 0%, ${categoryInfo.color}05 100%)`,
        borderBottom: `2px solid ${categoryInfo.color}30`
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`ID: ${event.id}`}
              size="small"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                color: '#666',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
            <Chip
              label={categoryInfo.label}
              size="small"
              sx={{
                backgroundColor: `${categoryInfo.color}20`,
                color: categoryInfo.color,
                fontWeight: 600,
              }}
            />
          </Box>
          <Chip
            label={statusText}
            size="small"
            sx={{
              backgroundColor: `${statusColor}20`,
              color: statusColor,
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
            minHeight: compact ? "auto" : "3.5rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.name}
        </Typography>

        {/* Informações principais */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Data e Hora */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar size={16} color={theme.palette.primary.main} />
            <Typography variant="body2" color="textSecondary">
              {formatDate(event.eventDate)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Clock size={16} color={theme.palette.primary.main} />
            <Typography variant="body2" color="textSecondary">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </Typography>
          </Box>

          {/* Local */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MapPin size={16} color={theme.palette.primary.main} />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {event.location}
            </Typography>
          </Box>

          {/* Organizador */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <User size={16} color={theme.palette.primary.main} />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {event.organizer}
            </Typography>
          </Box>

          {/* Capacidade e Preço */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" color="textSecondary">
                {formatCapacity(event.capacity)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DollarSign size={16} color={theme.palette.primary.main} />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                {formatPrice(event.price)}
              </Typography>
            </Box>
          </Box>

          {/* Descrição (se não for compacto) */}
          {!compact && event.description && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {truncateText(event.description, 120)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Ações */}
      {showActions && (
        <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
          {onView && (
            <IconButton
              size="small"
              onClick={onView}
              sx={{ color: theme.palette.primary.main }}
            >
            </IconButton>
          )}
          {onEdit && (
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ color: theme.palette.warning.main }}
            >
              <Edit size={18} />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{ color: theme.palette.error.main }}
            >
              <Trash2 size={18} />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default EventCard;
