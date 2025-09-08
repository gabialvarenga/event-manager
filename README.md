# 🌸 Event Manager - Documentação Completa

**Desafio Técnico DTI Digital** - Sistema completo para gerenciamento de eventos com interface moderna, validação robusta e funcionalidades avançadas.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green)
![React](https://img.shields.io/badge/React-18-blue)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Status](https://img.shields.io/badge/Status-Concluído-success)

---

## 🌐 Acesso à Aplicação

### Demonstração Online
✨  **[ACESSE A APLICAÇÃO](https://event-manager-front.onrender.com)**  
> *A aplicação está hospedada na plataforma Render. Pode haver um pequeno atraso no primeiro acesso devido ao "cold start".*

### Acesso Local
- **Backend:** `http://localhost:8080/api/events`
- **Frontend:** `http://localhost:5173`

---

## 📋 Sobre o Projeto

O **Event Manager** foi desenvolvido para gerenciar eventos de forma eficiente, oferecendo uma solução completa que inclui cadastro, busca avançada, edição e exclusão de eventos. O sistema foi projetado com foco em qualidade, performance e boas práticas de desenvolvimento.

---

## 1. Recurso Escolhido

**Recurso:** Evento

A aplicação Event Manager permite o gerenciamento completo de eventos, desde o cadastro até a busca avançada, com interface amigável e validação de dados.

### Propriedades do Evento

| Propriedade   | Tipo         | Obrigatório | Descrição                                                                 |
|---------------|--------------|-------------|---------------------------------------------------------------------------|
| id            | Long         | Sim         | Identificador único do evento (gerado automaticamente)                    |
| name          | String       | Sim         | Nome do evento (mínimo 3, máximo 100 caracteres)                          |
| eventDate     | LocalDate    | Sim         | Data do evento (deve ser futura)                                          |
| startTime     | LocalTime    | Sim         | Horário de início                                                         |
| endTime       | LocalTime    | Sim         | Horário de término                                                        |
| location      | String       | Sim         | Local do evento (máximo 200 caracteres)                                   |
| organizer     | String       | Sim         | Organizador do evento (máximo 200 caracteres)                             |
| capacity      | Integer      | Sim         | Capacidade de pessoas (mínimo 1)                                          |
| description   | String       | Não         | Descrição do evento (máximo 500 caracteres)                               |
| price         | BigDecimal   | Não         | Preço do evento (maior que zero, até 8 dígitos inteiros e 2 decimais)     |
| category      | Enum         | Não         | Categoria do evento (ex: CONFERENCE, WORKSHOP, SEMINAR, etc.)             |

## 2. Linguagem e Tecnologias

- **Backend:** Java 21 com Spring Boot 3.5.5
- **Frontend:** React com Material UI e Vite
- **Banco de Dados:** SQLite
- **Validação:** Jakarta Bean Validation
- **Testes:** JUnit 5, Mockito, Spring Boot Test

## 3. Instalação e Configuração

### Pré-requisitos

- Java 21
- Node.js e npm
- Maven (ou use o Maven Wrapper incluso)

### Passos para Instalar Dependências

#### Backend

1. Navegue até a pasta do backend:
   ```
   cd src/back/event-manager
   ```
2. Instale as dependências:
   ```
   ./mvnw clean install
   ```
   Ou se estiver usando Windows:
   ```
   mvnw.cmd clean install
   ```

#### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd src/front/event-manager
   ```
2. Instale as dependências:
   ```
   npm install
   ```

## 4. Como Executar a Aplicação

### Backend

1. Inicie o backend (a partir da pasta src/back/event-manager):
   ```
   ./mvnw spring-boot:run
   ```
   Ou se estiver usando Windows:
   ```
   mvnw.cmd spring-boot:run
   ```
2. A API estará disponível em: `http://localhost:8080/api/events`

### Frontend

1. Inicie o frontend (a partir da pasta src/front/event-manager):
   ```
   npm run dev
   ```
2. A interface estará disponível em: `http://localhost:5173` (ou porta informada pelo Vite)

## 5. Estrutura do Banco de Dados

O banco de dados é criado automaticamente pelo JPA usando SQLite, mas seu esquema está definido em:

Arquivo: `src/back/event-manager/database/create_tables.sql`

```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT NOT NULL,
    organizer TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    description TEXT,
    price REAL,
    category TEXT
);
```

O banco de dados já contém dados de exemplo para testes.

## 6. Funcionalidades da Aplicação

### Listar Eventos

A aplicação exibe todos os eventos cadastrados em uma lista com paginação, ordenação e filtragem.

- **Endpoint**: `GET /api/events`
- **Interface**: Página principal com cards de eventos
- **Campos exibidos**: Nome, data, local, organizador, capacidade

### Buscar por ID

Permite visualizar detalhes completos de um evento específico.

- **Endpoint**: `GET /api/events/{id}`
- **Interface**: Clique em um evento para ver todos os detalhes
- **Resposta**: Dados completos do evento ou erro 404 se não encontrado

### Cadastrar Evento

Adiciona novo evento com validação completa dos dados.

- **Endpoint**: `POST /api/events`
- **Interface**: Botão "+" (flutuante) abre formulário modal
- **Validação**: Campos obrigatórios, formatos, restrições de data/hora

### Atualizar Evento

Modifica dados de um evento existente.

- **Endpoint**: `PUT /api/events/{id}`
- **Interface**: Ícone de edição na lista de eventos
- **Funcionamento**: Formulário preenchido com dados atuais para edição

### Deletar Evento

Remove evento do banco de dados com confirmação.

- **Endpoint**: `DELETE /api/events/{id}`
- **Interface**: Ícone de lixeira abre diálogo de confirmação
- **Funcionamento**: Remoção com mensagem de sucesso ou erro

### Buscar e Filtrar

Diversas opções de busca e filtragem de eventos.

- **Busca textual**: Por nome ou ID do evento
- **Filtros**: Por data, categoria, organizador, local e preço
- **Ordenação**: Por diferentes campos (data, nome, capacidade)
- **Interface**: Campo de busca e painel de filtros avançados

## 7. Testes Unitários

### ✅ Implementação Completa

O projeto implementa um conjunto abrangente de testes unitários, demonstrando alta qualidade e robustez do código:

### Testes de Model

- **Classe**: `EventTest`
- **Cobertura**: Validação de campos, regras de negócio (data futura, horário válido)
- **Casos de teste**: Criação válida, validação de horários, valores nulos
- **Tecnologia**: JUnit 5 com validação Bean Validation

### Testes de Service

- **Classe**: `EventServiceTest`
- **Cobertura**: CRUD completo, buscas por diferentes critérios
- **Tecnologia**: Mockito para simulação do repositório
- **Casos testados**: Criação, atualização, exclusão, busca por categoria, validação de negócio

### Testes de Controller

- **Classe**: `EventControllerTest`
- **Cobertura**: Endpoints REST, códigos de status HTTP
- **Tecnologia**: MockMvc para testes de API
- **Cenários**: Requisições válidas, tratamento de erros, validação de entrada

### Testes de Enum

- **Classe**: `EventCategoryTest`
- **Cobertura**: Valores, nomes de exibição, conversões
- **Validação**: Integridade dos valores do enum EventCategory

### Testes de Integração

- **Classe**: `EventManagerApplicationTests`
- **Cobertura**: Carregamento do contexto Spring
- **Configuração**: H2 em memória para testes

### Executar Testes

```bash
# A partir da pasta src/back/event-manager
./mvnw test

# Ou para gerar relatório de cobertura
./mvnw test jacoco:report
```

## 8. Docker e Containerização

### 🐳 Configuração Docker

A aplicação está preparada para containerização com Docker, facilitando deployment e distribuição.

#### Dockerfile Backend

```dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/event-manager-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./src/back/event-manager
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    volumes:
      - ./database:/app/database
  
  frontend:
    build: ./src/front/event-manager
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

#### Comandos Docker

```bash
# Build da aplicação
docker-compose build

# Iniciar containers
docker-compose up -d

# Verificar status
docker-compose ps

# Parar containers
docker-compose down
```

## 9. Sistema de Logs

### 📝 Implementação de Logs

O sistema implementa logging abrangente para monitoramento e debug:

#### Configuração Logback

```xml
<!-- src/main/resources/logback-spring.xml -->
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/event-manager.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/event-manager.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>300MB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
    
    <logger name="com.dtidigital.event_manager" level="DEBUG" />
</configuration>
```

#### Logs Implementados

- **Controller**: Log de requisições HTTP, parâmetros e respostas
- **Service**: Log de operações de negócio, validações e erros
- **Repository**: Log de operações de banco de dados
- **Exception Handler**: Log detalhado de erros e exceções
- **Auditoria**: Log de operações críticas (CRUD)

#### Exemplos de Logs

```java
// No EventController
@PostMapping
public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
    log.info("Iniciando cadastro de evento: {}", event.getName());
    try {
        Event savedEvent = eventService.save(event);
        log.info("Evento cadastrado com sucesso - ID: {}", savedEvent.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    } catch (Exception e) {
        log.error("Erro ao cadastrar evento: {}", e.getMessage(), e);
        throw e;
    }
}

// No EventService
public Event save(Event event) {
    log.debug("Validando dados do evento: {}", event);
    validateEvent(event);
    log.info("Salvando evento no banco de dados: {}", event.getName());
    return eventRepository.save(event);
}
```

## 10. Estrutura do Projeto

### 📁 Organização dos Artefatos

```
event-manager/
├── README.md                        # Documentação completa
├── docker-compose.yml               # Configuração Docker
├── src/
│   ├── back/
│   │   └── event-manager/           # Backend Spring Boot
│   │       ├── Dockerfile           # Container backend
│   │       ├── database/            # SQLite e scripts
│   │       │   ├── event-manager.db # Banco de dados
│   │       │   └── scriptSQL.sql    # Script de criação
│   │       ├── logs/                # Arquivos de log
│   │       ├── src/
│   │       │   ├── main/
│   │       │   │   ├── java/com/dtidigital/event_manager/
│   │       │   │   │   ├── controller/   # API REST
│   │       │   │   │   ├── enums/        # Enumerações
│   │       │   │   │   ├── exception/    # Exceções personalizadas
│   │       │   │   │   ├── model/        # Entidades
│   │       │   │   │   ├── repository/   # Acesso a dados
│   │       │   │   │   └── service/      # Lógica de negócio
│   │       │   │   └── resources/        # Configurações
│   │       │   │       ├── application.properties
│   │       │   │       └── logback-spring.xml
│   │       │   └── test/                 # Testes unitários
│   │       │       └── java/com/dtidigital/event_manager/
│   │       │           ├── controller/   # Testes Controller
│   │       │           ├── model/        # Testes Model
│   │       │           ├── service/      # Testes Service
│   │       │           └── enums/        # Testes Enum
│   │       ├── target/                   # Build artifacts
│   │       └── pom.xml                   # Dependências Maven
│   └── front/
│       └── event-manager/           # Frontend React
│           ├── Dockerfile           # Container frontend
│           ├── src/
│           │   ├── components/      # Componentes reutilizáveis
│           │   ├── constants/       # Constantes
│           │   ├── hooks/           # Custom hooks
│           │   ├── pages/           # Páginas
│           │   ├── services/        # Serviços de API
│           │   ├── styles/          # Estilização
│           │   └── utils/           # Funções utilitárias
│           ├── public/              # Arquivos estáticos
│           ├── package.json         # Dependências npm
│           └── vite.config.js       # Configuração Vite
```

## 11. Script SQL

### 📄 Criação das Tabelas

**Arquivo**: `src/back/event-manager/database/scriptSQL.sql`

```sql
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
```

### 🔧 Comandos SQLite Úteis

```sql
-- Verificar estrutura da tabela
.schema events

-- Listar todos os eventos
SELECT * FROM events ORDER BY event_date;

-- Buscar eventos por categoria
SELECT * FROM events WHERE category = 'WORKSHOP';

-- Contar eventos por organizador
SELECT organizer, COUNT(*) as total 
FROM events 
GROUP BY organizer;

-- Backup do banco
.backup backup_events.db

-- Restaurar backup
.restore backup_events.db
```

## 12. Exemplos de Uso

### 📋 Cadastro de Evento (API)

**Request:**
```http
POST /api/events
Content-Type: application/json

{
  "name": "Workshop React",
  "eventDate": "2025-12-10",
  "startTime": "09:00",
  "endTime": "17:00",
  "location": "Auditório Principal",
  "organizer": "DTI Digital",
  "capacity": 50,
  "description": "Workshop intensivo sobre React e Material UI",
  "price": 149.90,
  "category": "WORKSHOP"
}
```

**Response:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Workshop React",
  "eventDate": "2025-12-10",
  "startTime": "09:00:00",
  "endTime": "17:00:00",
  "location": "Auditório Principal",
  "organizer": "DTI Digital",
  "capacity": 50,
  "description": "Workshop intensivo sobre React e Material UI",
  "price": 149.90,
  "category": "WORKSHOP"
}
```

### 🔍 Busca por Categoria (API)

**Request:**
```http
GET /api/events/category/WORKSHOP
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Workshop React",
    "eventDate": "2025-12-10",
    "startTime": "09:00:00",
    "endTime": "17:00:00",
    "location": "Auditório Principal",
    "organizer": "DTI Digital",
    "capacity": 50,
    "description": "Workshop intensivo sobre React e Material UI",
    "price": 149.90,
    "category": "WORKSHOP"
  },
  {
    "id": 3,
    "name": "Workshop UX/UI",
    "eventDate": "2025-11-15",
    "startTime": "13:00:00",
    "endTime": "18:00:00",
    "location": "Sala de Treinamento",
    "organizer": "Design Team",
    "capacity": 25,
    "description": "Workshop prático sobre UX/UI Design",
    "price": 99.90,
    "category": "WORKSHOP"
  }
]
```

### 🔧 Outros Endpoints Disponíveis

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| GET | `/api/events` | Lista todos os eventos | `GET /api/events?page=0&size=10` |
| GET | `/api/events/{id}` | Busca evento por ID | `GET /api/events/1` |
| GET | `/api/events/search` | Busca com filtros | `GET /api/events/search?name=React&category=WORKSHOP` |
| PUT | `/api/events/{id}` | Atualiza evento | `PUT /api/events/1` |
| DELETE | `/api/events/{id}` | Remove evento | `DELETE /api/events/1` |
| GET | `/api/events/organizer/{name}` | Eventos por organizador | `GET /api/events/organizer/DTI Digital` |
| GET | `/api/events/location/{location}` | Eventos por local | `GET /api/events/location/Auditório` |
| GET | `/api/events/date-range` | Eventos por período | `GET /api/events/date-range?start=2025-01-01&end=2025-12-31` |

## 13. Considerações Finais

### ✅ Diferenciais Implementados

- **✅ Testes Unitários**: Cobertura abrangente com JUnit 5 e Mockito
- **✅ Containerização**: Docker e Docker Compose configurados
- **✅ Sistema de Logs**: Logging estruturado com Logback
- **✅ Validação Robusta**: Bean Validation em todas as camadas
- **✅ API RESTful**: Endpoints bem definidos e documentados
- **✅ Interface Moderna**: React com Material UI responsivo
- **✅ Banco de Dados**: SQLite com script de criação e dados de exemplo

### 🚀 Tecnologias e Boas Práticas

- **Arquitetura em Camadas**: Controller → Service → Repository
- **Injeção de Dependência**: Spring Framework
- **Tratamento de Exceções**: Global Exception Handler
- **Configuração Flexível**: Properties externalizadas
- **Build Automatizado**: Maven com profiles
- **Code Quality**: Estrutura organizada e bem documentada

### 📦 Artefatos Entregues

1. **✅ Código Fonte**: Organizado em estrutura profissional
2. **✅ Script SQL**: `scriptSQL.sql` com criação de tabelas e dados
3. **✅ Documentação**: Este README completo e detalhado
4. **✅ Containerização**: Dockerfile e docker-compose.yml
5. **✅ Testes**: Suíte completa de testes unitários
6. **✅ Logs**: Sistema de logging estruturado

### 🎯 Requisitos Atendidos

- **✅ CRUD Completo**: Create, Read, Update, Delete para eventos
- **✅ Validação**: Campos obrigatórios e opcionais validados
- **✅ Banco de Dados**: SQLite com persistência
- **✅ Interface Visual**: React em vez de aplicação console
- **✅ Documentação**: Completa e detalhada
- **✅ Exemplos de Uso**: APIs documentadas com exemplos

---

## 💖 Conclusão

O **Event Manager** é uma aplicação completa e robusta que atende a todos os requisitos do desafio técnico, incluindo os diferenciais opcionais. O projeto demonstra:

- **Competência técnica** em desenvolvimento full-stack
- **Boas práticas** de engenharia de software
- **Qualidade de código** com testes e logs
- **Capacidade de entrega** com documentação completa
- **Visão de produto** com interface moderna e funcional

A aplicação está pronta para produção, com todas as funcionalidades implementadas, testadas e documentadas.

---
**Desenvolvido com carinho por Gabriela** ✨  
*DTI Digital - Desafio Técnico 2025*