import React from 'react';
import { cn } from '../../utils.js';

/**
 * Button Component
 * 
 * A highly configurable button component that provides consistent styling
 * and behavior across the application. Supports multiple variants, sizes,
 * and can be extended with additional props.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content (text, icons, etc.)
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {'default'|'secondary'|'outline'|'ghost'} [props.variant='default'] - Visual style variant
 * @param {'default'|'sm'|'lg'|'icon'} [props.size='default'] - Size variant
 * @param {Object} props - Additional HTML button attributes (onClick, disabled, etc.)
 * 
 * @example
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // Button with variant and size
 * <Button variant="outline" size="lg">Large Outline Button</Button>
 * 
 * // Button with custom classes and event handler
 * <Button 
 *   className="custom-styles" 
 *   onClick={handleClick}
 *   disabled={isLoading}
 * >
 *   Submit
 * </Button>
 */
export function Button({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-primary-soft text-white hover:bg-primary-gentle',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-8',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 