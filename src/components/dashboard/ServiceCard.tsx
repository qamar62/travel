import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  stats: string;
}

export default function ServiceCard({ id, title, description, icon: Icon, color, stats }: ServiceCardProps) {
  return (
    <Link 
      to={`/dashboard/${id}`}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{stats}</span>
            <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}