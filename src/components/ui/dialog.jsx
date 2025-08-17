import React from 'react';
import { cn } from '../../utils.js';

export function Dialog({ className, open, onOpenChange, children, ...props }) {
  if (!open) return null;
  
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
      onClick={() => onOpenChange?.(false)}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, ...props }) {
  return (
    <div
      className={cn(
        "glass-effect rounded-3xl p-6 max-w-sm w-full mx-4 shadow-xl",
        className
      )}
      {...props}
    />
  );
}

export function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("mb-4", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <h2
      className={cn("text-lg font-semibold text-gray-800", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex gap-2 mt-6", className)}
      {...props}
    />
  );
} 