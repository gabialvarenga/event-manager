# Event Manager - Documentação

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

Testes implementados para verificar o funcionamento das principais camadas.

### Testes de Model

- **Classe**: `EventTest`
- **Cobertura**: Validação de campos, regras de negócio (data futura, horário válido)
- **Casos de teste**: Criação válida, validação de horários, valores nulos

### Testes de Service

- **Classe**: `EventServiceTest`
- **Cobertura**: CRUD completo, buscas por diferentes critérios
- **Tecnologia**: Mockito para simulação do repositório

### Testes de Controller

- **Classe**: `EventControllerTest`
- **Cobertura**: Endpoints REST, códigos de status HTTP
- **Tecnologia**: MockMvc para testes de API

### Testes de Enum

- **Classe**: `EventCategoryTest`
- **Cobertura**: Valores, nomes de exibição, conversões

### Testes de Integração

- **Classe**: `EventManagerApplicationTests`
- **Cobertura**: Carregamento do contexto Spring
- **Configuração**: H2 em memória para testes

## 8. Estrutura do Projeto

```
event-manager/
├── README.md
├── src/
│   ├── back/
│   │   └── event-manager/           # Backend Spring Boot
│   │       ├── database/            # SQLite e scripts
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
│   │       │   └── test/                 # Testes unitários
│   │       └── pom.xml                   # Dependências Maven
│   └── front/
│       └── event-manager/           # Frontend React
│           ├── src/
│           │   ├── components/      # Componentes reutilizáveis
│           │   ├── constants/       # Constantes
│           │   ├── hooks/           # Custom hooks
│           │   ├── pages/           # Páginas
│           │   ├── services/        # Serviços de API
│           │   ├── styles/          # Estilização
│           │   └── utils/           # Funções utilitárias
│           └── package.json         # Dependências npm
```

## 9. Exemplos de Uso

### Exemplo de Cadastro (API)

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

### Exemplo de Busca por Categoria (API)

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

## 10. Conclusão

O Event Manager atende todos os requisitos solicitados para o gerenciamento de eventos, incluindo:

- CRUD completo para o recurso "Evento"
- Campos obrigatórios e opcionais com validação
- Diferentes tipos de dados (texto, números, datas)
- Persistência em banco de dados SQLite
- Interface visual ao invés de aplicação console
- Testes unitários abrangentes
- Documentação detalhada

A aplicação implementa todos os requisitos básicos, além do diferencial de testes unitários, demonstrando conhecimentos em desenvolvimento Java, Spring Boot, React, e boas práticas de programação.
