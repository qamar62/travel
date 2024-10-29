import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchTabs from '../search/SearchTabs';
import TransferSearch from '../search/TransferSearch';
import { BookingType } from '../../types/booking';

export default function HeroSection() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingType, setBookingType] = useState<BookingType>('tour');

  const renderSearchForm = () => {
    if (bookingType === 'transfer') {
      return <TransferSearch />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Where to?"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="input-field pl-10 w-full text-gray-900 placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field pl-10 w-full text-gray-900"
          />
        </div>
        <button className="btn-primary flex items-center justify-center gap-2">
          <FiSearch />
          <span>Search {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}s</span>
        </button>
      </div>
    );
  };

  return (
    <div className="relative h-[600px] gradient-bg">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white w-full max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Discover Amazing Tours Worldwide</h1>
          <p className="text-xl mb-8">Book unforgettable tours and activities for your next adventure</p>
          
          <div className="bg-white rounded-lg p-4">
            <SearchTabs activeTab={bookingType} onTabChange={setBookingType} />
            {renderSearchForm()}

            {bookingType !== 'transfer' && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Popular:</span>
                {['Desert Safari', 'Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}