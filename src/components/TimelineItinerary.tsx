import { FiClock } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface TimelineItem {
  time: string;
  title: string;
  detail: string; // Change description to detail
}

interface TimelineItineraryProps {
  items: TimelineItem[];
}

export default function TimelineItinerary({ items }: TimelineItineraryProps) {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
      <div className="space-y-8">
        {items.map((item, index) => {
          return (
            <div key={index} className="relative flex items-start gap-6">
              <div className="absolute left-8 top-8 w-3 h-3 -ml-1.5 bg-primary-600 rounded-full border-2 border-white"></div>
              <div className="min-w-[100px] pt-2 text-primary-600 font-medium flex items-center gap-2">
                <FiClock className="ml-2 w-5 h-5" />
                {item.time}
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-sm p-6 ml-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-primary-600">{item.detail}</p> {/* Change description to detail */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
