import React from 'react'
import { Clock, MapPin, Phone } from 'lucide-react'
import { NavigateFn, STORE } from './data'

export function SiteFooter({ onNavigate }: { onNavigate?: NavigateFn }) {
  const link = 'text-left text-sm text-white/80 transition-colors duration-150 hover:text-white'
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-extrabold leading-none">
            Kids <span className="text-pink">Land</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/75">
            Toys, baby essentials and thoughtful gifts for children, from our shop in Negombo.
          </p>
          <div className="mt-5 flex gap-2">
            {['Facebook', 'Instagram', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white/85 transition-colors duration-150 hover:border-white/50 hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-lg font-bold text-sun">Shop</p>
          <ul className="mt-3 space-y-2">
            <li><button className={link} onClick={() => onNavigate?.('shop')}>All products</button></li>
            <li><button className={link} onClick={() => onNavigate?.('shop', { category: 'toys' })}>Toys</button></li>
            <li><button className={link} onClick={() => onNavigate?.('shop', { category: 'baby' })}>Baby essentials</button></li>
            <li><button className={link} onClick={() => onNavigate?.('shop', { category: 'gifts' })}>Gifts</button></li>
            <li><button className={link} onClick={() => onNavigate?.('shop', { offers: true })}>Offers</button></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-bold text-sun">Help</p>
          <ul className="mt-3 space-y-2">
            <li><button className={link} onClick={() => onNavigate?.('help')}>Delivery & returns</button></li>
            <li><button className={link} onClick={() => onNavigate?.('help')}>FAQ</button></li>
            <li><button className={link} onClick={() => onNavigate?.('about')}>About us</button></li>
            <li><button className={link} onClick={() => onNavigate?.('contact')}>Contact</button></li>
            <li><button className={link} onClick={() => onNavigate?.('help')}>Privacy</button></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-white/85">
          <p className="font-display text-lg font-bold text-sun">Visit or call</p>
          <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink" />{STORE.address}</p>
          <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-pink" />{STORE.phone}</p>
          <p className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-pink" />{STORE.storeHours}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/60 sm:px-6">
          © 2025 Asanka Toys, Negombo · Website demo — sample products and prices
        </p>
      </div>
    </footer>
  )
}
