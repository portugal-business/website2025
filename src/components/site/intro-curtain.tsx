"use client";

import { useEffect, useState } from "react";

/**
 * Animation d'arrivée : un rideau pétrole tient le logotype + un filet laiton,
 * puis se lève (CSS) pour révéler la page. Joué une fois par session.
 * Sauté instantanément (sans flash) pour reduced-motion ou visite déjà vue,
 * via la classe `.bp-intro-skip` posée par le script du <head>.
 */
export function IntroCurtain() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.documentElement.classList.contains("bp-intro-skip")) {
      setDone(true);
      return;
    }
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem("bp-intro-seen", "1");
      } catch {
        /* sessionStorage indisponible : on ignore */
      }
      setDone(true);
    }, 2350);
    return () => window.clearTimeout(id);
  }, []);

  if (done) return null;

  return (
    <div className="bp-intro" aria-hidden="true">
      <div className="bp-intro__inner">
        <p className="bp-intro__eyebrow">Lisboa · Portugal</p>
        <p className="bp-intro__word">Business Portugal</p>
        <div className="bp-intro__line" />
      </div>
    </div>
  );
}
