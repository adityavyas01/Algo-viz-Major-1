/**
 * Dashboard Page Tests
 * Verifies Phase 1 critical bug fixes:
 * 1. Component renders without crash (navigate is defined)
 * 2. Header and tabs are present
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => true,
}));

// Mock recharts completely
vi.mock('recharts', () => {
  const Stub = ({ children }: any) => <div>{children}</div>;
  return {
    ResponsiveContainer: Stub,
    AreaChart: Stub,
    Area: Stub,
    XAxis: Stub,
    YAxis: Stub,
    CartesianGrid: Stub,
    Tooltip: Stub,
    PieChart: Stub,
    Pie: Stub,
    Cell: Stub,
    RadialBarChart: Stub,
    RadialBar: Stub,
    Legend: Stub,
    BarChart: Stub,
    Bar: Stub,
    LineChart: Stub,
    Line: Stub,
  };
});

// Mock supabase
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
    }),
    functions: {
      invoke: () => Promise.resolve({ data: { recommendations: [], weakTopic: null }, error: null }),
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthProvider>
          <AdminProvider>
            {ui}
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Dashboard Page', () => {
  it('renders without crashing (navigate is properly imported)', async () => {
    const { default: Dashboard } = await import('@/pages/Dashboard');
    // This would crash before the fix because navigate was not imported
    expect(() => renderWithProviders(<Dashboard />)).not.toThrow();
  });

  it('renders header text and all tabs', async () => {
    const { default: Dashboard } = await import('@/pages/Dashboard');
    renderWithProviders(<Dashboard />);

    expect(screen.getAllByText('Welcome to Your Learning Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Overview/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Learning Hub/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Recommendations/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Learning Paths/i).length).toBeGreaterThan(0);
  });
});
