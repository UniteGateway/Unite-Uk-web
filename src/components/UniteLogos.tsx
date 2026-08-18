import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  variant?: 'full' | 'icon-only' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const UniteSolarSymbol: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 36,
  className = '',
  color = '#F37021'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Unite Solar Symbol"
    >
      {/* 8-dot energetic orbital cluster inspired by official Unite Solar brand */}
      <circle cx="28" cy="22" r="7.5" fill={color} />
      <circle cx="39" cy="27" r="7.5" fill={color} />
      <circle cx="58" cy="30" r="7.5" fill={color} />
      <circle cx="52" cy="49" r="7.5" fill={color} />
      <circle cx="58" cy="68" r="7.5" fill={color} />
      <circle cx="49" cy="77" r="7.5" fill={color} />
      <circle cx="35" cy="65" r="7.5" fill={color} />
      <circle cx="21" cy="58" r="7.5" fill={color} />
      <circle cx="23" cy="40" r="7.5" fill={color} />
    </svg>
  );
};

export const UniteSolarLogo: React.FC<LogoProps> = ({
  className = '',
  theme = 'dark',
  variant = 'full',
  size = 'md',
}) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#06152F' : '#FFFFFF';
  const solarTextColor = isLight ? '#1E293B' : '#E2E8F0';
  const orange = '#F37021';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : size === 'xl' ? 1.6 : 1;

  if (variant === 'icon-only') {
    return <UniteSolarSymbol size={36 * scale} className={className} color={orange} />;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      <UniteSolarSymbol size={44} color={orange} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline font-black tracking-tight text-2xl" style={{ color: textColor }}>
          <span className="font-extrabold text-[28px] tracking-[-0.04em]">un</span>
          <span className="font-extrabold text-[28px] tracking-[-0.04em]" style={{ color: orange }}>i</span>
          <span className="font-extrabold text-[28px] tracking-[-0.04em]">te</span>
        </div>
        <span
          className="text-[11px] font-black tracking-[0.38em] uppercase -mt-0.5"
          style={{ color: solarTextColor }}
        >
          SOLAR
        </span>
      </div>
    </div>
  );
};

export const UniteGroupLogo: React.FC<{ className?: string; theme?: 'dark' | 'light' }> = ({
  className = '',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const dotColor = isLight ? '#06152F' : '#F5F7F4';
  const textColor = isLight ? '#06152F' : '#F5F7F4';
  const dividerColor = isLight ? '#CBD5E1' : '#334155';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Cluster dots */}
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="shrink-0">
        <circle cx="28" cy="22" r="7" fill={dotColor} />
        <circle cx="39" cy="27" r="7" fill={dotColor} />
        <circle cx="58" cy="30" r="7" fill={dotColor} />
        <circle cx="52" cy="49" r="7" fill={dotColor} />
        <circle cx="58" cy="68" r="7" fill={dotColor} />
        <circle cx="49" cy="77" r="7" fill={dotColor} />
        <circle cx="35" cy="65" r="7" fill={dotColor} />
        <circle cx="21" cy="58" r="7" fill={dotColor} />
      </svg>
      <div className="h-5 w-[1px]" style={{ backgroundColor: dividerColor }} />
      <div className="flex flex-col leading-[1.05] tracking-[0.12em] uppercase font-bold text-[10px]" style={{ color: textColor }}>
        <span>UNITE</span>
        <span>GROUP</span>
      </div>
    </div>
  );
};
