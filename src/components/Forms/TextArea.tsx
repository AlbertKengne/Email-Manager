import { type TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function TextArea({ 
  label, 
  error, 
  icon,
  className = '', 
  ...props 
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={props.id}
        className="flex items-center gap-2.5 text-sm font-medium text-gray-700 group cursor-pointer"
      >
        {icon && (
          <span className="text-[#20AD96] group-hover:text-[#f4b18e] transition-colors duration-200">
            {icon}
          </span>
        )}
        <span className="transition-colors duration-200 group-hover:text-[#20AD96]">
          {label}
        </span>
      </label>
      <textarea
        className={`w-full px-4 py-3 rounded-lg border border-gray-200 
          focus:border-[#20AD96] focus:ring-2 focus:ring-[#20AD96]/20
          hover:border-[#20AD96]/50
          outline-none transition-all duration-200 
          resize-y disabled:bg-gray-50 disabled:cursor-not-allowed
          placeholder:text-gray-400
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}