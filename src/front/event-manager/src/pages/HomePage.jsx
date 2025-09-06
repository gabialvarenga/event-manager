import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  alpha,
  useTheme,
  Fade,
  Skeleton
} from '@mui/material';
import {
  Calendar,
  Plus,
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard/EventCard';
import { 
  formatDate,
  daysUntilEvent,
  getEventStatus 
} from '../utils/formatters';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { events, loading, error, getUpcomingEvents } = useEvents();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    today: 0,
    thisWeek: 0
  });

  useEffect(() => {
    if (events.length > 0) {
      // Calcular estatísticas
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const todayEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate.toDateString() === today.toDateString();
      });

      const upcomingEventsData = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate > today;
      });

      const thisWeekEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today && eventDate <= nextWeek;
      });

      setStats({
        total: events.length,
        upcoming: upcomingEventsData.length,
        today: todayEvents.length,
        thisWeek: thisWeekEvents.length
      });

      // Próximos eventos (máximo 6)
      setUpcomingEvents(upcomingEventsData.slice(0, 6));
    }
  }, [events]);

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <Card sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: 3,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 25px ${color}40`
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{
            p: 1.5,
            borderRadius: 2,
            background: `${color}20`,
            color: color,
            mr: 2
          }}>
            <Icon size={24} />
          </Box>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
            <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
        </Box>
        {description && (
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <Card sx={{
      height: '100%',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 3,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      }
    }}
    onClick={onClick}
    >
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{
          p: 2,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
          color: 'white',
          display: 'inline-flex',
          mb: 2
        }}>
          <Icon size={32} />
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
    {/* Hero Section */}
    <Paper sx={{
        background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
        color: 'white',
        borderRadius: 3,
        p: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
    }}>
        <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ mb: 3, opacity: 0.9 }}>
            Gerencie seus eventos de forma inteligente e eficiente
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Plus size={20} />}
            onClick={() => navigate('/create')}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Criar Novo Evento
          </Button>
        </Box>
      </Paper>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Fade in timeout={300}>
            <Box>
              <StatCard
                title="Total de Eventos"
                value={loading ? '...' : stats.total}
                icon={Calendar}
                color="#1E88E5"
                description="Eventos cadastrados no sistema"
              />
            </Box>
          </Fade>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Fade in timeout={600}>
            <Box>
              <StatCard
                title="Próximos Eventos"
                value={loading ? '...' : stats.upcoming}
                icon={TrendingUp}
                color="#4CAF50"
                description="Eventos futuros agendados"
              />
            </Box>
          </Fade>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Fade in timeout={900}>
            <Box>
              <StatCard
                title="Eventos Hoje"
                value={loading ? '...' : stats.today}
                icon={Clock}
                color="#FF6B35"
                description="Acontecendo hoje"
              />
            </Box>
          </Fade>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Fade in timeout={1200}>
            <Box>
              <StatCard
                title="Esta Semana"
                value={loading ? '...' : stats.thisWeek}
                icon={Star}
                color="#FF9800"
                description="Próximos 7 dias"
              />
            </Box>
          </Fade>
        </Grid>
      </Grid>

      {/* Ações Rápidas */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Ações Rápidas
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Criar Evento"
              description="Adicione um novo evento ao sistema"
              icon={Plus}
              color="#1E88E5"
              onClick={() => navigate('/create')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Ver Todos"
              description="Visualize todos os eventos cadastrados"
              icon={Calendar}
              color="#4CAF50"
              onClick={() => navigate('/events')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Buscar"
              description="Encontre eventos específicos"
              icon={Users}
              color="#FF6B35"
              onClick={() => navigate('/search')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Relatórios"
              description="Visualize estatísticas detalhadas"
              icon={TrendingUp}
              color="#FF9800"
              onClick={() => navigate('/events')}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Próximos Eventos */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Próximos Eventos
          </Typography>
          
          {upcomingEvents.length > 0 && (
            <Button
              endIcon={<ArrowRight size={16} />}
              onClick={() => navigate('/events')}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600 
              }}
            >
              Ver todos
            </Button>
          )}
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {[...Array(3)].map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={320}
                  sx={{ borderRadius: 2 }}
                  animation="wave"
                />
              </Grid>
            ))}
          </Grid>
        ) : upcomingEvents.length === 0 ? (
          <Paper sx={{
            p: 6,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3
          }}>
            <Calendar size={48} color={theme.palette.text.secondary} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
              Nenhum evento próximo
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Que tal criar seu primeiro evento?
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => navigate('/create')}
              sx={{
                background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Criar Evento
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <Fade in timeout={300 + (index * 150)}>
                  <Box>
                    <EventCard
                      event={event}
                      onView={() => navigate(`/events/${event.id}`)}
                      showActions={false}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
