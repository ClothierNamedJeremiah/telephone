import clsx from 'clsx';
import { Ma_Shan_Zheng } from 'next/font/google';
import { memo, useEffect, useRef, useState } from 'react';

const ma_shan_zheng = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 34 34"
      fill="none"
    >
      <path
        d="M13.6667 24.5V9.50004L23.6667 17M17 0.333374C14.8113 0.333374 12.644 0.76447 10.6219 1.60205C8.59985 2.43963 6.76253 3.66728 5.21489 5.21493C2.08928 8.34053 0.333334 12.5798 0.333334 17C0.333334 21.4203 2.08928 25.6595 5.21489 28.7852C6.76253 30.3328 8.59985 31.5605 10.6219 32.398C12.644 33.2356 14.8113 33.6667 17 33.6667C21.4203 33.6667 25.6595 31.9108 28.7851 28.7852C31.9107 25.6595 33.6667 21.4203 33.6667 17C33.6667 14.8113 33.2356 12.6441 32.398 10.622C31.5604 8.59989 30.3328 6.76257 28.7851 5.21493C27.2375 3.66728 25.4002 2.43963 23.3781 1.60205C21.356 0.76447 19.1887 0.333374 17 0.333374Z"
        fill="#60565A"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 34 34"
      fill="none"
    >
      <path
        d="M22 23.6667H18.6667V10.3333H22M15.3333 23.6667H12V10.3333H15.3333M17 0.333344C14.8113 0.333344 12.644 0.76444 10.6219 1.60202C8.59985 2.4396 6.76253 3.66725 5.21489 5.2149C2.08928 8.3405 0.333336 12.5797 0.333336 17C0.333336 21.4203 2.08928 25.6595 5.21489 28.7851C6.76253 30.3328 8.59985 31.5604 10.6219 32.398C12.644 33.2356 14.8113 33.6667 17 33.6667C21.4203 33.6667 25.6595 31.9107 28.7851 28.7851C31.9107 25.6595 33.6667 21.4203 33.6667 17C33.6667 14.8113 33.2356 12.644 32.398 10.622C31.5604 8.59986 30.3328 6.76254 28.7851 5.2149C27.2375 3.66725 25.4002 2.4396 23.3781 1.60202C21.356 0.76444 19.1887 0.333344 17 0.333344Z"
        fill="#60565A"
      />
    </svg>
  );
}

type AudioInputProps = {
  src: string;
};

const AudioInput = memo(function AudioInput({ src }: AudioInputProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioState, setAudioState] = useState<'READY' | 'PLAYING'>('READY');

  useEffect(() => {
    const audioElement = audioRef.current;
    let onAudioEnd: () => void | undefined;
    let onAudioPause: () => void | undefined;
    let onAudioPlay: () => void | undefined;

    if (audioElement) {
      onAudioEnd = () => {
        setAudioState('READY');
      };
      onAudioPause = () => {
        setAudioState('READY');
      };
      onAudioPlay = () => {
        setAudioState('PLAYING');
      };
      audioElement.addEventListener('play', onAudioPlay);
      audioElement.addEventListener('pause', onAudioPause);
      audioElement.addEventListener('ended', onAudioEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', onAudioEnd);
        audioElement.removeEventListener('pause', onAudioPause);
        audioElement.removeEventListener('play', onAudioPlay);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio element to update the source because React won't for us
    }
  }, [src]);

  return (
    <div className="grid h-[48px] grid-cols-[auto_1fr] justify-center border-4 border-solid border-[#60565A] bg-white md:h-[80px]">
      <audio ref={audioRef} autoPlay>
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="grid content-center border-r-2 border-solid border-[#60565A] px-2 md:px-4">
        <button
          className="text-2xl focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-black md:text-4xl"
          role="application"
          title={audioState === 'PLAYING' ? 'pause audio' : 'play audio'}
          onClick={() => {
            if (audioState === 'READY') {
              audioRef.current?.play();
            } else if (audioState === 'PLAYING') {
              audioRef.current?.pause();
            }
          }}
          type="button"
        >
          {audioState === 'PLAYING' ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <input
        placeholder="一二三四五六七八九十零"
        name="response"
        type="text"
        lang="zh-CN"
        autoComplete="off"
        pattern="[一二三四五六七八九十零]*"
        title="Simplified Chinese characters. Only numbers 0-10"
        required
        className={clsx(
          ma_shan_zheng.className,
          'block w-full px-4 text-3xl md:text-5xl',
          'focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-black'
        )}
      />
    </div>
  );
});

export default AudioInput;
