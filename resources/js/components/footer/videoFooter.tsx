import { useEffect, useRef } from "react"

export default function VideoHeader() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      const handleLoaded = () => {
        const duration = video.duration
        if (duration > 0) {
          video.playbackRate = duration / 10 // Pour que la lecture dure 10s
        }
      }

      video.addEventListener("loadedmetadata", handleLoaded)

      return () => {
        video.removeEventListener("loadedmetadata", handleLoaded)
      }
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src="/video/Y (1).mp4"
      autoPlay
      muted
      playsInline
      loop={false}
      className="w-64 h-full object-cover"
    />
  )
}
