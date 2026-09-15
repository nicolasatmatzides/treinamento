import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const testProduct: Product = {
    id: 'product-1',
    name: 'Test Product',
    price: 12.5,
    image: 'test-product.jpg',
    reviews: [],
    inStock: true
};

const CartConsumer = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    return (
        <>
            <p data-testid="cart-count">{cartContext.cartItems.length}</p>
            <p data-testid="item-quantity">{cartContext.cartItems[0]?.quantity ?? 0}</p>
            <button onClick={() => cartContext.addToCart(testProduct)}>Add product</button>
            <button onClick={cartContext.clearCart}>Clear cart</button>
        </>
    );
};

describe('CartProvider', () => {
    it('starts with an empty cart', () => {
        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('item-quantity')).toHaveTextContent('0');
    });

    it('adds a new product with quantity one', async () => {
        const user = userEvent.setup();

        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        await user.click(screen.getByRole('button', { name: 'Add product' }));

        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('item-quantity')).toHaveTextContent('1');
    });

    it('increments the quantity when the same product is added again', async () => {
        const user = userEvent.setup();

        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: 'Add product' });
        await user.click(addButton);
        await user.click(addButton);

        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('item-quantity')).toHaveTextContent('2');
    });

    it('clears all cart items', async () => {
        const user = userEvent.setup();

        render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>
        );

        await user.click(screen.getByRole('button', { name: 'Add product' }));
        await user.click(screen.getByRole('button', { name: 'Clear cart' }));

        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('item-quantity')).toHaveTextContent('0');
    });
});
