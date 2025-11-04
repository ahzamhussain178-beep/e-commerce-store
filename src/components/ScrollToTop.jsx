import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smoothly scroll to top but offset by the fixed header height.
    // Use requestAnimationFrame twice to ensure layout has painted so header height is reliable.
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 64;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: headerHeight, left: 0, behavior: 'smooth' });
      });
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;