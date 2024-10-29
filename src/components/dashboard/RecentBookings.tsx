import { FiClock, FiUser, FiMapPin } from 'react-icons/fi';

const bookings = [
  {
    id: 1,
    service: 'Desert Safari Adventure',
    customer: 'John Doe',
    date: '2024-01-15',
    status: 'confirmed',
    amount: '€129.99',
    location: 'Dubai'
  },
  {
    id: 2,
    service: 'Airport Transfer',
    customer: 'Sarah Smith',
    date: '2024-01-14',
    status: 'pending',
    amount: '€45.00',
    location: 'Dubai Airport'
  },
  {
    id: 3,
    service: 'Burj Khalifa Tour',
    customer: 'Mike Johnson',
    date: '2024-01-14',
    status: 'completed',
    amount: '€89.99',
    location: 'Downtown Dubai'
  }
];

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{booking.service}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FiUser className="mr-1" />
                  <span>{booking.customer}</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-primary-600">{booking.amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <FiClock className="mr-1" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <FiMapPin className="mr-1" />
                <span>{booking.location}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'}`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}