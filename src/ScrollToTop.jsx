import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll lên đầu trang mỗi khi pathname đổi
  }, [pathname]);

  return null;
}

export default ScrollToTop;
