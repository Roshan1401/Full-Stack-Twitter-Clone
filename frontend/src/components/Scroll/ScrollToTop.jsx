import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // console.log(pathname);

    if (location !== "/") {
      document.body.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [location]);
  return null;
}

export default ScrollToTop;
