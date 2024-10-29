import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import AuthModal from './auth/AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-700">TourGuide</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/things-to-do" className="text-primary-700 hover:text-primary-900">
                Things To Do
              </Link>
              <Link to="/blog" className="text-primary-700 hover:text-primary-900">
                Blog
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, tours, activities"
                  className="w-full px-4 py-2 rounded-full border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FiSearch className="absolute right-4 top-3 text-primary-500" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="text-primary-700 hover:text-primary-900">
                <FiHeart className="w-6 h-6" />
              </Link>
              <Link to="/cart" className="text-primary-700 hover:text-primary-900 relative">
                <FiShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </Link>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-primary-700 hover:text-primary-900"
              >
                <FiUser className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}