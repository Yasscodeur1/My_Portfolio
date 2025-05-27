import { useEffect, useRef, useState } from "react";

export default function VideoHeader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    // Vérifie le mode dark au chargement
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains("dark"));
    }

    if (video) {
      const handleLoaded = () => {
        const duration = video.duration;
        if (duration > 0) {
          video.playbackRate = duration / 1; // Réduction de la durée
        }
      };

      const handleEnded = () => {
        setIsEnded(true); // Cache la première vidéo
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
    <div className="relative w-full h-full">
      {/* Première vidéo */}
      <video
        ref={videoRef}
        src="/video/EtincellesArgent.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${isEnded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      />
    </div>
  );
}
