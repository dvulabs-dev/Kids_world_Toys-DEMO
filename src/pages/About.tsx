import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, Smile, Truck } from 'lucide-react'
import { PageBanner } from '../components/PageBanner'
import { Reveal } from '../components/Reveal'
import { STORE } from '../data/store'

const VALUES = [
  { icon: Smile, title: 'Every child’s smile', text: 'We choose toys that make children happy and keep them playing.', tone: 'bg-sun-soft text-amber-700' },
  { icon: Heart, title: 'Friendly service', text: 'Ask us anything — we’re happy to help you choose the right item.', tone: 'bg-pink-soft text-pink' },
  { icon: ShieldCheck, title: 'Safe & trusted', text: 'Age guidance and product details so you can buy with confidence.', tone: 'bg-mist text-royal' },
  { icon: Truck, title: 'Convenient ordering', text: 'Order online, by phone or on WhatsApp, with delivery available.', tone: 'bg-emerald-50 text-whatsapp' },
]

export default function About() {
  return (
    <>
      <PageBanner title="About us" eyebrow={STORE.tagline} />
      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Welcome to Kids World Toys</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/85">
            <p>
              Kids World Toys, {STORE.town} — a place to discover toys, baby essentials and thoughtful gifts for
              children. We aim to make choosing a little happiness simple, with friendly service and convenient online
              ordering.
            </p>
            <p>
              Find us in {STORE.address.line1}, or order online whenever you like. Browse our collection and contact us
              if you need help choosing the right item.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-navy">Browse the shop</Link>
            <Link to="/contact" className="btn-outline">Visit or contact us</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <img src="/images/gift-set.jpg" alt="A ready-to-give toy gift box" className="aspect-[4/3] w-full rotate-2 rounded-[2rem] border-[6px] border-white object-cover shadow-lift" loading="lazy" />
            <span className="absolute -bottom-5 -left-3 -rotate-6 rounded-2xl bg-pink px-5 py-3 font-script text-2xl text-white shadow-lift">{STORE.tagline}</span>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text, tone }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="card h-full p-6">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}><Icon size={28} /></span>
                <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-1 text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
