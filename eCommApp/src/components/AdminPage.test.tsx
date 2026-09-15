import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
  it('updates the sale message with a valid percentage', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Set Sale Percent/i), '15');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('All products are 15% off!')).toBeInTheDocument();
  });

  it('shows an error when the discount input is invalid', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Set Sale Percent/i), 'abc');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid number\./i)).toBeInTheDocument();
  });

  it('resets the sale when the end sale action is triggered', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Set Sale Percent/i), '25');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await user.click(screen.getByRole('button', { name: 'End Sale' }));

    expect(screen.getByText('No sale active.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Set Sale Percent/i)).toHaveValue('0');
  });
});
