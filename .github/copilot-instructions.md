# AlgoViz - Complete AI Coding Agent Instructions

## Project Overview
AlgoViz is a comprehensive algorithm visualization and competitive programming platform combining:
- **LeetCode/HackerRank**: Multi-language code execution (15+ languages via Piston API), 500+ problems with testcases, submissions tracking
- **Codeforces**: Rating system, live contests, leaderboards, user statistics
- **Discord**: Study rooms, real-time chat, collaborative coding sessions

**Tech Stack**: React 18.3, TypeScript 5.5, Vite 5.4, Supabase (PostgreSQL), shadcn/ui, TanStack Query, Monaco Editor, Framer Motion, React Three Fiber

## Complete Route Structure

### Public Routes
- `/` - Home page with Hero and featured visualizations
- `/login`, `/register` - Authentication (bypassed with mock user)
- `/forgot-password`, `/reset-password` - Password recovery
- `/email-verification`, `/email-verification-success` - Email verification flow

### Protected Routes (Require Auth)
- `/dashboard` - Main dashboard with tabs: Overview, Learning Hub, Recommendations, Learning Paths
- `/learning` - Algorithm learning page router
- `/learn/:algorithmId` - Individual algorithm article page
- `/profile` - User profile with stats and settings
- `/profile/certificates` - User certificates page
- `/verify-certificate/:verificationKey` - Certificate verification
- `/community` - Community features
- `/challenges` - Daily challenges panel
- `/practice` - Practice problems listing
- `/skills-assessment` - Skills assessment quiz
- `/leaderboard` - Global/category leaderboards
- `/advanced-features` - Advanced platform features

### Problem Solving Routes
- `/problems` - Browse all coding problems (LeetCode-style)
- `/problem/:problemId` - Full problem view with Monaco editor, testcases, submissions
- `/code-runner` - Multi-language code execution demo

### Contest Routes
- `/contests` - Browse upcoming/active/finished contests
- `/contest/:contestId` - Contest view with problems, timer, leaderboard

### Collaboration Routes
- `/rooms` - Study rooms listing
- `/room/:roomId` - Study room with chat and collaboration
- `/session/:sessionId` - Collaborative coding session
- `/collaborate/:sessionId` - Real-time collaboration interface

### Admin Routes (Require Admin Role)
- `/admin` - Redirects to `/admin/categories`
- `/admin/categories` - Manage algorithm categories
- `/admin/algorithms` - Manage algorithms
- `/admin/articles` - Manage learning articles

## Architecture Patterns

### Path Aliases (CRITICAL)
**ALWAYS use `@/` imports - never relative paths across directories**:
```typescript
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { executeCode } from "@/services/piston";
```
Configured in [tsconfig.json](tsconfig.json) (`baseUrl: ".", paths: { "@/*": ["./src/*"] }`) and [vite.config.ts](vite.config.ts) (`alias: { "@": path.resolve(__dirname, "./src") }`).

### Component Architecture

#### 1. UI Components ([src/components/ui](src/components/ui/))
**shadcn/ui components** - 50+ components including:
- Core: `button`, `card`, `input`, `label`, `textarea`, `select`, `dialog`, `sheet`
- Data: `table`, `tabs`, `accordion`, `badge`, `progress`, `slider`
- Overlays: `toast`, `popover`, `tooltip`, `dropdown-menu`, `context-menu`
- Navigation: `navigation-menu`, `breadcrumb`, `pagination`
- Charts: `chart` (Recharts wrapper)

