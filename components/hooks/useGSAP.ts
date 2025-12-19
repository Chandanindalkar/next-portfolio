"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";

export function useGSAP(
  effect: (context: gsap.Context) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const scope = useRef<HTMLDivElement | null>(null);

  // useLayoutEffect is preferred for animations to prevent flash of unstyled content
  // but sticking to useEffect for SSR safety if logic runs only on client is sometimes better.
  // GSAP recommends useLayoutEffect for React.
  // We use useIsomorphicLayoutEffect pattern typically, but for Next.js app router 'use client',
  // standard useLayoutEffect produces a warning if used on server (it won't be, because of 'use client').
  
  // Safe helper to avoid hydration mismatch if needed, but 'use client' handles it.
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(effect, scope);
    
    return () => ctx.revert();
  }, dependencies);

  return { scope };
}
