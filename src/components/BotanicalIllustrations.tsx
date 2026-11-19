interface CornerFiligreeProps {
  className?: string;
}

export function BotanicalCornerFiligree({className = ''}: CornerFiligreeProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 108C14 72 26 42 54 24C74 11 94 12 108 14"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M20 96C26 68 42 46 72 30"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Stylized rose blossom */}
      <path
        d="M36 36C30 28 34 18 44 20C50 21 52 28 46 34C42 38 38 38 36 36Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M38 34C34 29 37 22 44 23C48 24 49 29 45 33"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Leaves */}
      <path
        d="M24 68C14 62 14 52 24 50C31 53 31 62 24 68Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M66 22C72 12 82 12 84 22C80 28 72 29 66 22Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="88" cy="24" r="2" fill="currentColor" opacity="0.55" />
      <circle cx="22" cy="84" r="2" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

interface RoseClusterProps {
  className?: string;
}

export function VelvetRoseBackdrop({className = ''}: RoseClusterProps) {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="roseGlowLeft" cx="22%" cy="40%" r="45%">
          <stop offset="0%" stopColor="#9F1239" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#4A0E1B" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#070406" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="roseGlowRight" cx="78%" cy="62%" r="45%">
          <stop offset="0%" stopColor="#BE185D" stopOpacity="0.26" />
          <stop offset="60%" stopColor="#4A0E1B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#070406" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#roseGlowLeft)" />
      <rect width="800" height="500" fill="url(#roseGlowRight)" />

      {/* Left velvet rose botanical silhouettes */}
      <g opacity="0.35" stroke="#F472B6" strokeWidth="0.9">
        <path d="M40 420C70 330 115 265 160 205" stroke="#E6C596" strokeOpacity="0.4" />
        <path
          d="M160 205C130 190 120 155 148 135C175 115 208 140 195 172C185 196 170 204 160 205Z"
          fill="#4A0E1B"
          fillOpacity="0.55"
        />
        <path
          d="M158 188C142 174 146 150 165 148C182 146 188 166 174 182"
          stroke="#F9A8D4"
          strokeOpacity="0.55"
        />
        <path
          d="M115 290C80 282 70 255 95 245C116 248 122 270 115 290Z"
          fill="#2D0712"
          fillOpacity="0.6"
        />
        <path
          d="M128 320C160 315 178 292 158 278C138 278 128 298 128 320Z"
          fill="#2D0712"
          fillOpacity="0.6"
        />
      </g>

      {/* Right velvet rose botanical silhouettes */}
      <g opacity="0.32" stroke="#FDA4AF" strokeWidth="0.9">
        <path d="M740 440C710 340 670 285 628 230" stroke="#E6C596" strokeOpacity="0.35" />
        <path
          d="M628 230C600 218 594 182 622 165C648 148 678 172 664 202C654 222 638 229 628 230Z"
          fill="#4A0E1B"
          fillOpacity="0.55"
        />
        <path
          d="M627 212C614 198 620 176 638 176C652 176 656 196 642 208"
          stroke="#F9A8D4"
          strokeOpacity="0.55"
        />
        <path
          d="M675 315C708 308 716 282 692 272C672 276 666 296 675 315Z"
          fill="#2D0712"
          fillOpacity="0.6"
        />
      </g>
    </svg>
  );
}

interface MemoryArtFallbackProps {
  mood: 'rose' | 'candle' | 'moonlight';
  title: string;
}

export function MemoryArtFallback({mood, title}: MemoryArtFallbackProps) {
  const palette =
    mood === 'rose'
      ? {
          bg: 'from-[#2B0712] via-[#4A0E1B] to-[#120509]',
          glow: 'rgba(244, 114, 182, 0.28)',
          stroke: '#FDA4AF',
        }
      : mood === 'candle'
        ? {
            bg: 'from-[#2A0E14] via-[#3F1218] to-[#140708]',
            glow: 'rgba(230, 197, 150, 0.28)',
            stroke: '#E6C596',
          }
        : {
            bg: 'from-[#1B0918] via-[#341028] to-[#0B050B]',
            glow: 'rgba(196, 181, 253, 0.26)',
            stroke: '#F9A8D4',
          };

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${palette.bg} flex items-center justify-center`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${palette.glow}, transparent 68%)`,
        }}
      />
      <svg
        viewBox="0 0 240 280"
        className="relative z-10 h-44 w-44 opacity-85"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="120"
          cy="130"
          r="76"
          stroke={palette.stroke}
          strokeOpacity="0.28"
          strokeWidth="0.9"
          strokeDasharray="3 5"
        />
        {mood === 'rose' && (
          <g stroke={palette.stroke} strokeWidth="1.3" strokeLinecap="round">
            <path d="M120 205V145" strokeOpacity="0.65" />
            <path
              d="M120 145C96 138 86 112 104 94C118 80 142 86 146 108C150 128 136 142 120 145Z"
              fill={palette.stroke}
              fillOpacity="0.16"
            />
            <path d="M118 128C108 118 112 102 124 102C134 102 138 116 128 126" />
            <path d="M120 176C100 174 92 160 105 154C114 155 120 165 120 176Z" fill={palette.stroke} fillOpacity="0.14" />
            <path d="M120 166C138 164 148 150 135 144C126 145 120 155 120 166Z" fill={palette.stroke} fillOpacity="0.14" />
          </g>
        )}
        {mood === 'candle' && (
          <g stroke={palette.stroke} strokeWidth="1.3" strokeLinecap="round">
            <rect x="98" y="128" width="44" height="68" rx="6" fill={palette.stroke} fillOpacity="0.12" />
            <path d="M120 128V114" />
            <path
              d="M120 82C112 94 111 106 120 112C129 106 128 94 120 82Z"
              fill={palette.stroke}
              fillOpacity="0.35"
            />
            <circle cx="120" cy="98" r="22" strokeOpacity="0.2" />
          </g>
        )}
        {mood === 'moonlight' && (
          <g stroke={palette.stroke} strokeWidth="1.3" strokeLinecap="round">
            <path
              d="M136 86C112 90 98 112 104 136C110 158 134 170 154 162C136 174 110 168 98 148C86 128 94 100 116 90C123 87 130 86 136 86Z"
              fill={palette.stroke}
              fillOpacity="0.2"
            />
            <circle cx="152" cy="102" r="2.2" fill={palette.stroke} />
            <circle cx="92" cy="96" r="1.8" fill={palette.stroke} />
            <circle cx="158" cy="144" r="1.5" fill={palette.stroke} />
          </g>
        )}
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}