**Pattern**: All use `React.forwardRef`, styled with Tailwind + `cn()` utility:
```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

#### 2. Modern Visualizations ([src/components/modern](src/components/modern/))
**40+ interactive algorithm visualizations**:
- **Sorting**: BubbleSort, QuickSort, MergeSort, InsertionSort, SelectionSort, HeapSort, RadixSort
- **Trees**: BinaryTree, AVLTree, BTree, BPlusTree, RedBlackTree, SegmentTree, Trie
- **Heaps**: Heap, BinomialHeap, FibonacciHeap
- **Graphs**: Graph, GraphTraversal (BFS/DFS), Dijkstra, AdvancedGraphAlgorithms
- **Data Structures**: Stack, Queue, LinkedList, HashTable, UnionFind, BloomFilter
- **Advanced**: DynamicProgramming, Backtracking, StringMatching, NumberTheory, ComputationalGeometry

**Export pattern**: All export both named and default:
```typescript
export const ModernMergeSortVisualization = () => { ... }
export default ModernMergeSortVisualization;
```

#### 3. Feature Components ([src/components](src/components/))
**100+ specialized components**:
- **Auth**: `AuthGuard`, `AuthAwareFeature`, `AdminGuard`
- **Gamification**: `GamificationWidget`, `AchievementBadge`, `DailyChallengesPanel`, `Leaderboard`
- **Learning**: `PersonalizedRecommendations`, `InteractiveLearningPaths`, `LearningHub`, `CurriculumIntegration`
- **Code Editing**: `CodeEditor`, `EnhancedCodeEditor`, `ProfessionalCodeEditor`, `LanguageSelector`, `ExecutionResult`
- **Collaboration**: `CollaborativeSession`, `RealTimeCollaboration`, `SharedWorkspace`, `SessionManagement`
- **Problems**: `ProblemView`, `SubmissionHistory`, `LeetCodeQuestions`
- **Contests**: `ContestView`, `TournamentManagement`
- **Analytics**: `BehaviorAnalytics`, `ProgressTracker`, `ActivityFeed`
- **UI Enhancement**: `ErrorBoundary`, `PWAProvider`, `PageLoader`, `MotionWrapper`, `PageTransition`

### State Management Deep Dive

#### Global Context Providers (Must Wrap in This Order)
```tsx
<ThemeProvider>
  <EnhancedThemeProvider>
    <Router>
      <AuthProvider>        {/* CRITICAL: Bypassed with mock user */}
        <AdminProvider>      {/* Checks admin role */}
          <CollaborationProvider>  {/* WebSocket/real-time */}
            <PWAProvider>
              {children}
            </PWAProvider>
          </CollaborationProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  </EnhancedThemeProvider>
</ThemeProvider>
```

#### AuthContext ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx))
**CRITICAL**: Auth is **BYPASSED** - all users auto-authenticated as mock user:
```typescript
// Lines 38-58: Mock user created immediately
const mockUser = {
  id: 'mock-user-id',
  email: 'demo@algoviz.com',
  email_confirmed_at: new Date().toISOString(),
  user_metadata: { full_name: 'Demo User' },
  ...
} as User;
setUser(mockUser);
setSession(mockSession);
```
**Functions available**: `signUp`, `signIn`, `signOut`, `resetPassword`, `signInWithMagicLink` (all work with mock auth)

#### CollaborationContext ([src/contexts/CollaborationContext.tsx](src/contexts/CollaborationContext.tsx))
Provides real-time collaboration features:
- **Connection**: Socket.io client (mock in dev, real WebSocket in prod)
- **Sessions**: `createSession`, `joinSession`, `leaveSession`
- **Users**: `connectedUsers`, `userCursors`, `updateCursorPosition`
- **Chat**: `messages[]`, `sendMessage`
- **Algorithms**: `algorithmState`, `algorithmActions`, `executeAlgorithmAction`, `syncAlgorithmStep`
- **Code**: `sharedCode`, `updateSharedCode`

#### AdminContext
Checks user role against `admin_roles` table. Provides `isAdmin` boolean.

### Server State (TanStack Query)
Configured in [App.tsx](src/App.tsx):
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        if (httpError.status >= 400 && httpError.status < 500) return false;
        return failureCount < 3;
      },
    },
  },
});
```

### Database Integration

#### Supabase Client ([src/integrations/supabase/client.ts](src/integrations/supabase/client.ts))
```typescript
export const supabase = createClient<Database>(
  env.SUPABASE_URL, 
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'  // PKCE flow for security
    }
  }
);
```

