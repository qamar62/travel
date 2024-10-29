import { FiLoader } from 'react-icons/fi';

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <FiLoader className="w-12 h-12 text-primary-600 animate-spin" />
        <div className="mt-4 text-primary-900 font-medium animate-pulse">
          Loading aiTours...
        </div>
      </div>
    </div>
  );
}