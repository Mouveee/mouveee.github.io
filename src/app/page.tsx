'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [screenSize, setScreenSize] = useState({ height: 1280, width: 768 })
  const [rowsAndColumnsCount, setRowsAndColumnsCount] = useState({ rows: 3, columns: 6 });
  const [numPieces, setNumPieces] = useState<number>(18);

  const homescreenRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const rowsRef = useRef(rowsAndColumnsCount.rows);
  const columnsRef = useRef(rowsAndColumnsCount.columns);
  const canvasRef = useRef(canvasStyles);
  const resizeTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (rowsAndColumnsCount.rows !== rowsRef.current) rowsRef.current = rowsAndColumnsCount.rows;
    if (rowsAndColumnsCount.columns !== columnsRef.current) columnsRef.current = rowsAndColumnsCount.columns;
    if (canvasStyles !== canvasRef.current) canvasRef.current = canvasStyles;
  }, [rowsAndColumnsCount, canvasStyles])

  const updateDimensions = (width: number, height: number) => {
    setIsMobile(window.innerWidth <= 768);

    setScreenSize({ width, height });
  }

  const updateCanvasStyles = useCallback(() => {
    const styles = Array.from({ length: numPieces }).map((_, index) => {
      const row = Math.floor(index / rowsAndColumnsCount.columns);
      const col = index % rowsAndColumnsCount.columns;
      const baseWidth = screenSize.width / rowsAndColumnsCount.columns;
      const baseHeight = screenSize.height / rowsAndColumnsCount.rows;

      return {
        width: baseWidth,
        height: baseHeight,
        margin: 1,
        padding: 1,
        opacity: 1,
        left: col * baseWidth,
        top: row * baseHeight,
        animation: {
          duration: 2,
          delay: 2,
        }
      };
    });

    setCanvasStyles(styles);
  }, [rowsAndColumnsCount, screenSize, numPieces])

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
      if (resizeTimeout.current !== null) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(() => {
        updateDimensions(window.innerWidth, window.innerHeight);
      }, 100);
    };


    window.addEventListener("wheel", handleScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", onResize);
    }
  }, []);


  useEffect(() => {
    if (!isVideoLoaded) return;

    setTimeout(() => {
      setIsTextVisible(true);
    }, 200);

    let isRunning = false;
    let animationFrameId: number;

    function draw() {
      const video = videoRef.current;

      if (!video || video.paused || video.ended) {
        isRunning = false;
        return;
      }

      const columns = columnsRef.current;
      const rows = rowsRef.current;

      const sampleCanvas = canvasRefs.current[0];
      if (!sampleCanvas) return;

      const canvasTileWidth = sampleCanvas.width;
      const canvasTileHeight = sampleCanvas.height;

      const gridAspect = (columns * canvasTileWidth) / (rows * canvasTileHeight);
      const videoAspect = video.videoWidth / video.videoHeight;

      let cropWidth = video.videoWidth;
      let cropHeight = video.videoHeight;
      let cropX = 0;
      let cropY = 0;

      if (videoAspect > gridAspect) {
        cropWidth = video.videoHeight * gridAspect;
        cropX = isMobile ? 0 : (video.videoWidth - cropWidth) / 2;
      } else if (videoAspect < gridAspect) {
        cropHeight = video.videoWidth / gridAspect;
        cropY = (video.videoHeight - cropHeight) / 2;
      }

      const sourceTileWidth = cropWidth / columns;
      const sourceTileHeight = cropHeight / rows;

      canvasRefs.current.forEach((canvas, index) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const row = Math.floor(index / columns);
        const col = index % columns;

        const sx = cropX + col * sourceTileWidth;
        const sy = cropY + row * sourceTileHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          video,
          sx, sy, sourceTileWidth, sourceTileHeight,
          0, 0, canvas.width, canvas.height
        );
      });

      // 🔁 Request next frame
      if (isRunning) animationFrameId = requestAnimationFrame(draw);
    }

    const handleVideoPlay = () => {
      if (!isRunning) {
        isRunning = true;
        draw();
      }
    };

    const handleVideoPause = () => {
      isRunning = false;
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', handleVideoPlay);
    }

    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (video) {
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('pause', handleVideoPause);
        video.removeEventListener('ended', handleVideoPause);
      }
    };
  }, [isVideoLoaded]);


  useEffect(() => {
    setRowsAndColumnsCount({ rows: isMobile ? 3 : 3, columns: isMobile ? 2 : 6 })
    setNumPieces(isMobile ? 6 : 18)
  }, [isMobile])

  useEffect(() => {
    updateCanvasStyles();
  }, [screenSize, updateCanvasStyles])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  const getCanvasStyle = (style: CanvasStyle | undefined) => {
    if (!style) return {};

    return {
      left: `${style.left}px`,
      top: `${style.top}px`,
      padding: `${style.padding}px`,
      opacity: isVideoLoaded ? style.opacity : 0,
      transition: "opacity 3s",
      animation: `subtle-rotate-y${Math.random() * 10 > 4.5 ? 'negative' : ''} ${style.animation.duration}s linear infinite alternate`,
      animationDelay: `${style.animation.delay}s`,
      width: `${style.width}px`,
      height: `${style.height}px`,
      mixBlendMode: "screen" as const,
      filter: "contrast(1.2) grayscale(1) hue-rotate(0deg) saturate(0.1)",
    };
  };

  return (
    <div
      className={`relative m-auto homescreen min-h-screen h-[100vh] w-[100vw] overflow-y-clip flex justify-center bg-black bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0 `}>

      <Dots numberOfDots={13} />

      <div
        className={`relative flex flex-col md:flex-row overflow-y-clip w-[100vw] h-[100vh] justify-evenly bg-black bg-opacity-5`}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin z-50"></div>
          </div>
        )}

        {/* Canvas Section */}
        <div className="relative w-full md:w-1/2 h-full bg-black">
          {canvasStyles.map((style, index) => {
            const row = Math.floor(index / rowsAndColumnsCount.columns);
            const col = index % rowsAndColumnsCount.columns;

            if (col >= 3 || row >= 3) return null;

            return (
              <div className="absolute bg-black" key={index}>
                <canvas
                  ref={(el) => { canvasRefs.current[index] = el; }}
                  className="absolute flicker inset-0 grayscale bg-black"
                  style={getCanvasStyle(style)}
                  width={style.width}
                  height={style.height}
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
            className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 mb-10 bg-black rounded-md h-fit md:hidden top-[80%] bg-opacity-60 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-800 w-3/4"
            style={{ opacity: isTextVisible ? 1 : 0 }}
          >
            <h1 className="glitch font-bold text-4xl uppercase tracking-widest mb-2">MARCO HUWIG</h1>
            <h2 className="glitch font-bold text-1xl uppercase tracking-widest">WEBENTWICKLUNG</h2>
          </div>
        </div>

        {/* Text Section - desktop only */}
        <div
          className="hidden md:flex w-1/2 h-full flex-col justify-center px-8 text-left transition-opacity duration-5000 ease-in-out"
          style={{ opacity: isTextVisible ? 1 : 0 }}
        >
          <h1 className="glitch font-bold text-6xl uppercase tracking-widest mb-4">MARCO HUWIG</h1>
          <h2 className="glitch font-bold text-3xl uppercase tracking-widest">WEBENTWICKLUNG</h2>
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