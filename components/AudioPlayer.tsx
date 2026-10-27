"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { Book } from "@/types/book";
import { formatTime } from "@/lib/formatTime";

export default function AudioPlayer({ book }: { book: Book }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function skip(seconds: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  }

  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  }

  return (
    <div className="audio__wrapper">
      <audio
        ref={audioRef}
        src={book.audioLink}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <Image
            className="audio__track--image"
            src={book.imageLink}
            alt={book.title}
            width={48}
            height={48}
          />
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{book.title}</div>
          <div className="audio__track--author">{book.author}</div>
        </div>
      </div>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={() => skip(-10)}>
            <RiReplay10Line />
          </button>
          <button
            className="audio__controls--btn audio__controls--btn-play"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <BsFillPauseFill />
            ) : (
              <BsFillPlayFill className="audio__controls--play-icon" />
            )}
          </button>
          <button className="audio__controls--btn" onClick={() => skip(10)}>
            <RiForward10Line />
          </button>
        </div>
      </div>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(currentTime)}</div>
        <input
          className="audio__progress--bar"
          type="range"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          onChange={handleProgressChange}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </div>
  );
}
