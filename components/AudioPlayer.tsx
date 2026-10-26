"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { Book } from "@/types/book";

export default function AudioPlayer({ book }: { book: Book }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="audio__wrapper">
      <audio
        ref={audioRef}
        src={book.audioLink}
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
      <div className="audio__progress--wrapper"></div>
    </div>
  );
}
