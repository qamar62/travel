import React, { useState } from 'react';

interface AddonProps {
  icon: string; // Emoji icon
  title: string;
  short_detail: string;
  price: number;
  onQuantityChange: (quantity: number) => void; // Callback to handle quantity change
}

const Addon: React.FC<AddonProps> = ({ icon, title, short_detail, price, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(0, parseInt(e.target.value) || 0);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // Notify parent component of quantity change
  };

  return (
    <div className="flex items-start p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <span className="text-2xl mr-3">{icon}</span>
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-primary-900">{title}</h3>
        <p className="text-gray-600">{short_detail}</p>
        <span className="font-bold text-primary-700">د.إ{price}</span>
        <div className="flex items-center mt-2">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            className="w-16 border rounded-md p-1"
          />
          <span className="ml-2">Qty</span>
        </div>
      </div>
    </div>
  );
};

export default Addon;
