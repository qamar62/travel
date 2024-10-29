import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItemType } from '../types/cart';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyCart from '../components/cart/EmptyCart';

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const newItem = location.state?.newItem;

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const initialCart = savedCart ? JSON.parse(savedCart) : [];

    if (newItem) {
      const existingItemIndex = initialCart.findIndex((item: CartItemType) => 
        item.type === newItem.type &&
        item.title === newItem.title &&
        item.date === newItem.date &&
        item.time === newItem.time &&
        JSON.stringify(item.details) === JSON.stringify(newItem.details)
      );

      if (existingItemIndex >= 0) {
        initialCart[existingItemIndex].quantity += 1;
      } else {
        const uniqueId = `${newItem.type}-${Date.now()}-${Math.random().toString(36).substring(2)}`;
        initialCart.push({
          ...newItem,
          id: uniqueId
        });
      }
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }

    setCartItems(initialCart);
  }, [newItem]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={`cart-item-${item.id}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            items={cartItems}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}