'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowDown from '../assets/arrow_down.jpg';

let INNER_WIDTH = 0;
let INNER_HEIGHT = 0;
const ROWS = 3;
const COLS = 6;
const NUM_PIECES = ROWS * COLS;

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const homescreenRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (homescreenRef.current) {
      INNER_WIDTH = window.innerWidth * 11 / 12;
      INNER_HEIGHT = window.innerHeight * 11 / 12;
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    const handleScroll = async (event: WheelEvent) => {
      if (event.deltaY > 0 && homescreenRef.current) {
        linkRef.current?.click();
        window.removeEventListener("wheel", handleScroll);
      }
    };

    window.addEventListener("wheel", handleScroll);

    const styles = Array.from({ length: NUM_PIECES }).map((_, index) => {
      const row = Math.floor(index / COLS);
      const col = index % COLS;
      const baseWidth = INNER_WIDTH / COLS;
      const baseHeight = INNER_HEIGHT / ROWS;

      return {
        width: baseWidth,
        height: baseHeight,
        margin: 2,
        padding: 1,
        opacity: 0.7 + Math.random() * 0.1,
        left: col * baseWidth,
        top: row * baseHeight,
        randomOffset: {
          width: Math.random() * 30,
          height: Math.random() * 30,
          margin: Math.random() * 2,
          padding: Math.random() * 2,
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
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        const style = canvasStyles[index];
        if (!style) return;
    
        const row = Math.floor(index / COLS);
        const col = index % COLS;
    
        const sourceWidth = (video.videoWidth / COLS);
        const sourceHeight = (video.videoHeight / ROWS);
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.drawImage(
          video,
          col * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight,
          0, 0, canvas.width, canvas.height
        );
      });
    
      requestAnimationFrame(draw);
    }
    

    const handleVideoPlay = () => {
      draw();
    };

    const video = videoRef.current;
    if (video) {
      if (!video) return;

      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('playing', handleVideoPlay);
    }


    return () => {
      if (video) {
        video.addEventListener('play', handleVideoPlay);
        video.removeEventListener('playing', handleVideoPlay);
      }
    };
  }, [isVideoLoaded, canvasStyles]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  const handleLinkClick = () => {
    setFadeOut(true);
  };

  const getCanvasStyle = (style: CanvasStyle | undefined) => {
    if (!style) return {};

    return {
      left: `${style.left - style.randomOffset.x}px`,
      top: `${style.top}px`,
      margin: `${style.margin + style.randomOffset.margin}px`,
      padding: `${style.padding + style.randomOffset.padding}px`,
      opacity: isVideoLoaded ? style.opacity : 0,
      transition: "opacity 3s",
      animation: `spin ${style.animation.duration}s linear infinite alternate`,
      animationDelay: `${style.animation.delay}s`,
      width: `${style.width + style.randomOffset.width}px`,
      height: `${style.height + style.randomOffset.height}px`,
      mixBlendMode: "screen" as const,
      borderRadius: "12px",
      filter: "blur(1px) contrast(1.1) grayscale(0.8) hue-rotate(0deg) saturate(0.1)",
    };
  };

  return (
    <div
      className={`relative m-auto homescreen min-h-screen h-[100vh] overflow-y-clip flex items-center justify-center bg-black ${fadeOut ? "opacity-0 transition-opacity duration-[3000s]" : ""} bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove`}
      ref={homescreenRef}>
      <div
        className="relative m-auto overflow-y-clip w-11/12 h-[91.6%] items-center justify-center"
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
              className="absolute flicker inset-0 grayscale"
              style={getCanvasStyle(style)}
              width={style.width + style.randomOffset.width}
              height={style.height + style.randomOffset.height}
            ></canvas>

            <div className="absolute inset-0 bg-pink-500 pointer-events-none flicker"
              style={{ ...getCanvasStyle(style),opacity: 0.02 +  Math.random() * 0.1, zIndex: 10, filter: "none" }}
            >
            </div>
          </div>

        ))}
      </div>

      <Link
        href="/intro"
        className={isMobile ? 
          "absolute w-5 h-5 border-r-yellow-950 bottom-12 right-10 transition-opacity duration-1000 z-50 ease-in-out rounded-full bg-pink-500 shadow-lg cursor-pointer animate-bounce z-49 border-2 border-white" :
          `absolute w-5 h-5 border-r-yellow-950 bottom-12 right-10 transition-opacity duration-1000 z-50 ease-in-out rounded-full bg-pink-500 shadow-lg cursor-pointer animate-bounce z-49 border-2 border-white ${arrowVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleLinkClick}
        ref={linkRef}
      >
        <Image src={arrowDown} alt="Arrow down" className={isMobile ?
          "w-auto h-auto rounded-full animate-bounce border-r-pink-500" :
          "w-auto h-auto rounded-full animate-bounce border-r-pink-500"} />
      </Link>

      {/* Text Overlay */}
      <div
        className="fixed text-left bottom-10 left-8  text-4xl font-bold uppercase tracking-widest transition-opacity duration-5000 ease-in-out"
        style={{ opacity: isTextVisible ? 1 : 0 }}
      >
        <h1 className="glitch font-bold text-5xl">MARCO HUWIG - WEB DEVELOPMENT</h1>
      </div>

      {/* Hidden Video */}
      <video
        id="sourceVideo"
        className="absolute opacity-0"
        ref={videoRef}
        src="/myself.mp4"
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
      />
    </div>
  );
}