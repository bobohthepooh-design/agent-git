import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  loading = false,
  className = '',
  disabled,
  onClick,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-600',
    outline: 'border border-gray-600 text-white hover:bg-gray-800 disabled:border-gray-700'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...(props as any)}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  );
}
