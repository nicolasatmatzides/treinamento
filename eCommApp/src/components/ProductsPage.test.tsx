import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';
import ProductsPage from './ProductsPage';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apple',
    price: 0.5,
    description: 'A juicy red apple',
    image: 'apple.png',
    reviews: [],
    inStock: true
  },
  {
    id: '2',
    name: 'Grapes',
    price: 1.5,
    description: 'Sweet green grapes',
    image: 'grapes.png',
    reviews: [],
    inStock: true
  },
  {
    id: '3',
    name: 'Orange',
    price: 1.2,
    description: 'Citrus-packed orange',
    image: 'orange.png',
    reviews: [],
    inStock: true
  },
  {
    id: '4',
    name: 'Pear',
    price: 0.8,
    description: 'Soft and sweet pear',
    image: 'pear.png',
    reviews: [],
    inStock: true
  }
];

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        const fileName = url.split('/').pop();
        const product = mockProducts.find(item => `${item.name.toLowerCase()}.json` === fileName);

        if (!product) {
          return {
            ok: false,
            json: async () => ({})
          } as Response;
        }

        return {
          ok: true,
          json: async () => product
        } as Response;
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads products and adds the selected product to the cart', async () => {
    const addToCart = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartContext.Provider value={{ cartItems: [], addToCart, clearCart: vi.fn() }}>
          <ProductsPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Our Products')).toBeInTheDocument();
    });

    await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);

    expect(addToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        name: 'Apple'
      })
    );
  });

  it('disables the purchase button when an item is out of stock', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        const fileName = url.split('/').pop();
        const product = mockProducts.find(item => `${item.name.toLowerCase()}.json` === fileName);
        const adjusted = product ? { ...product, inStock: false } : product;

        return {
          ok: true,
          json: async () => adjusted
        } as Response;
      })
    );

    render(
      <MemoryRouter>
        <CartContext.Provider value={{ cartItems: [], addToCart: vi.fn(), clearCart: vi.fn() }}>
          <ProductsPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Our Products')).toBeInTheDocument();
    });

    const outOfStockButtons = screen.getAllByRole('button', { name: 'Out of Stock' });
    expect(outOfStockButtons.length).toBeGreaterThan(0);
    outOfStockButtons.forEach(button => expect(button).toBeDisabled());
  });

  it('handles fetch failures without crashing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('Network failure');
      })
    );

    render(
      <MemoryRouter>
        <CartContext.Provider value={{ cartItems: [], addToCart: vi.fn(), clearCart: vi.fn() }}>
          <ProductsPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Our Products')).toBeInTheDocument();
    });

    expect(screen.getByText('Our Products')).toBeInTheDocument();
  });
});
