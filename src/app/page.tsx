'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowDown from '../assets/arrow_down.jpg';

interface Style {
  width: number;
  height: number;
  margin: number;
  padding: number;
}

export default function Home() {
  const rows = 4;
  const cols = 7;
  const numPieces = rows * cols;
  const videoWidth = 800;
  const videoHeight = 450;

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [styles, setStyles] = useState<Style[]>([]);
  const [opacities, setOpacities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const randomStyles = Array.from({ length: numPieces }).map(() => ({
      width: videoWidth / cols + Math.random() * 15,
      height: videoHeight / rows + Math.random() * 13,
      margin: 5 + Math.random() * 3.5,
      padding: 1 + Math.random() * 1.5,
      left: -99 - Math.random() * 10,
    }));

    const randomOpacities = Array.from({ length: numPieces }).map(
      () => 0.3 + Math.random() * 0.7
    );

    setStyles(randomStyles);
    setOpacities(randomOpacities);

    if (!isVideoLoaded) {
      console.log('Video not loaded');
      return;
    }

    function draw() {
      const video = videoRef.current;
      if (video && !video.paused && !video.ended) {
        canvasRefs.current.forEach((canvas, index) => {
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const row = Math.floor(index / cols);
          const col = index % cols;
          const style = styles[index];

          ctx.clearRect(0, 0, style.width, style.height);
          ctx.drawImage(
            video,
            col * (videoWidth / cols), row * (videoHeight / rows), videoWidth / cols, videoHeight / rows, // Source area
            0, 0, style.width, style.height // Destination area
          );
        });
        requestAnimationFrame(draw);
      }
    }

    const handleVideoPlay = () => {
      draw();
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', handleVideoPlay);
    }

    return () => {
      if (video) {
        video.removeEventListener('play', handleVideoPlay);
      }
    };
  }, [isVideoLoaded, numPieces]);

  const handleVideoLoad = () => {
    console.log('Video loaded');
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isVideoLoaded) {
      setTimeout(() => { setIsTextVisible(true); setArrowVisible(true); }, 5000);
    }
  }, [isVideoLoaded]);

  const handleLinkClick = () => {
    // Trigger fade-out when the link is clicked
    setFadeOut(true);
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center bg-black overflow-hidden ${fadeOut ? "opacity-0 transition-opacity duration-[3000s]" : ""}`}>
      <div
        className="relative"
        style={{
          width: `${videoWidth}px`,
          height: `${videoHeight}px`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Render Canvas Grid */}
        {styles.length > 0 &&
          opacities.length > 0 &&
          Array.from({ length: numPieces }).map((_, index) => (
            <canvas
              key={index}
              ref={(el) => {
                canvasRefs.current[index] = el;
              }}
              width={styles[index].width}
              height={styles[index].height}
              className="absolute flicker"
              style={{
                width: `${styles[index].width}px` + Math.random() * 10,
                height: `${styles[index].height}px` + Math.random() * 10,
                left: `${(index % cols) * (videoWidth / cols) - Math.random() * 12}px`, // Removed random shift
                top: `${Math.floor(index / cols) * (videoHeight / rows)}px`,
                margin: `${styles[index].margin}px` + Math.random() * 15,
                padding: `${styles[index].padding}px` + Math.random() * 15,
                opacity: isVideoLoaded ? opacities[index] : 0,
                transition: "opacity 3s",
                transform: "rotate(360deg)",
                filter: "pixelate(1px)",
                borderRadius: "25%",
              }}
            ></canvas>
          ))}
      </div>

      {/* Animated Arrow Link */}
      <Link
        href="/intro"
        onClick={handleLinkClick} // Trigger fade-out when clicked
        className={` absolute bottom-6 transition-opacity duration-1000 z-50 ease-in-out ${arrowVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image src={arrowDown} alt="Arrow down" className="w-6 h-6 animate-bounce border-r-pink-500" />
      </Link>

      {/* Text Overlay */}
      {isTextVisible && (
        <div
          className="absolute text-center text-white text-4xl font-bold uppercase tracking-widest opacity-0 transition-opacity duration-5000 ease-in-out"
          style={{ opacity: isTextVisible ? 1 : 0 }}
        >
          <h1 className="glitch font-bold text-5xl">MARCO HUWIG - WEB DEVELOPMENT</h1>
        </div>
      )}

      {/* Hidden Video (Used as a Source for Canvas) */}
      <video
        id="sourceVideo"
        className="absolute opacity-0 grayscale"
        ref={videoRef}
        src="/myself.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
      />
    </div>
  );
}
