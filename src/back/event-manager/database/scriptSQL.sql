-- Criação da tabela de eventos
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL CHECK(length(name) >= 3 AND length(name) <= 100),
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT NOT NULL CHECK(length(location) <= 200),
    organizer TEXT NOT NULL CHECK(length(organizer) <= 200),
    capacity INTEGER NOT NULL CHECK(capacity >= 1),
    description TEXT CHECK(length(description) <= 500),
    price REAL CHECK(price > 0),
    category TEXT CHECK(category IN ('CONFERENCE', 'WORKSHOP', 'SEMINAR', 'MEETUP', 'TRAINING', 'EXHIBITION', 'NETWORKING', 'OTHER')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criação de índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer);
CREATE INDEX IF NOT EXISTS idx_events_location ON events(location);

-- Inserção de dados de exemplo para testes
INSERT INTO events (name, event_date, start_time, end_time, location, organizer, capacity, description, price, category) VALUES 
('Workshop React Avançado', '2025-12-15', '09:00:00', '17:00:00', 'Auditório DTI', 'DTI Digital', 50, 'Workshop intensivo sobre React com foco em performance e boas práticas', 299.90, 'WORKSHOP'),
('Conferência Tech 2025', '2025-11-20', '08:00:00', '18:00:00', 'Centro de Convenções', 'Tech Events', 200, 'Conferência anual sobre tecnologia e inovação', 450.00, 'CONFERENCE'),
('Meetup JavaScript', '2025-10-10', '19:00:00', '22:00:00', 'Hub de Inovação', 'JS Community', 80, 'Encontro mensal da comunidade JavaScript', 0.00, 'MEETUP'),
('Seminário Arquitetura de Software', '2025-12-05', '14:00:00', '18:00:00', 'Universidade XYZ', 'Prof. Silva', 120, 'Seminário sobre padrões de arquitetura em sistemas distribuídos', 150.00, 'SEMINAR');

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER IF NOT EXISTS update_events_timestamp 
    AFTER UPDATE ON events
BEGIN
    UPDATE events SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;