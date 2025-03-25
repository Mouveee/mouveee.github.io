'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowDown from '../assets/arrow_down.jpg';

// Constants for video grid
const ROWS = 4;
const COLS = 7;
const NUM_PIECES = ROWS * COLS;
const VIDEO_WIDTH = 800;
const VIDEO_HEIGHT = 450;

// Types
interface CanvasStyle {
  width: number;
  height: number;
  margin: number;
  padding: number;
  opacity: number;
  left: number;
  top: number;
  randomOffset: {
    width: number;
    height: number;
    margin: number;
    padding: number;
    x: number;
  };
  animation: {
    duration: number;
    delay: number;
  };
}

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [canvasStyles, setCanvasStyles] = useState<CanvasStyle[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleScroll = async () => {
      console.log(linkRef.current);
      linkRef.current?.click();
      window.removeEventListener("wheel", handleScroll);
    };

    window.addEventListener("wheel", handleScroll);

    const styles = Array.from({ length: NUM_PIECES }).map((_, index) => {
      const row = Math.floor(index / COLS);
      const col = index % COLS;
      const baseWidth = VIDEO_WIDTH / COLS;
      const baseHeight = VIDEO_HEIGHT / ROWS;

      return {
        width: baseWidth,
        height: baseHeight,
        margin: 5,
        padding: 1,
        opacity: 0.3 + Math.random() * 0.9,
        left: col * baseWidth,
        top: row * baseHeight,
        randomOffset: {
          width: Math.random() * 15,
          height: Math.random() * 15,
          margin: Math.random() * 15,
          padding: Math.random() * 15,
          x: Math.random() * 12,
        },
        animation: {
          duration: 1 + Math.random() * 2,
          delay: Math.random() * 2,
        }
      };
    });

    setCanvasStyles(styles);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    }
  }, []);


  useEffect(() => {
    if (!isVideoLoaded) {
      console.log('Video not loaded');
      return;
    }

    setTimeout(() => {
      setIsTextVisible(true);
      setArrowVisible(true);
    }, 200);

    function draw() {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      canvasRefs.current.forEach((canvas, index) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const style = canvasStyles[index];
        if (!style) return;

        const row = Math.floor(index / COLS);
        const col = index % COLS;
        const sourceWidth = VIDEO_WIDTH / COLS;
        const sourceHeight = VIDEO_HEIGHT / ROWS;

        ctx.clearRect(0, 0, style.width + style.randomOffset.width, style.height + style.randomOffset.height);
        ctx.drawImage(
          video,
          col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, // Source area
          0, 0, style.width + style.randomOffset.width, style.height + style.randomOffset.height // Destination area
        );
      });

      requestAnimationFrame(draw);
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
  }, [isVideoLoaded, canvasStyles]);

  const handleVideoLoad = () => {
    console.log('Video loaded');
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  // Link click handler
  const handleLinkClick = () => {
    setFadeOut(true);
  };

  // Compute canvas style function
  const getCanvasStyle = (style: CanvasStyle | undefined) => {
    if (!style) return {};

    return {
      left: `${style.left - style.randomOffset.x}px`,
      top: `${style.top}px`,
      margin: `${style.margin + style.randomOffset.margin}px`,
      padding: `${style.padding + style.randomOffset.padding}px`,
      opacity: isVideoLoaded ? style.opacity : 0,
      transition: "opacity 3s",
      filter: "contrast(1.3)",
      borderRadius: "-30%",
      animation: `spin ${style.animation.duration}s linear infinite alternate`,
      animationDelay: `${style.animation.delay}s`,
      sepia: "0.5",
      width: `${style.width + style.randomOffset.width}px`,
      height: `${style.height + style.randomOffset.height}px`,
      mixBlendMode: "multiply",
    };
  };

  return (
    <div className={`relative min-h-screen h-[101vh] flex items-center justify-center bg-black overflow-visible ${fadeOut ? "opacity-0 transition-opacity duration-[3000s]" : ""}`}>
      <div
        className="relative overflow-visible"
        style={{
          width: `${VIDEO_WIDTH}px`,
          height: `${VIDEO_HEIGHT}px`,
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
        {canvasStyles.map((style, index) => (
          <div className="absolute" key={index}>
            <canvas
              ref={(el) => { canvasRefs.current[index] = el; }}
              className="absolute flicker inset-0 transform rotateY-180"
              style={getCanvasStyle(style)}
              width={style.width + style.randomOffset.width - index * 2}
              height={style.height + style.randomOffset.height - index * 2}
            ></canvas>

            <div className="absolute inset-0 bg-pink-500 pointer-events-none flicker"
              style={{...getCanvasStyle(style), opacity: Math.random() * 0.2}}
            >
            </div>
          </div>

        ))}
      </div>

      {/* Animated Arrow Link */}
      <Link
        href="/intro"
        className={`absolute w-5 h-5 border-r-yellow-950 bottom-6 transition-opacity duration-1000 z-50 ease-in-out ${arrowVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleLinkClick}
        ref={linkRef}
      >
        <Image src={arrowDown} alt="Arrow down" className="w-auto h-auto rounded-full animate-bounce border-r-pink-500" />
      </Link>

      {/* Text Overlay */}
      <div
        className="fixed text-center  text-4xl font-bold uppercase tracking-widest transition-opacity duration-5000 ease-in-out"
        style={{ opacity: isTextVisible ? 1 : 0 }}
      >
        <h1 className="glitch font-bold text-5xl">MARCO HUWIG - WEB DEVELOPMENT</h1>
      </div>

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