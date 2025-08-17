import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils.js';
import { ChevronDown } from 'lucide-react';

export function Select({ className, children, value, onValueChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      <SelectTrigger 
        className={className} 
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <SelectValue value={selectedValue} />
        <ChevronDown className="w-4 h-4 ml-2" />
      </SelectTrigger>
      
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => handleSelect(child.props.value)
              });
            }
            return child;
          })}
        </SelectContent>
      )}
    </div>
  );
}

export function SelectTrigger({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({ className, value, placeholder, ...props }) {
  const displayValue = value ? 
    (value === 'boy' ? 'Boy' : 
     value === 'girl' ? 'Girl' : 
     value === 'prefer_not_to_say' ? 'Prefer not to say' : value) : 
    placeholder;
    
  return (
    <span
      className={cn("text-sm", className)}
      {...props}
    >
      {displayValue}
    </span>
  );
}

export function SelectItem({ className, children, value, onClick, ...props }) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
} 