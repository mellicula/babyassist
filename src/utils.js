/**
 * Utility Functions
 * 
 * This module contains helper functions used throughout the application
 * for common operations like URL generation and CSS class management.
 */

/**
 * Creates a URL for a specific page with optional query parameters
 * 
 * This function centralizes URL generation logic and ensures consistency
 * across the application. It maps page names to their corresponding routes
 * and appends query parameters when needed.
 * 
 * @param {string} pageName - The name of the page to navigate to
 * @param {Object} [params={}] - Query parameters to append to the URL
 * @returns {string} The complete URL for the specified page
 * 
 * @example
 * // Create a simple page URL
 * const homeUrl = createPageUrl('Home'); // Returns '/'
 * 
 * // Create a URL with query parameters
 * const chatUrl = createPageUrl('Chat', { child: 'child-123' }); // Returns '/chat?child=child-123'
 * 
 * @supportedPages
 * - 'Home' → '/'
 * - 'Chat' → '/chat'
 * - 'Milestones' → '/milestones'
 */
export function createPageUrl(pageName, params = {}) {
  const baseUrls = {
    'Home': '/',
    'Chat': '/chat',
    'Milestones': '/milestones'
  };
  
  let url = baseUrls[pageName] || '/';
  
  // Add query parameters if provided
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  
  return url;
}

/**
 * Combines CSS classes and filters out falsy values
 * 
 * This utility function helps manage conditional CSS classes by
 * filtering out undefined, null, or empty string values and
 * joining the remaining classes with spaces.
 * 
 * @param {...string} classes - CSS class names to combine
 * @returns {string} Space-separated string of valid CSS classes
 * 
 * @example
 * // Basic usage
 * const className = cn('base-class', 'always-present');
 * // Returns: 'base-class always-present'
 * 
 * // With conditional classes
 * const buttonClass = cn(
 *   'btn',
 *   isPrimary && 'btn-primary',
 *   isDisabled && 'btn-disabled'
 * );
 * // Returns: 'btn btn-primary' (if both conditions are true)
 * // Returns: 'btn' (if conditions are false)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 