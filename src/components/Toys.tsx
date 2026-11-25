/** Little toy illustrations echoing the ones painted on the shop sign. All decorative. */

export function BeachBall({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block rounded-full border-2 border-ink ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #1ba4e6 0 14%, transparent 15%), conic-gradient(#ffd21f 0 60deg, #fff 60deg 120deg, #e8202f 120deg 180deg, #ffd21f 180deg 240deg, #fff 240deg 300deg, #e8202f 300deg 360deg)',
      }}
    />
  )
}

export function Stacker({ className = '' }: { className?: string }) {
  const rings = ['#e8202f', '#f7851e', '#ffd21f', '#2bb24a', '#1ba4e6']
  return (
    <span aria-hidden className={`flex flex-col items-center ${className}`}>
      <span className="mb-[-2px] h-3 w-3 rounded-full border-2 border-ink bg-pink" />
      {rings.map((c, i) => (
        <span key={c} className="-mb-[2px] h-3.5 rounded-full border-2 border-ink" style={{ background: c, width: 26 + i * 9 }} />
      ))}
    </span>
  )
}

export function Drum({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 56" className={className}>
      <ellipse cx="32" cy="14" rx="28" ry="9" fill="#ffd21f" stroke="#25093d" strokeWidth="3" />
      <path d="M4 14v26c0 5 12.5 9 28 9s28-4 28-9V14" fill="#e8202f" stroke="#25093d" strokeWidth="3" />
      <path d="M12 24l10 22M24 27l8 22M40 27l-8 22M52 24L42 46" stroke="#ffd21f" strokeWidth="3" />
    </svg>
  )
}

export function ToyCar({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 64" className={className}>
      <path d="M8 44c0-8 6-12 16-14l12-14c3-3 7-5 12-5h24c6 0 10 2 13 6l9 12c10 2 18 6 18 15v6H8z" fill="#e8202f" stroke="#25093d" strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 18h16v12H34zM64 18h10c3 0 5 1 6 3l6 9H64z" fill="#d9f4fd" stroke="#25093d" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="34" cy="50" r="9" fill="#25093d" /><circle cx="34" cy="50" r="3.5" fill="#fff" />
      <circle cx="90" cy="50" r="9" fill="#25093d" /><circle cx="90" cy="50" r="3.5" fill="#fff" />
      <circle cx="108" cy="38" r="4" fill="#ffd21f" stroke="#25093d" strokeWidth="2" />
    </svg>
  )
}

export function ToyPlane({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 140 70" className={className}>
      <path d="M10 40c0-12 20-18 50-18h50c18 0 26 8 26 14s-8 12-26 12H50c-26 0-40-2-40-8z" fill="#fff" stroke="#25093d" strokeWidth="3" strokeLinejoin="round" />
      <path d="M62 22L46 4h16l24 18zM62 48l-16 18h16l24-18z" fill="#e8202f" stroke="#25093d" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 36h-8l-2-14h10z" fill="#e8202f" stroke="#25093d" strokeWidth="3" strokeLinejoin="round" />
      <rect x="84" y="28" width="12" height="9" rx="3" fill="#1ba4e6" stroke="#25093d" strokeWidth="2" />
      <rect x="102" y="28" width="12" height="9" rx="3" fill="#1ba4e6" stroke="#25093d" strokeWidth="2" />
    </svg>
  )
}
