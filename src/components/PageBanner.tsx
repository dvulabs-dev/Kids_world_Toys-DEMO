import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function PageBanner({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <section className="sign-bg relative overflow-hidden border-b-2 border-ink text-white">
      <span aria-hidden className="absolute top-6 right-[8%] hidden h-16 w-16 rotate-12 rounded-xl border-2 border-ink bg-pink sm:block" />
      <span aria-hidden className="absolute right-[16%] bottom-5 hidden h-10 w-10 -rotate-12 rounded-full border-2 border-ink bg-sun sm:block" />
      <div className="container-x relative py-10 sm:py-14">
        <nav className="text-sm font-bold text-white/80" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-sun">Home</Link> <span aria-hidden>/</span>{' '}
          <span className="text-white">{title}</span>
        </nav>
        {eyebrow && (
          <p className="mt-3 inline-block -rotate-2 rounded-md border-2 border-ink bg-sun px-2.5 py-0.5 text-xs font-extrabold tracking-wider uppercase shadow-pop">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-bold text-white sm:text-6xl">{title}</h1>
        {children && <div className="mt-2 max-w-2xl text-white/85">{children}</div>}
      </div>
    </section>
  )
}

/** Small tag used where the owner still has to confirm a detail. */
export function ConfirmTag() {
  return (
    <span className="ml-2 inline-block rounded-md border border-ink bg-sun-soft px-2 py-0.5 align-middle text-xs font-extrabold text-ink">
      Shop to confirm
    </span>
  )
}
