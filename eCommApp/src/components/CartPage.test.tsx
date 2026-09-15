import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CartPage from './CartPage';
import { CartContext, CartItem } from '../context/CartContext';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./CheckoutModal', () => ({
    default: ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
        <div data-testid="checkout-modal">
            <button onClick={onConfirm}>Continue Checkout</button>
            <button onClick={onCancel}>Return to cart</button>
        </div>
    )
}));

const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 2,
        image: 'test1.jpg',
        reviews: [],
        inStock: true
    },
    {
        id: '2',
        name: 'Test Product 2',
        price: 49.99,
        quantity: 1,
        image: 'test2.jpg',
        reviews: [],
        inStock: true
    }
];

type MockCartContext = {
    cartItems: CartItem[];
    addToCart: ReturnType<typeof vi.fn>;
    clearCart: ReturnType<typeof vi.fn>;
};

const createMockCartContext = (overrides: Partial<MockCartContext> = {}): MockCartContext => ({
    cartItems: mockCartItems.map(item => ({ ...item, reviews: [...item.reviews] })),
    addToCart: vi.fn(),
    clearCart: vi.fn(),
    ...overrides
});

const renderWithCartContext = (cartContext = createMockCartContext()) => {
    return render(
        <CartContext.Provider value={cartContext}>
            <CartPage />
        </CartContext.Provider>
    );
};

describe('CartPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays cart items when cart has items', () => {
        renderWithCartContext();
        
        expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
        expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Test Product 1' })).toHaveAttribute(
            'src',
            'products/productImages/test1.jpg'
        );
        expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('displays empty cart message when cart is empty', () => {
        renderWithCartContext({ ...createMockCartContext(), cartItems: [] });

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Checkout' })).not.toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('opens the checkout modal when checkout is clicked', async () => {
        const user = userEvent.setup();

        renderWithCartContext();

        await user.click(screen.getByRole('button', { name: 'Checkout' }));

        expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue Checkout' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Return to cart' })).toBeInTheDocument();
    });

    it('closes the checkout modal without clearing the cart when checkout is canceled', async () => {
        const user = userEvent.setup();
        const clearCart = vi.fn();

        renderWithCartContext({ ...createMockCartContext(), clearCart });

        await user.click(screen.getByRole('button', { name: 'Checkout' }));
        await user.click(screen.getByRole('button', { name: 'Return to cart' }));

        expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
        expect(clearCart).not.toHaveBeenCalled();
    });

    it('processes the order and preserves the submitted items when checkout is confirmed', async () => {
        const user = userEvent.setup();
        const clearCart = vi.fn();

        renderWithCartContext({ ...createMockCartContext(), clearCart });

        await user.click(screen.getByRole('button', { name: 'Checkout' }));
        await user.click(screen.getByRole('button', { name: 'Continue Checkout' }));

        expect(clearCart).toHaveBeenCalledOnce();
        expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Your order has been processed!' })).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Your Cart' })).not.toBeInTheDocument();
    });

    it('does not call addToCart while displaying the cart', () => {
        const addToCart = vi.fn();

        renderWithCartContext({ ...createMockCartContext(), addToCart });

        expect(addToCart).not.toHaveBeenCalled();
    });

    it('formats zero prices and zero quantities without crashing', () => {
        renderWithCartContext({
            ...createMockCartContext(),
            cartItems: [{ ...mockCartItems[0], price: 0, quantity: 0 }]
        });

        expect(screen.getByText('Price: $0.00')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 0')).toBeInTheDocument();
    });

    it('throws when rendered without CartContext', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        try {
            expect(() => render(<CartPage />)).toThrow(
                'CartContext must be used within a CartProvider'
            );
        } finally {
            consoleError.mockRestore();
        }
    });
});
