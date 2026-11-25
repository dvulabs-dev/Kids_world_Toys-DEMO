import { Link, useLocation } from 'react-router-dom'
import { Home, Phone, ShoppingCart, Store } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { PRIMARY_PHONE, waLink } from '../data/store'

/** Thumb-reach navigation for phones: the shop's key actions are always one tap away. */
export function MobileActionBar() {
  const { count } = useCart()
  const { pathname } = useLocation()
  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-bold text-ink active:bg-sun-soft'
  const on = (p: string) => (pathname === p ? 'bg-sun' : '')
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t-2 border-ink bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <Link to="/" className={`${item} ${on('/')}`}>
        <Home size={22} /> Home
      </Link>
      <Link to="/shop" className={`${item} ${on('/shop')}`}>
        <Store size={22} /> Shop
      </Link>
      <a href={`tel:${PRIMARY_PHONE.tel}`} className={`${item} bg-sun-soft`}>
        <Phone size={22} /> Call
      </a>
      <a href={waLink('Hello Kids World Toys! I have a question.')} target="_blank" rel="noreferrer" className={`${item} bg-whatsapp text-white active:bg-whatsapp-deep`}>
        <WhatsAppIcon size={22} /> WhatsApp
      </a>
      <Link to="/cart" aria-label={`Cart, ${count} items`} className={`${item} relative ${on('/cart')}`}>
        <ShoppingCart size={22} /> Cart
        {count > 0 && (
          <span className="absolute top-1 left-1/2 ml-2 flex h-4 min-w-4 items-center justify-center rounded-full border border-ink bg-pink px-1 text-[10px] leading-none font-extrabold text-white">
            {count}
          </span>
        )}
      </Link>
    </nav>
  )
}
