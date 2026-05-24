export function SovereignXLogo({
  size = 200,
  color = '#000000',
  background = 'transparent',
}: {
  size?: number
  color?: string
  background?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sovereign X Audits"
    >
      {background !== 'transparent' && (
        <circle cx="200" cy="200" r="200" fill={background} />
      )}

      {/* OUTER DOUBLE RING */}
      <circle cx="200" cy="200" r="188" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="200" cy="200" r="178" stroke={color} strokeWidth="1.5" fill="none" />

      {/* CROSSHAIR LINES */}
      <line x1="200" y1="22" x2="200" y2="378" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="22" y1="200" x2="378" y2="200" stroke={color} strokeWidth="0.8" opacity="0.25" />

      {/* SOVEREIGN X — TEXT ARC TOP */}
      <defs>
        <path id="topArc" d="M 52,200 A 148,148 0 0,1 348,200" />
        <path id="bottomArc" d="M 90,280 A 148,148 0 0,0 310,280" />
      </defs>

      <text fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="26" fontWeight="600" fill={color} letterSpacing="8">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">SOVEREIGN X</textPath>
      </text>

      <text fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="26" fontWeight="600" fill={color} letterSpacing="10">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">AUDITS</textPath>
      </text>

      {/* LEFT LAUREL WREATH */}
      <g transform="translate(42, 155) scale(0.9)" fill={color}>
        <path d="M 20,50 Q 15,35 12,20" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="8" cy="44" rx="7" ry="4" transform="rotate(-40 8 44)" />
        <ellipse cx="6" cy="36" rx="7" ry="4" transform="rotate(-50 6 36)" />
        <ellipse cx="6" cy="28" rx="7" ry="4" transform="rotate(-55 6 28)" />
        <ellipse cx="7" cy="20" rx="7" ry="4" transform="rotate(-65 7 20)" />
        <ellipse cx="9" cy="13" rx="6" ry="3.5" transform="rotate(-70 9 13)" />
        <ellipse cx="16" cy="43" rx="7" ry="4" transform="rotate(20 16 43)" />
        <ellipse cx="16" cy="35" rx="7" ry="4" transform="rotate(15 16 35)" />
        <ellipse cx="16" cy="27" rx="6.5" ry="3.5" transform="rotate(10 16 27)" />
        <ellipse cx="15" cy="20" rx="6" ry="3" transform="rotate(5 15 20)" />
        <ellipse cx="14" cy="13" rx="5.5" ry="3" transform="rotate(0 14 13)" />
        <ellipse cx="12" cy="52" rx="5" ry="3" transform="rotate(-20 12 52)" />
        <ellipse cx="18" cy="51" rx="5" ry="3" transform="rotate(25 18 51)" />
      </g>

      {/* RIGHT LAUREL WREATH (mirrored) */}
      <g transform="translate(358, 155) scale(-0.9, 0.9)" fill={color}>
        <path d="M 20,50 Q 15,35 12,20" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="8" cy="44" rx="7" ry="4" transform="rotate(-40 8 44)" />
        <ellipse cx="6" cy="36" rx="7" ry="4" transform="rotate(-50 6 36)" />
        <ellipse cx="6" cy="28" rx="7" ry="4" transform="rotate(-55 6 28)" />
        <ellipse cx="7" cy="20" rx="7" ry="4" transform="rotate(-65 7 20)" />
        <ellipse cx="9" cy="13" rx="6" ry="3.5" transform="rotate(-70 9 13)" />
        <ellipse cx="16" cy="43" rx="7" ry="4" transform="rotate(20 16 43)" />
        <ellipse cx="16" cy="35" rx="7" ry="4" transform="rotate(15 16 35)" />
        <ellipse cx="16" cy="27" rx="6.5" ry="3.5" transform="rotate(10 16 27)" />
        <ellipse cx="15" cy="20" rx="6" ry="3" transform="rotate(5 15 20)" />
        <ellipse cx="14" cy="13" rx="5.5" ry="3" transform="rotate(0 14 13)" />
        <ellipse cx="12" cy="52" rx="5" ry="3" transform="rotate(-20 12 52)" />
        <ellipse cx="18" cy="51" rx="5" ry="3" transform="rotate(25 18 51)" />
      </g>

      {/* SX LETTERS */}
      <text
        x="200" y="210"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="110" fontWeight="700"
        fill={color} letterSpacing="-4"
      >SX</text>

      {/* PHOENIX */}
      <g transform="translate(200, 255)" fill={color}>
        <ellipse cx="0" cy="0" rx="12" ry="18" />
        <ellipse cx="0" cy="-20" rx="8" ry="9" />
        <path d="M 5,-22 L 14,-20 L 5,-17 Z" />
        <path d="M -6,-12 Q 0,-14 6,-12 L 4,-4 Q 0,-2 -4,-4 Z" />
        <path d="M -10,-5 Q -30,-15 -55,-10 Q -75,-5 -85,5 Q -70,0 -60,8 Q -45,2 -35,12 Q -55,15 -65,25 Q -50,18 -40,22 Q -25,10 -15,15 Q -20,5 -10,2 Z" />
        <path d="M -35,12 Q -50,20 -60,30 Q -48,24 -38,20 Z" opacity="0.7"/>
        <path d="M -55,-10 Q -70,5 -78,15 Q -65,8 -56,2 Z" opacity="0.6"/>
        <path d="M 10,-5 Q 30,-15 55,-10 Q 75,-5 85,5 Q 70,0 60,8 Q 45,2 35,12 Q 55,15 65,25 Q 50,18 40,22 Q 25,10 15,15 Q 20,5 10,2 Z" />
        <path d="M 35,12 Q 50,20 60,30 Q 48,24 38,20 Z" opacity="0.7"/>
        <path d="M 55,-10 Q 70,5 78,15 Q 65,8 56,2 Z" opacity="0.6"/>
        <path d="M -8,15 Q -15,28 -20,42 Q -12,30 -6,20 Z" />
        <path d="M 0,16 Q 0,32 0,46 Q 3,32 3,18 Z" />
        <path d="M 8,15 Q 15,28 20,42 Q 12,30 6,20 Z" />
        <path d="M -14,12 Q -25,24 -32,38 Q -22,26 -12,18 Z" opacity="0.8"/>
        <path d="M 14,12 Q 25,24 32,38 Q 22,26 12,18 Z" opacity="0.8"/>
        <path d="M -5,16 L -8,30 L -12,38 M -8,30 L -5,38" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M 5,16 L 8,30 L 12,38 M 8,30 L 5,38" stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="-3" cy="-21" r="2.5" fill={background === 'transparent' ? 'white' : background} />
        <circle cx="-3" cy="-21" r="1.2" fill={color} />
      </g>
    </svg>
  )
}
