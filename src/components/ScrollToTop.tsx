import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll to top-left whenever pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
