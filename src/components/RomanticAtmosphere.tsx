import {useEffect, useRef} from 'react';

interface Bubble {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  wobbleAmp: number;
  alpha: number;
  tint: 'pink' | 'blue' | 'purple';
}

interface FloatingParticle {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  alpha: number;
  maxAlpha: number;
  kind: 'sparkle' | 'heart';
  color: string;
  phase: number;
}

interface BurstPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  life: number;
  maxLife: number;
  kind: 'heart' | 'petal' | 'spark';
  color: string;
}

export interface BurstDetail {
  x?: number;
  y?: number;
  count?: number;
}

export function triggerRomanticBurst(detail?: BurstDetail): void {
  window.dispatchEvent(new CustomEvent<BurstDetail>('romantic-burst', {detail}));
}

interface RomanticAtmosphereProps {
  dimmed?: boolean;
}

export function RomanticAtmosphere({dimmed = false}: RomanticAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimmedRef = useRef(dimmed);

  useEffect(() => {
    dimmedRef.current = dimmed;
  }, [dimmed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const bubbleCount = width < 640 ? 14 : 24;
    const particleCount = width < 640 ? 22 : 38;
    const tints: Array<'pink' | 'blue' | 'purple'> = ['pink', 'blue', 'purple'];

    const createBubble = (randomY = false): Bubble => {
      const r = 10 + Math.random() * 28;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + r + Math.random() * 120,
        r,
        vy: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        wobbleAmp: 0.25 + Math.random() * 0.45,
        alpha: 0.28 + Math.random() * 0.36,
        tint: tints[Math.floor(Math.random() * tints.length)],
      };
    };

    const sparkColors = ['#F9A8D4', '#E6C596', '#FDA4AF', '#E9D5FF', '#BAE6FD'];

    const createParticle = (randomY = false): FloatingParticle => {
      const isHeart = Math.random() < 0.22;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20 + Math.random() * 80,
        size: isHeart ? 5 + Math.random() * 6 : 1.2 + Math.random() * 2.4,
        vy: isHeart ? 0.45 + Math.random() * 0.5 : 0.2 + Math.random() * 0.45,
        vx: (Math.random() - 0.5) * 0.25,
        alpha: 0,
        maxAlpha: isHeart ? 0.42 + Math.random() * 0.28 : 0.45 + Math.random() * 0.45,
        kind: isHeart ? 'heart' : 'sparkle',
        color: isHeart
          ? Math.random() > 0.5
            ? '#FB7185'
            : '#F9A8D4'
          : sparkColors[Math.floor(Math.random() * sparkColors.length)],
        phase: Math.random() * Math.PI * 2,
      };
    };

    const bubbles: Bubble[] = Array.from({length: bubbleCount}, () => createBubble(true));
    const particles: FloatingParticle[] = Array.from({length: particleCount}, () =>
      createParticle(true)
    );
    const burstPieces: BurstPiece[] = [];

    const drawHeart = (cx: number, cy: number, size: number, rotation = 0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      const s = size;
      ctx.moveTo(0, s * 0.35);
      ctx.bezierCurveTo(-s * 0.9, -s * 0.35, -s * 0.5, -s * 1.05, 0, -s * 0.42);
      ctx.bezierCurveTo(s * 0.5, -s * 1.05, s * 0.9, -s * 0.35, 0, s * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawBubble = (b: Bubble, fadeMultiplier: number) => {
      // Fade gently near top 22% and bottom 6%
      const topFade = b.y < height * 0.24 ? Math.max(0, b.y / (height * 0.24)) : 1;
      const effectiveAlpha = b.alpha * topFade * fadeMultiplier;
      if (effectiveAlpha <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = effectiveAlpha;

      const rimColors =
        b.tint === 'pink'
          ? ['rgba(249, 168, 212, 0.45)', 'rgba(192, 132, 252, 0.28)', 'rgba(125, 211, 252, 0.16)']
          : b.tint === 'blue'
            ? ['rgba(147, 197, 253, 0.42)', 'rgba(244, 114, 182, 0.24)', 'rgba(196, 181, 253, 0.22)']
            : ['rgba(216, 180, 254, 0.42)', 'rgba(249, 168, 212, 0.26)', 'rgba(125, 211, 252, 0.22)'];

      const grad = ctx.createRadialGradient(
        b.x - b.r * 0.32,
        b.y - b.r * 0.32,
        b.r * 0.1,
        b.x,
        b.y,
        b.r
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.02)');
      grad.addColorStop(0.82, rimColors[1]);
      grad.addColorStop(0.96, rimColors[0]);
      grad.addColorStop(1, rimColors[2]);

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate iridescent rim stroke
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = rimColors[0];
      ctx.stroke();

      // Glossy specular highlight crescent
      ctx.beginPath();
      ctx.ellipse(
        b.x - b.r * 0.36,
        b.y - b.r * 0.36,
        b.r * 0.24,
        b.r * 0.12,
        -Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
      ctx.fill();

      // Tiny secondary reflection dot
      ctx.beginPath();
      ctx.arc(b.x + b.r * 0.38, b.y + b.r * 0.36, b.r * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(186, 230, 253, 0.42)';
      ctx.fill();

      ctx.restore();
    };

    const spawnBurst = (detail?: BurstDetail) => {
      const originX = detail?.x ?? width / 2;
      const originY = detail?.y ?? height * 0.5;
      const count = detail?.count ?? 64;
      const palette = ['#FB7185', '#F9A8D4', '#E6C596', '#FDA4AF', '#E11D48', '#DDD6FE'];

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.45;
        const speed = 2.4 + Math.random() * 6.8;
        const roll = Math.random();
        const kind: BurstPiece['kind'] = roll < 0.38 ? 'heart' : roll < 0.72 ? 'petal' : 'spark';
        burstPieces.push({
          x: originX + (Math.random() - 0.5) * 32,
          y: originY + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: kind === 'spark' ? 2 + Math.random() * 2.5 : 5 + Math.random() * 6.5,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.14,
          life: 0,
          maxLife: 75 + Math.random() * 55,
          kind,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    const handleBurst = (e: Event) => {
      const custom = e as CustomEvent<BurstDetail>;
      spawnBurst(custom.detail);
    };

    window.addEventListener('romantic-burst', handleBurst);

    let rafId = 0;
    let tick = 0;

    const renderFrame = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      const fadeMultiplier = dimmedRef.current ? 0.38 : 1;

      if (prefersReducedMotion) {
        for (let i = 0; i < Math.min(10, bubbles.length); i++) {
          drawBubble(bubbles[i], 0.5 * fadeMultiplier);
        }
        return;
      }

      // Draw soft particles & hearts
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin(tick * 1.2 + p.phase) * 0.18;

        const progress = 1 - p.y / height;
        const edgeFade =
          progress < 0.12
            ? progress / 0.12
            : progress > 0.8
              ? Math.max(0, (1 - progress) / 0.2)
              : 1;
        const twinkle = 0.65 + 0.35 * Math.sin(tick * 2.6 + p.phase);
        const alpha = p.maxAlpha * edgeFade * twinkle * fadeMultiplier;

        if (alpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          if (p.kind === 'heart') {
            drawHeart(p.x, p.y, p.size, Math.sin(tick + p.phase) * 0.2);
          } else {
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        if (p.y < -30) {
          particles[i] = createParticle(false);
        }
      }

      // Draw glossy rising bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.vy;
        b.x += b.vx + Math.sin(tick * 1.1 + b.phase) * b.wobbleAmp;
        drawBubble(b, fadeMultiplier);

        if (b.y < -b.r * 2 || (b.y < height * 0.12 && Math.random() < 0.012)) {
          bubbles[i] = createBubble(false);
        }
      }

      // Draw active burst confetti / hearts / sparks
      for (let i = burstPieces.length - 1; i >= 0; i--) {
        const bp = burstPieces[i];
        bp.life += 1;
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += 0.075; // gentle gravity
        bp.vx *= 0.985;
        bp.rotation += bp.vr;

        const lifeRatio = 1 - bp.life / bp.maxLife;
        if (lifeRatio <= 0) {
          burstPieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.min(1, lifeRatio * 1.35);
        ctx.fillStyle = bp.color;

        if (bp.kind === 'heart') {
          drawHeart(bp.x, bp.y, bp.size, bp.rotation);
        } else if (bp.kind === 'petal') {
          ctx.translate(bp.x, bp.y);
          ctx.rotate(bp.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, bp.size * 0.72, bp.size * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.shadowBlur = 10;
          ctx.shadowColor = bp.color;
          ctx.beginPath();
          ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      rafId = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('romantic-burst', handleBurst);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
