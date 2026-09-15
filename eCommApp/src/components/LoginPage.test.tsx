import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const renderLogin = () =>
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<div>Admin page</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('navigates to the admin page when credentials are valid', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByPlaceholderText('Username'), 'admin');
    await user.type(screen.getByPlaceholderText('Password'), 'admin');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Admin page')).toBeInTheDocument();
  });

  it('shows an error message when credentials are invalid', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByPlaceholderText('Username'), 'admin');
    await user.type(screen.getByPlaceholderText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});
