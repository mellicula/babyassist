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

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 