import {useRef, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowUp, Heart} from 'lucide-react';
import {birthdayConfig} from '../config/birthdayConfig';
import {triggerRomanticBurst} from './RomanticAtmosphere';
import {VelvetRoseBackdrop} from './BotanicalIllustrations';

interface FinalSurpriseSectionProps {
  recipientName: string;
  onReplaySurprise: () => void;
}

export function FinalSurpriseSection({
  recipientName,
  onReplaySurprise,
}: FinalSurpriseSectionProps) {
  const heartRef = useRef<HTMLDivElement | null>(null);
  const [wishSentCount, setWishSentCount] = useState(0);

  const handleSendWish = () => {
    setWishSentCount((c) => c + 1);
    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      triggerRomanticBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        count: 75,
      });
    } else {
      triggerRomanticBurst({count: 75});
    }
  };

  return (
    <footer
      id="finale-section"
      className="relative overflow-hidden border-t border-rose-200/10 bg-gradient-to-b from-[#070406] via-[#1C060E] to-[#070406] px-4 pt-24 pb-14 sm:px-6 sm:pt-32"
    >
      {/* Romantic Rose & Candlelight Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-65">
        <VelvetRoseBackdrop className="h-full w-full object-cover" />
        <div
          className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(225, 29, 72, 0.45) 0%, rgba(159, 18, 57, 0.18) 55%, transparent 75%)',
          }}
        />
      </div>

      <motion.div
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
        className="relative z-20 mx-auto max-w-3xl text-center"
      >
        {/* Glowing Animated Heart Centerpiece */}
        <div ref={heartRef} className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.24, 1],
              opacity: [0.35, 0.72, 0.35],
            }}
            transition={{duration: 2.8, repeat: Infinity, ease: 'easeInOut'}}
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(244, 114, 182, 0.65) 0%, rgba(225, 29, 72, 0.35) 60%, transparent 80%)',
            }}
          />
          <motion.button
            type="button"
            onClick={handleSendWish}
            aria-label="Send glowing birthday hearts"
            whileTap={{scale: 0.92}}
            animate={{scale: [1, 1.07, 1]}}
            transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            className="relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-[#F9A8D4]/40 bg-gradient-to-br from-[#9F1239] to-[#4A0E1B] shadow-[0_0_40px_rgba(244,114,182,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
          >
            <Heart className="h-9 w-9 fill-[#FBCFE8] text-[#FBCFE8]" />
          </motion.button>
        </div>

        <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[#FDF2F6] sm:text-5xl">
          {birthdayConfig.finale.heading}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-rose-100/85 sm:text-lg">
          {birthdayConfig.finale.message}
        </p>

        {/* Interactive Wish Burst Button */}
        <div className="mt-9 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleSendWish}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E6C596]/45 bg-gradient-to-r from-[#881337] via-[#BE123C] to-[#881337] px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(190,18,60,0.4)] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FDE68A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
          >
            {birthdayConfig.finale.wishButtonText}
          </button>

          {wishSentCount > 0 && (
            <p className="text-xs tracking-wide text-[#F9A8D4]">
              {wishSentCount === 1
                ? `A birthday wish released into the night for ${recipientName}.`
                : `${wishSentCount} birthday wishes sent for ${recipientName}.`}
            </p>
          )}
        </div>

        {/* Hairline Divider & Closing Message */}
        <div className="mx-auto mt-16 max-w-md border-t border-rose-200/15 pt-10">
          <p className="font-display text-2xl italic tracking-wide text-[#FBCFE8]">
            {birthdayConfig.finale.closingMessage}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-rose-200/60">
            <a
              href="#welcome"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#FDF2F6] whitespace-nowrap shrink-0"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to Top</span>
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onReplaySurprise}
              className="cursor-pointer transition-colors hover:text-[#FDF2F6] whitespace-nowrap shrink-0"
            >
              Replay Surprise
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
