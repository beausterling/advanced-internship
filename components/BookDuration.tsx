"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";

interface BookDurationProps {
  audioLink: string;
  long?: boolean;
}

// the api doesn't have a duration so it's read from the audio file
export default function BookDuration({ audioLink, long }: BookDurationProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    function handleLoaded() {
      setDuration(audio.duration);
    }
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.src = audioLink;
    return () => audio.removeEventListener("loadedmetadata", handleLoaded);
  }, [audioLink]);

  if (long) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return (
      <>
        {minutes} mins {seconds} secs
      </>
    );
  }

  return <>{formatTime(duration)}</>;
}
