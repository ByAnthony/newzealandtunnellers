import { useState, useEffect, useCallback } from "react";

export const useResponsive = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth < 896,
  );

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(), delay);
    };
  };

  const handleResize = useCallback(() => {
    const debouncedResize = debounce(() => {
      setIsMobileOrTablet(window.innerWidth < 896);
    }, 300);
    debouncedResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isMobileOrTablet;
};
