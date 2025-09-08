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
> *Como a aplicação usa hospedagem gratuita (Render), pode haver um pequeno delay no primeiro acesso devido ao "cold start" do servidor.*

### Acesso Local
- **Backend:** `http://localhost:8080/api/events`
- **Frontend:** `http://localhost:5173`

---

## 📋 Sobre o Projeto

**Recurso Escolhido**: Evento.

O **Event Manager** foi desenvolvido para gerenciar eventos de forma eficiente, oferecendo uma solução completa que inclui cadastro, busca avançada, edição e exclusão de eventos. O sistema foi projetado com foco em qualidade, performance e boas práticas de desenvolvimento.

### Propriedades do Evento

| Propriedade   | Tipo         | Obrigatório | Descrição                                                                 | Validações                        |
|---------------|--------------|-------------|---------------------------------------------------------------------------|-----------------------------------|
| id            | Long         | Automático  | Identificador único do evento (gerado automaticamente)                    | @GeneratedValue                   |
| name          | String       | **Sim**     | Nome do evento                                                            | 3-100 caracteres, @NotBlank      |
| eventDate     | LocalDate    | **Sim**     | Data do evento (deve ser futura)                                          | @NotNull, @Future                 |
| startTime     | LocalTime    | **Sim**     | Horário de início                                                         | @NotNull, formato HH:mm           |
| endTime       | LocalTime    | **Sim**     | Horário de término (deve ser após início)                                 | @NotNull, formato HH:mm           |
| location      | String       | **Sim**     | Local do evento                                                           | @NotBlank, máximo 200 caracteres |
| organizer     | String       | **Sim**     | Organizador do evento                                                     | @NotBlank, máximo 200 caracteres |
| capacity      | Integer      | **Sim**     | Capacidade de pessoas                                                     | @NotNull, @Min(1)                |
| description   | String       | Opcional    | Descrição do evento                                                       | Máximo 500 caracteres            |
| price         | BigDecimal   | Opcional    | Preço do evento                                                           | > 0, até 8 dígitos + 2 decimais  |
| category      | EventCategory| Opcional    | Categoria do evento                                                       | Enum com 10 opções disponíveis   |

## 2. 🛠 Tecnologias Utilizadas

### **Linguagem Escolhida: Java 21**
O Java foi escolhido como linguagem principal do backend por oferecer:
- **Robustez e maturidade** para aplicações empresariais
- **Ecossistema Spring** consolidado e bem documentado  
- **Tipagem estática** que reduz erros em tempo de execução
- **Facilidade de manutenção** e escalabilidade
- **Suporte LTS** garantindo estabilidade a longo prazo

### Backend
- **Java 21** (LTS) - Linguagem principal
- **Spring Boot 3.5.5** - Framework web e injeção de dependência
- **Spring Data JPA** - Mapeamento objeto-relacional
- **SQLite** - Banco de dados embarcado
- **Maven** - Gerenciamento de dependências e build
- **Bean Validation** - Validação de dados
- **JUnit 5 + Mockito** - Testes unitários e mocks

### Frontend  
- **React 18** - Biblioteca para construção de interfaces
- **Material-UI (MUI)** - Sistema de design e componentes
- **Day.js** - Manipulação de datas
- **Vite** - Build tool e servidor de desenvolvimento
- **Lucide React** - Ícones modernos

### DevOps e Infraestrutura
- **Docker & Docker Compose** - Containerização
- **Render** - Plataforma de hospedagem
- **SQLite** - Persistência de dados

## 3. 📦 Instalação de Dependências

### **Pré-requisitos Obrigatórios**

