import React from 'react';

interface ArogyavidyaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  showKannada?: boolean;
  showPillars?: boolean;
  align?: 'left' | 'center';
  layout?: 'row' | 'col';
  className?: string;
  theme?: 'light' | 'dark';
}

export const ArogyavidyaLogo: React.FC<ArogyavidyaLogoProps> = ({
  size = 'md',
  showText = true,
  showKannada = false,
  showPillars = false,
  align = 'left',
  layout = 'row',
  className = '',
  theme = 'light'
}) => {
  const iconSizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32 sm:w-40 sm:h-40'
  };

  const titleSizeClasses = {
    sm: 'text-base sm:text-lg font-black tracking-tight',
    md: 'text-xl sm:text-2xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
    xl: 'text-3xl sm:text-4xl font-black tracking-tight',
    hero: 'text-4xl sm:text-5xl font-black tracking-tight'
  };

  const taglineSizeClasses = {
    sm: 'text-[9px] font-bold tracking-wider',
    md: 'text-[11px] font-bold tracking-widest',
    lg: 'text-xs sm:text-sm font-bold tracking-widest',
    xl: 'text-sm font-bold tracking-widest',
    hero: 'text-sm sm:text-base font-bold tracking-[0.2em]'
  };

  const isCol = layout === 'col';
  const isCenter = align === 'center';

  return (
    <div
      className={`inline-flex ${isCol ? 'flex-col' : 'flex-row'} ${
        isCenter ? 'items-center text-center' : 'items-center text-left'
      } gap-3 select-none ${className}`}
    >
      {/* Visual Circular Tree, Sun, Healing Hand & Knowledge Vector Emblem */}
      <div className={`relative flex-shrink-0 ${iconSizeClasses[size]}`}>
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="treeGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="oceanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="deepTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>
            <linearGradient id="sunOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="50%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFEDD5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Outer Aura Circle */}
          <circle cx="200" cy="200" r="190" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="6" />

          {/* Golden Sun & Medical Cross at Crown */}
          <circle cx="200" cy="90" r="32" fill="url(#sunHalo)" stroke="#F97316" strokeWidth="3" />
          {/* Medical Plus Icon inside Sun */}
          <rect x="193" y="74" width="14" height="32" rx="4" fill="#FFFFFF" />
          <rect x="184" y="83" width="32" height="14" rx="4" fill="#FFFFFF" />

          {/* Radiating Green Canopy / Herbal Leaves (Upper Arch) */}
          <g fill="url(#treeGreenGrad)">
            {/* Top Leaves */}
            <path d="M200 20 C210 38, 205 52, 200 60 C195 52, 190 38, 200 20 Z" />
            <path d="M175 32 C188 46, 180 58, 172 65 C164 56, 160 42, 175 32 Z" />
            <path d="M225 32 C212 46, 220 58, 228 65 C236 56, 240 42, 225 32 Z" />
            <path d="M150 50 C165 62, 160 74, 150 82 C140 72, 138 58, 150 50 Z" />
            <path d="M250 50 C235 62, 240 74, 250 82 C260 72, 262 58, 250 50 Z" />
            <path d="M130 75 C146 86, 140 98, 130 106 C120 96, 118 82, 130 75 Z" />
            <path d="M270 75 C254 86, 260 98, 270 106 C280 96, 282 82, 270 75 Z" />
            <path d="M115 105 C130 115, 126 128, 115 135 C104 125, 102 112, 115 105 Z" />
            <path d="M285 105 C270 115, 274 128, 285 135 C296 125, 298 112, 285 105 Z" />
          </g>

          {/* The Open Knowledge Book (Wisdom / Learning) */}
          <path
            d="M200 125 C175 108, 140 112, 125 125 C125 142, 165 148, 200 158 C235 148, 275 142, 275 125 C260 112, 225 108, 200 125 Z"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="4"
          />
          <path d="M200 125 L200 158" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          {/* Book page lines */}
          <line x1="145" y1="130" x2="185" y2="138" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="145" y1="138" x2="185" y2="146" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="215" y1="138" x2="255" y2="130" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="215" y1="146" x2="255" y2="138" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Central Human Figure / Tree of Life Trunk */}
          <circle cx="200" cy="180" r="14" fill="#0D9488" />
          {/* Joyful arms reaching to the book/sky */}
          <path
            d="M200 200 C185 200, 165 175, 150 160 C155 178, 180 215, 192 230 L192 270 C192 290, 208 290, 208 270 L208 230 C220 215, 245 178, 250 160 C235 175, 215 200, 200 200 Z"
            fill="url(#deepTealGrad)"
          />

          {/* Left Arc: Human Profile / Mind / Holistic Health Inset */}
          <path
            d="M125 125 C85 160, 80 230, 120 280 C135 298, 160 315, 200 325 C160 310, 120 270, 115 220 C110 180, 130 145, 150 130 Z"
            fill="url(#oceanBlueGrad)"
            opacity="0.95"
          />

          {/* Left Wellness Icons: Mind (Brain), Heart, Lotus/Yoga, Ayurveda/Nutrition */}
          <g fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5">
            {/* Brain circle */}
            <circle cx="75" cy="165" r="14" fill="#E0F2FE" />
            <path d="M70 162 C70 158, 75 158, 75 162 C75 158, 80 158, 80 162 C80 168, 75 172, 75 172 C75 172, 70 168, 70 162 Z" fill="#0284C7" />
            
            {/* Heart circle */}
            <circle cx="75" cy="205" r="14" fill="#E0F2FE" />
            <path d="M75 212 L71 207 C68 204, 68 200, 71 198 C74 196, 77 197, 75 200 C73 197, 76 196, 79 198 C82 200, 82 204, 79 207 Z" fill="#0284C7" />
            
            {/* Lotus/Yoga circle */}
            <circle cx="90" cy="245" r="14" fill="#E0F2FE" />
            <path d="M90 238 C86 244, 90 252, 90 252 C90 252, 94 244, 90 238 Z" fill="#0284C7" />

            {/* Nutrition bowl */}
            <circle cx="118" cy="282" r="14" fill="#E0F2FE" />
            <path d="M112 282 Q118 290 124 282 Z" fill="#0284C7" />
            <line x1="118" y1="276" x2="118" y2="280" stroke="#0284C7" strokeWidth="2" />
          </g>

          {/* Right Arc: Protective Healing Caring Hand */}
          <path
            d="M275 125 C315 160, 320 230, 280 280 C265 298, 235 320, 190 335 C240 325, 290 285, 295 230 C300 180, 275 145, 260 130 Z"
            fill="url(#treeGreenGrad)"
            opacity="0.95"
          />

          {/* Supporting Green Hand Palm at Bottom */}
          <path
            d="M170 340 C190 348, 230 348, 260 330 C275 320, 290 300, 295 270 C285 285, 260 305, 230 315 C195 325, 175 330, 160 320 C145 310, 140 300, 140 290 C135 310, 150 330, 170 340 Z"
            fill="#16A34A"
          />

          {/* Right Protection Icons: Family, Gender Equality, Shield of Health, Water/Hygiene */}
          <g fill="#FFFFFF" stroke="#16A34A" strokeWidth="1.5">
            {/* Family symbol */}
            <circle cx="325" cy="165" r="14" fill="#DCFCE7" />
            <circle cx="321" cy="161" r="2.5" fill="#16A34A" />
            <circle cx="329" cy="162" r="2" fill="#16A34A" />
            <path d="M318 171 C318 166, 324 166, 324 171 Z" fill="#16A34A" />
            <path d="M326 171 C326 167, 332 167, 332 171 Z" fill="#16A34A" />

            {/* Gender Equality (Mars + Venus + Trans) */}
            <circle cx="325" cy="205" r="14" fill="#DCFCE7" />
            <circle cx="325" cy="204" r="4.5" fill="none" stroke="#16A34A" strokeWidth="2" />
            <line x1="325" y1="208.5" x2="325" y2="213" stroke="#16A34A" strokeWidth="2" />
            <line x1="322" y1="211" x2="328" y2="211" stroke="#16A34A" strokeWidth="2" />

            {/* Shield of Immunity */}
            <circle cx="310" cy="245" r="14" fill="#DCFCE7" />
            <path d="M305 240 L315 240 L315 246 C315 250, 310 253, 310 253 C310 253, 305 250, 305 246 Z" fill="#16A34A" />

            {/* Pure Water Droplet (Hydration & Hygiene) */}
            <circle cx="282" cy="282" r="14" fill="#DCFCE7" />
            <path d="M282 275 C286 280, 288 284, 288 287 C288 290, 285 292, 282 292 C279 292, 276 290, 276 287 C276 284, 278 280, 282 275 Z" fill="#0EA5E9" />
          </g>

          {/* Flowing Water / Life River at Bottom Wave */}
          <path
            d="M130 330 C160 320, 190 350, 220 335 C245 320, 265 330, 280 340 C250 360, 210 365, 170 355 C150 350, 135 340, 130 330 Z"
            fill="url(#oceanBlueGrad)"
          />
        </svg>
      </div>

      {/* Brand Typography (Arogyavidya) */}
      {showText && (
        <div className={`flex flex-col leading-tight ${isCenter ? 'items-center' : 'items-start'}`}>
          <span
            className={`${titleSizeClasses[size]} tracking-tight font-sans text-teal-950 font-black`}
          >
            Arogyavidya
          </span>

          <span
            className={`${taglineSizeClasses[size]} uppercase text-teal-700 font-extrabold tracking-widest mt-0.5`}
          >
            LEARN • UNDERSTAND • CARE • LIVE BETTER
          </span>
        </div>
      )}
    </div>
  );
};
