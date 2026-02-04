# 🎯 AlgoViz - Interactive Algorithm Visualization Platform

> **Major Project 2 (Continuation)** - Advanced algorithm learning platform with interactive visualizations, real-time collaboration, and gamified learning experiences.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)

## 🌟 Overview

AlgoViz is a comprehensive educational platform designed to help students and developers master data structures and algorithms through interactive visualizations, hands-on practice, and collaborative learning.

### Key Features

- 🎨 **50+ Algorithm Visualizations** - Interactive step-by-step visualizations
- 💻 **500+ Practice Problems** - LeetCode-style coding challenges
- 🏆 **Gamification System** - Points, badges, leaderboards, and achievements
- 👥 **Real-time Collaboration** - Live coding sessions with peers
- 🎓 **Learning Paths** - Structured curriculum from beginner to advanced
- 🧪 **Code Editor** - Monaco editor with multi-language support
- 📊 **Progress Analytics** - Detailed learning metrics and insights
- 🎯 **Daily Challenges** - Fresh problems every day
- 🌙 **Modern UI/UX** - Dark/light themes with smooth animations
- 📱 **PWA Support** - Install and use offline

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (for production)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd algo-viz

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see the app.

## 📁 Project Structure

```
algo-viz/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── modern/        # Modern visualization components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...            # Feature components
│   ├── pages/             # Route pages
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and algorithms
│   │   ├── algorithms/    # Algorithm implementations
│   │   └── ...           # Services and utilities
│   ├── types/             # TypeScript type definitions
│   └── data/              # Static data and configurations
├── supabase/
│   ├── migrations/        # Database migrations
│   └── functions/         # Edge functions
├── public/                # Static assets
└── [config files]         # Build and deployment configs
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript 5.5+** - Type safety
- **Vite 5.4+** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Router v6** - Navigation
- **TanStack Query** - Server state management

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### Additional Tools
- **Monaco Editor** - Code editing
- **Recharts** - Data visualization
- **React Three Fiber** - 3D visualizations
- **Socket.io** - Real-time collaboration
- **Vitest** - Testing framework

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server at localhost:8080
npm run build            # Production build
npm run preview          # Preview production build

# Quality Checks
npm run type-check       # TypeScript type checking
npm run lint             # ESLint checks
npm run lint:fix         # Auto-fix linting issues
npm run test             # Run tests
npm run test:ui          # Run tests with UI
```

## 🎓 Algorithm Categories

### Sorting Algorithms
- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort, Quick Sort, Heap Sort
- Counting Sort, Radix Sort

### Searching Algorithms
- Binary Search, Linear Search
- Jump Search, Interpolation Search

### Data Structures
- Arrays, Linked Lists, Stacks, Queues
- Binary Search Trees, AVL Trees, Red-Black Trees
- Heaps, Hash Tables, Tries
- Graphs, Union-Find

### Graph Algorithms
- DFS, BFS, Dijkstra, Prim, Kruskal
- Topological Sort, Tarjan's Algorithm
- Ford-Fulkerson, Bellman-Ford

### Advanced Topics
- Dynamic Programming
- Backtracking (N-Queens, Sudoku)
- Computational Geometry
- String Matching (KMP, Rabin-Karp)

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_VERCEL_ANALYTICS=false

# Optional: Error Tracking
VITE_SENTRY_DSN=your_sentry_dsn
```

See `.env.example` for complete configuration options.

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configuration is provided in `vercel.json`.

### Manual Build

```bash
# Create production build
npm run build

# Output will be in dist/ directory
```

## 📊 Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run migrations in order from `supabase/migrations/`
3. Update environment variables with your Supabase credentials

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# UI mode
npm run test:ui
```

## 🎨 Features in Detail

### Interactive Visualizations
- Step-by-step algorithm execution
- Speed controls (slow, normal, fast)
- Pause/resume functionality
- Custom array generation
- Real-time complexity analysis

### Practice System
- 500+ coding problems
- Difficulty levels: Easy, Medium, Hard
- Multi-language support
- Automated test cases
- Solution explanations

### Gamification
- Experience points and levels
- Achievement badges
- Daily streaks
- Global leaderboards
- Rewards system

### Collaboration
- Live coding sessions
- Shared workspace
- Real-time cursor tracking
- Session chat
- Participant management

## 🤝 Contributing

This is a Major Project. For collaboration or suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is developed as an academic Major Project.

## 👨‍💻 Author

**Major Project 2 (2025-2026)**
- Interactive Algorithm Learning Platform
- Built with React, TypeScript, and Supabase

## 🙏 Acknowledgments

- Algorithm implementations inspired by competitive programming
- UI components from shadcn/ui
- Icons from Lucide React
- Visualization concepts from various CS education platforms

---

**Note:** This is a demo/educational project. For production use, ensure proper security configurations and remove any mock authentication systems.

## 📞 Support

For issues or questions about this Major Project, please create an issue in the repository.

---

Made with ❤️ for computer science education
