"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounted once in the root layout. Watches for [data-reveal] elements —
 * both on route change (App Router swaps content without a full reload)
 * and whenever client components mutate the DOM (e.g. the gallery filter
 * swapping tiles in and out) — and reveals each one the first time it's
 * 20% visible, then stops watching it.
 */
const REVEAL_THRESHOLD = 0.2;

// Some browser/extension configurations silently prevent IntersectionObserver
// from ever reporting real intersections (no error, it just never fires).
// This mirrors the same threshold using plain geometry so reveals still
// happen when that native API misbehaves.
function isSufficientlyVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return false;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  return visibleHeight / rect.height >= REVEAL_THRESHOLD;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const revealAll = () => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      revealAll();
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: REVEAL_THRESHOLD }
    );

    function observeNew(root: Document | Element) {
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    }

    observeNew(document);

    let ticking = false;
    function checkFallback() {
      ticking = false;
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
        if (isSufficientlyVisible(el)) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    }
    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkFallback);
      }
    }
    checkFallback();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.hasAttribute("data-reveal") && !node.classList.contains("is-visible")) {
              observer.observe(node);
            }
            observeNew(node);
          }
        });
      }
      checkFallback();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  return null;
}
