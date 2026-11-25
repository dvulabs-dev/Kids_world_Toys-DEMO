import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Props {
  eyebrow?: string
  title: ReactNode
  sub?: string
  linkTo?: string
  linkLabel?: string
  light?: boolean
  center?: boolean
}

export function SectionHeading({ eyebrow, title, sub, linkTo, linkLabel, light, center }: Props) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 ${center ? 'justify-center text-center' : ''}`}>
      <div className={center ? 'mx-auto' : ''}>
        {eyebrow && (
          <p className="inline-block -rotate-2 rounded-md border-2 border-ink bg-sun px-2.5 py-0.5 text-xs font-extrabold tracking-wider text-ink uppercase shadow-pop">
            {eyebrow}
          </p>
        )}
        <h2 className={`mt-3 text-3xl leading-[1.05] font-bold sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {sub && <p className={`mt-2 max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-muted'}`}>{sub}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className={`group inline-flex items-center gap-1.5 border-b-2 pb-0.5 font-bold ${light ? 'border-sun text-sun' : 'border-ink text-ink'} hover:text-pink`}
        >
          {linkLabel ?? 'View all'}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
