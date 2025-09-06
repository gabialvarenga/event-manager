# Event Manager - Frontend

Sistema de Gerenciamento de Eventos desenvolvido em React + Vite para o frontend.

## 🚀 Tecnologias

- **React 19.1.1** - Biblioteca JavaScript para interfaces
- **Material-UI (MUI)** - Componentes e design system
- **Vite** - Build tool e dev server
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP para API
- **Day.js** - Manipulação de datas
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── features/        # Componentes de funcionalidades específicas
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes de interface básicos
├── pages/               # Páginas da aplicação
├── services/            # Serviços de API
├── hooks/               # Custom hooks
├── utils/               # Funções utilitárias
├── constants/           # Constantes da aplicação
├── styles/              # Estilos globais e tema
├── App.jsx              # Componente principal
└── main.jsx             # Ponto de entrada
```

## 🛠️ Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Construir para produção:**
   ```bash
   npm run build
   ```

4. **Visualizar build de produção:**
   ```bash
   npm run preview
   ```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa linting com correções automáticas
- `npm run lint:check` - Verifica problemas de linting

## 📊 Funcionalidades

### ✅ Implementadas

- **Dashboard Inicial** - Visão geral com estatísticas
- **Listagem de Eventos** - Visualização completa dos eventos
- **Criação de Eventos** - Formulário para novos eventos
- **Edição de Eventos** - Atualização de eventos existentes
- **Exclusão de Eventos** - Remoção com confirmação
- **Busca e Filtros** - Sistema completo de busca e filtros
- **Design Responsivo** - Interface adaptável para mobile e desktop
- **Tema Customizado** - Material-UI personalizado

### 🎨 Características do Design

- **Material Design** com customizações
- **Gradientes e efeitos visuais** modernos
- **Animações suaves** de transição
- **Tipografia consistente** Inter font
- **Cores temáticas** inspiradas no Symplá
- **Responsividade completa**

## 🔗 Integração com Backend

O frontend se conecta com a API REST Java Spring Boot através do serviço `eventService.js`.

**Configuração da API:**
```javascript
// src/constants/index.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  TIMEOUT: 10000,
  // ...
};
```

## 📱 Responsividade

- **Desktop** (≥1200px) - Layout completo com sidebar
- **Tablet** (768px-1199px) - Layout adaptado
- **Mobile** (≤767px) - Layout compacto com navegação simplificada

## 🎯 Componentes Principais

### Layout
- `Layout.jsx` - Layout principal com header, footer e navegação

### UI Components
- `EventCard.jsx` - Card de exibição de evento
- `EventList.jsx` - Lista de eventos com loading states
- `Filter.jsx` - Componente de filtros avançados

### Feature Components
- `EventForm.jsx` - Formulário de criação/edição de eventos

### Pages
- `HomePage.jsx` - Dashboard inicial
- `EventsPage.jsx` - Página de gerenciamento de eventos
- `CreateEventPage.jsx` - Página de criação de eventos

## 🔄 State Management

Utiliza **React Hooks** para gerenciamento de estado:

- `useEvents.js` - Hook personalizado para operações de eventos
- `useState` e `useEffect` - Hooks nativos do React
- Context API não utilizada (simplicidade do projeto)

## 🛡️ Validação

- **Frontend** - Validação de formulários com feedback visual
- **Backend Integration** - Tratamento de erros da API
- **User Feedback** - Notificações toast para ações do usuário

## 🚀 Performance

- **Code Splitting** - Divisão automática do Vite
- **Lazy Loading** - Componentes carregados sob demanda
- **Memoização** - `useMemo` e `useCallback` em componentes pesados
- **Debouncing** - Busca com delay para melhor UX

## 📦 Build e Deploy

A aplicação é construída com Vite, gerando arquivos otimizados para produção:

```bash
npm run build
```

Arquivos de saída em `dist/`:
- HTML, CSS e JS minificados
- Assets otimizados
- Source maps (desenvolvimento)

## 🤝 Contribuição

1. Siga o padrão de código estabelecido
2. Use componentes funcionais com hooks
3. Mantenha a consistência do design system
4. Teste em diferentes tamanhos de tela
5. Documente mudanças significativas

## 📄 Licença

Este projeto foi desenvolvido para fins de case técnico.

---

**Event Manager Frontend** - Sistema moderno de gerenciamento de eventos
