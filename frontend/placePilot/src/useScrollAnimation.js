import { useState, useEffect, useRef } from "react";

/**
 * Custom Hook to observe an element and set a state when it enters the viewport.
 * @param {number} threshold - How much of the element must be visible (0.0 to 1.0)
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, boolean indicating visibility]
 */
export default function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once it has appeared
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // viewport as the root
        rootMargin: "0px",
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        // Need to check ref.current again because it might be null after cleanup
        // for components that were observed but removed before cleanup
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
}