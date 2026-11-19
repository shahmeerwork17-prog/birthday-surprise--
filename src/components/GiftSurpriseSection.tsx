import {useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {RotateCcw, ArrowDown} from 'lucide-react';
import {birthdayConfig} from '../config/birthdayConfig';
import {triggerRomanticBurst} from './RomanticAtmosphere';

interface GiftSurpriseSectionProps {
  isOpened: boolean;
  onOpenGift: () => void;
  onResetGift: () => void;
  onScrollToLetter: () => void;
}

export function GiftSurpriseSection({
  isOpened,
  onOpenGift,
  onResetGift,
  onScrollToLetter,
}: GiftSurpriseSectionProps) {
  const boxContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTriggerGift = () => {
    if (isOpened) {
      onScrollToLetter();
      return;
    }

    if (boxContainerRef.current) {
      const rect = boxContainerRef.current.getBoundingClientRect();
      triggerRomanticBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.42,
        count: 95,
      });
    } else {
      triggerRomanticBurst({count: 95});
    }

    onOpenGift();
  };

  return (
    <section
      id="gift-section"
      className="relative z-20 mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <motion.div
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.75, ease: [0.16, 1, 0.3, 1]}}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-[#E6C596]/80">
          Chapter One <span aria-hidden="true">·</span> For You
        </p>

        <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[#FDF2F6] sm:text-5xl">
          {birthdayConfig.gift.heading}
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-rose-100/80 sm:text-lg">
          {birthdayConfig.gift.subheading}
        </p>
      </motion.div>

      {/* Interactive Gift Stage */}
      <div className="mt-12 flex flex-col items-center justify-center sm:mt-14">
        <div
          ref={boxContainerRef}
          className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80"
        >
          {/* Ambient radial glow beneath gift */}
          <motion.div
            animate={{
              scale: isOpened ? [1, 1.35, 1.2] : [1, 1.08, 1],
              opacity: isOpened ? [0.45, 0.85, 0.6] : [0.35, 0.55, 0.35],
            }}
            transition={{duration: isOpened ? 1.2 : 3.6, repeat: isOpened ? 0 : Infinity}}
            className="pointer-events-none absolute inset-6 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(244, 114, 182, 0.45) 0%, rgba(190, 18, 60, 0.35) 45%, transparent 72%)',
            }}
          />

          {/* Glowing Light Rays emerging when opened */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{opacity: 0, scaleY: 0.2}}
                animate={{opacity: 1, scaleY: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
                className="pointer-events-none absolute -top-6 left-1/2 h-44 w-52 -translate-x-1/2 origin-bottom blur-xl"
                style={{
                  background:
                    'conic-gradient(from 165deg at 50% 100%, transparent 0deg, rgba(251, 207, 232, 0.55) 18deg, rgba(230, 197, 150, 0.65) 30deg, transparent 52deg)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Clickable SVG Gift Box */}
          <button
            type="button"
            onClick={handleTriggerGift}
            aria-label={isOpened ? 'Scroll to your birthday letter' : 'Open your birthday gift'}
            className={`group relative z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4] rounded-2xl p-2 ${
              !isOpened ? 'animate-gentle-float' : ''
            }`}
          >
            <svg
              viewBox="0 0 260 260"
              className="h-60 w-60 drop-shadow-[0_24px_45px_rgba(0,0,0,0.65)] sm:h-68 sm:w-68"
              fill="none"
            >
              <defs>
                <linearGradient id="boxBodyGrad" x1="40" y1="100" x2="220" y2="235" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="55%" stopColor="#580C23" />
                  <stop offset="100%" stopColor="#2D0612" />
                </linearGradient>
                <linearGradient id="boxLidGrad" x1="32" y1="74" x2="228" y2="118" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#9F1239" />
                  <stop offset="50%" stopColor="#6B1228" />
                  <stop offset="100%" stopColor="#3B0816" />
                </linearGradient>
                <linearGradient id="ribbonGold" x1="112" y1="60" x2="148" y2="235" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="45%" stopColor="#E6C596" />
                  <stop offset="100%" stopColor="#B48A5A" />
                </linearGradient>
                <linearGradient id="ribbonRose" x1="40" y1="90" x2="220" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FBCFE8" />
                  <stop offset="50%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
              </defs>

              {/* Soft shadow beneath box */}
              <ellipse cx="130" cy="238" rx="82" ry="12" fill="rgba(0,0,0,0.55)" />

              {/* Rising Heart Keepsake inside when opened */}
              <motion.g
                initial={false}
                animate={
                  isOpened
                    ? {y: -36, opacity: 1, scale: 1}
                    : {y: 12, opacity: 0, scale: 0.6}
                }
                transition={{duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
                style={{transformOrigin: '130px 120px'}}
              >
                <circle cx="130" cy="108" r="30" fill="rgba(251, 113, 133, 0.24)" />
                <path
                  d="M130 126C130 126 105 110 105 94C105 85.5 111.5 79 119.5 79C124.5 79 128.5 81.5 130 85C131.5 81.5 135.5 79 140.5 79C148.5 79 155 85.5 155 94C155 110 130 126 130 126Z"
                  fill="url(#ribbonRose)"
                  stroke="#FDE68A"
                  strokeWidth="1.5"
                />
              </motion.g>

              {/* Gift Box Base */}
              <rect
                x="48"
                y="114"
                width="164"
                height="114"
                rx="12"
                fill="url(#boxBodyGrad)"
                stroke="#E6C596"
                strokeOpacity="0.32"
                strokeWidth="1.2"
              />
              {/* Interior top rim shadow when open */}
              <rect
                x="52"
                y="114"
                width="156"
                height="12"
                rx="4"
                fill={isOpened ? '#1E040B' : 'rgba(0,0,0,0.22)'}
              />

              {/* Vertical Gold Silk Ribbon on Box Body */}
              <rect x="116" y="114" width="28" height="114" fill="url(#ribbonGold)" />
              <rect x="128" y="114" width="4" height="114" fill="#FFFBEB" fillOpacity="0.38" />

              {/* Horizontal Subtle Trim */}
              <rect
                x="48"
                y="165"
                width="164"
                height="12"
                fill="url(#ribbonGold)"
                fillOpacity="0.22"
              />

              {/* Gift Box Lid + Bow (animates open!) */}
              <motion.g
                initial={false}
                animate={
                  isOpened
                    ? {y: -58, x: -24, rotate: -26, opacity: 0.92}
                    : {y: 0, x: 0, rotate: 0, opacity: 1}
                }
                whileHover={!isOpened ? {y: -4, rotate: -1.5} : undefined}
                transition={{type: 'spring', stiffness: 170, damping: 16}}
                style={{transformOrigin: '44px 104px'}}
              >
                {/* Lid Rectangle */}
                <rect
                  x="38"
                  y="82"
                  width="184"
                  height="38"
                  rx="10"
                  fill="url(#boxLidGrad)"
                  stroke="#E6C596"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                />
                {/* Ribbon Band on Lid */}
                <rect x="114" y="82" width="32" height="38" rx="2" fill="url(#ribbonGold)" />
                <rect x="128" y="82" width="4" height="38" fill="#FFFBEB" fillOpacity="0.4" />

                {/* Sculpted Silk Bow */}
                <path
                  d="M130 82C112 78 86 64 92 48C98 34 122 50 130 74Z"
                  fill="url(#ribbonGold)"
                  stroke="#FFFBEB"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
                <path
                  d="M130 82C148 78 174 64 168 48C162 34 138 50 130 74Z"
                  fill="url(#ribbonGold)"
                  stroke="#FFFBEB"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
                <circle
                  cx="130"
                  cy="76"
                  r="10"
                  fill="#E6C596"
                  stroke="#FFFBEB"
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                />
              </motion.g>
            </svg>
          </button>
        </div>

        {/* Action Button or Post-Open Controls */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="open-cta"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.25}}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <button
                type="button"
                onClick={handleTriggerGift}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E6C596]/55 bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#9F1239] px-9 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[0_10px_32px_rgba(225,29,72,0.45)] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FDE68A] hover:shadow-[0_14px_42px_rgba(244,114,182,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4] active:translate-y-0"
              >
                {birthdayConfig.gift.buttonText}
              </button>
              <span className="text-xs tracking-wide text-rose-200/60">
                Click the gift box or button to unwrap
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="opened-status"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
              transition={{duration: 0.45, delay: 0.2}}
              className="mt-6 flex flex-col items-center text-center"
            >
              <p className="font-display text-2xl font-semibold text-[#FBCFE8]">
                {birthdayConfig.gift.openedTitle}
              </p>
              <p className="mt-1 text-sm text-rose-100/75">
                {birthdayConfig.gift.openedSubtitle}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onScrollToLetter}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F9A8D4]/45 bg-[#881337] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#9F1239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
                >
                  <span>Read Your Letter</span>
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onResetGift}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rose-200/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-rose-100/85 whitespace-nowrap shrink-0 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Wrap Again</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
