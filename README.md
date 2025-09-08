# Event Manager 

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
> *A aplicação está hospedada na plataforma Render.*

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

## 2. 🛠 Tecnologias Utilizadas

### Backend
- **Java 21** (LTS) - Linguagem principal
- **Spring Boot 3.5.5** - Framework web
- **SQLite + Hibernate** - Banco de dados e ORM
- **Maven** - Gerenciamento de dependências
- **JUnit 5 + Mockito** - Testes unitários

### Frontend  
- **React 19** - Biblioteca de interface
- **Material-UI (MUI)** - Componentes de UI
- **Vite** - Build tool e dev server

### DevOps
- **Docker & Docker Compose** - Containerização

## 3. Instalação Rápida

### Pré-requisitos

- **Java 21+** ([Download](https://openjdk.org/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Docker** (opcional - [Download](https://docker.com/))

### Opção 1: Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/gabialvarenga/event-manager.git
cd event-manager

# 2. Backend (Terminal 1)
cd src/back/event-manager
./mvnw spring-boot:run

# 3. Frontend (Terminal 2)  
cd src/front/event-manager
npm install
npm run dev
```

### Opção 2: Docker

```bash
# Na raiz do projeto
docker-compose up -d
```

**Pronto! Acesse:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/api/events

## 📚 Documentação Completa

Para informações detalhadas sobre implementação, acesse:

- **[📋 SETUP.md](./docs/SETUP.md)** - Guia completo de instalação e configuração

---

## 4. Estrutura do Banco de Dados

O banco de dados é criado automaticamente pelo JPA usando SQLite, mas seu esquema está definido em:

Arquivo: `src/back/event-manager/database/scriptSQL.sql`

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

1. **Testes de Model (`EventTest`)**
   - Validação de campos obrigatórios
   - Regras de negócio (data futura, horário válido)
   - Construtores e métodos auxiliares

2. **Testes de Service (`EventServiceTest`)**
   - Operações CRUD completas
   - Buscas por diferentes critérios
   - Validações de negócio

3. **Testes de Controller (`EventControllerTest`)**
   - Endpoints REST completos
   - Códigos de status HTTP corretos
   - Serialização/deserialização JSON

4. **Testes de Enum (`EventCategoryTest`)**
   - Valores do enum
   - Métodos de conversão
   - Nomes de exibição

5. **Testes de Integração (`EventManagerApplicationTests`)**
   - Carregamento do contexto Spring
   - Configuração da aplicação

### Executar Testes

```bash
# A partir da pasta src/back/event-manager
./mvnw test
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
      - ./src/back/event-manager/data:/app/data
  
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

## 10. Estrutura do Projeto

### 📁 Organização dos Artefatos

#### Backend

```
src/back/event-manager/
├── Dockerfile                 # Container backend
├── data/                      # Banco de dados SQLite
├── database/                  # Scripts SQL
│   ├── event-manager.db       # Banco de dados
│   └── scriptSQL.sql          # Script de criação
├── logs/                      # Arquivos de log
├── src/
│   ├── main/
│   │   ├── java/com/dtidigital/event_manager/
│   │   │   ├── controller/   # API REST
│   │   │   ├── enums/        # Enumerações
│   │   │   ├── exception/    # Exceções personalizadas
│   │   │   ├── model/        # Entidades
│   │   │   ├── repository/   # Acesso a dados
│   │   │   └── service/      # Lógica de negócio
│   │   └── resources/        # Configurações
│   │       ├── application.properties
│   │       └── logback-spring.xml
│   └── test/                 # Testes unitários
│       └── java/com/dtidigital/event_manager/
│           ├── controller/   # Testes Controller
│           ├── model/        # Testes Model
│           ├── service/      # Testes Service
│           └── enums/        # Testes Enum
├── target/                   # Build artifacts
└── pom.xml                   # Dependências Maven
```

#### Frontend

```
src/front/event-manager/
├── Dockerfile           # Container frontend
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── constants/       # Constantes
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Páginas
│   ├── services/        # Serviços de API
│   ├── styles/          # Estilização
│   └── utils/           # Funções utilitárias
├── public/              # Arquivos estáticos
├── package.json         # Dependências npm
└── vite.config.js       # Configuração Vite
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

### Diferenciais Implementados

- **Testes Unitários**: Cobertura abrangente com JUnit 5 e Mockito
- **Containerização**: Docker e Docker Compose configurados
- **Sistema de Logs**: Logging estruturado com Logback
- **Validação Robusta**: Bean Validation em todas as camadas
- **API RESTful**: Endpoints bem definidos e documentados
- **Interface Moderna**: React com Material UI responsivo
- **Banco de Dados**: SQLite com script de criação e dados de exemplo

### Tecnologias e Boas Práticas

- **Arquitetura em Camadas**: Controller → Service → Repository
- **Injeção de Dependência**: Spring Framework
- **Tratamento de Exceções**: Global Exception Handler
- **Configuração Flexível**: Properties externalizadas
- **Build Automatizado**: Maven com profiles
- **Code Quality**: Estrutura organizada e bem documentada

### Artefatos Entregues

1. **Código Fonte**: Organizado em estrutura profissional
2. **Script SQL**: `scriptSQL.sql` com criação de tabelas e dados
3. **Documentação**: Este README completo e detalhado
4. **Containerização**: Dockerfile e docker-compose.yml
5. **Testes**: Suíte completa de testes unitários

---

## Conclusão

O **Event Manager** é uma aplicação desenvolvida como parte do processo seletivo da DTI Digital, demonstrando:

- **Competência técnica** em desenvolvimento full-stack
- **Boas práticas** de engenharia de software
- **Qualidade de código** com testes
- **Capacidade de entrega** com documentação completa
- **Visão de produto** com interface moderna e funcional
- **Deploy e DevOps** com containerização e hospedagem em nuvem

A aplicação está pronta para produção, com todas as funcionalidades implementadas, testadas e documentadas.

---
**Desenvolvido por Gabriela Alvarenga** ✨  
*DTI Digital - Desafio Técnico 2025*