#### Database Schema (19 Migrations)
**Key tables**:
1. **`problems`** - Coding problems (title, description, difficulty, category, time_limit, memory_limit, acceptance_rate)
2. **`testcases`** - Test inputs/outputs (input, expected_output, is_hidden, type, time_limit, memory_limit)
3. **`submissions`** - User code submissions (code, language, status, verdict, passed_testcases, runtime, memory, score)
4. **`submission_results`** - Per-testcase results (testcase_id, passed, actual_output, error_message, runtime)
5. **`user_problem_progress`** - User progress tracking (status: not_attempted/attempted/solved, attempts, best_submission_id)
6. **`contests`** - Contest metadata (title, description, start_time, duration, type, status, total_participants)
7. **`contest_problems`** - Contest-problem mapping (contest_id, problem_id, order_index, points)
8. **`contest_submissions`** - Contest-specific submissions
9. **`contest_participants`** - User contest registrations (rank, score, penalty)
10. **`study_rooms`** - Collaborative study rooms (name, algorithm_topic, max_participants, is_private, password_hash)
11. **`room_participants`** - Room membership
12. **`room_messages`** - Room chat messages
13. **`user_stats`** - User statistics (level, experience, total_points, current_streak, algorithms_completed, rank)
14. **`user_progress`** - Algorithm learning progress
15. **`user_bookmarks`** - Saved algorithms
16. **`certifications`** - User certificates
17. **`admin_roles`** - Admin permissions

**Row Level Security**: Enabled on all tables with policies for user access control.

### Custom Hooks Deep Dive

#### useCodeExecution ([src/hooks/useCodeExecution.ts](src/hooks/useCodeExecution.ts))
Manages code execution state:
```typescript
const {
  isExecuting,           // Boolean loading state
  executionResult,       // ExecutionResult | null
  batchResult,          // BatchExecutionResult | null
  error,                // string | null
  executeCode,          // (code, language, stdin) => Promise<ExecutionResult>
  executeTestcases,     // (code, language, testcases[]) => Promise<BatchExecutionResult>
  clearResults,         // () => void
  getLanguageTemplate   // (language) => string
} = useCodeExecution();
```

#### useSubmission ([src/hooks/useSubmission.ts](src/hooks/useSubmission.ts))
Handles problem submissions:
```typescript
const {
  submission,           // Submission metadata
  results,             // Testcase results
  isSubmitting,        // Loading state
  submitCode,          // (problemId, code, language) => Promise<void>
  clearResults
} = useSubmission();
```

#### useContest ([src/hooks/useContest.ts](src/hooks/useContest.ts))
```typescript
const { contests, isLoading } = useContests({ status, type });
const { contest, problems, isLoading } = useContest(contestId);
const { leaderboard, isLoading } = useContestLeaderboard(contestId);
const { announcements } = useContestAnnouncements(contestId);
const { timeLeft, status } = useContestTimer(contest);
```

#### useDatabase ([src/hooks/useDatabase.ts](src/hooks/useDatabase.ts))
```typescript
const { data: progress, loading, error, refetch } = useUserProgress();
const { data: bookmarks } = useUserBookmarks();
const { data: stats } = useUserStats();
```

#### useRoom ([src/hooks/useRoom.ts](src/hooks/useRoom.ts))
```typescript
const { rooms, isLoading } = useRooms();
const { room, participants, messages, isLoading } = useRoom(roomId);
```

### Services Layer

