import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

describe('ReviewModal', () => {
  const product: Product = {
    id: 'apple-1',
    name: 'Apple',
    price: 1.5,
    reviews: [
      { author: 'Alice', comment: '<strong>Great</strong>', date: '2024-01-01T00:00:00.000Z' }
    ],
    inStock: true
  };

  it('returns null when no product is supplied', () => {
    const { container } = render(
      <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('submits a review for the selected product', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Bob');
    await user.type(screen.getByPlaceholderText('Your review'), 'Fresh and crisp');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        author: 'Bob',
        comment: 'Fresh and crisp',
        date: expect.any(String)
      })
    );
  });
});
