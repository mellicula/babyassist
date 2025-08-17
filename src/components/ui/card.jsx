import React from 'react';
import { cn } from '../../utils.js';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "glass-effect rounded-3xl border border-white/20 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  );
} 