import {useState} from 'react';
import {motion} from 'motion/react';
import {ChevronDown} from 'lucide-react';
import {birthdayConfig} from '../config/birthdayConfig';
import {BotanicalCornerFiligree, VelvetRoseBackdrop} from './BotanicalIllustrations';

interface HeroWelcomeProps {
  recipientName: string;
  onStartSurprise: () => void;
}

export function HeroWelcome({recipientName, onStartSurprise}: HeroWelcomeProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const hasVideo = Boolean(birthdayConfig.media.heroVideoSrc) && !videoFailed;
  const hasImage = Boolean(birthdayConfig.media.heroImageSrc) && !imageFailed;

  return (
    <section
      id="welcome"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6"
    >
      {/* Layered Romantic Backdrop: Optional Video -> Optional Photo -> Velvet Rose Art */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 65% at 50% 42%, rgba(107, 18, 40, 0.55) 0%, rgba(42, 8, 18, 0.72) 48%, #070406 100%)',
          }}
        />

        {hasVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover opacity-35"
          >
            <source src={birthdayConfig.media.heroVideoSrc} />
          </video>
        )}

        {!hasVideo && hasImage && (
          <img
            src={birthdayConfig.media.heroImageSrc}
            alt={`Celebration portrait for ${recipientName}`}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover opacity-35"
          />
        )}

        <VelvetRoseBackdrop className="absolute inset-0 h-full w-full object-cover opacity-90" />

        {/* Subtle ambient burgundy & rose radial halos */}
        <div
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(225, 29, 72, 0.38) 0%, rgba(159, 18, 57, 0.16) 50%, transparent 75%)',
          }}
        />

        {/* Contrast scrim ensuring crisp 4.5:1+ legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070406]/55 via-transparent to-[#070406]" />
      </div>

      {/* Centerpiece Decorative Frame & Birthday Heading */}
      <motion.div
        initial={{opacity: 0, y: 24}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1.0, ease: [0.16, 1, 0.3, 1]}}
        className="relative z-20 mx-auto max-w-4xl text-center"
      >
        <div className="relative rounded-3xl border border-[#E6C596]/20 bg-[#12060A]/55 px-6 py-12 shadow-2xl backdrop-blur-sm sm:px-14 sm:py-16">
          {/* Botanical Filigree Corners */}
          <BotanicalCornerFiligree className="pointer-events-none absolute left-3 top-3 h-14 w-14 text-[#E6C596]/55 sm:left-5 sm:top-5 sm:h-20 sm:w-20" />
          <BotanicalCornerFiligree className="pointer-events-none absolute right-3 top-3 h-14 w-14 -scale-x-100 text-[#E6C596]/55 sm:right-5 sm:top-5 sm:h-20 sm:w-20" />
          <BotanicalCornerFiligree className="pointer-events-none absolute bottom-3 left-3 h-14 w-14 -scale-y-100 text-[#F9A8D4]/45 sm:bottom-5 sm:left-5 sm:h-20 sm:w-20" />
          <BotanicalCornerFiligree className="pointer-events-none absolute bottom-3 right-3 h-14 w-14 -scale-x-100 -scale-y-100 text-[#F9A8D4]/45 sm:bottom-5 sm:right-5 sm:h-20 sm:w-20" />

          {/* Clean unboxed metadata lead-in */}
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[#E6C596]/85">
            {birthdayConfig.occasionDate} <span aria-hidden="true">·</span> A Celebration of You
          </p>

          {/* Main Heading */}
          <h1
            className="font-display text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-[#FDF2F6] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-[#FDE8EF]/95">
              {birthdayConfig.welcome.headingPrefix}
            </span>
            <motion.span
              animate={{
                textShadow: [
                  '0 0 22px rgba(244, 114, 182, 0.55), 0 0 48px rgba(190, 18, 60, 0.4)',
                  '0 0 34px rgba(249, 168, 212, 0.8), 0 0 68px rgba(225, 29, 72, 0.55)',
                  '0 0 22px rgba(244, 114, 182, 0.55), 0 0 48px rgba(190, 18, 60, 0.4)',
                ],
              }}
              transition={{duration: 4.5, repeat: Infinity, ease: 'easeInOut'}}
              className="mt-2 inline-block bg-gradient-to-r from-[#FBCFE8] via-[#FDF2F6] to-[#E6C596] bg-clip-text font-bold italic text-transparent name-glow"
            >
              {recipientName}
            </motion.span>{' '}
            <span className="inline-block align-middle text-3xl sm:text-5xl lg:text-6xl">
              {birthdayConfig.welcome.headingSuffix}
            </span>
          </h1>

          {/* Delicate hairline ornament */}
          <div className="mx-auto my-7 flex max-w-xs items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E6C596]/45" />
            <span className="text-xs text-[#F9A8D4]/80" aria-hidden="true">
              ✦
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E6C596]/45" />
          </div>

          {/* Subheading */}
          <p className="mx-auto max-w-xl text-base leading-relaxed text-rose-100/85 sm:text-lg">
            {birthdayConfig.welcome.subheading}
          </p>

          {/* Primary Action */}
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={onStartSurprise}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#F9A8D4]/45 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_36px_rgba(190,18,60,0.42)] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FBCFE8]/70 hover:shadow-[0_16px_44px_rgba(225,29,72,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4] active:translate-y-0"
            >
              <span>{birthdayConfig.welcome.ctaLabel}</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
