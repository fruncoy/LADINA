import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

export function Input({ 
  label, 
  error, 
  multiline,
  className = '', 
  ...props 
}: InputProps) {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Component
        className={`block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-orange-500 focus:ring-orange-500 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}