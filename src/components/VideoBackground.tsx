'use client';

export default function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-20 grayscale contrast-125"
      >
        {/* High quality coding/hacker abstract video placeholder */}
        <source src="https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-laptop-keyboard-4161-large.mp4" type="video/mp4" />
      </video>

      {/* Premium Dark Gradient Overlays - Made transparent to reveal global background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      
      {/* Subtle Blue/Red Tech Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900/10 mix-blend-overlay" />
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.2]">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,255,255,0.05),rgba(0,0,0,0),rgba(255,255,255,0.05))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
