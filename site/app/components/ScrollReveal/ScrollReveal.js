"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const SELECTORS = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

    // Respecte la préférence "reduced motion" → tout visible immédiatement
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      document
        .querySelectorAll(SELECTORS)
        .forEach((el) => el.classList.add("visible"));
      return;
    }

    // Fallback si IntersectionObserver n'est pas supporté
    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll(SELECTORS)
        .forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );

    const elements = document.querySelectorAll(SELECTORS);

    // 1) Révèle immédiatement tout ce qui est déjà dans la viewport (above-the-fold)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });

    // 2) Filet de sécurité : après 2s, tout ce qui reste invisible devient visible
    //    (protège contre les cas rares où l'observer n'a pas déclenché)
    const safetyTimer = setTimeout(() => {
      document
        .querySelectorAll(SELECTORS)
        .forEach((el) => el.classList.add("visible"));
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return null;
}
