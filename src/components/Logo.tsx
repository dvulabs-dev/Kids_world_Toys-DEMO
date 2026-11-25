import { Link } from 'react-router-dom'
import { BubbleTitle } from './BubbleTitle'
import { STORE } from '../data/store'

export function LogoMark() {
  return null
}

/** Header / footer logo: the sign's bubble lettering. */
export function Logo({ light = false }: { light?: boolean }) {
  void light
  return (
    <Link to="/" className="flex flex-col leading-none" aria-label={`${STORE.name} home`}>
      <BubbleTitle animate={false} className="text-[1.55rem] sm:text-[1.9rem]" />
      <span className="mt-1.5 block text-[10px] font-extrabold tracking-[0.3em] text-sun">
        {STORE.town.toUpperCase()}
      </span>
    </Link>
  )
}
