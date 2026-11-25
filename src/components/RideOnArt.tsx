interface Props {
  color: string
  accent?: string
  className?: string
}

const DARK = '#1b1d33'

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 7} fill="rgba(15,27,90,.22)" />
      <circle cx={cx} cy={cy} r={r} fill={DARK} />
      <circle cx={cx} cy={cy} r={r * 0.58} fill="#e5e8f7" />
      <circle cx={cx} cy={cy} r={r * 0.2} fill="#7e86ad" />
      {[0, 72, 144, 216, 288].map((a) => (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos((a * Math.PI) / 180) * r * 0.5}
          y2={cy + Math.sin((a * Math.PI) / 180) * r * 0.5}
          stroke="#9aa1c4"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </g>
  )
}

/** Side-view illustration of a ride-on jeep, drawn in any body colour. */
export function JeepArt({ color, accent = '#ffcd29', className }: Props) {
  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label="Ride-on jeep illustration">
      <ellipse cx="205" cy="256" rx="172" ry="11" fill="rgba(15,27,90,.16)" />
      {/* roll bar + seat */}
      <path d="M94 138 L110 62 H212" fill="none" stroke={DARK} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M94 138 L98 98" fill="none" stroke={DARK} strokeWidth="8" strokeLinecap="round" />
      <rect x="116" y="84" width="74" height="58" rx="16" fill="#2a2f4a" />
      <rect x="124" y="74" width="58" height="22" rx="10" fill="#3a4066" />
      {/* body */}
      <rect x="38" y="132" width="330" height="72" rx="24" fill={color} />
      <path
        d="M236 134 V120 Q236 110 248 110 L338 112 Q366 116 368 142 V152 H236 Z"
        fill={color}
        stroke="rgba(0,0,0,.12)"
        strokeWidth="2"
      />
      <rect x="62" y="166" width="258" height="9" rx="4.5" fill={accent} />
      <path d="M240 118 H330" stroke="rgba(255,255,255,.55)" strokeWidth="5" strokeLinecap="round" />
      {/* windshield */}
      <path d="M230 134 L212 68 H246 L268 112 Z" fill="#cfe8ff" stroke={DARK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M222 100 L232 76" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      {/* steering wheel */}
      <ellipse cx="214" cy="122" rx="12" ry="5" fill="none" stroke={DARK} strokeWidth="4" />
      {/* arches */}
      <circle cx="105" cy="214" r="46" fill="rgba(0,0,0,.28)" />
      <circle cx="305" cy="214" r="46" fill="rgba(0,0,0,.28)" />
      <Wheel cx={105} cy={214} r={37} />
      <Wheel cx={305} cy={214} r={37} />
      {/* grille, lights, bumper */}
      {[134, 142, 150].map((y) => (
        <rect key={y} x="352" y={y} width="14" height="4" rx="2" fill="rgba(0,0,0,.35)" />
      ))}
      <circle cx="352" cy="128" r="22" fill="#fff6b0" opacity=".25" />
      <circle cx="352" cy="128" r="12" fill="#fff6b0" stroke={DARK} strokeWidth="4" />
      <rect x="352" y="176" width="22" height="16" rx="7" fill="#d6daee" stroke={DARK} strokeWidth="3" />
      <rect x="30" y="170" width="14" height="14" rx="5" fill="#ff5470" />
    </svg>
  )
}

/** Side-view illustration of a ride-on motorbike with training wheels. */
export function BikeArt({ color, accent = '#ffcd29', className }: Props) {
  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label="Ride-on motorbike illustration">
      <ellipse cx="205" cy="256" rx="160" ry="11" fill="rgba(15,27,90,.16)" />
      {/* handlebar + fork */}
      <path d="M286 190 L276 118" stroke={DARK} strokeWidth="9" strokeLinecap="round" />
      <path d="M262 108 H300" stroke={DARK} strokeWidth="9" strokeLinecap="round" />
      {/* seat + tail */}
      <path d="M100 150 Q108 128 150 128 H206 L196 160 H112 Z" fill="#2a2f4a" />
      {/* fairing */}
      <path
        d="M128 186 Q132 140 190 130 L262 112 Q300 108 314 150 L304 192 H138 Z"
        fill={color}
        stroke="rgba(0,0,0,.12)"
        strokeWidth="2"
      />
      <path d="M168 170 H290" stroke={accent} strokeWidth="9" strokeLinecap="round" />
      <path d="M232 128 L282 118" stroke="rgba(255,255,255,.6)" strokeWidth="5" strokeLinecap="round" />
      {/* headlight */}
      <circle cx="306" cy="130" r="13" fill="#fff6b0" stroke={DARK} strokeWidth="4" />
      {/* training wheels */}
      <Wheel cx={62} cy={226} r={18} />
      <Wheel cx={150} cy={226} r={18} />
      {/* main wheels */}
      <Wheel cx={106} cy={208} r={40} />
      <Wheel cx={300} cy={208} r={40} />
    </svg>
  )
}