#### Piston API Service ([src/services/piston.ts](src/services/piston.ts))
Multi-language code execution via free Piston API (https://emkc.org/api/v2/piston):
```typescript
export const SUPPORTED_LANGUAGES: Record<LanguageId, Language> = {
  javascript, typescript, python, java, cpp, c, csharp, go, rust, kotlin,
  swift, ruby, php, scala, haskell, dart, lua, perl, r
};

export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult>
export function getTemplate(language: LanguageId): string
export function validateExecutionRequest(request: ExecutionRequest): ValidationResult
```

**Rate limit**: 5 requests/second. **No API key required**.

#### Multi-Language Executor ([src/services/multiLangExecutor.ts](src/services/multiLangExecutor.ts))
Handles testcase execution:
```typescript
export async function executeTestcase(code, language, testcase): Promise<TestcaseExecution>
export async function executeBatch(code, language, testcases[]): Promise<BatchExecutionResult>
export async function quickTest(code, language, stdin): Promise<ExecutionResult>
export function compareOutputs(actual, expected, strict): boolean
```

**Verdict types**: `Accepted`, `Wrong Answer`, `Runtime Error`, `Time Limit Exceeded`, `Compilation Error`, `Memory Limit Exceeded`

#### Other Services
- **testcaseService.ts** - CRUD for problems/testcases
- **contestService.ts** - Contest management
- **roomService.ts** - Study room operations
- **challengeExecutor.ts** - Challenge validation

### Styling System

#### Tailwind + CSS Variables
Theme colors defined as CSS variables in [src/index.css](src/index.css):
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  ...
}
```

#### cn() Utility ([src/lib/utils.ts](src/lib/utils.ts))
**ALWAYS use for className merging**:
```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className  // Allow prop override
)} />
```
Combines `clsx` + `tailwind-merge` to handle Tailwind class conflicts.

#### Animation System
- **Framer Motion**: Page transitions via `AnimatePresence` + `PageTransition` wrapper
- **Motion components**: `MotionWrapper` for stagger animations
- **Tailwind animations**: `tailwindcss-animate` plugin for built-in animations

## Development Workflows

### Commands
```powershell
npm run dev              # Dev server → http://localhost:8080
npm run build            # Production build (Vite)
npm run preview          # Preview production build
npm run type-check       # TypeScript validation (noEmit)
npm test                 # Vitest tests
npm run test:ui          # Vitest UI
npm run lint             # ESLint
npm run lint:fix         # ESLint auto-fix
```

### Testing
- **Framework**: Vitest with jsdom environment
- **Setup**: [vitest.config.ts](vitest.config.ts), setup file: [src/test/setup.ts](src/test/setup.ts)
- **Libraries**: `@testing-library/react`, `@testing-library/jest-dom`
- **Example tests**: [src/components/__tests__/](src/components/__tests__/)

### Code Quality
- **ESLint**: TypeScript ESLint with React hooks plugin
- **Config**: [eslint.config.js](eslint.config.js)
- **Disabled rules**: `@typescript-eslint/no-unused-vars` (intentionally off)

## Project-Specific Conventions

### Import Order (Strictly Follow)
```typescript
// 1. External libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 2. UI components (shadcn/ui)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// 3. Feature components
import { AlgorithmSelector } from "@/components/AlgorithmSelector";
import { ExecutionResult } from "@/components/ExecutionResult";

// 4. Contexts and hooks
import { useAuth } from "@/contexts/AuthContext";
import { useCodeExecution } from "@/hooks/useCodeExecution";

// 5. Services and utilities
import { supabase } from "@/integrations/supabase/client";
import { executeCode } from "@/services/piston";
import { cn } from "@/lib/utils";

// 6. Types
import type { Problem, Testcase } from "@/services/testcaseService";
```

### TypeScript Configuration
**Relaxed strict mode** ([tsconfig.json](tsconfig.json)):
```json
{
  "noImplicitAny": false,
  "strictNullChecks": false,
  "noUnusedParameters": false,
  "noUnusedLocals": false
}
```
**Why**: Legacy codebase prioritizing rapid development over strict type safety.

### Component Patterns

#### Page Components
```typescript
// Lazy-load all pages except core (Home, Login, Register)
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

// Page structure
const PageName = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Content */}
      </main>
    </div>
  );
};
export default PageName;
```

#### Visualization Components
```typescript
// Export both named and default
export const ModernAlgoVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  return (
    <div className="visualization-container">
      <canvas ref={canvasRef} />
      <Controls onPlay={handlePlay} />
    </div>
  );
};
export default ModernAlgoVisualization;
```

### Route Protection Pattern
```typescript
<Route 
  path="/admin/categories" 
  element={
    <ProtectedRoute requireAdmin>
      <ManageCategoriesPage />
    </ProtectedRoute>
  } 
/>
```

## Critical Implementation Details

### Multi-Language Execution Flow
1. User writes code in Monaco Editor
2. Selects language via `<LanguageSelector>`
3. Clicks "Run" or "Submit"
4. **Run**: `executeCode()` → Piston API → Display output
5. **Submit**: `submitCode()` → Execute against all testcases (hidden + visible) → Store in `submissions` table → Display verdict

### Problem Submission Flow
```typescript
// 1. Load problem + testcases
const problem = await getProblemById(problemId);
const testcases = await getTestcasesForProblem(problemId, false); // visible only

