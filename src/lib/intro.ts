"use client";

/**
 * Coordinates the opening preloader with the rest of the page.
 * The inline boot script in layout.tsx adds `intro-active` to <html> when the
 * intro should play (first visit this session, motion allowed, JS running).
 */
const EVENT = "portfolio:intro-done";
let revealed = false;

export const INTRO_STORAGE_KEY = "intro-seen";

export function introActive() {
  return !revealed && document.documentElement.classList.contains("intro-active");
}

/** Runs `cb` once the page is being revealed (immediately if there is no intro). */
export function onIntroReveal(cb: () => void) {
  if (!introActive()) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}

/** Called by the preloader as its curtain starts lifting. */
export function revealPage() {
  if (revealed) return;
  revealed = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Called by the preloader once it is fully gone. */
export function endIntro() {
  revealPage();
  document.documentElement.classList.remove("intro-active");
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* storage unavailable — intro will simply play again next visit */
  }
}
