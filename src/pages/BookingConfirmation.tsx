import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheck, FiDownload, FiMail } from 'react-icons/fi';
import { CartItemType } from '../types/cart';

interface LocationState {
  bookingReference: string;
  items: CartItemType[];
  customerDetails: {
    name: string;
    email: string;
  };
}

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingReference, items, customerDetails } = location.state as LocationState || {};

  if (!bookingReference) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Booking</h2>
          <p className="text-gray-600 mb-4">No booking information found.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your booking, {customerDetails.name}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Booking Reference</h2>
            <p className="text-gray-600">{bookingReference}</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <FiMail className="mr-2" />
              Email
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Booking Details</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                    {item.time && ` at ${item.time}`}
                  </p>
                  {Object.entries(item.details).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-600">
                      {key}: {value}
                    </p>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Paid</span>
            <span className="text-primary-600">
              €{items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Book More Experiences
        </button>
      </div>
    </div>
  );
}