AlgoViz - AI Coding Agent Instructions (Updated 2026 Architecture)
Project Overview

AlgoViz is a production-grade algorithm learning and competitive programming platform combining:

LeetCode-style System
3,800+ problems, 60,000+ code templates (16 languages), hidden testcases, submission history, verdict engine

Codeforces-style Contests
Weekly/monthly/special contests, leaderboard ranking (score DESC → penalty ASC), real-time updates

Collaborative Learning Platform
Study rooms, shared code editing, chat, algorithm state sync

Gamified Learning System
XP, levels, streaks, achievements, certifications

Tech Stack

Frontend

React 18.3

TypeScript 5.5 (relaxed strict mode)

Vite 5.4

TanStack Query

shadcn/ui (50+ components)

Framer Motion

Monaco Editor

React Three Fiber

Backend

Supabase (PostgreSQL + RLS + Realtime)

39+ migrations

35+ tables

Extensive triggers & indexes

Code Execution

Piston API (primary free execution)

Judge0 CE (self-hosted optional)

RapidAPI Judge0 fallback (paid optional)

CRITICAL RULES FOR AI AGENTS
1️⃣ ALWAYS Use Path Aliases

NEVER use relative cross-directory imports.

Correct:

import { Button } from "@/components/ui/button";

Wrong:

import { Button } from "../../components/ui/button";

Alias config:

tsconfig.json

vite.config.ts

2️⃣ Respect Provider Hierarchy (Do Not Change Order)

In App.tsx:

<ErrorBoundary>
  <QueryClientProvider>
    <ThemeProvider>
      <EnhancedThemeProvider>
        <Router>
          <AuthProvider>
            <AdminProvider>
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

Breaking this order will cause runtime failures.

3️⃣ Auth Is Mocked (Development Mode)

In AuthContext.tsx, a mock user is injected automatically.

This is intentional for demo/dev mode.

Do NOT:

Attempt to reimplement auth randomly

Add auth guards outside ProtectedRoute

If production auth is required, remove mock override first.

4️⃣ All Pages Must Be Lazy-Loaded

Except core pages (Home, Login, Register).

Correct:

const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
5️⃣ Visualization Components

All modern visualizations must:

Export both named AND default

Use shared base patterns

Avoid direct DOM manipulation outside canvas wrapper

Correct pattern:

export const ModernMergeSortVisualization = () => { ... };
export default ModernMergeSortVisualization;
Architecture Overview
Route Structure
Public

/

/login

/register

/forgot-password

/reset-password

/email-verification

/email-verification-success

Protected

/dashboard

/learning

/learn/:algorithmId

/profile

/profile/certificates

/community

/challenges

/practice

/skills-assessment

/leaderboard

/advanced-features

Problems

/problems

/problem/:slug

/code-runner

Contests

/contests

/contest/:contestId

Collaboration

/rooms

/room/:roomId

/session/:sessionId

/collaborate/:sessionId

Admin

/admin/categories

/admin/algorithms

/admin/articles

All admin routes must use:

<ProtectedRoute requireAdmin>
Database Architecture (39+ Migrations)
Core Tables
Problems System

problems (3,800+ rows, integer ID = LeetCode-style ID)

code_templates (16 languages × problems)

hints

testcases (hidden + visible)

submissions

submission_results

user_problem_progress

Contest System

contests

contest_problems

contest_participants

contest_submissions

contest_announcements

Collaboration

study_rooms

room_members

room_messages

room_shared_code

Community

community_groups

community_group_members

community_group_discussions

shared_visualizations

visualization_likes

activity_feed

user_connections

Gamification

user_stats

achievements

certificates

user_quiz_progress

All tables use:

Row Level Security

Proper foreign keys

Indexed performance queries

Never bypass RLS.

Code Execution System
Execution Flow

User writes code (Monaco)

Selects language

Clicks Run → quickTest()

Clicks Submit → executeBatch() on ALL testcases

Store submission

Store per-testcase results

Update progress via triggers

Verdict Types

Accepted

Wrong Answer

Runtime Error

Time Limit Exceeded

Compilation Error

Memory Limit Exceeded

Output normalization is required:

Floating point epsilon (1e-9)

JSON deep comparison

Language-specific normalization

Never compare raw strings blindly.

Custom Hooks Pattern

All hooks must return:

{
  data,
  loading,
  error,
  ...actions
}

Standardized structure across:

useCodeExecution

useSubmission

useContest

useRoom

useDatabase

useCommunity

TanStack Query Rules

Always:

useQuery({
  queryKey: ['entity', params],
  queryFn: fetchFunction,
  staleTime: 1000 * 60 * 5
});

Never:

Use fetch directly inside components for server state

Forget query keys

Styling Rules
Always use cn() for class merging
className={cn("base", condition && "conditional", className)}

Never manually concatenate Tailwind classes.

Performance Rules

All pages lazy-loaded

Infinite scroll must be throttled

Search must be debounced (500ms)

Use memoization in heavy visualizations

Prefetch on hover where applicable

Do not remove performanceMonitor

TypeScript Configuration

Strict mode is relaxed intentionally:

{
  "noImplicitAny": false,
  "strictNullChecks": false
}

Do NOT refactor entire project to strict mode unless explicitly instructed.

Common Mistakes to Avoid

Using relative imports instead of @/

Breaking provider hierarchy

Removing mock auth without handling flows

Comparing outputs without normalization

Adding new pages without lazy loading

Skipping RLS checks

Bypassing services and calling Supabase directly in components

Forgetting to export both named + default in visualizations

Ignoring performance optimizations

Introducing blocking synchronous loops in visualizations

Required Reading Before Modifying

src/App.tsx

src/contexts/AuthContext.tsx

src/contexts/CollaborationContext.tsx

src/services/multiLangExecutor.ts

src/services/testcaseService.ts

src/services/contestService.ts

src/components/ProblemView.tsx

Development Commands
npm run dev
npm run build
npm run preview
npm run type-check
npm test
npm run lint
Architectural Principle

All features must follow:

UI → Hook → Service → Database

Never collapse layers.

This is a large-scale, production-ready system.

AI agents must prioritize:

Structural consistency

Performance safety

RLS compliance

Code-splitting discipline

Execution correctness

Do not introduce shortcuts.