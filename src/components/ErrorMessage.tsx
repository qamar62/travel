import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`flex items-center justify-center text-red-600 ${className}`}>
      <FiAlertCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
    </div>
  );
}