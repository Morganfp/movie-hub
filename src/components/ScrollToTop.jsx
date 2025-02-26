// ScrollToTop.jsx
// A component that scrolls to the top of the page when a route changes
// Addresses the SPA issue where navigation between pages doesn't reset scroll position

// Hooks
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
