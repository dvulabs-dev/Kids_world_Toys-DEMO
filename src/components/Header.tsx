import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, Search, ShoppingCart, X } from 'lucide-react'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { PRIMARY_PHONE, waLink } from '../data/store'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Toys', to: '/shop?category=toys' },
  { label: 'Soft Toys', to: '/shop?category=dolls' },
  { label: 'Offers', to: '/shop?offers=1' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function useIsActive() {
  const { pathname, search } = useLocation()
  return (to: string) => {
    const [path, query = ''] = to.split('?')
    if (path === '/shop') {
      const cur = new URLSearchParams(search)
      const want = new URLSearchParams(query)
      if (pathname !== '/shop') return false
      if (query === '') return !cur.get('category') && !cur.get('offers')
      return [...want.entries()].every(([k, v]) => cur.get(k) === v)
    }
    return path === pathname
  }
}

function SearchBox({ className = '', onDone }: { className?: string; onDone?: () => void }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const [value, setValue] = useState(pathname === '/shop' ? params.get('q') ?? '' : '')

  // Keep the box in sync when filters are cleared on the shop page.
  const urlQ = params.get('q') ?? ''
  useEffect(() => {
    if (pathname === '/shop') setValue(urlQ)
  }, [pathname, urlQ])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    onDone?.()
  }

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        aria-label="Search toys, brands or products"
        placeholder="Search toys, brands or products…"
        className="w-full rounded-xl border-2 border-ink bg-white py-2.5 pr-24 pl-11 text-sm font-semibold text-ink transition placeholder:font-normal placeholder:text-muted/70 focus:bg-sun-soft focus:outline-none focus:ring-4 focus:ring-royal/20"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg border-2 border-ink bg-sun px-4 py-1 text-sm font-bold text-ink transition hover:bg-sun-deep"
      >
        Search
      </button>
    </form>
  )
}

export function Header() {
  const { count } = useCart()
  const isActive = useIsActive()
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  useEffect(() => setOpen(false), [pathname, search])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 sign-bg border-b-2 border-ink">
      <div className="container-x flex items-center gap-3 py-3 lg:gap-6">
        <Logo />

        <SearchBox className="mx-auto hidden max-w-xl flex-1 md:block" />

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={waLink('Hello Kids World Toys! I have a question.')}
            target="_blank"
            rel="noreferrer"
            className="btn-wa btn-sm hidden lg:inline-flex"
          >
            <WhatsAppIcon size={18} /> Order on WhatsApp
          </a>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-white text-ink shadow-pop transition hover:bg-sun-soft"
          >
            <ShoppingCart size={22} />
            <AnimatePresence mode="popLayout">
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-pink px-1 text-xs font-extrabold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-sun text-ink shadow-pop transition lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden border-t-2 border-ink bg-navy-deep lg:block" aria-label="Main">
        <ul className="container-x flex items-center gap-1 py-1.5">
          {NAV.map((n) => (
            <li key={n.label}>
              <Link
                to={n.to}
                aria-current={isActive(n.to) ? 'page' : undefined}
                className={`inline-block rounded-lg px-4 py-2 text-sm font-bold transition ${
                  isActive(n.to) ? 'bg-sun text-ink' : 'text-white hover:bg-white/15'
                }`}
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <a href={`tel:${PRIMARY_PHONE.tel}`} className="inline-flex items-center gap-2 text-sm font-bold text-sun">
              <Phone size={16} /> Call {PRIMARY_PHONE.display}
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t-2 border-b-2 border-ink bg-mist pb-6 lg:hidden"
          >
            <div className="container-x space-y-4 pt-4">
              <SearchBox className="md:hidden" onDone={() => setOpen(false)} />
              <nav aria-label="Mobile">
                <ul className="grid grid-cols-2 gap-2">
                  {NAV.map((n) => (
                    <li key={n.label}>
                      <Link
                        to={n.to}
                        aria-current={isActive(n.to) ? 'page' : undefined}
                        className={`block rounded-xl border-2 border-ink px-4 py-3 text-center font-bold transition ${
                          isActive(n.to) ? 'bg-sun text-ink shadow-pop' : 'bg-white text-ink hover:bg-sun-soft'
                        }`}
                      >
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:${PRIMARY_PHONE.tel}`} className="btn-navy">
                  <Phone size={18} /> Call
                </a>
                <a href={waLink('Hello Kids World Toys! I have a question.')} target="_blank" rel="noreferrer" className="btn-wa">
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
