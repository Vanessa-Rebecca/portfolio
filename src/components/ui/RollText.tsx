/**
 * Text that rolls up to reveal a copy of itself when its nearest `.group`
 * is hovered or focused. Pure CSS; disabled for reduced motion.
 */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 inline-block translate-y-full italic transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
      >
        {children}
      </span>
    </span>
  );
}
