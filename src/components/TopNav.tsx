import {Pause, Play, Volume2, VolumeX} from 'lucide-react';
import {birthdayConfig} from '../config/birthdayConfig';

interface TopNavProps {
  recipientName: string;
  isPlaying: boolean;
  onToggleMusic: () => void;
  volume: number;
  onToggleMute: () => void;
}

export function TopNav({
  recipientName,
  isPlaying,
  onToggleMusic,
  volume,
  onToggleMute,
}: TopNavProps) {
  const isMuted = volume === 0;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rose-200/10 bg-[#070406]/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        <a
          href="#welcome"
          className="font-display text-xl font-semibold tracking-wide text-[#FDF2F6] whitespace-nowrap shrink-0 transition-colors hover:text-[#F9A8D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]/70 rounded-sm"
        >
          For {recipientName}
        </a>

        <nav
          aria-label="Birthday sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-rose-100/75"
        >
          <a
            href="#welcome"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#FDF2F6] underline-offset-4 hover:underline"
          >
            Welcome
          </a>
          <a
            href="#gift-section"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#FDF2F6] underline-offset-4 hover:underline"
          >
            Gift
          </a>
          <a
            href="#letter-section"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#FDF2F6] underline-offset-4 hover:underline"
          >
            Letter
          </a>
          <a
            href="#moments-section"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#FDF2F6] underline-offset-4 hover:underline"
          >
            Moments
          </a>
          <a
            href="#finale-section"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#FDF2F6] underline-offset-4 hover:underline"
          >
            Wishes
          </a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {isPlaying && (
            <button
              type="button"
              data-music-toggle="true"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200/15 bg-white/5 text-rose-100/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          )}
          <button
            type="button"
            data-music-toggle="true"
            onClick={onToggleMusic}
            aria-pressed={isPlaying}
            aria-label={
              isPlaying
                ? `Pause ${birthdayConfig.music.trackTitle}`
                : `Play ${birthdayConfig.music.trackTitle}`
            }
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#E6C596]/35 bg-[#4A0E1B]/70 px-4 py-2 text-xs font-medium tracking-wide text-[#FDF2F6] whitespace-nowrap shrink-0 transition-all duration-200 hover:border-[#F9A8D4]/60 hover:bg-[#6B1228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#E6C596]" />
                <span>Pause Music</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#F9A8D4]" />
                <span>Play Music</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
