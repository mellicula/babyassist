import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils.js';

/**
 * Custom Date Picker Component
 * 
 * Provides a better date selection experience with:
 * - Calendar popup interface
 * - Month/year navigation
 * - Date validation
 * - Better mobile support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current selected date (ISO string)
 * @param {Function} props.onChange - Date change handler
 * @param {string} [props.placeholder="Select date"] - Placeholder text
 * @param {string} [props.min] - Minimum allowed date
 * @param {string} [props.max] - Maximum allowed date
 * @param {string} [props.className] - Additional CSS classes
 */
export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Select date",
  min,
  max,
  className 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const datePickerRef = useRef(null);

  // Set current month to selected date when value changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setCurrentMonth(date);
      setSelectedDate(date);
    }
  }, [value]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay, lastDay };
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Check min/max constraints
    if (min && newDate < new Date(min)) return;
    if (max && newDate > new Date(max)) return;
    
    setSelectedDate(newDate);
    onChange(newDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (min && date < new Date(min)) return true;
    if (max && date > new Date(max)) return true;
    return false;
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() && 
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentMonth.getMonth() && 
           today.getFullYear() === currentMonth.getFullYear();
  };

  const { daysInMonth, startingDay, lastDay } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div ref={datePickerRef} className="relative">
      {/* Date Input */}
              <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-full border-2 border-gray-200 bg-white px-4 py-3 text-sm text-left transition-all duration-200",
            "hover:border-indigo-300 focus:border-indigo-400 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            className
          )}
        >
        <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <Calendar className="w-4 h-4 text-gray-400" />
      </button>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-lg border border-gray-200 shadow-xl ring-1 ring-black ring-opacity-5 p-4 min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-semibold text-gray-900">{monthName}</h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs text-gray-500 text-center py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const selected = isDateSelected(day);
              const today = isToday(day);
              
              return (
                <button
                  key={day}
                  onClick={() => !disabled && handleDateSelect(day)}
                  disabled={disabled}
                  className={cn(
                    "h-8 w-8 rounded-md text-sm font-medium transition-all duration-150",
                    "hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    disabled && "text-gray-300 cursor-not-allowed",
                    selected && "bg-indigo-500 text-white hover:bg-indigo-600",
                    today && !selected && "bg-blue-100 text-blue-700",
                    !disabled && !selected && !today && "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const today = new Date();
                  if (!min || today >= new Date(min)) {
                    if (!max || today <= new Date(max)) {
                      setSelectedDate(today);
                      onChange(today.toISOString().split('T')[0]);
                      setIsOpen(false);
                    }
                  }
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Today
              </button>
              {selectedDate && (
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    onChange('');
                    setIsOpen(false);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 