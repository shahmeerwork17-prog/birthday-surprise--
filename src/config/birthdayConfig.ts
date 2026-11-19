export interface MemoryItem {
  id: string;
  title: string;
  dateLabel: string;
  caption: string;
  imageSrc: string;
  mood: 'rose' | 'candle' | 'moonlight';
}

export interface BirthdayConfig {
  recipientName: string;
  occasionDate: string;
  theme: {
    obsidian: string;
    burgundy: string;
    crimson: string;
    blush: string;
    champagne: string;
    ivoryPaper: string;
    inkText: string;
  };
  welcome: {
    headingPrefix: string;
    headingSuffix: string;
    subheading: string;
    ctaLabel: string;
  };
  music: {
    audioSrc: string;
    trackTitle: string;
    volume: number;
    autoStartOnFirstInteraction: boolean;
  };
  media: {
    heroImageSrc: string;
    heroVideoSrc: string;
    memories: MemoryItem[];
  };
  gift: {
    heading: string;
    subheading: string;
    buttonText: string;
    openedTitle: string;
    openedSubtitle: string;
  };
  letter: {
    heading: string;
    envelopeLabel: string;
    salutation: string;
    paragraphs: string[];
    closingLine: string;
    signature: string;
  };
  memoriesSection: {
    heading: string;
    subheading: string;
  };
  finale: {
    heading: string;
    message: string;
    wishButtonText: string;
    closingMessage: string;
  };
}

/**
 * Central Customization Configuration
 * -----------------------------------
 * Update any name, message, letter paragraph, music track, photo, video,
 * or theme color below to personalize the birthday experience.
 */
export const birthdayConfig: BirthdayConfig = {
  recipientName: 'Elena',
  occasionDate: 'November 19',

  theme: {
    obsidian: '#070406',
    burgundy: '#4A0E1B',
    crimson: '#B91C3C',
    blush: '#F9A8D4',
    champagne: '#E6C596',
    ivoryPaper: '#FBF6EE',
    inkText: '#2A1118',
  },

  welcome: {
    headingPrefix: 'Happy Birthday,',
    headingSuffix: '❤️',
    subheading: 'Today is a little more special because the world has you in it.',
    ctaLabel: 'Begin Your Surprise',
  },

  music: {
    audioSrc: '/audio/romantic-melody.wav',
    trackTitle: 'Moonlight Waltz',
    volume: 0.35,
    autoStartOnFirstInteraction: true,
  },

  media: {
    // Optional: set to "/images/your-hero-photo.jpg" to display a personal portrait or photo
    heroImageSrc: '',
    // Optional: set to "/video/your-romantic-loop.mp4" to render a looping background video
    heroVideoSrc: '',
    memories: [
      {
        id: 'memory-1',
        title: 'Warmth in Every Smile',
        dateLabel: 'Chapter One',
        caption: 'Every quiet conversation and shared laugh turns an ordinary evening into my favorite memory.',
        imageSrc: '',
        mood: 'rose',
      },
      {
        id: 'memory-2',
        title: 'Golden Hour Wishes',
        dateLabel: 'Chapter Two',
        caption: 'May this new year bring you gentle mornings, bright adventures, and peace in every step.',
        imageSrc: '',
        mood: 'candle',
      },
      {
        id: 'memory-3',
        title: 'Under the Same Stars',
        dateLabel: 'Chapter Three',
        caption: 'No matter how busy the days get, you remain the most luminous part of every moment.',
        imageSrc: '',
        mood: 'moonlight',
      },
    ],
  },

  gift: {
    heading: 'A Little Surprise For You 🎁',
    subheading: 'Someone special has prepared something just for you...',
    buttonText: 'OPEN YOUR GIFT ❤️',
    openedTitle: 'With All My Heart',
    openedSubtitle: 'A handwritten note awaits you just below.',
  },

  letter: {
    heading: 'A Little Note From My Heart 💌',
    envelopeLabel: 'Tap the wax seal to open your letter',
    salutation: 'My Dearest ❤️,',
    paragraphs: [
      "I don't know how to put everything into words, but today I just want you to know how special you are.",
      'Your smile makes ordinary moments beautiful, and your presence makes everything feel a little brighter.',
      'I hope your birthday brings you endless happiness, beautiful memories, and everything your heart wishes for.',
      'Never forget how precious and wonderful you are.',
      'Happy Birthday, Beautiful! ❤️',
    ],
    closingLine: 'With lots of love, always. 💗',
    signature: 'Forever Yours',
  },

  memoriesSection: {
    heading: 'Little Moments I Treasure',
    subheading: 'Three quiet reminders of why today deserves to be celebrated.',
  },

  finale: {
    heading: 'Forever Special, Just Like You ❤️',
    message:
      'May your life always be filled with love, laughter, beautiful surprises, and countless reasons to smile. You deserve all the happiness in the world.',
    wishButtonText: 'Send a Birthday Wish ✨',
    closingMessage: 'Made With Love, Just For You ❤️',
  },
};

export function resolveRecipientName(): string {
  if (typeof window === 'undefined') {
    return birthdayConfig.recipientName;
  }
  const params = new URLSearchParams(window.location.search);
  const customName = params.get('name')?.trim();
  if (customName && customName.length > 0 && customName.length <= 40) {
    return customName;
  }
  return birthdayConfig.recipientName;
}
