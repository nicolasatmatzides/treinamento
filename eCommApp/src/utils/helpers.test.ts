import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('helpers', () => {
  it('formats prices as USD', () => {
    expect(formatPrice(12.5)).toBe('$12.50');
  });

  it('calculates the total for cart items', () => {
    expect(
      calculateTotal([
        { price: 2.5, quantity: 2 },
        { price: 1.25, quantity: 3 }
      ])
    ).toBe(8.75);
  });

  it('validates email addresses correctly', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
  });
});
