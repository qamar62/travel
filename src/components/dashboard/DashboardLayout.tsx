import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiMap, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Tours', href: '/dashboard/tours', icon: FiCompass },
  { name: 'Transfers', href: '/dashboard/transfers', icon: FiMap },
  { name: 'Attractions', href: '/dashboard/attractions', icon: FiCalendar },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link to="/dashboard" className="text-xl font-bold text-primary-600">
              aiTours Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiSettings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button
              onClick={() => {/* Handle logout */}}
              className="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}