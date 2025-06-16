'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import NavigationMenu from './components/NavigationMenu';
import Dots from './components/Dots';

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
  const [canvasStyles, setCanvasStyles] = useState<CanvasStyle[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState(1280);
  const [innerHeight, setInnerHeight] = useState(768);
  const [rows, setRows] = useState<number>(3);
  const [columns, setColumns] = useState<number>(6);
  const [numPieces, setNumPieces] = useState<number>(18);

  const homescreenRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const rowsRef = useRef(rows);
  const columnsRef = useRef(columns);
  const canvasRef = useRef(canvasStyles);

  useEffect(() => {
    if (rows !== rowsRef.current) rowsRef.current = rows;
    if (columns !== columnsRef.current) columnsRef.current = columns;
    if (canvasStyles !== canvasRef.current) canvasRef.current = canvasStyles;
  }, [rows, columns, canvasStyles])

  const updateDimensions = (width: number, height: number) => {
    setIsMobile(window.innerWidth <= 768);

    setInnerWidth(width);
    setInnerHeight(height);
  }

  useEffect(() => {

  }, [rows, columns])

  const updateCanvasStyles = useCallback(() => {
    const styles = Array.from({ length: numPieces }).map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const baseWidth = innerWidth / columns;
      const baseHeight = innerHeight / rows;

      return {
        width: baseWidth,
        height: baseHeight,
        margin: 1,
        padding: 1,
        opacity: 0.9 + Math.random() * 0.1,
        left: col * baseWidth,
        top: row * baseHeight,
        randomOffset: {
          width: Math.random() * 3,
          height: Math.random() * 3,
          margin: Math.random() * 2,
          padding: Math.random() * 2,
          x: Math.random() * 2,
        },
        animation: {
          duration: 1 + Math.random() * 2,
          delay: Math.random() * 2,
        }
      };
    });

    setCanvasStyles(styles);
  }, [columns, innerHeight, innerWidth, numPieces, rows])

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    updateDimensions(width, height);

    const handleScroll = async (event: WheelEvent) => {
      if (event.deltaY > 0 && homescreenRef.current) {
        linkRef.current?.click();
        window.removeEventListener("wheel", handleScroll);
      }
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      updateDimensions(width, height);
    }

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", onResize);
    }
  }, []);


  useEffect(() => {
    if (!isVideoLoaded) {
      return;
    }

    setTimeout(() => {
      setIsTextVisible(true);
    }, 200);

    function draw() {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      canvasRefs.current.forEach((canvas, index) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const style = canvasRef.current[index];
        if (!style) return;

        const row = Math.floor(index / columnsRef.current);
        const col = index % columnsRef.current;

        const sourceWidth = (video.videoWidth / columnsRef.current);
        const sourceHeight = (video.videoHeight / rowsRef.current);

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
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('playing', handleVideoPlay);
      }
    };
  }, [isVideoLoaded]);

  useEffect(() => {
    setRows(isMobile ? 3 : 3)
    setColumns(isMobile ? 2 : 6)
    setNumPieces(isMobile ? 6 : 18)
  }, [isMobile])

  useEffect(() => {
    updateCanvasStyles();
  }, [innerWidth, innerHeight, updateCanvasStyles])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  const getCanvasStyle = (style: CanvasStyle | undefined) => {
    if (!style) return {};

    return {
      left: `${style.left - style.randomOffset.x}px`,
      top: `${style.top}px`,
      padding: `${style.padding + style.randomOffset.padding}px`,
      opacity: isVideoLoaded ? style.opacity : 0,
      transition: "opacity 3s",
      animation: `subtle-rotate-y ${style.animation.duration}s linear infinite alternate`,
      animationDelay: `${style.animation.delay}s`,
      width: `${style.width + style.randomOffset.width}px`,
      height: `${style.height + style.randomOffset.height}px`,
      mixBlendMode: "screen" as const,
      filter: "blur(1px) contrast(1.1) grayscale(2) hue-rotate(0deg) saturate(0.1)",
    };
  };

  return (
<div
  className={`relative m-auto homescreen min-h-screen h-[100vh] w-[100vw] overflow-y-clip flex justify-center bg-black bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0`}>

  <Dots numberOfDots={13} />

  <div
    className={`relative flex flex-col md:flex-row overflow-y-clip w-[100vw] h-[100vh] justify-evenly bg-black bg-opacity-50`}
  >
    {/* Loading Spinner */}
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}

    {/* Canvas Section */}
    <div className="relative w-full md:w-1/2 h-full bg-black">
      {canvasStyles.map((style, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        if (col >= 3 || row >= 3) return null;

        return (
          <div className="absolute bg-black" key={index}>
            <canvas
              ref={(el) => { canvasRefs.current[index] = el; }}
              className="absolute flicker inset-0 grayscale bg-black"
              style={getCanvasStyle(style)}
              width={style.width + style.randomOffset.width}
              height={style.height + style.randomOffset.height}
            ></canvas>

            <div
              className="absolute inset-0 bg-pink-500 pointer-events-none flicker"
              style={{
                ...getCanvasStyle(style),
                opacity: 0.02 + Math.random() * 0.1,
                zIndex: 10,
                filter: "none"
              }}
            ></div>
          </div>
        );
      })}

      {/* Text over canvas on mobile */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bottom-2 md:hidden"
        style={{ opacity: isTextVisible ? 1 : 0 }}
      >
        <h1 className="glitch font-bold text-4xl uppercase tracking-widest mb-2">MARCO HUWIG</h1>
        <h2 className="glitch font-bold text-xl uppercase tracking-widest">WEBENTWICKLER</h2>
      </div>
    </div>

    {/* Text Section - desktop only */}
    <div
      className="hidden md:flex w-1/2 h-full flex-col justify-center px-8 text-left transition-opacity duration-5000 ease-in-out"
      style={{ opacity: isTextVisible ? 1 : 0 }}
    >
      <h1 className="glitch font-bold text-6xl uppercase tracking-widest mb-4">MARCO HUWIG</h1>
      <h2 className="glitch font-bold text-3xl uppercase tracking-widest">WEBENTWICKLER</h2>
    </div>
  </div>

  {/* Navigation Menu */}
  {!isLoading && <NavigationMenu />}

  {/* Hidden Video */}
  <video
    id="sourceVideo"
    className="absolute opacity-0"
    ref={videoRef}
    src="/api/stream"
    autoPlay
    loop
    muted
    onLoadedData={handleVideoLoad}
  />
</div>

  );
}