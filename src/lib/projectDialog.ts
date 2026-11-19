"use client";

/**
 * Tiny event bridge so any section (Experience, Projects, AI/ML) can open the
 * shared project case-study dialog without prop drilling or context.
 */
const EVENT = "portfolio:open-project";

export function openProject(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: slug }));
}

export function onOpenProject(handler: (slug: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
