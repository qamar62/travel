import { BookingType } from '../../types/booking';

interface SearchTabsProps {
  activeTab: BookingType;
  onTabChange: (tab: BookingType) => void;
}

export default function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  const tabs: BookingType[] = ['tour', 'hotel', 'ticket', 'attraction', 'transfer'];

  return (
    <div className="flex space-x-1 mb-4">
      {tabs.map((type) => (
        <button
          key={type}
          onClick={() => onTabChange(type)}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === type
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}