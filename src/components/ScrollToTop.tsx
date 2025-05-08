import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component scrolls the window to the top when the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop; 