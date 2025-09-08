# 📋 Guia de Instalação e Configuração

Este guia contém todas as instruções necessárias para executar o **Event Manager** em seu ambiente local.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

### Obrigatórios
- **Java 21+**
  - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) ou [OpenJDK](https://openjdk.org/)
- **Node.js 18+ e npm**
  - Download: [Node.js](https://nodejs.org/)

### Opcionais
- **Maven 3.8+** 
  - [Download Maven](https://maven.apache.org/download.cgi) (ou usar o wrapper incluído)
- **Docker e Docker Compose** (para execução containerizada)

### ✅ Verificar Instalações

```bash
# Verificar Java
java -version

# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Maven (opcional - usaremos o wrapper)
mvn --version

# Verificar docker e docker compose
`docker --version` e `docker-compose --version`
```

## ⚡ Instalação Rápida

### 1. Clone do Repositório
```bash
git clone https://github.com/gabialvarenga/event-manager.git
cd event-manager
```

### 2. Backend (Terminal 1)
```bash
cd src/back/event-manager
./mvnw spring-boot:run
```

### 3. Frontend (Terminal 2)
```bash
cd src/front/event-manager
npm install
npm run dev
```

## 🔄 Configuração Detalhada do Backend

### Opção A: Maven Wrapper (Recomendado)
```bash
# Navegar para o diretório do backend
cd src/back/event-manager

# Limpar e compilar o projeto
./mvnw clean install

# Executar a aplicação
./mvnw spring-boot:run
```

### Opção B: Maven Instalado
```bash
cd src/back/event-manager
mvn clean install
mvn spring-boot:run
```

### Configuração de Banco de Dados

O SQLite é configurado automaticamente. Os arquivos ficam em:
- **Banco:** `src/back/event-manager/database/event-manager.db`
- **Script:** `src/back/event-manager/database/scriptSQL.sql`

Para usar um banco diferente, edite `application.properties`:
```properties
# PostgreSQL exemplo
spring.datasource.url=jdbc:postgresql://localhost:5432/eventdb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## 🎨 Configuração Detalhada do Frontend

### Instalação de Dependências
```bash
cd src/front/event-manager
npm install
```

### Scripts Disponíveis
```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint do código
npm run lint
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env` em `src/front/event-manager/`:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=Event Manager
```

## 🌐 URLs de Acesso

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:5173 | Interface principal |
| Backend | http://localhost:8080 | API REST |
| API Events | http://localhost:8080/api/events | Endpoint de eventos |
| H2 Console | http://localhost:8080/h2-console | Console do banco (modo dev) |

## 🔧 Solução de Problemas

### Backend não inicia

**Problema:** Erro de porta em uso
```bash
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080
```

**Solução:** Altere a porta em `application.properties`:
```properties
server.port=8081
```

**Problema:** Erro de versão do Java
```bash
# Verificar versão
java -version

# Configurar JAVA_HOME (Windows)
set JAVA_HOME=C:\Program Files\Java\jdk-21

# Configurar JAVA_HOME (Linux/Mac)
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
```

### Frontend não carrega

**Problema:** Dependências não instaladas
```bash
# Remover e reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Problema:** Cache do Vite
```bash
# Limpar cache
npm run dev -- --force
```

**Problema:** Porta em uso
```bash
# Usar porta específica
npm run dev -- --port 3000
```

### Problemas de CORS

O backend está configurado com `@CrossOrigin(origins = "*")` por padrão.

Para produção, configure especificamente:
```java
@CrossOrigin(origins = {"http://localhost:5173", "https://yourdomain.com"})
```

### Problemas de Banco de Dados

**SQLite corrompido:**
```bash
# Deletar banco e recriar
rm src/back/event-manager/database/event-manager.db
./mvnw spring-boot:run
```

**Permissões de arquivo:**
```bash
# Linux/Mac
chmod 755 src/back/event-manager/database/
chmod 644 src/back/event-manager/database/event-manager.db
```

## 🚀 Configuração para Produção

### Backend - application-prod.properties
```properties
# Configurações de produção
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.org.springframework=INFO
server.port=${PORT:8080}

# Database
spring.datasource.url=${DATABASE_URL:jdbc:sqlite:./database/event-manager.db}
```

### Frontend - Build de Produção
```bash
# Build otimizado
npm run build

# Servir arquivos estáticos (exemplo com serve)
npm install -g serve
serve -s dist -l 5173
```

### Variáveis de Ambiente

**Backend:**
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:postgresql://localhost:5432/eventdb
export PORT=8080
```

**Frontend:**
```bash
export VITE_API_BASE_URL=https://api.yourdomain.com
```

### HTTPS em Desenvolvimento

**Backend:**
```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=password
server.ssl.key-store-type=PKCS12
```

**Frontend (Vite):**
```javascript
// vite.config.js
export default {
  server: {
    https: true
  }
}
```

### CORS para Produção

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://yourdomain.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

## ⚙️ IDE e Ferramentas de Desenvolvimento

### Visual Studio Code

Extensões recomendadas:
- Extension Pack for Java
- Spring Boot Extension Pack
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

### IntelliJ IDEA

Plugins recomendados:
- Spring Boot
- Lombok
- Database Navigator
- React Native Console

### Configuração do Lombok

Certifique-se de habilitar o processamento de anotações na IDE.

**IntelliJ IDEA:**
1. Settings → Build → Compiler → Annotation Processors
2. Marcar "Enable annotation processing"

**VS Code:**
- Instalar "Lombok Annotations Support for VS Code"

## 🧪 Executar Testes

### Testes Unitários e de Integração

Para executar os testes do projeto, utilize o seguinte comando no terminal:

```bash
./mvnw test
```

Os relatórios dos testes serão gerados em `target/surefire-reports`.

### Executar Testes com Debug

Para executar os testes com o modo de depuração ativado, utilize o seguinte comando no terminal:

```bash
./mvnw test -Dmaven.surefire.debug=true
```
---
