import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Start booking amazing experiences!</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Browse Tours & Activities
        </button>
      </div>
    </div>
  );
}