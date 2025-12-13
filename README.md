# 🌙 Moonspace - Rede Social para Gamers da Geração Z

Bem-vindo ao **Moonspace**, a rede social dedicada à Geração Z e à comunidade gamer! Uma plataforma moderna e vibrante com identidade visual em degradê roxo e rosa, inspirada na lua.

## ✨ Funcionalidades

### 🏠 Homepage
- Hero section impactante com logo da lua e animações
- Apresentação das principais funcionalidades
- Estatísticas da comunidade
- Botões de login e cadastro
- Design responsivo com tema dark mode

### 📝 Feed de Posts
- Criar publicações com texto e imagens
- Sistema de curtidas e comentários
- Tags de jogos nos posts
- Feed interativo com posts de amigos
- Contador de interações em tempo real

### 👥 Sistema de Amizades
- Adicionar e remover amigos (sem sistema de seguidores)
- Solicitações de amizade com aceitar/recusar
- Visualizar status dos amigos (online, offline, jogando)
- Ver amigos em comum
- Lista de amigos com informações de jogos ativos

### 🎮 Gaming Hub
- Galeria de jogos populares
- Filtros por gênero (FPS, RPG, MOBA, etc.)
- Atividade recente dos amigos
- Sistema de conquistas
- Estatísticas de jogos pessoais
- Rankings e trending games

### 🏆 Perfil do Usuário
- Perfil personalizável com cover e avatar
- Showcase de jogos favoritos
- Sistema de conquistas e badges
- Estatísticas de gaming
- Histórico de posts
- Horas jogadas por jogo
- Progresso de conquistas

### 🔔 Notificações
- Central de notificações
- Filtro de lidas/não lidas
- Notificações de:
  - Curtidas em posts
  - Comentários
  - Solicitações de amizade
  - Conquistas desbloqueadas
  - Menções

### 🔐 Autenticação
- Páginas de login e cadastro
- Integração com Google e Facebook
- Design consistente com a identidade visual

## 🎨 Identidade Visual

### Paleta de Cores
- **Primário**: Roxo vibrante (`oklch(0.55 0.25 295)`)
- **Secundário**: Rosa intenso (`oklch(0.65 0.22 340)`)
- **Accent**: Rosa-púrpura (`oklch(0.6 0.24 320)`)
- **Degradê**: Roxo → Rosa em 135°

### Tema Dark Mode
- Suporte completo a dark mode
- Transições suaves entre temas
- Cores otimizadas para contraste

### Elementos Especiais
- **Moon Glow**: Efeito de brilho lunar nos elementos principais
- **Gradient Text**: Texto com degradê roxo-rosa
- **Animações**: Pulsos, bounces e transições suaves

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **Shadcn/UI** - Componentes UI modernos
- **Lucide React** - Ícones vetoriais
- **Framer Motion** - Animações (disponível)

## 📁 Estrutura do Projeto

```
moonspace/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── feed/page.tsx         # Feed de posts
│   │   ├── friends/page.tsx      # Sistema de amizades
│   │   ├── profile/page.tsx      # Perfil do usuário
│   │   ├── games/page.tsx        # Gaming hub
│   │   ├── notifications/page.tsx # Notificações
│   │   ├── login/page.tsx        # Login
│   │   ├── signup/page.tsx       # Cadastro
│   │   ├── layout.tsx            # Layout raiz
│   │   └── globals.css           # Estilos globais
│   ├── components/
│   │   ├── Navigation.tsx        # Barra de navegação
│   │   └── ui/                   # Componentes Shadcn/UI
│   └── lib/
│       └── utils.ts              # Utilitários
└── public/                       # Arquivos estáticos
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install
# ou
bun install

# Executar em desenvolvimento
npm run dev
# ou
bun dev

# Abrir no navegador
http://localhost:3000
```

## 📱 Páginas Disponíveis

- `/` - Homepage com hero section
- `/feed` - Feed de posts e criação de conteúdo
- `/friends` - Gerenciamento de amizades
- `/profile` - Perfil do usuário com jogos e conquistas
- `/games` - Hub de jogos e atividades
- `/notifications` - Central de notificações
- `/login` - Página de login
- `/signup` - Página de cadastro

## 🎯 Funcionalidades Únicas

### Sistema de Amizades (não Seguidores)
Diferente de outras redes sociais, o Moonspace foca em **conexões reais**. Não há sistema de seguidores - apenas amizades mútuas, promovendo interações mais autênticas.

### Perfil Gamer
Cada usuário pode:
- Listar seus jogos favoritos
- Mostrar horas jogadas
- Exibir conquistas desbloqueadas
- Compartilhar progresso em jogos
- Status de "jogando agora"

### Gaming Activity
- Feed de atividades de gaming dos amigos
- Conquistas recentes da comunidade
- Jogos em alta na plataforma
- Estatísticas diárias de gaming

## 🎮 Mock Data

O projeto inclui dados mockados para demonstração:
- Posts de exemplo com imagens e tags de jogos
- Lista de amigos com status variados
- Notificações de diferentes tipos
- Jogos populares com estatísticas
- Conquistas e badges

## 🌙 Sobre o Nome

**Moonspace** simboliza um espaço único e especial, como a lua no céu noturno. É o lugar onde gamers da Geração Z se conectam, compartilham suas paixões e constroem sua comunidade.

## 📝 Próximos Passos Sugeridos

Para tornar o Moonspace uma aplicação completa, você pode:

1. **Backend & Database**
   - Configurar Supabase ou Firebase
   - Implementar autenticação real
   - Criar esquema de banco de dados
   - APIs para posts, amizades, notificações

2. **Features Avançadas**
   - Chat em tempo real entre amigos
   - Grupos e comunidades de jogos
   - Integração com APIs de jogos (Steam, Xbox, etc.)
   - Sistema de clãs/guilds

3. **Otimizações**
   - Upload de imagens
   - Infinite scroll no feed
   - PWA para mobile
   - Notificações push

## 🎨 Customização

Para personalizar o tema, edite `src/app/globals.css`:
- Ajuste as cores primárias e secundárias
- Modifique o raio dos componentes (`--radius`)
- Adicione novos gradientes e efeitos

## 📄 Licença

Projeto criado para demonstração. Sinta-se livre para usar e modificar!

---

**Feito com 💜 e 💖 para a comunidade gamer da Geração Z**
