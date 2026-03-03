import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  hover = true, 
  clickable = false,
  onClick 
}: CardProps) {
  const MotionComponent = hover || clickable ? motion.div : 'div';
  const motionProps = hover || clickable ? {
    whileHover: hover ? { scale: 1.02, y: -2 } : undefined,
    whileTap: clickable ? { scale: 0.98 } : undefined,
  } : {};

  return (
    <MotionComponent
      className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-6 ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
}
