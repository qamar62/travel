import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600">
                {new Date(item.date).toLocaleDateString()}
                {item.time && ` at ${item.time}`}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 />
            </button>
          </div>

          <div className="mt-4">
            {Object.entries(item.details).map(([key, value]) => (
              <div key={`detail-${item.id}-${key}`} className="text-sm text-gray-600">
                <span className="font-medium">{key}: </span>
                {value}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiMinus />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiPlus />
              </button>
            </div>
            <div className="text-xl font-bold text-primary-600">
              €{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}