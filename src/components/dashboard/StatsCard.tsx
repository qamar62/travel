import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('500', '100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}