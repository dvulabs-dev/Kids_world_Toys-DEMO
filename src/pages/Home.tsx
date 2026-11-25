import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Heart, MapPin, Phone, Sparkles, Star, Truck } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { JeepCollection } from '../components/JeepCollection'
import { TrustStrip } from '../components/TrustStrip'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AGES, CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'
import { JEEP_FROM_PRICE, PRIMARY_PHONE, STORE, waLink } from '../data/store'
import { priceOf, rs } from '../lib/format'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist pb-20 sm:pb-24">
      {/* blurred shop-front photo */}
      <img
        src="/images/shop-front.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-[3px]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-white/25" />
      
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-pink-soft/70 blur-2xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sun-soft blur-3xl" />

      {/* floating decorations */}
      <span className="absolute top-10 left-[46%] hidden animate-float text-4xl lg:block" style={{ ['--r' as string]: '-12deg' }} aria-hidden>🎈</span>
      <span className="absolute bottom-24 left-[4%] hidden animate-float-slow text-3xl lg:block" aria-hidden>⭐</span>
      <span className="absolute top-24 right-[3%] hidden animate-float-slow text-3xl lg:block" aria-hidden>🎀</span>

      <div className="container-x relative grid items-center gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-pink shadow-sm ring-1 ring-pink/20"
          >
            <Sparkles size={16} /> {STORE.town}’s online toy store
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mt-4 text-[2.6rem] leading-[0.95] min-[400px]:text-5xl font-extrabold text-navy sm:text-6xl xl:text-[4.25rem]"
          >
            Big smiles,
            <br />
            <span className="relative inline-block whitespace-nowrap text-pink">
              little adventures!
              <svg className="absolute -bottom-2 left-0 w-full text-sun" viewBox="0 0 300 12" fill="none" aria-hidden>
                <path d="M3 8c60-8 120-8 180-3s90 3 114-1" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="mt-6 max-w-lg text-lg text-muted"
          >
            Discover kids toys, soft toys, RC cars and gifts for every special moment — order online any time, or call and
            WhatsApp us on {PRIMARY_PHONE.display}.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/shop?category=toys" className="btn-navy px-7 py-4 text-lg">
              Shop Toys <ArrowRight size={20} />
            </Link>
            <a
              href={waLink('Hello Kids World Toys! I would like to place an order.')}
              target="_blank"
              rel="noreferrer"
              className="btn-wa px-7 py-4 text-lg"
            >
              <WhatsAppIcon size={22} /> Order on WhatsApp
            </a>
          </motion.div>
          <Link
            to="/shop?category=dolls"
            className="group mt-5 inline-flex items-center gap-1.5 font-bold text-royal hover:underline"
          >
            Explore Soft Toys
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="relative rotate-1 overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-lift">
            <img src="/images/hero-soft-toys.jpg" alt="Teddy bear, plush elephant and lion soft toys sitting together" className="aspect-[4/3] w-full object-cover" loading="eager" />
          </div>

          {/* 24h badge (from leaflet) */}
          <div className="absolute -top-5 -right-2 flex h-28 w-28 animate-float flex-col items-center justify-center rounded-full bg-navy text-white shadow-lift ring-4 ring-sun sm:-right-6 sm:h-32 sm:w-32" style={{ ['--r' as string]: '6deg' }}>
            <span className="font-display text-4xl leading-none font-extrabold text-sun sm:text-5xl">24</span>
            <span className="text-[11px] font-extrabold tracking-widest">HOURS</span>
            <span className="mt-1 rounded-full bg-pink px-2 py-0.5 text-[9px] font-extrabold tracking-wide">ONLINE OPEN</span>
          </div>

          {/* jeep offer chip */}
          <Link
            to="/shop?category=ride-ons"
            className="absolute -bottom-6 left-3 flex animate-float-slow items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-mist-line transition hover:-translate-y-1 sm:left-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun-soft text-2xl">🚙</span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-muted">Ride-on Jeeps from</span>
              <span className="block font-display text-xl font-extrabold text-pink">{rs(JEEP_FROM_PRICE)}</span>
            </span>
          </Link>

          <div className="absolute right-4 -bottom-5 hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy shadow-lift sm:flex">
            <Truck size={18} className="text-pink" /> All-island delivery
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="container-x pt-20" aria-labelledby="cat-title">
      <SectionHeading eyebrow="Find your fun" title={<span id="cat-title">Shop by category</span>} linkTo="/shop" linkLabel="Browse everything" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 4) * 0.05}>
            <Link
              to={`/shop?category=${c.id}`}
              className={`group relative block overflow-hidden rounded-3xl ${c.tint} p-3 ring-1 ring-mist-line transition duration-300 ease-[var(--ease-snap)] hover:-translate-y-1.5 hover:shadow-lift`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute top-2 left-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm" aria-hidden>
                  {c.emoji}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 px-1 pt-3 pb-1">
                <div className="leading-tight">
                  <h3 className="text-base font-bold text-navy sm:text-lg">{c.name}</h3>
                  <p className="text-xs text-muted sm:text-sm">{c.blurb}</p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-navy transition group-hover:bg-navy group-hover:text-white">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Popular() {
  const picks = PRODUCTS.filter((p) => (p.badge === 'Best Seller' || p.badge === 'New') && p.category !== 'ride-ons' && p.category !== 'baby').slice(0, 8)
  return (
    <section className="container-x pt-20" aria-labelledby="pop-title">
      <SectionHeading
        eyebrow="Loved by little ones"
        title={<span id="pop-title">Popular picks</span>}
        sub="Best sellers and brand-new arrivals. Sample prices for the demo."
        linkTo="/shop"
        linkLabel="Shop all"
      />
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {picks.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.05} className="h-full">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AgeDiscovery() {
  const tones = ['bg-pink-soft', 'bg-sun-soft', 'bg-mist', 'bg-emerald-50', 'bg-purple-50']
  return (
    <section className="container-x pt-20" aria-labelledby="age-title">
      <SectionHeading eyebrow="Right toy, right age" title={<span id="age-title">Shop by age</span>} center sub="Pick your little one’s age and see toys chosen for them." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
        {AGES.map((a, i) => (
          <Link
            key={a.id}
            to={`/shop?age=${a.id}`}
            className={`group flex flex-col items-center rounded-3xl ${tones[i]} p-5 text-center ring-1 ring-mist-line transition duration-300 ease-[var(--ease-snap)] hover:-translate-y-1.5 hover:shadow-lift ${i === AGES.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <span className="text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" aria-hidden>{a.emoji}</span>
            <span className="mt-3 font-display text-xl leading-tight font-extrabold text-navy">{a.label}</span>
            <span className="text-sm text-muted">{a.short}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GiftIdeas() {
  const gifts = PRODUCTS.filter((p) => priceOf(p) <= 2500 && ['gifts', 'dolls', 'games', 'toys', 'vehicles'].includes(p.category))
    .sort((a, b) => (b.salePrice ? 1 : 0) - (a.salePrice ? 1 : 0))
    .slice(0, 4)
  return (
    <section className="container-x pt-20" aria-labelledby="gift-title">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-soft via-white to-sun-soft p-6 ring-1 ring-pink/15 sm:p-10">
        <span className="absolute -top-4 right-8 text-6xl opacity-20 sm:text-8xl" aria-hidden>🎁</span>
        <SectionHeading
          eyebrow="Birthday favourites"
          title={<span id="gift-title">Gift ideas under Rs. 2,500</span>}
          sub="Pretty, thoughtful and ready to give. Sample prices for the demo."
          linkTo="/shop?price=u2500"
          linkLabel="More gifts"
        />
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {gifts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const items = [
    { icon: Clock, title: 'Quick response', text: 'We reply fast to every call and WhatsApp message.', tone: 'bg-emerald-50 text-whatsapp' },
    { icon: Heart, title: 'Friendly service', text: 'Not sure what to pick? We’ll help you choose.', tone: 'bg-pink-soft text-pink' },
    { icon: Star, title: 'Quality products', text: 'Toys chosen for fun, durability and safety.', tone: 'bg-sun-soft text-amber-700' },
    { icon: Truck, title: 'Delivery information', text: 'All-island delivery available — we confirm the details with you.', tone: 'bg-mist text-royal' },
  ]
  return (
    <section className="container-x pt-20" aria-labelledby="why-title">
      <SectionHeading eyebrow="Kids World promise" title={<span id="why-title">Why shop with us</span>} center />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text, tone }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="card h-full p-6">
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}>
                <Icon size={28} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
              <p className="mt-1 text-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function VisitUs() {
  return (
    <section className="container-x pt-20" aria-labelledby="visit-title">
      <div className="grid overflow-hidden rounded-[2rem] bg-navy-deep text-white shadow-lift lg:grid-cols-2">
        <div className="relative p-8 sm:p-12">
          <p className="font-script text-3xl leading-none text-sun">Any time you go through</p>
          <h2 id="visit-title" className="mt-1 text-4xl leading-tight font-extrabold sm:text-5xl">
            {STORE.town},
          </h2>
          <p className="mt-3 max-w-md text-xl text-white/85">
            you can buy your child <span className="font-script text-3xl text-pink">happiness.</span>
          </p>
          <ul className="mt-6 space-y-3 text-white/90">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-sun" /> {STORE.address.full}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 shrink-0 text-sun" />
              <span>
                <a href={`tel:${PRIMARY_PHONE.tel}`} className="font-bold hover:underline">{PRIMARY_PHONE.display}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 shrink-0 text-sun" /> {STORE.onlineHours}
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={STORE.mapUrl} target="_blank" rel="noreferrer" className="btn-sun">
              <MapPin size={18} /> Get directions
            </a>
            <Link to="/contact" className="btn bg-white/10 text-white hover:bg-white/20">
              Contact us
            </Link>
          </div>
          <p className="mt-8 font-script text-2xl text-sun">{STORE.tagline}</p>
        </div>

        {/* stylised map placeholder */}
        <div className="relative min-h-64 bg-[#dfeafc]">
          <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="400" height="320" fill="#e4edfb" />
            <path d="M-20 240 C 80 210, 150 190, 230 140 S 360 60, 430 40" stroke="#fff" strokeWidth="34" fill="none" />
            <path d="M-20 240 C 80 210, 150 190, 230 140 S 360 60, 430 40" stroke="#ffd66b" strokeWidth="3" strokeDasharray="14 12" fill="none" />
            <path d="M120 -10 L170 330" stroke="#fff" strokeWidth="18" />
            <path d="M300 -10 L260 330" stroke="#fff" strokeWidth="14" />
            <path d="M-10 100 L420 130" stroke="#fff" strokeWidth="12" />
            <rect x="196" y="190" width="54" height="34" rx="8" fill="#cfe0f8" />
            <rect x="40" y="130" width="60" height="40" rx="8" fill="#cfe0f8" />
            <rect x="310" y="210" width="60" height="50" rx="8" fill="#cfe0f8" />
            <rect x="60" y="30" width="44" height="40" rx="8" fill="#cfe0f8" />
          </svg>
          <div className="absolute top-[38%] left-[54%] -translate-x-1/2 -translate-y-full">
            <div className="flex animate-float flex-col items-center">
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-extrabold whitespace-nowrap text-navy shadow-lift">Kids World Toys</span>
              <MapPin size={52} className="-mt-1 fill-pink text-white drop-shadow-lg" />
            </div>
          </div>
          <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-muted">Map preview — pin to be confirmed</span>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <div className="pt-20">
        <JeepCollection />
      </div>
      <Popular />
      <AgeDiscovery />
      <GiftIdeas />
      <WhyUs />
      <VisitUs />
    </>
  )
}
