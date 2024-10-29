import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function TransferSearch() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: new Date(),
    time: '12:00',
    passengers: 1,
    luggage: 2
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search-results', { 
      state: { 
        searchParams: {
          ...formData,
          date: formData.date.toISOString()
        },
        type: 'transfer'
      } 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-primary-500" />
          <input
            type="text"
            placeholder="Pickup location"
            value={formData.pickupLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
            className="input-field pl-10 w-full text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-primary-500" />
          <input
            type="text"
            placeholder="Drop-off location"
            value={formData.dropoffLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
            className="input-field pl-10 w-full text-gray-900 placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FiCalendar className="absolute left-3 top-3 text-primary-500 z-10" />
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))}
            className="input-field pl-10 w-full text-gray-900"
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
            required
          />
        </div>
        <div className="relative">
          <FiClock className="absolute left-3 top-3 text-primary-500" />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="input-field pl-10 w-full text-gray-900"
            required
          />
        </div>
        <div className="relative">
          <FiUsers className="absolute left-3 top-3 text-primary-500" />
          <select
            value={formData.passengers}
            onChange={(e) => setFormData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
            className="input-field pl-10 w-full text-gray-900"
            required
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'passenger' : 'passengers'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="w-full btn-primary">
        Search Transfers
      </button>
    </form>
  );
}