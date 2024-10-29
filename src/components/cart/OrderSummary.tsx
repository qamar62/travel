import { CartItemType } from '../../types/cart';

interface OrderSummaryProps {
  items: CartItemType[];
  onCheckout: () => void;
}

export default function OrderSummary({ items, onCheckout }: OrderSummaryProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`summary-item-${item.id}`} className="flex justify-between text-gray-600">
            <span>{item.title}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary-600">€{calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full btn-primary mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}