'use client';

import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

type TrendDirection = 'up' | 'down' | 'neutral';

interface AnalyticsBadgeProps {
  value: string | number;
  label: string;
  trend?: {
    direction: TrendDirection;
    value: string | number;
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function AnalyticsBadge({
  value,
  label,
  trend,
  icon,
  variant = 'default',
  size = 'md',
}: AnalyticsBadgeProps) {
  // Define colors based on variant
  const variantStyles = {
    default: 'from-gray-700/40 to-gray-900/40 border-gray-700/30',
    primary: 'from-blue-700/30 to-blue-900/30 border-blue-600/30',
    accent: 'from-cyan-700/30 to-cyan-900/30 border-cyan-600/30',
    success: 'from-green-700/30 to-green-900/30 border-green-600/30',
    warning: 'from-yellow-700/30 to-yellow-900/30 border-yellow-600/30',
    danger: 'from-red-700/30 to-red-900/30 border-red-600/30',
  };

  // Define trend colors
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  // Define trend icons
  const trendIcons = {
    up: <ArrowUp size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />,
    down: <ArrowDown size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />,
    neutral: <Minus size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />,
  };

  // Define sizing
  const sizeClasses = {
    sm: 'p-3 rounded-lg',
    md: 'p-4 rounded-lg',
    lg: 'p-5 rounded-xl',
  };

  const valueSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div 
      className={`glass-card flex flex-col backdrop-blur-md border border-opacity-50 ${sizeClasses[size]} bg-gradient-to-br ${variantStyles[variant]}`}
    >
      <div className="flex justify-between items-start mb-1">
        {icon && <div className="text-primary-darker">{icon}</div>}
        {trend && (
          <div className={`flex items-center space-x-1 ${trendColors[trend.direction]} text-xs ml-auto`}>
            {trendIcons[trend.direction]}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <div className={`${valueSizes[size]} font-bold text-white`}>
        {value}
      </div>
      <div className={`${labelSizes[size]} text-primary-darker mt-1`}>
        {label}
      </div>
    </div>
  );
} 