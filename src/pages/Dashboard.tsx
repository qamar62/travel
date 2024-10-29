import { useState } from 'react';
import { FiMap, FiCompass, FiCalendar, FiClock, FiTrendingUp, FiBarChart2, FiUsers, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ServiceCard from '../components/dashboard/ServiceCard';
import StatsCard from '../components/dashboard/StatsCard';
import RecentBookings from '../components/dashboard/RecentBookings';
import PopularServices from '../components/dashboard/PopularServices';

const services = [
  {
    id: 'tours',
    title: 'Tours & Activities',
    description: 'Explore guided tours and exciting activities',
    icon: FiCompass,
    color: 'bg-blue-500',
    stats: '150+ Tours'
  },
  {
    id: 'transfers',
    title: 'Airport Transfers',
    description: 'Reliable airport pickup and drop-off services',
    icon: FiMap,
    color: 'bg-green-500',
    stats: '24/7 Service'
  },
  {
    id: 'attractions',
    title: 'Attractions',
    description: 'Skip-the-line tickets to top attractions',
    icon: FiCalendar,
    color: 'bg-purple-500',
    stats: '100+ Venues'
  }
];

const stats = [
  {
    title: 'Total Bookings',
    value: '1,234',
    change: '+12.5%',
    icon: FiBarChart2,
    color: 'text-blue-500'
  },
  {
    title: 'Active Users',
    value: '892',
    change: '+5.2%',
    icon: FiUsers,
    color: 'text-green-500'
  },
  {
    title: 'Average Duration',
    value: '4.2h',
    change: '+8.1%',
    icon: FiClock,
    color: 'text-purple-500'
  },
  {
    title: 'Revenue',
    value: '€45,678',
    change: '+15.3%',
    icon: FiDollarSign,
    color: 'text-orange-500'
  }
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening.</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentBookings />
          <PopularServices />
        </div>
      </div>
    </DashboardLayout>
  );
}