// 2. Execute code
const result = await executeBatch(code, language, testcases);

// 3. Submit to database
await submitCode(problemId, code, language); // Executes ALL testcases server-side

// 4. Update user progress
// Automatic via database triggers
```

### Contest System Flow
1. User browses `/contests` - filtered by status (upcoming/active/finished) and type (weekly/monthly/special)
2. Joins contest → Creates `contest_participants` record
3. Accesses contest → `/contest/:contestId` - Shows problems, timer, leaderboard
4. Solves problems → Submissions tracked in `contest_submissions`
5. Leaderboard updates in real-time → Sorted by score, then penalty (time-based)

### Study Room Collaboration
1. User creates/joins room → `/rooms`
2. Room interface → `/room/:roomId`
3. Features: Live chat (`room_messages`), participant list, code sharing, algorithm selection
4. Real-time sync via `CollaborationContext` (WebSocket in prod, mock in dev)

## Common Pitfalls & Solutions

1. **Mock Auth Bypass**: Don't try to implement real auth without removing the mock user override in [AuthContext.tsx](src/contexts/AuthContext.tsx#L38-L58).

2. **Path Aliases**: Never use `../../components/ui/button`. Always use `@/components/ui/button`.

3. **Lazy Loading**: All new pages must use `React.lazy()` to maintain code-splitting:
   ```typescript
   const NewPage = React.lazy(() => import("@/pages/NewPage"));
   ```

4. **Context Order**: Provider hierarchy is critical. `AuthProvider` must be inside `Router` but outside other providers.

5. **Environment Variables**: Access via `import.meta.env.VITE_*`. Use [src/lib/env.ts](src/lib/env.ts) for validated access with defaults.

6. **Supabase Queries**: Always check auth status before queries:
   ```typescript
   if (!user) return;
   const { data } = await supabase.from('table').select('*').eq('user_id', user.id);
   ```

7. **TypeScript Errors**: Project has relaxed TS config. Don't add strict type checks - follow existing patterns.

8. **Visualization Exports**: Always export both named AND default:
   ```typescript
   export const MyVisualization = () => { ... };
   export default MyVisualization;
   ```

9. **Monaco Editor**: Import via `@monaco-editor/react`, not `monaco-editor` directly.

10. **TanStack Query**: Always provide `queryKey` and use proper stale time:
    ```typescript
    const { data } = useQuery({
      queryKey: ['problems', filters],
      queryFn: () => getProblems(page, limit, filters),
      staleTime: 1000 * 60 * 5
    });
    ```

## Performance Optimizations

- **Code Splitting**: All pages lazy-loaded via `React.lazy()`
- **Query Caching**: TanStack Query with 5-min stale time
- **Memoization**: `useCallback`, `useMemo` in heavy components
- **Performance Monitor**: [src/lib/performance.ts](src/lib/performance.ts) tracks metrics
- **PWA**: Offline support via service worker ([public/sw.js](public/sw.js))
- **Bundle Analysis**: Available via npm scripts

## Key Files Reference

### Must-Read Files
- [src/App.tsx](src/App.tsx) - Route structure, provider hierarchy, lazy loading
- [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) - Mock auth system
- [src/contexts/CollaborationContext.tsx](src/contexts/CollaborationContext.tsx) - Real-time features
- [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts) - Database client
- [src/services/piston.ts](src/services/piston.ts) - Code execution API
- [src/hooks/useCodeExecution.ts](src/hooks/useCodeExecution.ts) - Code execution logic
- [src/components/ProblemView.tsx](src/components/ProblemView.tsx) - Full problem solving interface

### Database Migrations
- [supabase/migrations/20260124000000_advanced_testcases.sql](supabase/migrations/20260124000000_advanced_testcases.sql) - Problems, testcases, submissions
- [supabase/migrations/20260124010000_contests.sql](supabase/migrations/20260124010000_contests.sql) - Contest system
- [supabase/migrations/20260124020000_study_rooms.sql](supabase/migrations/20260124020000_study_rooms.sql) - Collaboration rooms

This is a mature, feature-rich platform with complex data flows. Always trace data from UI → Hook → Service → Database to understand implementation.
