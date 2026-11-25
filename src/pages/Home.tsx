import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Gift, Heart, MapPin, Phone, Star, Truck } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { JeepCollection } from '../components/JeepCollection'
import { TrustStrip } from '../components/TrustStrip'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { AppIcon } from '../components/AppIcon'
import { BubbleTitle } from '../components/BubbleTitle'
import { BeachBall, Drum, Stacker, ToyCar, ToyPlane } from '../components/Toys'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AGES, CATEGORIES } from '../data/categories'
import { PRODUCTS } from '../data/products'
import { JEEP_FROM_PRICE, PRIMARY_PHONE, STORE, waLink } from '../data/store'
import { priceOf, rs } from '../lib/format'

const ease = [0.23, 1, 0.32, 1] as const

function Hero() {
  return (
    <section className="sign-bg relative overflow-hidden border-b-2 border-ink pb-28 sm:pb-32">
      {/* toys from the sign, floating at different tempos */}
      <ToyPlane className="absolute top-5 left-[6%] hidden w-28 animate-float-slow lg:block" />
      <BeachBall className="absolute top-10 right-[7%] hidden h-16 w-16 animate-float lg:block" />
      <Stacker className="absolute top-40 right-[2%] hidden animate-float-slow xl:flex" />
      <Drum className="absolute bottom-40 left-[2%] hidden w-16 animate-float lg:block" />

      <div className="container-x relative pt-10 sm:pt-14">
        {/* Sign: bubble title */}
        <div className="text-center">
          <h1 className="text-[2.7rem] min-[400px]:text-6xl sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
            <BubbleTitle className="justify-center" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.3, ease }}
            className="mt-4 text-lg font-extrabold tracking-[0.3em] text-white sm:text-2xl"
          >
            {STORE.town.toUpperCase()} · TOYS FOR EVERY SMILE
          </motion.p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Product collage (clean stock photos, framed like toy-box stickers) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45, ease }}
            className="relative mx-auto grid aspect-[6/5] w-full max-w-2xl grid-cols-6 grid-rows-5 gap-3 sm:gap-4"
          >
            <motion.div whileHover={{ rotate: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="col-span-4 row-span-3 -rotate-2 overflow-hidden rounded-[1.75rem] border-[5px] border-white bg-sun shadow-lift">
              <img src="/images/hero-soft-toys.jpg" alt="Teddy bear, plush elephant and lion soft toys sitting together" className="h-full w-full object-cover" loading="eager" />
            </motion.div>
            <motion.div whileHover={{ rotate: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="col-span-2 row-span-2 rotate-3 overflow-hidden rounded-3xl border-[5px] border-white bg-sky shadow-lift">
              <img src="/images/rc-car.jpg" alt="Remote-control toy car" className="h-full w-full object-cover" loading="eager" />
            </motion.div>
            <motion.div whileHover={{ rotate: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="col-span-2 row-span-3 rotate-2 overflow-hidden rounded-3xl border-[5px] border-white bg-pink shadow-lift">
              <img src="/images/ride-on.jpg" alt="Ride-on toy jeep" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div whileHover={{ rotate: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="col-span-4 row-span-2 -rotate-1 overflow-hidden rounded-3xl border-[5px] border-white bg-lime shadow-lift">
              <img src="/images/puzzle.jpg" alt="Colourful puzzle pieces" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <div className="absolute -top-3 left-3 hidden origin-top animate-swing min-[420px]:block sm:left-auto sm:right-8">
              <span className="mx-auto block h-4 w-0.5 bg-white" aria-hidden />
              <span className="block rounded-lg border-2 border-ink bg-white px-4 py-1.5 font-display text-lg font-bold text-pink shadow-pop">OPEN</span>
            </div>
            <span className="absolute -bottom-4 left-3 flex items-center gap-1.5 rounded-xl border-2 border-ink bg-sun px-3 py-1.5 text-sm font-extrabold text-ink shadow-pop sm:left-6">
              <MapPin size={16} /> Visit us in {STORE.town}
            </span>
          </motion.div>

          {/* Copy + actions */}
          <div className="text-white">
            <motion.p
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.35, ease }}
              className="max-w-md text-lg text-white/90"
            >
              Soft toys, RC cars, ride-on jeeps, puzzles and birthday gifts. Pick online, then call or WhatsApp us on{' '}
              <a href={`tel:${PRIMARY_PHONE.tel}`} className="font-bold whitespace-nowrap text-sun underline decoration-sun/40 underline-offset-4">{PRIMARY_PHONE.display}</a>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.76, duration: 0.35, ease }}
              className="mt-7 grid grid-cols-1 gap-3 min-[480px]:flex min-[480px]:flex-wrap"
            >
              <Link to="/shop" className="btn-sun px-7 py-4 text-lg">
                Start shopping <ArrowRight size={20} />
              </Link>
              <a
                href={waLink('Hello Kids World Toys! I would like to place an order.')}
                target="_blank"
                rel="noreferrer"
                className="btn-wa px-7 py-4 text-lg"
              >
                <WhatsAppIcon size={22} /> WhatsApp us
              </a>
            </motion.div>
            <ul className="mt-7 flex flex-wrap gap-2 text-sm font-bold">
              {[
                ['Soft toys', '/shop?category=dolls', 'bg-pink-soft'],
                ['RC & vehicles', '/shop?category=vehicles', 'bg-sky-soft'],
                ['Ride-ons', '/shop?category=ride-ons', 'bg-sun-soft'],
                ['Gifts', '/shop?category=gifts', 'bg-white'],
              ].map(([l, to, bg], i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.04, duration: 0.25, ease }}
                >
                  <Link to={to} className={`inline-block rounded-full border-2 border-ink px-3.5 py-1.5 text-ink transition duration-150 hover:-translate-y-1 hover:rotate-[-2deg] ${bg}`}>
                    {l}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/shop?category=ride-ons"
              className="mt-7 inline-flex items-center gap-3 rounded-2xl border-2 border-ink bg-orange px-4 py-3 text-ink shadow-pop transition duration-150 hover:-translate-y-1"
            >
              <ToyCar className="w-16" />
              <span className="leading-tight">
                <span className="block text-xs font-extrabold tracking-wider uppercase">Ride-on jeeps from</span>
                <span className="block font-display text-2xl font-bold">{rs(JEEP_FROM_PRICE)} <span className="text-xs font-bold">demo price</span></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="cat-title">
      <SectionHeading eyebrow="Find your fun" title={<span id="cat-title">Shop by category</span>} linkTo="/shop" linkLabel="Browse everything" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 4) * 0.05} className="h-full">
            <Link
              to={`/shop?category=${c.id}`}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink ${c.tint} p-2.5 sm:p-3 shadow-card transition duration-200 ease-[var(--ease-snap)] hover:-translate-y-1 hover:shadow-lift`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-ink bg-white">
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute top-2 left-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white text-xl" aria-hidden>
                  <AppIcon name={c.icon} size={20} className="text-ink" />
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 px-1 pt-3 pb-1">
                <div className="leading-tight">
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{c.name}</h3>
                  <p className="hidden text-xs text-muted sm:block sm:text-sm">{c.blurb}</p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-white text-ink transition group-hover:bg-sun">
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
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="pop-title">
      <SectionHeading
        eyebrow="Loved by little ones"
        title={<span id="pop-title">Popular picks</span>}
        sub="Best sellers and brand-new arrivals. Sample prices for the demo."
        linkTo="/shop"
        linkLabel="Shop all"
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
  const tones = ['bg-pink-soft', 'bg-sun-soft', 'bg-sky-soft', 'bg-white', 'bg-sun']
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="age-title">
      <SectionHeading eyebrow="Right toy, right age" title={<span id="age-title">Shop by age</span>} center sub="Pick your little one’s age and see toys chosen for them." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
        {AGES.map((a, i) => (
          <Link
            key={a.id}
            to={`/shop?age=${a.id}`}
            className={`group flex flex-col items-center rounded-3xl border-2 border-ink ${tones[i]} p-5 text-center shadow-card transition duration-200 ease-[var(--ease-snap)] hover:-translate-y-1 hover:shadow-lift ${i === AGES.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink bg-white transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"><AppIcon name={a.icon} size={32} className="text-ink" /></span>
            <span className="mt-3 font-display text-xl leading-tight font-bold text-ink">{a.label}</span>
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
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="gift-title">
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-pink-soft p-6 shadow-lift sm:p-10">
        <Gift aria-hidden className="absolute -top-3 right-8 h-20 w-20 text-pink opacity-20 sm:h-28 sm:w-28" />
        <SectionHeading
          eyebrow="Birthday favourites"
          title={<span id="gift-title">Gift ideas under Rs. 2,500</span>}
          sub="Pretty, thoughtful and ready to give. Sample prices for the demo."
          linkTo="/shop?price=u2500"
          linkLabel="More gifts"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
    { icon: Clock, title: 'Quick response', text: 'We reply fast to every call and WhatsApp message.', tone: 'bg-lime text-ink' },
    { icon: Heart, title: 'Friendly service', text: 'Not sure what to pick? We’ll help you choose.', tone: 'bg-pink text-white' },
    { icon: Star, title: 'Quality products', text: 'Toys chosen for fun, durability and safety.', tone: 'bg-sun text-ink' },
    { icon: Truck, title: 'Delivery information', text: 'All-island delivery available — we confirm the details with you.', tone: 'bg-sky text-ink' },
  ]
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="why-title">
      <SectionHeading eyebrow="Kids World promise" title={<span id="why-title">Why shop with us</span>} center />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text, tone }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="card h-full p-6">
              <span className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink ${tone}`}>
                <Icon size={28} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
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
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="visit-title">
      <div className="grid overflow-hidden rounded-[2rem] border-2 border-ink bg-navy-deep text-white shadow-lift lg:grid-cols-2">
        <div className="relative p-8 sm:p-12">
          <p className="inline-block -rotate-2 rounded-md border-2 border-ink bg-sun px-2.5 py-0.5 text-xs font-extrabold tracking-wider text-ink uppercase">Come say hi</p>
          <h2 id="visit-title" className="mt-3 text-4xl leading-tight font-bold sm:text-6xl">
            {STORE.town},
          </h2>
          <p className="mt-3 max-w-md text-xl text-white/85">
            pop in and pick up a little <span className="text-sun">happiness.</span>
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
            <Link to="/contact" className="btn bg-transparent text-white !border-white hover:bg-white/10">
              Contact us
            </Link>
          </div>
          <p className="mt-8 font-display text-2xl text-sun">{STORE.tagline}</p>
        </div>

        {/* stylised map placeholder */}
        <div className="relative min-h-64 border-t-2 border-ink bg-sky-soft lg:border-t-0 lg:border-l-2">
          <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="400" height="320" fill="#d9f4fd" />
            <path d="M-20 240 C 80 210, 150 190, 230 140 S 360 60, 430 40" stroke="#fff" strokeWidth="34" fill="none" />
            <path d="M-20 240 C 80 210, 150 190, 230 140 S 360 60, 430 40" stroke="#ffc933" strokeWidth="3" strokeDasharray="14 12" fill="none" />
            <path d="M120 -10 L170 330" stroke="#fff" strokeWidth="18" />
            <path d="M300 -10 L260 330" stroke="#fff" strokeWidth="14" />
            <path d="M-10 100 L420 130" stroke="#fff" strokeWidth="12" />
            <rect x="196" y="190" width="54" height="34" rx="8" fill="#fff0b8" />
            <rect x="40" y="130" width="60" height="40" rx="8" fill="#fff0b8" />
            <rect x="310" y="210" width="60" height="50" rx="8" fill="#fff0b8" />
            <rect x="60" y="30" width="44" height="40" rx="8" fill="#fff0b8" />
          </svg>
          <div className="absolute top-[38%] left-[54%] -translate-x-1/2 -translate-y-full">
            <div className="flex animate-float flex-col items-center">
              <span className="rounded-lg border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold whitespace-nowrap text-ink shadow-pop">Kids World Toys</span>
              <MapPin size={52} className="-mt-1 fill-pink text-ink" />
            </div>
          </div>
          <span className="absolute right-4 bottom-4 rounded-md border border-ink bg-white px-2 py-1 text-xs font-bold text-muted">Map preview — pin to be confirmed</span>
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
      <div className="pt-14 sm:pt-20">
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
