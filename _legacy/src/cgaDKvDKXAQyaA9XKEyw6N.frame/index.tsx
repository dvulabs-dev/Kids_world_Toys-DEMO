import React from 'react'
import { ArrowRight, Gift, MapPin, MessageCircle, Truck } from 'lucide-react'
import { SiteHeader } from '../shared/kidsland/SiteHeader'
import { SiteFooter } from '../shared/kidsland/SiteFooter'
import { ProductCard } from '../shared/kidsland/ProductCard'
import { WhatsAppFab } from '../shared/kidsland/WhatsAppFab'
import { WhatsAppIcon } from '../shared/kidsland/WhatsAppIcon'
import { AGES, CATEGORIES, HERO_IMAGE, NavigateFn, PRODUCTS, priceOf } from '../shared/kidsland/data'

type Props = Partial<typeof args> & {
  onNavigate?: NavigateFn
  onAdd?: (id: string) => void
}

export default function Home(props: Props) {
  const { cartCount, showOfferBadge, onNavigate, onAdd } = { ...args, ...props }
  const popular = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.badge === 'New').slice(0, 4)
  const gifts = PRODUCTS.filter((p) => priceOf(p) <= 2500 && (p.category === 'gifts' || p.category === 'dolls' || p.category === 'games')).slice(0, 3)

  return (
    <div className="min-h-full bg-white">
      <SiteHeader active="home" cartCount={cartCount} onNavigate={onNavigate} />

      {/* Hero */}
      <section className="bg-sky">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] text-navy sm:text-6xl lg:text-7xl">
              Big smiles,
              <br />
              <span className="text-pink">little adventures!</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Discover toys, baby essentials and gifts for every special moment — order online and we'll confirm
              by phone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate?.('shop', { category: 'toys' })}
                className="rounded-full bg-navy px-6 py-3.5 font-bold text-white transition-colors duration-150 hover:bg-royal active:scale-[0.98]"
              >
                Shop Toys
              </button>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white transition-colors duration-150 hover:bg-[#178d47]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </div>
            <button
              onClick={() => onNavigate?.('shop', { category: 'baby' })}
              className="mt-5 inline-flex items-center gap-1.5 font-bold text-royal transition-colors duration-150 hover:text-navy"
            >
              Explore Baby Essentials <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <img src={HERO_IMAGE} alt="Wooden train, blocks, teddy bear and baby rattle" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            {showOfferBadge && (
              <button
                onClick={() => onNavigate?.('shop', { offers: true })}
                className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-sun px-4 py-3 text-left text-navy-deep shadow-md transition-transform duration-150 ease-snap hover:-translate-y-0.5 sm:left-8"
              >
                <Gift className="h-7 w-7 shrink-0" />
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold">This month's offers</span>
                  <span className="block text-xs font-semibold">Save up to Rs. 900 on selected toys</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Shop by category</h2>
          <button onClick={() => onNavigate?.('shop')} className="whitespace-nowrap text-sm font-bold text-royal hover:text-navy">
            View all
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => onNavigate?.('shop', { category: c.id })} className="group text-center">
              <span className="block aspect-square overflow-hidden rounded-full bg-sky ring-4 ring-transparent transition-[box-shadow] duration-200 group-hover:ring-sun">
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="mt-2 block text-sm font-bold text-navy">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular picks */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Popular picks</h2>
            <p className="mt-1 text-muted">Best sellers and new arrivals parents are asking about.</p>
          </div>
          <button onClick={() => onNavigate?.('shop')} className="whitespace-nowrap text-sm font-bold text-royal hover:text-navy">
            Shop all
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => onNavigate?.('product', { productId: p.id })}
              onAdd={() => onAdd?.(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Age discovery */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Shop by age</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AGES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => onNavigate?.('shop', { age: a.id })}
              className={`flex items-center justify-between rounded-2xl px-5 py-5 text-left transition-transform duration-150 ease-snap hover:-translate-y-0.5 ${AGE_TONES[i]}`}
            >
              <span className="font-display text-2xl font-extrabold leading-none">{a.label}</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Gift ideas */}
      <section className="mt-16 bg-pink-soft">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_2fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Gift ideas under <span className="text-pink">Rs. 2,500</span>
            </h2>
            <p className="mt-3 text-muted">Birthday favourites that are easy to wrap and fun to open.</p>
            <button
              onClick={() => onNavigate?.('shop', { category: 'gifts' })}
              className="mt-5 rounded-full bg-pink px-5 py-3 font-bold text-white transition-colors duration-150 hover:bg-[#c92566]"
            >
              See all gifts
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {gifts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={() => onNavigate?.('product', { productId: p.id })}
                onAdd={() => onAdd?.(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why shop with us */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Why parents shop with Kids Land</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-sky-line">
          {TRUST.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3 lg:px-6 lg:first:pl-0">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-pink" />
              <div>
                <p className="font-bold text-navy">{title}</p>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter onNavigate={onNavigate} />
      <WhatsAppFab />
    </div>
  )
}

export const args = {
  cartCount: 2,
  showOfferBadge: true,
}

export const argTypes = {
  cartCount: { control: 'number' },
  showOfferBadge: { control: 'boolean' },
}

const AGE_TONES = [
  'bg-pink-soft text-pink',
  'bg-sun-soft text-navy',
  'bg-sky text-royal',
  'bg-navy text-white',
  'bg-pink text-white',
]

const TRUST = [
  { icon: MessageCircle, title: 'Quick replies', body: 'Message us on WhatsApp and we help you choose the right item.' },
  { icon: Gift, title: 'Friendly service', body: 'Gift advice for every age, from newborns to big kids.' },
  { icon: Truck, title: 'Delivery information', body: 'We confirm delivery area, charge and timing before you pay.' },
  { icon: MapPin, title: 'A real local shop', body: 'Visit us on Main Street, Kurunegala, and see the toys in person.' },
]
