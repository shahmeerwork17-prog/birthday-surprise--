import {useEffect, useRef, useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Heart, MailOpen, Mail} from 'lucide-react';
import {birthdayConfig} from '../config/birthdayConfig';
import {BotanicalCornerFiligree} from './BotanicalIllustrations';

interface LoveLetterSectionProps {
  isEnvelopeOpen: boolean;
  onToggleEnvelope: (open: boolean) => void;
}

export function LoveLetterSection({
  isEnvelopeOpen,
  onToggleEnvelope,
}: LoveLetterSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const autoOpenedOnceRef = useRef(false);
  const [revealAllImmediate, setRevealAllImmediate] = useState(false);

  // Smoothly open the envelope when visitor scrolls into this section for the first time
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !autoOpenedOnceRef.current) {
            autoOpenedOnceRef.current = true;
            const timer = window.setTimeout(() => {
              onToggleEnvelope(true);
            }, 350);
            return () => window.clearTimeout(timer);
          }
        }
      },
      {threshold: 0.35}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onToggleEnvelope]);

  return (
    <section
      id="letter-section"
      ref={sectionRef}
      className="relative z-30 mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Section Heading */}
      <motion.div
        initial={{opacity: 0, y: 22}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.75, ease: [0.16, 1, 0.3, 1]}}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-[#E6C596]/80">
          Chapter Two <span aria-hidden="true">·</span> Handwritten Words
        </p>
        <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[#FDF2F6] sm:text-5xl">
          {birthdayConfig.letter.heading}
        </h2>
      </motion.div>

      {/* Interactive Envelope + Unfolding Paper Container */}
      <div className="mx-auto mt-12 max-w-3xl">
        {/* Envelope Control Header */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onToggleEnvelope(!isEnvelopeOpen)}
            aria-expanded={isEnvelopeOpen}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E6C596]/35 bg-[#2A0912]/80 px-6 py-2.5 text-sm font-medium text-[#FDF2F6] whitespace-nowrap shrink-0 transition-colors hover:border-[#F9A8D4]/60 hover:bg-[#4A0E1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
          >
            {isEnvelopeOpen ? (
              <>
                <Mail className="h-4 w-4 text-[#E6C596]" />
                <span>Fold Letter Back</span>
              </>
            ) : (
              <>
                <MailOpen className="h-4 w-4 text-[#F9A8D4]" />
                <span>Open Envelope</span>
              </>
            )}
          </button>

          {isEnvelopeOpen && !revealAllImmediate && (
            <button
              type="button"
              onClick={() => setRevealAllImmediate(true)}
              className="inline-flex min-h-11 items-center rounded-full border border-rose-200/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-rose-100/80 whitespace-nowrap shrink-0 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
            >
              Show Full Note Instantly
            </button>
          )}
        </div>

        {/* Envelope Visual Stage */}
        <div className="relative mx-auto max-w-2xl" style={{perspective: '1200px'}}>
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.button
                key="sealed-envelope"
                type="button"
                onClick={() => onToggleEnvelope(true)}
                initial={{opacity: 0, y: 20, scale: 0.97}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, scale: 0.96, y: -12}}
                transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                aria-label="Open romantic birthday envelope"
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-[#E6C596]/35 bg-gradient-to-br from-[#520F20] via-[#3A0916] to-[#22050D] p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4] sm:p-10"
              >
                {/* Envelope Diagonal Seam Lines */}
                <svg
                  viewBox="0 0 600 340"
                  className="mx-auto w-full max-w-lg"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="10"
                    y="10"
                    width="580"
                    height="320"
                    rx="16"
                    fill="#3E0A18"
                    stroke="#E6C596"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />
                  {/* Bottom flap seams */}
                  <path
                    d="M14 322L270 165C288 154 312 154 330 165L586 322"
                    stroke="#E6C596"
                    strokeOpacity="0.28"
                    strokeWidth="1.4"
                  />
                  {/* Top triangular flap */}
                  <path
                    d="M14 18L285 192C294 198 306 198 315 192L586 18"
                    fill="#4F0E20"
                    stroke="#E6C596"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                  />
                  {/* Wax Seal */}
                  <circle
                    cx="300"
                    cy="185"
                    r="34"
                    fill="#9F1239"
                    stroke="#E6C596"
                    strokeOpacity="0.7"
                    strokeWidth="2"
                  />
                  <circle
                    cx="300"
                    cy="185"
                    r="26"
                    fill="#881337"
                    stroke="#FBCFE8"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                  />
                </svg>

                {/* Floating Wax Heart Icon overlay */}
                <div className="pointer-events-none absolute left-1/2 top-[51%] -translate-x-1/2 -translate-y-1/2">
                  <Heart className="h-6 w-6 fill-[#FBCFE8] text-[#FBCFE8] transition-transform duration-300 group-hover:scale-110" />
                </div>

                <p className="mt-4 font-display text-lg italic tracking-wide text-[#FDE8EF]/90">
                  {birthdayConfig.letter.envelopeLabel}
                </p>
              </motion.button>
            ) : (
              <motion.div
                key="unfolded-letter"
                initial={{opacity: 0, rotateX: 16, y: 42, scale: 0.96}}
                animate={{opacity: 1, rotateX: 0, y: 0, scale: 1}}
                exit={{opacity: 0, rotateX: -12, y: 24, scale: 0.97}}
                transition={{duration: 0.75, ease: [0.16, 1, 0.3, 1]}}
                className="relative"
              >
                {/* Open Envelope Pocket Backdrop */}
                <div className="rounded-3xl border border-[#E6C596]/30 bg-gradient-to-b from-[#3D0917] to-[#21050C] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.75)] sm:p-5">
                  {/* Textured Archival Love Letter Paper */}
                  <article className="paper-stationery relative overflow-hidden rounded-2xl border border-[#C9A87C]/55 px-6 py-10 text-[#2A1118] shadow-inner sm:px-12 sm:py-14">
                    {/* Inner Delicate Frame Border */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-3 rounded-xl border border-[#881337]/18 sm:inset-4"
                    />

                    {/* Floral Filigree Corners */}
                    <BotanicalCornerFiligree className="pointer-events-none absolute left-2 top-2 h-14 w-14 text-[#881337]/45 sm:left-4 sm:top-4 sm:h-20 sm:w-20" />
                    <BotanicalCornerFiligree className="pointer-events-none absolute right-2 top-2 h-14 w-14 -scale-x-100 text-[#881337]/45 sm:right-4 sm:top-4 sm:h-20 sm:w-20" />
                    <BotanicalCornerFiligree className="pointer-events-none absolute bottom-2 left-2 h-14 w-14 -scale-y-100 text-[#881337]/45 sm:bottom-4 sm:left-4 sm:h-20 sm:w-20" />
                    <BotanicalCornerFiligree className="pointer-events-none absolute bottom-2 right-2 h-14 w-14 -scale-x-100 -scale-y-100 text-[#881337]/45 sm:bottom-4 sm:right-4 sm:h-20 sm:w-20" />

                    <div className="relative z-10 mx-auto max-w-xl">
                      {/* Salutation */}
                      <motion.p
                        initial={revealAllImmediate ? false : {opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: revealAllImmediate ? 0 : 0.15}}
                        className="font-letter text-3xl font-bold text-[#7F1D3A] sm:text-4xl"
                      >
                        {birthdayConfig.letter.salutation}
                      </motion.p>

                      {/* Letter Paragraphs with Gradual Reveal */}
                      <div className="mt-6 space-y-5 font-letter text-[1.35rem] leading-[1.7] text-[#2A1118] sm:text-[1.6rem] sm:leading-[1.75]">
                        {birthdayConfig.letter.paragraphs.map((paragraph, idx) => (
                          <motion.p
                            key={idx}
                            initial={revealAllImmediate ? false : {opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                              duration: 0.65,
                              delay: revealAllImmediate ? 0 : 0.35 + idx * 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>

                      {/* Hairline divider before closing */}
                      <motion.div
                        initial={revealAllImmediate ? false : {opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                          duration: 0.6,
                          delay: revealAllImmediate
                            ? 0
                            : 0.45 + birthdayConfig.letter.paragraphs.length * 0.28,
                        }}
                        className="mt-8 border-t border-[#881337]/15 pt-6"
                      >
                        <p className="font-letter text-2xl font-semibold text-[#7F1D3A] sm:text-3xl">
                          {birthdayConfig.letter.closingLine}
                        </p>
                        <p className="mt-2 font-display text-sm uppercase tracking-[0.2em] text-[#6B3342]">
                          {birthdayConfig.letter.signature}
                        </p>
                      </motion.div>
                    </div>
                  </article>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
