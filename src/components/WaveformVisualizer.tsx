import React from 'react';

interface WaveformVisualizerProps {
  type?: string;
  className?: string;
  active?: boolean;
  color?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  type = 'hazard-pulse',
  className = 'w-full h-8',
  active = false,
  color = '#006a62',
}) => {
  // Render dynamic SVG paths corresponding to the selected pattern
  const renderPath = () => {
    switch (type) {
      case 'hazard-pulse':
      case 'rapid':
        return (
          <path
            d="M 0 16 Q 5 5 10 16 T 20 16 T 30 2 T 40 30 T 50 2 T 60 30 T 70 16 T 80 16 T 90 2 T 100 30 T 110 16 T 120 16 T 130 2 T 140 30 T 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case 'traffic-double':
      case 'double':
        return (
          <path
            d="M 0 16 L 15 16 L 25 4 L 30 28 L 35 4 L 40 28 L 50 16 L 75 16 L 85 4 L 90 28 L 95 4 L 100 28 L 110 16 L 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case 'baby-wave':
      case 'smooth':
        return (
          <path
            d="M 0 16 Q 15 2 30 16 T 60 16 T 90 16 T 120 16 T 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case 'name-staccato':
      case 'staccato':
        return (
          <path
            d="M 0 16 L 20 16 L 25 8 L 30 24 L 35 16 L 60 16 L 65 6 L 70 26 L 75 16 L 100 16 L 105 4 L 110 28 L 115 16 L 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      case 'phone-buzz':
      case 'steady':
        return (
          <path
            d="M 0 16 C 10 8 15 24 25 16 C 35 8 40 24 50 16 C 60 8 65 24 75 16 C 85 8 90 24 100 16 C 110 8 115 24 125 16 L 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <path
            d="M 0 16 Q 25 5 50 16 T 100 16 T 150 16"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 150 32"
        className={`w-full h-full ${active ? 'animate-pulse' : ''}`}
        preserveAspectRatio="none"
      >
        {renderPath()}
      </svg>
    </div>
  );
};
