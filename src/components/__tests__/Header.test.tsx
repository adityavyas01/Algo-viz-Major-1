// src/components/__tests__/Header.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { Header } from '@/components/Header';

describe('Header', () => {
  it('renders the logo and navigation links', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <AdminProvider>
              <Header />
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    // Check for the logo
    expect(screen.getByText('AlgoViz')).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText('Learning')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Challenges')).toBeInTheDocument();
    // Dashboard is only visible when logged in, so it shouldn't be here in the default state
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('shows Login and Register buttons when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <AdminProvider>
              <Header />
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
