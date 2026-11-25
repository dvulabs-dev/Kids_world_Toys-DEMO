import { Link } from 'react-router-dom'
import { Armchair, BatteryCharging, Clock, Lock, Phone, ShieldCheck, Truck, Zap, type LucideIcon } from 'lucide-react'
import { ProductVisual } from './ProductVisual'
import { WhatsAppIcon } from './WhatsAppIcon'
import { Reveal } from './Reveal'
import { useCart } from '../context/CartContext'
import { JEEP_FEATURES, JEEP_FROM_PRICE, PRIMARY_PHONE, waLink } from '../data/store'
import { PRODUCTS } from '../data/products'
import { priceOf, rs } from '../lib/format'
import type { Product } from '../types'

const ICONS: Record<(typeof JEEP_FEATURES)[number]['icon'], LucideIcon> = {
  truck: Truck,
  shield: ShieldCheck,
  zap: Zap,
  battery: BatteryCharging,
  lock: Lock,
  clock: Clock,
  seat: Armchair,
}

/** Promo block modelled on the shop's "Rechargeable Ride-on Jeep Collection" leaflet. */
export function JeepCollection() {
  const { add } = useCart()
  const FEATURED = ['jeep-red', 'jeep-blue', 'jeep-black', 'ride-on-sport-car']
  const jeeps = FEATURED.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => !!p)

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20" aria-labelledby="jeep-title">
      <div className="stripes-bg absolute inset-0" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-royal/50 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink/30 blur-3xl" />

      <div className="container-x relative">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-script text-3xl leading-none text-sun">Rechargeable</p>
            <h2 id="jeep-title" className="mt-1 text-4xl leading-[1.02] font-extrabold sm:text-5xl lg:text-6xl">
              Ride-on <span className="text-sun">Jeep</span> Collection
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Real driving adventures for little explorers — powerful rear motors, a comfy seat and a rechargeable
              battery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${PRIMARY_PHONE.tel}`} className="btn-sun">
                <Phone size={18} /> Call {PRIMARY_PHONE.display}
              </a>
              <a
                href={waLink('Hello Kids World Toys! I am interested in the Ride-on Jeep collection.')}
                target="_blank"
                rel="noreferrer"
                className="btn-wa"
              >
                <WhatsAppIcon size={18} /> WhatsApp us
              </a>
              <Link to="/shop?category=ride-ons" className="btn bg-white/10 text-white hover:bg-white/20">
                See all ride-ons
              </Link>
            </div>
          </div>

          {/* "Starting from" burst */}
          <div className="relative mx-auto flex h-52 w-52 shrink-0 animate-wiggle items-center justify-center sm:h-60 sm:w-60">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow text-sun" aria-hidden>
              <path
                fill="currentColor"
                d="M100 4l15 18 22-10 8 23 24-2-1 24 23 8-12 21 18 16-18 16 12 21-23 8 1 24-24-2-8 23-22-10-15 18-15-18-22 10-8-23-24 2 1-24-23-8 12-21-18-16 18-16-12-21 23-8-1-24 24 2 8-23 22 10z"
              />
            </svg>
            <div className="relative text-center text-navy-deep">
              <p className="text-xs font-extrabold tracking-widest uppercase">Starting from</p>
              <p className="font-display text-3xl leading-none font-extrabold sm:text-4xl">{rs(JEEP_FROM_PRICE)}</p>
              <p className="mt-1 text-[11px] font-bold">Ride-on jeeps</p>
            </div>
          </div>
        </div>

        {/* Jeep cards */}
        <div className="scrollbar-none -mx-4 mt-12 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {jeeps.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white text-ink shadow-lift transition duration-300 hover:-translate-y-1.5">
                <Link to={`/product/${p.id}`} className="block aspect-[4/3]">
                  <ProductVisual product={p} />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="leading-snug font-bold text-navy">
                    <Link to={`/product/${p.id}`} className="hover:text-royal">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-display text-2xl font-extrabold text-pink">{rs(priceOf(p))}</p>
                  <button onClick={() => add(p.id)} className="btn-navy btn-sm mt-auto w-full">
                    Add to Cart
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Feature icons */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {JEEP_FEATURES.map((f) => {
            const Icon = ICONS[f.icon]
            return (
              <li key={f.title} className="flex flex-col items-center last:odd:col-span-2 sm:last:odd:col-span-1 rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/15 backdrop-blur-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun text-navy-deep">
                  <Icon size={24} />
                </span>
                <span className="mt-3 text-sm leading-tight font-extrabold">{f.title}</span>
                <span className="mt-1 text-xs text-white/65">{f.sub}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
