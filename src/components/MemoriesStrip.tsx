import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {X} from 'lucide-react';
import {birthdayConfig, type MemoryItem} from '../config/birthdayConfig';
import {MemoryArtFallback} from './BotanicalIllustrations';

export function MemoriesStrip() {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!selectedMemory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMemory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMemory]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({...prev, [id]: true}));
  };

  return (
    <section
      id="moments-section"
      className="relative z-20 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-[#E6C596]/80">
          Chapter Three <span aria-hidden="true">·</span> Keepsakes
        </p>
        <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[#FDF2F6] sm:text-5xl">
          {birthdayConfig.memoriesSection.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-rose-100/75">
          {birthdayConfig.memoriesSection.subheading}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {birthdayConfig.media.memories.map((item, idx) => {
          const showPhoto = Boolean(item.imageSrc) && !failedImages[item.id];
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelectedMemory(item)}
              initial={{opacity: 0, y: 22}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1]}}
              className="group flex flex-col overflow-hidden rounded-2xl border border-rose-200/15 bg-[#12060B]/85 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#E6C596]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-rose-200/10">
                {showPhoto ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(item.id)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <MemoryArtFallback mood={item.mood} title={item.title} />
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#E6C596]/80">
                  {item.dateLabel}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#FDF2F6]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-rose-100/75">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setSelectedMemory(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedMemory.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{opacity: 0, scale: 0.95, y: 12}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.96, y: 8}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#E6C596]/30 bg-[#14070C] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close memory view"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A8D4]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[4/3] w-full overflow-hidden border-b border-rose-200/10">
                {Boolean(selectedMemory.imageSrc) && !failedImages[selectedMemory.id] ? (
                  <img
                    src={selectedMemory.imageSrc}
                    alt={selectedMemory.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(selectedMemory.id)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MemoryArtFallback mood={selectedMemory.mood} title={selectedMemory.title} />
                )}
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#E6C596]/85">
                  {selectedMemory.dateLabel}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-[#FDF2F6]">
                  {selectedMemory.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-rose-100/85">
                  {selectedMemory.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
