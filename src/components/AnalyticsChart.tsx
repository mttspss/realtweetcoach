'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AnalyticsChartProps {
  title: string;
  description?: string;
  height?: number;
  type?: 'line' | 'bar' | 'area';
  loading?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
}

export function AnalyticsChart({
  title,
  description,
  height = 300,
  type = 'line',
  loading = false,
  children,
  footer,
  actions,
}: AnalyticsChartProps) {
  return (
    <div className="glass-card p-5 backdrop-blur-md rounded-xl border border-card-border/40 bg-gradient-to-b from-black/40 to-black/20">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-medium text-white">{title}</h3>
          {description && <p className="text-xs text-primary-darker mt-1">{description}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      </div>
      
      {loading ? (
        <div 
          className="flex items-center justify-center" 
          style={{ height }}
        >
          <div className="animate-pulse-slow flex flex-col items-center">
            <div className="w-8 h-8 bg-card rounded-full mb-2"></div>
            <div className="text-xs text-primary-darker">Loading data...</div>
          </div>
        </div>
      ) : (
        <div style={{ height }}>
          {children || (
            <PlaceholderChart type={type} />
          )}
        </div>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-card-border/20">
          {footer}
        </div>
      )}
    </div>
  );
}

function PlaceholderChart({ type }: { type: 'line' | 'bar' | 'area' }) {
  const generatePoints = (count: number, min: number, max: number) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const value = Math.random() * (max - min) + min;
      points.push({
        x: i / (count - 1) * 100,
        y: 100 - value,
      });
    }
    return points;
  };

  // Generate some random points with an upward trend
  const pointsUpward = generatePoints(12, 20, 80).map((point, i, arr) => ({
    ...point,
    y: Math.max(5, Math.min(95, point.y - (i / arr.length) * 30)),
  }));

  const formatPoints = (points: { x: number, y: number }[]): string => {
    return points.map(p => `${p.x},${p.y}`).join(' ');
  };

  return (
    <div className="relative w-full h-full flex items-end pt-5">
      {/* X-axis */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-card-border/30"></div>
      
      {/* Y-axis */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-card-border/30"></div>
      
      {/* Horizontal grid lines */}
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="absolute h-px bg-card-border/20 left-0 right-0" 
          style={{ bottom: `${i * 20}%` }}
        ></div>
      ))}
      
      {/* Chart visualization */}
      <div className="relative w-full h-full">
        {type === 'line' && (
          <svg className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points={formatPoints(pointsUpward)}
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E7FF" />
                <stop offset="100%" stopColor="#1D8BFF" />
              </linearGradient>
            </defs>
          </svg>
        )}
        
        {type === 'area' && (
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient-area" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00E7FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1D8BFF" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,100 ${formatPoints(pointsUpward)} 100,100`}
              fill="url(#gradient-area)"
              stroke="none"
            />
            <polyline
              points={formatPoints(pointsUpward)}
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E7FF" />
                <stop offset="100%" stopColor="#1D8BFF" />
              </linearGradient>
            </defs>
          </svg>
        )}
        
        {type === 'bar' && (
          <div className="w-full h-full flex items-end justify-between pb-5">
            {pointsUpward.map((point, i) => (
              <div 
                key={i} 
                className="w-5 relative mx-1 rounded-sm bg-gradient-to-t from-blue-500/50 to-cyan-400/50"
                style={{ height: `${80 - point.y}%` }}
              >
                <div className="absolute inset-0 opacity-30 rounded-sm bg-gradient-to-t from-transparent to-white"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Animated dot showing recent data point */}
        <div 
          className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(0,231,255,0.7)] animate-pulse-slow"
          style={{ 
            bottom: `${100 - pointsUpward[pointsUpward.length - 1].y}%`, 
            right: '0%',
            transform: 'translate(50%, 50%)'
          }}
        ></div>
        
        {/* Positive trend indicator */}
        <div className="absolute top-2 right-2 flex items-center text-green-400 text-xs">
          <span>+12.8%</span>
          <ArrowUpRight size={14} className="ml-1" />
        </div>
      </div>
    </div>
  );
} 