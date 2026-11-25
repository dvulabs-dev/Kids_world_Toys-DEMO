import { Link } from 'react-router-dom'
import { STORE } from '../data/store'

/** Three toy letter-blocks: K · W · T */
export function LogoMark({ className = '' }: { className?: string }) {
  const block =
    'flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink font-display text-lg leading-none font-bold text-ink'
  return (
    <span className={`relative flex shrink-0 items-end ${className}`} aria-hidden>
      <span className={`${block} -rotate-6 bg-pink text-white`}>K</span>
      <span className={`${block} z-10 -mx-1 -translate-y-1.5 bg-sun`}>W</span>
      <span className={`${block} rotate-6 bg-sky`}>T</span>
    </span>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${STORE.name} home`}>
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-[1.45rem] font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          Kids World Toys
        </span>
        <span className={`mt-1 block text-[10px] font-extrabold tracking-[0.24em] ${light ? 'text-sun' : 'text-pink'}`}>
          {STORE.town.toUpperCase()} · SRI LANKA
        </span>
      </span>
    </Link>
  )
}
