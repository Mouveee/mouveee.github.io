import { useState, useEffect, useRef, useCallback } from 'react';

export interface CanvasStyle {
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

// Custom hook for screen dimensions and mobile detection
export const useScreenDimensions = () => {
  const [screenSize, setScreenSize] = useState({ height: 1280, width: 768 });
  const [isMobile, setIsMobile] = useState(false);
  const resizeTimeout = useRef<number | null>(null);

  const updateDimensions = useCallback((width: number, height: number) => {
    setIsMobile(window.innerWidth <= 768);
    setScreenSize({ width, height });
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    updateDimensions(width, height);

    const onResize = () => {
      if (resizeTimeout.current !== null) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(() => {
        updateDimensions(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeout.current !== null) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [updateDimensions]);

  return { screenSize, isMobile };
};

// Custom hook for browser detection
export const useBrowserDetection = () => {
  const [browser, setBrowser] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Firefox')) {
      setBrowser('Firefox');
    } else if (userAgent.includes('Chrome')) {
      setBrowser('Chrome');
    } else if (userAgent.includes('Safari')) {
      setBrowser('Safari');
    } else if (userAgent.includes('Edge')) {
      setBrowser('Edge');
    } else {
      setBrowser('Unknown');
    }
  }, []);

  return browser;
};

// Custom hook for grid configuration
export const useGridConfig = (isMobile: boolean) => {
  const [rowsAndColumnsCount, setRowsAndColumnsCount] = useState({ rows: 3, columns: 6 });
  const [numPieces, setNumPieces] = useState(18);

  useEffect(() => {
    setRowsAndColumnsCount({ rows: isMobile ? 3 : 3, columns: isMobile ? 2 : 6 });
    setNumPieces(isMobile ? 6 : 18);
  }, [isMobile]);

  return { rowsAndColumnsCount, numPieces };
};

// Custom hook for canvas styles
export const useCanvasStyles = (
  rowsAndColumnsCount: { rows: number; columns: number }, 
  screenSize: { width: number; height: number }, 
  numPieces: number
) => {
  const [canvasStyles, setCanvasStyles] = useState<CanvasStyle[]>([]);

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
  }, [rowsAndColumnsCount, screenSize, numPieces]);

  useEffect(() => {
    updateCanvasStyles();
  }, [updateCanvasStyles]);

  return canvasStyles;
};

// Custom hook for video loading state
export const useVideoLoader = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) return;

    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [isVideoLoaded]);

  return { isVideoLoaded, isLoading, isTextVisible, handleVideoLoad };
};

// Custom hook for video canvas rendering
export const useVideoCanvasRenderer = (
  isVideoLoaded: boolean,
  rowsAndColumnsCount: { rows: number; columns: number },
  isMobile: boolean
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const rowsRef = useRef(rowsAndColumnsCount.rows);
  const columnsRef = useRef(rowsAndColumnsCount.columns);

  useEffect(() => {
    rowsRef.current = rowsAndColumnsCount.rows;
    columnsRef.current = rowsAndColumnsCount.columns;
  }, [rowsAndColumnsCount]);

  useEffect(() => {
    if (!isVideoLoaded) return;

    let isRunning = false;
    let animationFrameId: number;

    const draw = () => {
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
        cropX = isMobile ? 120 : (video.videoWidth - cropWidth) / 2;
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

      if (isRunning) animationFrameId = requestAnimationFrame(draw);
    };

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
      video.addEventListener('pause', handleVideoPause);
      video.addEventListener('ended', handleVideoPause);
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
  }, [isVideoLoaded, isMobile]);

  return { videoRef, canvasRefs };
};

// Custom hook for canvas styling
export const useCanvasStyler = (isVideoLoaded: boolean) => {
  const getCanvasStyle = useCallback((style: CanvasStyle | undefined) => {
    if (!style) return {};

    return {
      left: `${style.left}px`,
      top: `${style.top}px`,
      padding: `${style.padding}px`,
      opacity: isVideoLoaded ? style.opacity : 0,
      transition: "opacity 3s",
      // Replace shorthand 'animation' with individual properties
      animationName: `subtle-rotate-y${Math.random() * 10 > 4.5 ? 'negative' : ''}`,
      animationDuration: `${style.animation.duration}s`,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationDelay: `${style.animation.delay}s`,
      width: `${style.width}px`,
      height: `${style.height}px`,
      mixBlendMode: "screen" as const,
      filter: "contrast(1.2) grayscale(1) hue-rotate(0deg) saturate(0.1)",
    };
  }, [isVideoLoaded]);

  return { getCanvasStyle };
};