/**
 * Get the correct image path for both localhost and GitHub Pages
 * This utility detects the basePath from the current URL or uses the environment variable
 */
export function getImagePath(path: string): string {
  // If path is already absolute (starts with http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let basePath = '';

  // For client-side, detect basePath from window location
  if (typeof window !== 'undefined') {
    // Check if we're on GitHub Pages (annah00k.github.io)
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      // Extract basePath from pathname
      // URL: https://annah00k.github.io/WolfBuddy/ -> basePath: /WolfBuddy
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && pathSegments[0] !== '') {
        basePath = `/${pathSegments[0]}`;
      }
    }
    // For localhost, basePath remains empty
  } else {
    // For server-side/build time, use environment variable
    basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine basePath and path, avoiding double slashes
  return `${basePath}${normalizedPath}`;
}

