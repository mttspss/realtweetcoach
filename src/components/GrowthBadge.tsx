'use client';

import { Award, TrendingUp, Zap } from 'lucide-react'; // Esempi di icone

interface GrowthBadgeProps {
  badgeName: string;
  tier?: 1 | 2 | 3 | 'LTD'; // Tier opzionale per differenziare badge
  size?: 'sm' | 'md' | 'lg';
}

// Mappatura da nome badge a icona e colore (esempio)
const badgeStyles: { 
    [key: string]: { 
        icon: React.ElementType;
        color: string; 
        textColor?: string;
        tierColor?: { [key: string]: string }
    } 
} = {
  'Newbie Tweeter': { icon: Award, color: 'bg-slate-500', textColor: 'text-slate-100' },
  'Active Tweeter': { icon: TrendingUp, color: 'bg-sky-500', textColor: 'text-sky-100' },
  'Pro Grower': { icon: Zap, color: 'bg-cyan-500', textColor: 'text-cyan-900' },
  'X Master': { icon: Award, color: 'bg-purple-500', textColor: 'text-purple-100' },
  'LTD Exclusive': { icon: Award, color: 'bg-yellow-400', textColor: 'text-yellow-900', tierColor: { LTD: 'border-yellow-500'} },
  // ...altri badge
};

export function GrowthBadge({ badgeName, tier, size = 'md' }: GrowthBadgeProps) {
  const style = badgeStyles[badgeName] || badgeStyles['Newbie Tweeter']; // Fallback
  const tierSpecificBorder = tier && style.tierColor?.[tier] ? style.tierColor[tier] : 'border-transparent';

  let sizeClasses = 'px-3 py-1 text-sm';
  let iconSize = 16;
  if (size === 'lg') {
    sizeClasses = 'px-4 py-2 text-base';
    iconSize = 20;
  }
  if (size === 'sm') {
    sizeClasses = 'px-2 py-0.5 text-xs';
    iconSize = 12;
  }


  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses} ${style.color} ${style.textColor || 'text-white'} border-2 ${tierSpecificBorder}`}
      title={`Badge: ${badgeName}${tier ? ' (Tier ' + tier + ')' : ''}`}
    >
      <style.icon size={iconSize} />
      {badgeName}
      {tier && <span className="text-xs opacity-80">({tier})</span>}
    </span>
  );
} 