import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    it('displays the checkout confirmation content', () => {
        render(<CheckoutModal onConfirm={vi.fn()} onCancel={vi.fn()} />);

        expect(screen.getByRole('heading', { name: 'Are you sure?' })).toBeInTheDocument();
        expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue Checkout' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Return to cart' })).toBeInTheDocument();
    });

    it('calls onConfirm when checkout is continued', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();

        render(<CheckoutModal onConfirm={onConfirm} onCancel={vi.fn()} />);

        await user.click(screen.getByRole('button', { name: 'Continue Checkout' }));

        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it('calls onCancel when returning to the cart', async () => {
        const user = userEvent.setup();
        const onCancel = vi.fn();

        render(<CheckoutModal onConfirm={vi.fn()} onCancel={onCancel} />);

        await user.click(screen.getByRole('button', { name: 'Return to cart' }));

        expect(onCancel).toHaveBeenCalledOnce();
    });
});
