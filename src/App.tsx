/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import {
  Slide1Birthday,
  Slide2Continue,
  Slide3MakeAWish,
  Slide4Message,
  Slide6Together,
  Slide7ThankYou,
} from './components/KawaiiSlides';
import { LetterSlide } from './components/LetterSlide';
import initialSavedSlides from './assets/savedSlides.json';
import initialSavedMusic from './assets/savedMusic.json';
import defaultBgmUrl from './assets/bgm.mp3';

const TOTAL_STEPS = 7;

type TransitionPhase = 'open' | 'fading' | 'collapsed';

interface MusicMeta {
  hasMusic: boolean;
  fileName: string;
  updatedAt: number;
}

export default function App() {
  const [step, setStep] = useState<number>(0);
  const [phase, setPhase] = useState<TransitionPhase>('collapsed');
  const [savedSlides, setSavedSlides] = useState<Record<string, string>>(() => {
    const initial = (initialSavedSlides as Record<string, string>) || {};
    try {
      const local = localStorage.getItem('davina_saved_slides_v2');
      if (local) {
        return { ...initial, ...JSON.parse(local) };
      }
    } catch {
      // Ignore storage errors
    }
    return initial;
  });

  const [musicMeta, setMusicMeta] = useState<MusicMeta>(() => {
    return (
      (initialSavedMusic as MusicMeta) || {
        hasMusic: false,
        fileName: '',
        updatedAt: 0,
      }
    );
  });
  const [localMusicUrl, setLocalMusicUrl] = useState<string | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [userMuted, setUserMuted] = useState<boolean>(false);
  const [isUploadingMusic, setIsUploadingMusic] = useState<boolean>(false);

  const slide6InputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch latest saved slides and music metadata from server on load
  useEffect(() => {
    fetch('/api/slides')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          setSavedSlides((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});

    fetch('/api/music')
      .then((r) => (r.ok ? r.json() : null))
      .then((meta: MusicMeta | null) => {
        if (meta && typeof meta.hasMusic === 'boolean') {
          setMusicMeta(meta);
        }
      })
      .catch(() => {});
  }, []);

  // Unfold initial card on mount just like 00:02 -> 00:04 in the video
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('open');
    }, 420);
    return () => clearTimeout(timer);
  }, []);

  const hasMusicAvailable = Boolean(
    musicMeta.hasMusic || localMusicUrl || defaultBgmUrl
  );
  const audioSrc = localMusicUrl || defaultBgmUrl || '/bgm.mp3';

  // Attempt autoplay and unlock audio on first user interaction
  useEffect(() => {
    if (!hasMusicAvailable || userMuted) return;
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (!audioRef.current || userMuted) return;
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingMusic(true);
          })
          .catch(() => {
            // Browser blocked autoplay until user taps
          });
      }
    };

    tryPlay();

    const handleFirstInteraction = () => {
      tryPlay();
    };

    window.addEventListener('pointerdown', handleFirstInteraction, {
      once: true,
    });
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, [hasMusicAvailable, audioSrc, userMuted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setUserMuted(false);
      audio
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    } else {
      setUserMuted(true);
      audio.pause();
      setIsPlayingMusic(false);
    }
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMusic(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setLocalMusicUrl(dataUrl);
      setUserMuted(false);

      try {
        const res = await fetch('/api/music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, fileName: file.name }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.meta) {
            setMusicMeta(json.meta);
          }
        }
      } catch {
        // Fallback to localMusicUrl in current session
      } finally {
        setIsUploadingMusic(false);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current
              .play()
              .then(() => setIsPlayingMusic(true))
              .catch(() => {});
          }
        }, 120);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const persistSlideUpdates = async (updates: Record<string, string>) => {
    setSavedSlides((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('davina_saved_slides_v2', JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      return next;
    });

    try {
      await fetch('/api/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
    } catch {
      // Saved in localStorage as fallback
    }
  };

  const handleSlide6FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / (img.height || 1);
        if (ratio >= 0.78 && ratio <= 1.24) {
          persistSlideUpdates({ slide6Full: dataUrl });
        } else {
          persistSlideUpdates({ slide6Photo: dataUrl, slide6Full: '' });
        }
        if (step !== 5) {
          transitionToStep(5);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const transitionToStep = (nextStepIndex: number) => {
    if (phase !== 'open') return;
    const clamped = ((nextStepIndex % TOTAL_STEPS) + TOTAL_STEPS) % TOTAL_STEPS;

    // Ensure music starts playing when navigating if not muted
    if (hasMusicAvailable && !userMuted && audioRef.current?.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }

    setPhase('fading');

    setTimeout(() => {
      setPhase('collapsed');
      setStep(clamped);
    }, 190);

    setTimeout(() => {
      setPhase('open');
    }, 450);
  };

  const handleNext = () => {
    if (step === TOTAL_STEPS - 1) {
      transitionToStep(0);
    } else {
      transitionToStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      transitionToStep(step - 1);
    }
  };

  const getPrimaryButtonLabel = () => {
    if (step === 3) return 'BUKA SURAT';
    if (step === TOTAL_STEPS - 1) return 'ULANGI DARI AWAL';
    return 'LANJUT';
  };

  const renderSlideContent = () => {
    switch (step) {
      case 0:
        return <Slide1Birthday customSlideImg={savedSlides.slide1} />;
      case 1:
        return (
          <Slide2Continue
            onContinue={handleNext}
            customSlideImg={savedSlides.slide2}
          />
        );
      case 2:
        return <Slide3MakeAWish customSlideImg={savedSlides.slide3} />;
      case 3:
        return (
          <Slide4Message
            onOpen={handleNext}
            customSlideImg={savedSlides.slide4}
          />
        );
      case 4:
        return <LetterSlide />;
      case 5:
        return (
          <Slide6Together
            fullSlideImg={savedSlides.slide6Full}
            couplePhotoImg={savedSlides.slide6Photo}
            onPickSlide6File={() => slide6InputRef.current?.click()}
          />
        );
      case 6:
        return <Slide7ThankYou customSlideImg={savedSlides.slide7} />;
      default:
        return <Slide1Birthday />;
    }
  };

  const isLetterStep = step === 4;

  return (
    <div className="min-h-dvh w-full bg-checkerboard flex flex-col items-center justify-between px-4 py-8 sm:py-10 overflow-x-hidden relative">
      {/* Hidden File Inputs */}
      <input
        ref={slide6InputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSlide6FileChange}
      />
      <input
        ref={musicInputRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.wav,.ogg"
        className="hidden"
        onChange={handleMusicFileChange}
      />

      {/* Background Audio Element */}
      {hasMusicAvailable && (
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
          onPlay={() => setIsPlayingMusic(true)}
          onPause={() => setIsPlayingMusic(false)}
        />
      )}

      {/* Floating Music Mute/Unmute Button in Top-Right (Visible once MP3 is uploaded) */}
      {hasMusicAvailable && (
        <button
          type="button"
          onClick={toggleMusic}
          onDoubleClick={() => musicInputRef.current?.click()}
          title={
            isPlayingMusic
              ? 'Matikan musik (Klik 2x untuk ganti lagu)'
              : 'Putar musik (Klik 2x untuk ganti lagu)'
          }
          aria-label={isPlayingMusic ? 'Matikan musik' : 'Putar musik'}
          className="fixed top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/95 border border-[#1e3246] shadow-[0_3px_10px_rgba(24,49,72,0.1)] flex items-center justify-center text-[#183148] active:scale-95 transition-transform cursor-pointer"
        >
          {isPlayingMusic ? (
            <Music className="w-4 h-4 text-[#2980b9] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#64748b]" />
          )}
        </button>
      )}

      {/* Top Header Section */}
      <header className="text-center pt-1 sm:pt-2 select-none flex flex-col items-center">
        <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-[#5e7a93] uppercase mb-1.5">
          UNTUK DAVINA
        </p>
        <h1 className="font-serif-title text-[28px] sm:text-[32px] leading-[1.18] font-bold text-[#183148] tracking-[-0.01em]">
          Happy Birthday,
          <br />
          Davina Radyanka
        </h1>

        {/* One-time MP3 upload button (disappears automatically once the MP3 file is saved) */}
        {!hasMusicAvailable && (
          <button
            type="button"
            disabled={isUploadingMusic}
            onClick={() => musicInputRef.current?.click()}
            className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#7db7e0] shadow-sm text-[11.5px] font-semibold text-[#183148] hover:bg-[#f0f8ff] active:scale-95 transition-all cursor-pointer disabled:opacity-60"
          >
            <Music className="w-3.5 h-3.5 text-[#2980b9]" />
            <span>
              {isUploadingMusic
                ? 'Menyimpan lagu MP3...'
                : 'Pilih File MP3 Lagu (Tersimpan Permanen)'}
            </span>
          </button>
        )}
      </header>

      {/* Center Interactive Card Dispenser / Frame */}
      <main className="w-full max-w-[356px] sm:max-w-[372px] my-auto py-4 flex items-center justify-center">
        <div className="w-full bg-white rounded-[20px] p-[8.5px] shadow-[0_6px_24px_rgba(24,49,72,0.08)] transition-all duration-300">
          <div
            className={`w-full border-[1.5px] border-dashed border-[#2b3d4f] rounded-[13px] overflow-hidden transition-all duration-300 ease-in-out ${
              phase === 'collapsed'
                ? 'h-[6px] opacity-95'
                : isLetterStep
                  ? 'h-[390px] sm:h-[405px]'
                  : 'aspect-square'
            }`}
          >
            <div
              className={`w-full h-full transition-opacity duration-200 ${
                phase === 'open'
                  ? 'opacity-100'
                  : phase === 'fading'
                    ? 'opacity-15'
                    : 'opacity-0'
              }`}
            >
              {renderSlideContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Pagination Dots & Navigation Buttons */}
      <footer className="w-full max-w-[372px] flex flex-col items-center pb-2 sm:pb-3 select-none">
        {/* Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
            const isActive = idx === step;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => idx !== step && transitionToStep(idx)}
                aria-label={`Halaman ${idx + 1}`}
                className={`h-[7px] rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 bg-[#7db7e0]'
                    : 'w-[7px] bg-[#cbe2f4] hover:bg-[#b0d3ee]'
                }`}
              />
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3.5 w-full">
          {step > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full bg-white border border-[#1e3246] px-6 py-[11px] shadow-[0_3px_10px_rgba(24,49,72,0.06)] active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
            >
              <span className="text-[12px] sm:text-[12.5px] font-bold tracking-[0.11em] text-[#183148] uppercase whitespace-nowrap">
                KEMBALI
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-[#9ecae7] border border-[#1e3246] p-[3px] shadow-[0_4px_12px_rgba(24,49,72,0.1)] active:scale-95 transition-transform cursor-pointer"
          >
            <span className="rounded-full border border-dashed border-[#2b4257]/80 px-7 py-[8px] flex items-center justify-center text-[12px] sm:text-[12.5px] font-bold tracking-[0.11em] text-[#183148] uppercase whitespace-nowrap">
              {getPrimaryButtonLabel()}
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
