import { useEffect, useRef } from "react";

export function useAnimationFrame(callback: () => void) {
  const requestRef = useRef<number>();
  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
}
