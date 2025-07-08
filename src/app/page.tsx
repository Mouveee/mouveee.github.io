'use client';

import NavigationMenu from './components/NavigationMenu';
import {
  useScreenDimensions,
  useGridConfig,
  useCanvasStyles,
  useVideoLoader,
  useVideoCanvasRenderer,
  useCanvasStyler
} from './CustomHooks/home';


export default function Home() {
  const { screenSize, isMobile } = useScreenDimensions();
  const { rowsAndColumnsCount, numPieces } = useGridConfig(isMobile);
  const canvasStyles = useCanvasStyles(rowsAndColumnsCount, screenSize, numPieces);
  const { isVideoLoaded, isLoading, isTextVisible, handleVideoLoad } = useVideoLoader();
  const { videoRef, canvasRefs } = useVideoCanvasRenderer(isVideoLoaded, rowsAndColumnsCount, isMobile);
  const { getCanvasStyle } = useCanvasStyler(isVideoLoaded);

  return (
    <div
      className={`relative m-auto homescreen min-h-screen h-[100vh] w-[100vw] overflow-y-clip flex justify-center bg-black bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0 `}>

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
      <NavigationMenu />

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