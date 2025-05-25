import { useEffect, useRef, useState } from "react";

export default function VideoHeader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleLoaded = () => {
        const duration = video.duration;
        if (duration > 0) {
          video.playbackRate = duration / 2; // Durée de lecture = 2s
        }
      };

      const handleEnded = () => {
        setIsEnded(true); // Cache la vidéo à la fin
      };

      video.addEventListener("loadedmetadata", handleLoaded);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoaded);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src="/video/7020200-nature-outer-3840x2160_trTMASbd.mp4"
      autoPlay
      muted
      playsInline
      loop={false}
      className={`w-full h-full object-cover transition-opacity duration-1000 ${isEnded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    />
  );
}
