# AlgoViz - Complete Project Context Documentation
**Last Updated:** March 12, 2026  
**Purpose:** Complete project context for IDE migration and development continuation

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack & Dependencies](#tech-stack--dependencies)
3. [Architecture Patterns](#architecture-patterns)
4. [Critical Development Rules](#critical-development-rules)
5. [Authentication System](#authentication-system)
6. [Database Architecture](#database-architecture)
7. [File Structure](#file-structure)
8. [Services Layer](#services-layer)
9. [Hooks & State Management](#hooks--state-management)
10. [Component Patterns](#component-patterns)
11. [Routing & Navigation](#routing--navigation)
12. [Code Execution System](#code-execution-system)
13. [Real-Time Features](#real-time-features)
14. [Known Issues & Fixes](#known-issues--fixes)
15. [Environment Setup](#environment-setup)
16. [Development Workflow](#development-workflow)

---

## 📊 PROJECT OVERVIEW

### What is AlgoViz?

AlgoViz is a production-grade algorithm learning and competitive programming platform combining:
- **LeetCode-style System:** 3,800+ problems, 60,000+ code templates (16 languages)
- **Codeforces-style Contests:** Real-time competitions with live leaderboards
- **Collaborative Learning:** Study rooms with real-time chat and code collaboration
- **Gamified Learning:** XP, levels, streaks, achievements, certificates

### Key Features
- ✅ 3,800+ coding problems across all difficulties
- ✅ 16 programming languages supported
- ✅ Real-time code execution (Piston API)
- ✅ Contest system with live rankings
- ✅ Study rooms with collaborative code editing
- ✅ Interactive algorithm visualizations
- ✅ XP/leveling system with achievements
- ✅ Certificate generation
- ✅ Admin panel for content management

### Current Status
- **Frontend:** 99.5% complete, production-ready
- **Authentication:** Fully working (email/password, magic link, fallback admin)
- **Code Execution:** 98.7% success rate, all 16 languages working
- **Database:** Structure exists (needs verification for contests/rooms)
- **Real-Time:** Supabase Realtime implemented (needs DB tables)
- **Performance:** Lighthouse score 95, < 2s load time

---

## 🛠 TECH STACK & DEPENDENCIES

### Core Framework
```json
{
  "react": "18.3.1",
  "typescript": "5.5.3",
  "vite": "5.4.2"
}
```

### State Management & Data Fetching
```json
{
  "@tanstack/react-query": "^5.x",
  "react-router-dom": "^6.x"
}
```

### Backend & Database
```json
{
  "@supabase/supabase-js": "^2.x",
  "supabase": "PostgreSQL + Realtime + Auth"
}
```

### UI Libraries
```json
{
  "shadcn/ui": "50+ components",
  "tailwindcss": "^3.x",
  "framer-motion": "^11.x",
  "@radix-ui/*": "Component primitives"
}
```

### Code Editor & Visualization
```json
{
  "@monaco-editor/react": "^4.x",
  "react-three-fiber": "3D visualizations",
  "recharts": "Analytics charts"
}
```

### Code Execution
- **Primary:** Piston API (free, reliable)
- **Fallback:** Judge0 CE (optional, self-hosted or RapidAPI)

---

## 🏗 ARCHITECTURE PATTERNS

### Layer Architecture (MANDATORY)

```
UI Layer (Components/Pages)
    ↓
Hooks Layer (Custom React Hooks)
    ↓
Services Layer (Business Logic)
    ↓
Integration Layer (Supabase Client)
    ↓
Database (PostgreSQL)
```

**⚠️ NEVER SKIP LAYERS:** Always go through Hooks → Services → Database

### File Organization Pattern

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui primitives
│   └── [Feature]*.tsx # Feature-specific components
├── pages/            # Route pages (lazy-loaded)
├── hooks/            # Custom React hooks
├── services/         # Business logic & API calls
├── contexts/         # React Context providers
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── integrations/     # External service clients
    └── supabase/
```

### Import Alias (CRITICAL)

**ALWAYS use path aliases, NEVER relative imports across directories:**

```typescript
// ✅ CORRECT
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { executeCode } from "@/services/multiLangExecutor";

// ❌ WRONG
import { Button } from "../../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
```

**Configuration:**
- `tsconfig.json`: `"@/*": ["./src/*"]`
- `vite.config.ts`: `alias: { '@': path.resolve(__dirname, './src') }`

---

## 🚨 CRITICAL DEVELOPMENT RULES

### 1. Provider Hierarchy (DO NOT CHANGE ORDER)

**File:** `src/App.tsx`

```tsx
<ErrorBoundary>
  <QueryClientProvider>
    <ThemeProvider>
      <EnhancedThemeProvider>
        <Router>
          <AuthProvider>           {/* Auth MUST be inside Router */}
            <AdminProvider>        {/* Admin depends on Auth */}
              <CollaborationProvider>
                <PWAProvider>
                  {children}
                </PWAProvider>
              </CollaborationProvider>
            </AdminProvider>
          </AuthProvider>
        </Router>
      </EnhancedThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
</ErrorBoundary>
```

**Breaking this order will cause runtime failures!**

### 2. Lazy Loading (Required for All Pages)

**Exceptions:** Home, Login, Register (eager loaded)

```typescript
// ✅ CORRECT
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const ProblemsPage = React.lazy(() => import("@/pages/ProblemsPage"));

// ❌ WRONG
import Dashboard from "@/pages/Dashboard";
```

### 3. Component Export Pattern

All modern visualization/feature components MUST export both:

```typescript
// ✅ CORRECT
export const ModernMergeSortVisualization = () => { /* ... */ };
export default ModernMergeSortVisualization;

// ❌ WRONG (will break lazy loading)
export default function ModernMergeSortVisualization() { /* ... */ }
```

### 4. TypeScript Configuration (INTENTIONALLY RELAXED)

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "strictNullChecks": false
  }
}
```

**⚠️ DO NOT refactor to strict mode unless explicitly instructed!**

### 5. Styling Pattern

Always use `cn()` utility for class merging:

```typescript
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Props override
)}
```

---

## 🔐 AUTHENTICATION SYSTEM

### Architecture

**File:** `src/contexts/AuthContext.tsx`

### Four Authentication States

1. **Not Logged In (Public)**
   - Can access: Home, Login, Register, Learning (read-only), Problems (view only)
   - Cannot: Submit code, join contests, access dashboard

2. **Logged In (Regular User)**
   - Full access to all user features
   - Cannot access: Admin panel

3. **Logged In (Admin User)**
   - Full access to user features + admin panel
   - Role checked via `admin_roles` table

4. **Fallback Admin (Emergency Access)**
   - Email: `admin@algoviz.com`
   - Password: `Admin@123`
   - Works completely OFFLINE (no DB operations)
   - Level 99, 999,999 XP, super_admin role

### Critical Fix Applied (March 3, 2026)

**Problem:** Infinite redirect loops, session lost on refresh

**Solution:** Synchronous localStorage check BEFORE async Supabase

```typescript
// src/contexts/AuthContext.tsx (Lines 32-75)
useEffect(() => {
  let mounted = true;
  
  // ⚠️ CHECK FOR FALLBACK ADMIN FIRST (synchronous check)
  const isFallbackAdmin = localStorage.getItem('algviz_fallback_admin') === 'true';
  
  if (isFallbackAdmin) {
    // Restore fallback admin session immediately (no async needed)
    const mockUser = {
      id: "00000000-0000-0000-0000-000000000001",
      email: "admin@algoviz.com",
      // ... other properties
    } as User;

    const mockSession = { /* ... */ } as Session;

    setUser(mockUser);
    setSession(mockSession);
    setLoading(false);
    
    // ⚠️ CRITICAL: Skip Supabase listener for fallback admin
    return () => { mounted = false; };
  }
  
  // For real Supabase users: proceed with normal auth flow
  supabase.auth.getSession().then(/* ... */);
}, []);
```

### Fallback Admin DB Operations

**SKIPPED in 6 locations to prevent timeouts:**

1. `src/services/databaseService.ts` - All CRUD operations
2. `src/hooks/useDatabase.ts` - Data fetching
3. `src/contexts/AdminContext.tsx` - Role checking
4. `src/services/testcaseService.ts` - Problem fetching
5. `src/services/contestService.ts` - Contest operations
6. `src/services/roomService.ts` - Room operations

**Pattern:**

```typescript
// Check for fallback admin at start of every DB operation
const isFallbackAdmin = localStorage.getItem('algviz_fallback_admin') === 'true';
if (isFallbackAdmin) {
  return { /* mock data or skip */ };
}
```

### Protected Routes

**File:** `src/components/ProtectedRoute.tsx`

```typescript
<ProtectedRoute requireAuth={true} requireAdmin={false}>
  <Dashboard />
</ProtectedRoute>

<ProtectedRoute requireAuth={true} requireAdmin={true}>
  <AdminPanel />
</ProtectedRoute>
```

**Features:**
- ✅ Redirect to `/login` if not authenticated
- ✅ Show "Access Denied" if not admin (when `requireAdmin={true}`)
- ✅ Loading states while checking auth
- ✅ Prevents infinite redirect loops with `useRef` guard

---

## 💾 DATABASE ARCHITECTURE

### Known Status
- **Migrations Folder:** DELETED (to keep repo lightweight)
- **Verification:** Required (see `db-schema-check.sql`)
- **Expected Tables:** 35+ (see below)

### Core Tables (Expected Schema)

#### User & Auth
```sql
profiles                  -- User profiles (Supabase Auth)
user_stats                -- XP, level, rank, problems_solved
admin_roles               -- Admin role assignments (super_admin, content_admin)
```

#### Learning System
```sql
categories                -- Algorithm categories (Arrays, Trees, Graphs, DP)
algorithms                -- Algorithm metadata (name, difficulty, description)
algorithm_articles        -- Article content (markdown, code examples)
user_algorithm_progress   -- Learning progress tracking
```

#### Problem Solving (VERIFIED as working)
```sql
problems                  -- 3,800+ problem statements
testcases                 -- Visible & hidden testcases
code_templates            -- 16 languages × 3,800+ problems = 60,000+ rows
hints                     -- Progressive problem hints
submissions               -- User code submissions
submission_results        -- Per-testcase execution results
user_problem_progress     -- Solved/attempted status
```

#### Contest System (UNVERIFIED - needs DB check)
```sql
contests                  -- Contest metadata (title, start_time, end_time)
contest_problems          -- Problems in each contest (ordered)
contest_participants      -- Registration & scores
contest_submissions       -- Contest-specific submissions
contest_announcements     -- In-contest messages
```

#### Collaboration (UNVERIFIED - needs DB check)
```sql
study_rooms               -- Virtual study rooms
room_members              -- Participants in rooms
room_messages             -- Real-time chat messages
room_shared_code          -- Collaborative code editing
```

#### Community
```sql
community_groups          -- Discussion groups
community_group_discussions -- Forum threads
activity_feed             -- User activity stream
user_connections          -- Friend connections
shared_visualizations     -- User-created visualizations
```

#### Gamification
```sql
achievements              -- Achievement definitions (100+ types)
user_achievements         -- Earned achievements
certificates              -- Certificate records
user_quiz_progress        -- Skills assessment attempts
```

### Database Patterns

**Row Level Security (RLS):**
- All tables MUST have RLS enabled
- Policies for: SELECT, INSERT, UPDATE, DELETE
- User data isolated by `user_id`
- Admin bypass for management operations

**Triggers:**
- Auto-update `user_stats` on submission
- Calculate contest rankings on score change
- Update room member count on join/leave

**Indexes:**
- Foreign keys: ALWAYS indexed
- Frequently queried columns (e.g., problem `slug`, difficulty)
- Composite indexes for filtering (e.g., `difficulty + status`)

---

## 📁 FILE STRUCTURE

### Complete Directory Tree

```
algo-viz/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── offline.html           # Offline fallback
│
├── src/
│   ├── components/            # 85+ UI components
│   │   ├── ui/               # shadcn/ui primitives (50+ components)
│   │   ├── Header.tsx        # Global navigation
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx          # Landing page hero
│   │   ├── ProtectedRoute.tsx # Auth guard
│   │   ├── ProblemView.tsx   # Split-screen problem interface
│   │   ├── CodeEditor.tsx    # Monaco wrapper
│   │   ├── LanguageSelector.tsx
│   │   ├── ExecutionResult.tsx
│   │   ├── RoomView.tsx      # Study room interface
│   │   ├── ContestView.tsx   # Contest interface
│   │   └── [150+ more components...]
│   │
│   ├── pages/                # Route pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ProblemsPage.tsx  # Problem listing
│   │   ├── PracticeProblems.tsx
│   │   ├── Challenges.tsx
│   │   ├── ContestsPage.tsx
│   │   ├── StudyRoomsPage.tsx
│   │   ├── Community.tsx
│   │   ├── Profile.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── AdvancedFeatures.tsx
│   │   ├── ManageCategoriesPage.tsx # Admin
│   │   ├── ManageAlgorithmsPage.tsx # Admin
│   │   └── ManageArticlesPage.tsx   # Admin
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # (Re-export from context)
│   │   ├── useDatabase.ts    # Generic DB operations
│   │   ├── useCodeExecution.ts
│   │   ├── useSubmission.ts
│   │   ├── useContest.ts
│   │   ├── useRoom.ts
│   │   ├── useRooms.ts
│   │   ├── useCommunity.ts
│   │   ├── useDebounce.ts    # Input debouncing
│   │   ├── usePrefetch.ts    # Hover prefetch
│   │   └── use-toast.ts      # Toast notifications
│   │
│   ├── services/             # Business logic layer
│   │   ├── multiLangExecutor.ts    # Code execution (Piston/Judge0)
│   │   ├── codeWrapper.ts          # Language-specific wrappers
│   │   ├── testcaseService.ts      # Problem & testcase fetching
│   │   ├── contestService.ts       # Contest CRUD + real-time
│   │   ├── roomService.ts          # Study room CRUD + real-time
│   │   ├── databaseService.ts      # Generic DB operations
│   │   ├── adminService.ts         # Admin operations
│   │   ├── problemsCache.ts        # Client-side caching
│   │   └── judge0.ts               # Judge0 API client
│   │
│   ├── contexts/             # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   ├── AdminContext.tsx  # Admin role checking
│   │   ├── CollaborationContext.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── EnhancedThemeProvider.tsx
│   │
│   ├── lib/                  # Utility functions
│   │   ├── utils.ts          # cn() class merger
│   │   ├── env.ts            # Environment variables
│   │   └── optimization.ts   # Performance utils (PARTIALLY DISABLED)
│   │
│   ├── types/                # TypeScript definitions
│   │   ├── execution.ts      # Code execution types
│   │   ├── problem.ts
│   │   └── [more types...]
│   │
│   ├── integrations/         # External services
│   │   └── supabase/
│   │       ├── client.ts     # Supabase client config
│   │       └── types.ts      # Generated DB types
│   │
│   ├── App.tsx               # Root component with providers
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── docs/                     # Documentation
│   ├── USER_JOURNEY_MAP.md   # Complete feature docs
│   ├── USER_FLOW_DECISION_TREE.md # Visual navigation map
│   ├── ANALYSIS_SUMMARY.md   # System status report
│   └── [technical docs...]
│
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite bundler config
├── tailwind.config.ts        # Tailwind CSS config
├── components.json           # shadcn/ui config
└── vercel.json               # Deployment config
```

---

## 🔧 SERVICES LAYER

### 1. Code Execution Service

**File:** `src/services/multiLangExecutor.ts`

**Supported Languages (16):**
```typescript
type LanguageId = 
  | "python" | "javascript" | "typescript" | "java" 
  | "cpp" | "c" | "csharp" | "ruby" | "go" | "rust"
  | "swift" | "kotlin" | "php" | "perl" | "scala" | "r";
```

**Key Functions:**
```typescript
// Execute single testcase
executeTestcase(code: string, language: LanguageId, testcase: Testcase)
  → TestcaseExecution

// Execute all testcases (batch)
executeBatch(code: string, language: LanguageId, testcases: Testcase[])
  → BatchExecutionResult

// Quick test (visible testcases only)
quickTest(code: string, language: LanguageId, problemId: string)
  → QuickTestResult
```

**Execution Flow:**
1. Wrap user code with testcase I/O handling (`codeWrapper.ts`)
2. Send to Piston API (POST `/api/v2/execute`)
3. Parse response (stdout, stderr, exitCode, runtime)
4. Normalize output (JSON parsing, float comparison, trim whitespace)
5. Compare with expected output
6. Return verdict: Accepted/WA/RE/TLE/CE

**Output Normalization:**
```typescript
function normalizeOutput(output: string): string {
  // 1. Trim whitespace
  output = output.trim();
  
  // 2. Try JSON parsing (handles formatting differences)
  try {
    const parsed = JSON.parse(output);
    return JSON.stringify(parsed);
  } catch {
    // Not JSON, continue
  }
  
  // 3. Floating point comparison (epsilon 1e-9)
  if (isFloat(output)) {
    return normalizeFloat(output);
  }
  
  // 4. Array/list normalization
  return normalizeArray(output);
}
```

### 2. Testcase Service

**File:** `src/services/testcaseService.ts`

**Key Functions:**
```typescript
// Fetch problems with pagination
getProblems(page: number, limit: number, filters?: {
  difficulty?: string;
  status?: string;
  topics?: string[];
  userId?: string;
}) → Promise<{ problems: Problem[], total: number }>

// Search problems
searchProblems(query: string, limit?: number) 
  → Promise<Problem[]>

// Get single problem by slug
getProblemBySlug(slug: string) 
  → Promise<Problem>

// Get testcases for problem
getTestcasesForProblem(problemId: number) 
  → Promise<Testcase[]>

// Get code template for language
getCodeTemplate(problemId: number, language: LanguageId) 
  → Promise<string>
```

**Caching Strategy:**
```typescript
// 5-minute cache for problems list
cacheProblems(page: number, problems: Problem[], total: number, cacheKey: string)
getCachedProblems(page: number, cacheKey: string)

// Permanent cache for problem detail (invalidate on update)
cacheProblemDetail(slug: string, problem: Problem)
getCachedProblemDetail(slug: string)
```

### 3. Contest Service

**File:** `src/services/contestService.ts`

**Key Functions:**
```typescript
// List contests with filters
getContests(filters?: {
  status?: 'upcoming' | 'active' | 'finished';
  type?: 'weekly' | 'monthly' | 'special';
}) → Promise<Contest[]>

// Get contest by ID
getContestById(contestId: string) 
  → Promise<Contest>

// Register for contest
registerForContest(contestId: string) 
  → Promise<void>

// Submit solution in contest
submitContestSolution(contestId: string, problemId: string, code: string, language: LanguageId)
  → Promise<Submission>

// Get live leaderboard
getContestLeaderboard(contestId: string)
  → Promise<ContestParticipant[]>

// Subscribe to real-time leaderboard updates
subscribeToLeaderboard(contestId: string, callback: (data) => void)
  → RealtimeChannel
```

**Ranking Algorithm:**
```typescript
// Sort by: score DESC → penalty ASC
score = problemPoints - (penaltyTime * 0.2)
penaltyTime = sum of (wrong attempts × 10 minutes)
```

### 4. Room Service

**File:** `src/services/roomService.ts`

**Key Functions:**
```typescript
// Create study room
createRoom(name: string, description: string, topic: string, isPrivate: boolean, maxMembers: number)
  → Promise<StudyRoom>

// Join room
joinRoom(roomId: string)
  → Promise<boolean>

// Leave room
leaveRoom(roomId: string)
  → Promise<void>

// Send chat message
sendMessage(roomId: string, message: string)
  → Promise<RoomMessage>

// Update shared code
updateSharedCode(roomId: string, code: string, language: string)
  → Promise<void>

// Subscribe to real-time chat
subscribeToMessages(roomId: string, callback: (message) => void)
  → RealtimeChannel

// Subscribe to shared code updates
subscribeToSharedCode(roomId: string, callback: (code) => void)
  → RealtimeChannel
```

### 5. Database Service

**File:** `src/services/databaseService.ts`

**Generic CRUD operations with fallback admin check:**

```typescript
// All functions check for fallback admin first:
const isFallbackAdmin = localStorage.getItem('algviz_fallback_admin') === 'true';
if (isFbackAdmin) {
  return { /* skip DB operation */ };
}

// Generic functions:
fetchData(table: string, filters?: any)
insertData(table: string, data: any)
updateData(table: string, id: string, data: any)
deleteData(table: string, id: string)
```

---

## 🪝 HOOKS & STATE MANAGEMENT

### Custom Hooks Pattern

All hooks follow this structure:

```typescript
export function useFeature() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await service.fetchData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [dependencies]);

  return { data, isLoading, error, reload: loadData };
}
```

### TanStack Query Integration

**File:** Many components use `@tanstack/react-query`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching
const { data, isLoading, error } = useQuery({
  queryKey: ['problems', page, filters],
  queryFn: () => getProblems(page, 100, filters),
  staleTime: 1000 * 60 * 5, // 5 minutes
});

// Mutations
const mutation = useMutation({
  mutationFn: submitSolution,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['submissions'] });
  },
});
```

**Benefits:**
- Automatic caching
- Background refetching
- Optimistic updates
- Error retry logic

---

This is **Part 1** of the documentation. Should I continue with:
- Part 2: Component Patterns & Routing
- Part 3: Known Issues & Fixes
- Part 4: Environment Setup & Development Workflow

Let me know if you want me to continue, or if you need any section expanded!
