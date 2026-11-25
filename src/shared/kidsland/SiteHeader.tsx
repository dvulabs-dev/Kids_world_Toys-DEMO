import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { NavigateFn, PageId, ShopFilter } from './data'
import { WhatsAppIcon } from './WhatsAppIcon'

type NavItem = { label: string; page: PageId; filter?: ShopFilter; key: string }

const NAV: NavItem[] = [
  { key: 'home', label: 'Home', page: 'home' },
  { key: 'shop', label: 'Shop', page: 'shop' },
  { key: 'toys', label: 'Toys', page: 'shop', filter: { category: 'toys' } },
  { key: 'baby', label: 'Baby', page: 'shop', filter: { category: 'baby' } },
  { key: 'offers', label: 'Offers', page: 'shop', filter: { offers: true } },
  { key: 'about', label: 'About', page: 'about' },
  { key: 'contact', label: 'Contact', page: 'contact' },
]

export function SiteHeader({
  active,
  cartCount,
  query = '',
  onNavigate,
}: {
  active: string
  cartCount: number
  query?: string
  onNavigate?: NavigateFn
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState(query)
  const go: NavigateFn = (p, o) => {
    setOpen(false)
    onNavigate?.(p, o)
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    go('shop', { query: q.trim() })
  }

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-navy-deep px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        Order online anytime — we confirm every order by phone or WhatsApp
      </div>
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
          <button
            onClick={() => setOpen((v) => !v)}
            className="-ml-1 rounded-lg p-2 transition-colors duration-150 hover:bg-white/10 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <button onClick={() => go('home')} className="flex shrink-0 flex-col items-start leading-none">
            <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Kids <span className="text-pink">Land</span>
            </span>
            <span className="mt-0.5 hidden text-[11px] font-bold text-sun sm:block">Toy Store · Kurunegala</span>
          </button>

          <form onSubmit={submit} className="hidden min-w-0 flex-1 md:flex">
            <label className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-2.5 text-ink">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search toys, brands or products…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </label>
          </form>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#178d47] sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
            <button
              onClick={() => go('cart')}
              className="relative flex items-center gap-2 rounded-full bg-white/10 px-3 py-2.5 text-sm font-bold transition-colors duration-150 hover:bg-white/20"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <motion.span
                key={cartCount}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1.5 text-xs font-extrabold text-white"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-white/10 lg:block">
          <ul className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6">
            {NAV.map((n) => {
              const on = n.key === active
              return (
                <li key={n.key}>
                  <button
                    onClick={() => go(n.page, n.filter)}
                    className={`relative px-4 py-3 text-sm font-bold transition-colors duration-150 ${
                      on ? 'text-sun' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {n.label}
                    {on && <span className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-sun" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <form onSubmit={submit} className="px-4 pb-3 md:hidden">
          <label className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-2.5 text-ink">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search toys, brands or products…"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
        </form>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 top-full border-b border-sky-line bg-white shadow-lg lg:hidden"
          >
            <ul className="px-4 py-2">
              {NAV.map((n) => (
                <li key={n.key}>
                  <button
                    onClick={() => go(n.page, n.filter)}
                    className={`w-full rounded-lg px-3 py-3 text-left text-base font-bold transition-colors duration-150 hover:bg-sky ${
                      n.key === active ? 'text-pink' : 'text-navy'
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => go('help')}
                  className="w-full rounded-lg px-3 py-3 text-left text-base font-bold text-navy transition-colors duration-150 hover:bg-sky"
                >
                  Delivery & FAQ
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