#### **Java 21+ (LTS)**
```bash
# Verificar versão instalada
java -version

# Se não estiver instalado:
# Windows: Baixar do site oficial
# macOS: brew install openjdk@21  
# Ubuntu: sudo apt install openjdk-21-jdk
```
- **Download:** [OpenJDK](https://openjdk.org/) ou [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- **Configurar JAVA_HOME** no seu sistema operacional

#### **Node.js 18+ e npm**
```bash
# Verificar versões instaladas
node --version
npm --version

# Se não estiver instalado:
# Baixar do site oficial ou usar gerenciador de versão
```
- **Download:** [Node.js](https://nodejs.org/) (inclui npm automaticamente)
- **Alternativa:** Use nvm para gerenciar versões do Node

#### **Maven (Opcional)**
```bash
# Verificar se Maven está instalado
mvn --version

# O projeto inclui Maven Wrapper (./mvnw), então não é obrigatório
```

### **Dependências Opcionais**

#### **Docker & Docker Compose**
```bash
# Verificar instalação
docker --version
docker-compose --version
```
- **Download:** [Docker Desktop](https://www.docker.com/)
- **Necessário apenas** para execução containerizada

## 4. 🚀 Instruções de Inicialização

### Opção 1: Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/gabialvarenga/event-manager.git
cd event-manager

# 2. Backend (Terminal 1)
cd src/back/event-manager
./mvnw spring-boot:run
# Aguarde: "Started EventManagerApplication"

# 3. Frontend (Terminal 2)  
cd src/front/event-manager
npm install
npm run dev
# Aguarde: "Local: http://localhost:5173"
```

### Opção 2: Docker

```bash
# Na raiz do projeto backend
cd src/back/event-manager
docker-compose up --build
```

**✅ Pronto! Acesse:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080/api/events (via Docker) ou http://localhost:8081/api/events (execução local)
- **Banco de dados:** SQLite (arquivo local)

## 📚 Documentação Completa

Para informações detalhadas sobre implementação e uso, acesse:

- **[📋 SETUP.md](./SETUP.md)** - Guia completo de instalação e configuração

---

## 4. Estrutura do Banco de Dados

O banco de dados é criado automaticamente pelo JPA usando SQLite, mas seu esquema está definido em:

Arquivo: `src/back/event-manager/database/create_tables.sql`

```sql
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
    category TEXT CHECK(category IN ('CONFERENCE', 'WORKSHOP', 'SEMINAR', 'MEETUP', 'TRAINING', 'EXHIBITION', 'NETWORKING', 'OTHER'))
);
```

## 🎮 Como Usar a Aplicação

### 1. **Acesso à Aplicação**

#### **Demonstração Online**
✨  **[ACESSE A DEMONSTRAÇÃO](https://event-manager-front.onrender.com)**  
- Aguarde alguns segundos para o carregamento inicial (cold start)  
- A aplicação está pronta para uso imediato  
- Todos os dados são resetados periodicamente para demonstração

#### **Acesso Local**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8081/api/events

---

### 2. **Primeiros Passos na Aplicação**

#### **Dashboard Principal**
- Visualize todos os eventos cadastrados em cards organizados
- Use a **barra de busca** no topo para encontrar eventos específicos
- **Filtros disponíveis:** Data, categoria, organizador, preço
- **Ordenação:** Por data, nome, capacidade ou preço

#### **Navegação**
- **Página inicial:** Lista todos os eventos
- **Botão "+" flutuante:** Criar novo evento  
- **Ícones nos cards:** Editar (✏️) ou Excluir (🗑️) eventos

---

### 3. **Funcionalidades Detalhadas**

#### **📅 Criar Novo Evento**
**Como usar:**
1. Clique no **botão "+" flutuante** no canto inferior direito
2. Preencha o formulário com os dados do evento:
   - **Nome:** `Workshop React Avançado` (obrigatório, 3-100 caracteres)
   - **Data:** `2025-12-15` (obrigatório, deve ser futura)
   - **Horário Início:** `09:00` (obrigatório)
   - **Horário Fim:** `17:00` (obrigatório, após o início)
   - **Local:** `Auditório Principal - DTI Digital` (obrigatório, máx 200 chars)
   - **Organizador:** `Equipe Desenvolvimento` (obrigatório, máx 200 chars)
   - **Capacidade:** `50` (obrigatório, mínimo 1)
   - **Categoria:** `WORKSHOP` (opcional)
   - **Preço:** `149.90` (opcional, deve ser positivo)
   - **Descrição:** `Workshop intensivo sobre React...` (opcional, máx 500 chars)
3. Clique em **"Salvar Evento"**
4. **Resultado:** Evento criado e adicionado à lista principal

#### **🔍 Buscar e Filtrar Eventos**
**Como usar:**
1. **Busca rápida:** Digite no campo "Buscar eventos..." no topo
   - Exemplo: `React` encontrará eventos com "React" no nome
2. **Busca por ID:** Digite apenas números
   - Exemplo: `1` encontrará o evento com ID 1
3. **Filtros avançados:** Use os seletores laterais
   - **Por categoria:** Selecione `WORKSHOP`, `CONFERENCE`, etc.
   - **Por data:** Filtre eventos de períodos específicos
   - **Por organizador:** Digite nome do organizador
4. **Ordenação:** Clique nos cabeçalhos das colunas para ordenar

#### **✏️ Editar Evento Existente**
**Como usar:**
1. Localize o evento na lista principal
2. Clique no **ícone de edição (✏️)** no card do evento
3. O formulário abrirá **preenchido** com os dados atuais
4. Modifique os campos desejados
   - Exemplo: Alterar capacidade de `50` para `75`
   - Exemplo: Atualizar data de `2025-12-15` para `2025-12-20`
5. Clique em **"Atualizar Evento"**
6. **Resultado:** Evento atualizado imediatamente na lista

#### **🗑️ Excluir Evento**
**Como usar:**
1. Localize o evento na lista principal
2. Clique no **ícone de exclusão (🗑️)** no card do evento
3. **Confirme a exclusão** no diálogo que aparece
4. **Resultado:** Evento removido permanentemente

#### **📊 Visualizar Detalhes Completos**
**Como usar:**
1. Clique em **qualquer card de evento** na lista
2. Uma **janela modal** abrirá mostrando:
   - Todas as informações do evento
   - Data e horários formatados
   - Preço (se informado)
   - Descrição completa
   - Categoria com ícone

---

### 4. **Exemplo de Uso Rápido**

#### **Cenário: Criar evento de workshop**
1. **Acesse** a aplicação
2. **Clique** no botão "+" flutuante
3. **Preencha** os dados:
   - Nome: `Workshop React Hooks`
   - Data: `2025-12-10`
   - Início: `14:00` / Fim: `18:00`
   - Local: `Sala 201 - Centro de Treinamento`
   - Organizador: `João Silva`
   - Capacidade: `30`
   - Categoria: `WORKSHOP`
   - Preço: `99.90`
4. **Salve** o evento
5. **Verifique** na lista principal que o evento foi criado

#### **Cenário: Buscar eventos por categoria**
1. **Use** o filtro de categoria no topo
2. **Selecione** "Workshop"
3. **Visualize** apenas eventos dessa categoria
4. **Clique** em um evento para ver detalhes completos

---

### 5. **⚡ Dicas de Uso**

- **Validação em tempo real:** Erros aparecem conforme você digita
- **Data futura obrigatória:** Sistema não permite eventos no passado
- **Horários válidos:** Fim deve ser sempre depois do início
- **Preços opcionais:** Deixe em branco para eventos gratuitos
- **Backup automático:** Dados salvos automaticamente no SQLite
- **Interface responsiva:** Funciona em desktop, tablet e mobile

⚡ **Nota:** Se usando a demonstração online, pode haver um pequeno delay no primeiro acesso devido ao "cold start" do servidor Render.

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

## 10. Estrutura do Projeto

### 📁 Organização dos Artefatos

#### Backend

```
src/back/event-manager/
├── Dockerfile                 # Container backend
├── database/                  # SQLite e scripts
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

## API REST - Endpoints Disponíveis

### **Endpoints Principais**

| Método | Endpoint | Descrição | Status de Resposta |
|--------|----------|-----------|-------------------|
| GET | `/api/events` | Lista todos os eventos | 200 OK |
| GET | `/api/events/{id}` | Busca evento por ID | 200 OK / 404 Not Found |
| POST | `/api/events` | Cria novo evento | 201 Created / 400 Bad Request |
| PUT | `/api/events/{id}` | Atualiza evento completo | 200 OK / 404 Not Found |
| DELETE | `/api/events/{id}` | Remove evento | 204 No Content / 404 Not Found |

### **Endpoints de Busca Avançada**

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | `/api/events/category/{category}` | Eventos por categoria | category: WORKSHOP, CONFERENCE, etc. |
| GET | `/api/events/date-range` | Eventos por período | startDate, endDate (yyyy-MM-dd) |
| GET | `/api/events/organizer` | Eventos por organizador | organizer (query param) |
| GET | `/api/events/search` | Busca por nome | name (query param) |
| GET | `/api/events/search/global` | Busca por nome ou ID | query (query param) |
| GET | `/api/events/upcoming/category/{category}` | Próximos eventos por categoria | category |

### **Exemplos de Uso da API**

#### **📝 Criar Evento (POST)**
```bash
# URL: POST http://localhost:8081/api/events
curl -X POST http://localhost:8081/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Workshop React Avançado",
    "eventDate": "2025-12-10",
    "startTime": "09:00",
    "endTime": "17:00",
    "location": "Auditório Principal",
    "organizer": "DTI Digital",
    "capacity": 50,
    "description": "Workshop intensivo sobre React Hooks e Context API",
    "price": 149.90,
    "category": "WORKSHOP"
  }'
```

#### **🔍 Buscar por Categoria (GET)**
```bash
# URL: GET http://localhost:8081/api/events/category/WORKSHOP
curl http://localhost:8081/api/events/category/WORKSHOP
```

#### **📅 Buscar por Período (GET)**
```bash
# URL: GET http://localhost:8081/api/events/date-range?startDate=2025-01-01&endDate=2025-12-31
curl "http://localhost:8081/api/events/date-range?startDate=2025-01-01&endDate=2025-12-31"
```

#### **✏️ Atualizar Evento (PUT)**
```bash
# URL: PUT http://localhost:8081/api/events/1
curl -X PUT http://localhost:8081/api/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Workshop React Avançado - ATUALIZADO",
    "eventDate": "2025-12-15",
    "startTime": "09:00",
    "endTime": "17:00",
    "location": "Auditório Principal",
    "organizer": "DTI Digital",
    "capacity": 75,
    "description": "Workshop intensivo atualizado",
    "price": 179.90,
    "category": "WORKSHOP"
  }'
```

#### **🗑️ Excluir Evento (DELETE)**
```bash
# URL: DELETE http://localhost:8081/api/events/1
curl -X DELETE http://localhost:8081/api/events/1
```

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

### **🔗 Links Importantes**

- **🌐 Demonstração Online:** [https://event-manager-front.onrender.com](https://event-manager-front.onrender.com)
- **📱 API Backend:** [https://event-manager-grkf.onrender.com](https://event-manager-grkf.onrender.com)
- **💻 Repositório:** [https://github.com/gabialvarenga/event-manager](https://github.com/gabialvarenga/event-manager)

### **⚡ Nota Final**

O sistema está completamente funcional e pode ser utilizado imediatamente. A demonstração online permite testar todas as funcionalidades sem necessidade de instalação local.

---
**Desenvolvido por Gabriela Alvarenga** ✨  
*DTI Digital - Desafio Técnico 2025*