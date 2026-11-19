import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {birthdayConfig, resolveRecipientName} from './config/birthdayConfig';
import {useBackgroundMusic} from './hooks/useBackgroundMusic';
import {RomanticAtmosphere} from './components/RomanticAtmosphere';
import {TopNav} from './components/TopNav';
import {HeroWelcome} from './components/HeroWelcome';
import {GiftSurpriseSection} from './components/GiftSurpriseSection';
import {LoveLetterSection} from './components/LoveLetterSection';
import {MemoriesStrip} from './components/MemoriesStrip';
import {FinalSurpriseSection} from './components/FinalSurpriseSection';

export default function App() {
  const recipientName = useMemo(() => resolveRecipientName(), []);
  const music = useBackgroundMusic();

  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const previousVolumeRef = useRef(birthdayConfig.music.volume);
  const scrollTimerRef = useRef<number | null>(null);

  // Sync customizable palette variables & document title from birthdayConfig
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-obsidian', birthdayConfig.theme.obsidian);
    root.style.setProperty('--color-burgundy', birthdayConfig.theme.burgundy);
    root.style.setProperty('--color-crimson', birthdayConfig.theme.crimson);
    root.style.setProperty('--color-blush', birthdayConfig.theme.blush);
    root.style.setProperty('--color-champagne', birthdayConfig.theme.champagne);
    root.style.setProperty('--color-ivory', birthdayConfig.theme.ivoryPaper);
    root.style.setProperty('--color-ink', birthdayConfig.theme.inkText);
    document.title = `Happy Birthday, ${recipientName} ❤️`;
  }, [recipientName]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, []);

  const handleStartSurprise = useCallback(() => {
    music.startIfIdle();
    scrollToSection('gift-section');
  }, [music, scrollToSection]);

  const handleOpenGift = useCallback(() => {
    music.startIfIdle();
    setIsGiftOpened(true);
    setIsEnvelopeOpen(true);

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      scrollToSection('letter-section');
    }, 1150);
  }, [music, scrollToSection]);

  const handleResetGift = useCallback(() => {
    setIsGiftOpened(false);
  }, []);

  const handleReplaySurprise = useCallback(() => {
    setIsGiftOpened(false);
    setIsEnvelopeOpen(false);
    scrollToSection('welcome');
  }, [scrollToSection]);

  const handleToggleMute = useCallback(() => {
    if (music.volume > 0) {
      previousVolumeRef.current = music.volume;
      music.setVolume(0);
    } else {
      music.setVolume(previousVolumeRef.current || birthdayConfig.music.volume);
    }
  }, [music]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#070406] text-[#FDF2F6]">
      {/* Glossy rising bubbles, subtle floating hearts, sparkles & celebratory bursts */}
      <RomanticAtmosphere dimmed={isEnvelopeOpen} />

      <TopNav
        recipientName={recipientName}
        isPlaying={music.isPlaying}
        onToggleMusic={music.togglePlay}
        volume={music.volume}
        onToggleMute={handleToggleMute}
      />

      <main className="relative z-10">
        <HeroWelcome
          recipientName={recipientName}
          onStartSurprise={handleStartSurprise}
        />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-200/15 to-transparent" />
        </div>

        <GiftSurpriseSection
          isOpened={isGiftOpened}
          onOpenGift={handleOpenGift}
          onResetGift={handleResetGift}
          onScrollToLetter={() => scrollToSection('letter-section')}
        />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-200/15 to-transparent" />
        </div>

        <LoveLetterSection
          isEnvelopeOpen={isEnvelopeOpen}
          onToggleEnvelope={setIsEnvelopeOpen}
        />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-200/15 to-transparent" />
        </div>

        <MemoriesStrip />
      </main>

      <FinalSurpriseSection
        recipientName={recipientName}
        onReplaySurprise={handleReplaySurprise}
      />
    </div>
  );
}
