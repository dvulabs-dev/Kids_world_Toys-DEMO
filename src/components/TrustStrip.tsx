import { Gift, MessageCircle, ShieldCheck, Truck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'All-island delivery', sub: 'Ask the shop for details', bg: 'bg-sun' },
  { icon: Gift, title: 'Gifts for every age', sub: 'Birthdays & surprises', bg: 'bg-pink-soft' },
  { icon: MessageCircle, title: 'Quick replies', sub: 'Calls & WhatsApp', bg: 'bg-sky-soft' },
  { icon: ShieldCheck, title: 'Safe, trusted toys', sub: 'Visit us in Maharagama', bg: 'bg-sun-soft' },
]

export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="relative z-10 -mt-7">
      <div className="container-x">
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-card lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, sub, bg }, i) => (
            <li
              key={title}
              className={`flex items-center gap-3 p-4 sm:p-5 ${i % 2 === 1 ? 'border-l-2 border-ink' : ''} ${i > 1 ? 'border-t-2 border-ink lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l-2' : ''}`}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-ink ${bg}`}>
                <Icon size={22} className="text-ink" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink sm:text-base">{title}</span>
                <span className="block text-xs text-muted sm:text-sm">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
