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
      { threshold: 0.2 }
    );

    function observeNew(root: Document | Element) {
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    }

    observeNew(document);

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
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
