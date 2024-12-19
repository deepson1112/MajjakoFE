"use client";
import { useRef, useState } from "react";

export default function App() {
  const sourceRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sourceRef.current || !targetRef.current || !containerRef.current) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

  return (
    <div className="App">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden p-12 border border-cyan-600 rounded-lg hover:shadow-lg"
      >
        <img
          ref={sourceRef}
          alt="source"
          src="/save-menu.jpg"
          className="w-40 h-40"
        />

        <img
          ref={targetRef}
          alt="target"
          src="/save-menu.jpg"
          style={{
            position: "absolute",
            left: `${offset.left}px`,
            top: `${offset.top}px`,
            opacity: opacity,
          }}
          className="absolute opacity-0 transition-opacity duration-200 w-96 h-96"
        />
      </div>
    </div>
  );
}
