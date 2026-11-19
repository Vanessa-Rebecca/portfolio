"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; layer: number };

/**
 * A drifting "neural constellation": nodes link up when close, and lean toward
 * the cursor so the network seems to notice you. Pauses off-screen and in
 * background tabs; draws a single still frame for reduced motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let colors = { accent: "#a78bfa", accent2: "#67e8f9", fg: "#f3f1f7" };
    const readColors = () => {
      const s = getComputedStyle(root);
      colors = {
        accent: s.getPropertyValue("--accent").trim() || colors.accent,
        accent2: s.getPropertyValue("--accent-2").trim() || colors.accent2,
        fg: s.getPropertyValue("--fg").trim() || colors.fg,
      };
    };
    readColors();

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 140;
    const REACH = 190;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(36, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => {
        const layer = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 0.6 + layer * 1.6,
          layer,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx * (0.4 + n.layer);
          n.y += n.vy * (0.4 + n.layer);
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      // Links between close nodes
      ctx.strokeStyle = colors.fg;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK) * 0.22 * (0.4 + (a.layer + b.layer) / 2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pointer: pull nearby nodes in and connect them to the cursor
      if (pointer.active) {
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 0.8;
        for (const n of nodes) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d >= REACH) continue;
          const f = 1 - d / REACH;
          if (!reduce) {
            n.x += dx * 0.012 * f * n.layer;
            n.y += dy * 0.012 * f * n.layer;
          }
          ctx.globalAlpha = f * 0.75;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const near = pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < REACH;
        ctx.globalAlpha = near ? 1 : 0.35 + n.layer * 0.5;
        ctx.fillStyle = near ? colors.accent : n.layer > 0.85 ? colors.accent2 : colors.fg;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let visible = true;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (reduce) draw();
    else start();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = e.pointerType === "mouse" && pointer.y >= 0 && pointer.y <= r.height;
    };
    const onLeave = () => (pointer.active = false);
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) draw();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw();
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />;
}
