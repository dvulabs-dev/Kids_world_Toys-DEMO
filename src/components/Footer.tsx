import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'
import { STORE, waLink } from '../data/store'
import { CATEGORIES } from '../data/categories'

export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-ink bg-navy-deep text-white">
      {/* toy-block colour strip */}
      <div aria-hidden className="absolute inset-x-0 -top-[14px] flex h-3 overflow-hidden">
        {['bg-pink', 'bg-orange', 'bg-sun', 'bg-lime', 'bg-sky', 'bg-royal'].map((c, i) => (
          <span key={i} className={`h-full flex-1 border-x border-ink ${c}`} />
        ))}
      </div>

      <div className="container-x grid gap-10 pt-14 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-white/80">
            Kids toys, soft toys, RC cars, ride-on jeeps and gifts — {STORE.tagline.toLowerCase()}.
          </p>
          <a href={waLink('Hello Kids World Toys!')} target="_blank" rel="noreferrer" className="btn-wa btn-sm mt-5">
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-sun">Shop</h3>
          <ul className="mt-3 space-y-2 text-white/80">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link className="hover:text-white hover:underline" to={`/shop?category=${c.id}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-sun">Help</h3>
          <ul className="mt-3 space-y-2 text-white/80">
            <li><Link className="hover:text-white hover:underline" to="/about">About us</Link></li>
            <li><Link className="hover:text-white hover:underline" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-white hover:underline" to="/delivery-returns">Delivery &amp; returns</Link></li>
            <li><Link className="hover:text-white hover:underline" to="/faq">FAQ</Link></li>
            <li><Link className="hover:text-white hover:underline" to="/cart">Your cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-sun">Visit &amp; call</h3>
          <ul className="mt-3 space-y-3 text-white/85">
            <li className="flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-sky" />
              <a href={STORE.mapUrl} target="_blank" rel="noreferrer" className="hover:underline">
                {STORE.address.full}
              </a>
            </li>
            {STORE.phones.map((p) => (
              <li key={p.tel} className="flex gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-sky" />
                <a href={`tel:${p.tel}`} className="hover:underline">
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Clock size={20} className="mt-0.5 shrink-0 text-sky" />
              <span>{STORE.onlineHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-white/15">
        <div className="container-x flex flex-col gap-2 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {STORE.name}, {STORE.town}. All rights reserved.</p>
          <p>Demo preview — sample products, prices and stock. Frontend concept by DVU Labs.</p>
        </div>
      </div>
    </footer>
  )
}
