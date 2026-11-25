import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Blocks, Check, Gift, Heart, Info, MapPin, PartyPopper, Phone, Sparkles, Star } from 'lucide-react'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { STORE, waLink } from '../data/store'
import { rs } from '../lib/format'
import { loadOrder } from '../lib/orders'
import { orderMessage, paymentLabel } from '../lib/whatsapp'

const CONFETTI = [
  { Icon: PartyPopper, color: 'text-pink' },
  { Icon: Star, color: 'text-sun-deep' },
  { Icon: Gift, color: 'text-royal' },
  { Icon: Blocks, color: 'text-sky' },
  { Icon: Heart, color: 'text-pink' },
  { Icon: Sparkles, color: 'text-orange' },
]

export default function OrderConfirmation() {
  const order = loadOrder()
  if (!order) return <Navigate to="/" replace />

  return (
    <div className="container-x relative max-w-3xl py-12">
      {CONFETTI.map(({ Icon, color }, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 160, damping: 12 }}
          className={`pointer-events-none absolute ${color}`}
          style={{ left: `${6 + i * 17}%`, top: i % 2 ? 6 : 34 }}
        >
          <Icon size={36} />
        </motion.span>
      ))}

      <div className="text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-mint text-white shadow-lift"
        >
          <Check size={52} strokeWidth={3.5} />
        </motion.span>
        <h1 className="mt-5 text-4xl font-extrabold text-navy sm:text-5xl">Thank you, {order.customer.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-lg text-muted">Your demo order summary is ready.</p>
        <p className="mt-4 inline-block rounded-full bg-sun px-6 py-2 font-display text-2xl font-extrabold text-navy-deep">
          {order.ref}
        </p>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sm font-semibold text-navy ring-1 ring-sun/50">
        <Info size={20} className="mt-0.5 shrink-0 text-amber-700" />
        <p>
          <b>Demo order — not submitted to store.</b> Nothing was sent and no payment was taken. To really place this
          order, send it to the shop on WhatsApp below.
        </p>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-2xl font-extrabold text-navy">Order summary</h2>
        <ul className="mt-3 divide-y divide-mist-line">
          {order.lines.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 py-3">
              <span className="font-bold text-navy">
                {l.name} <span className="font-semibold text-muted">× {l.qty}</span>
              </span>
              <span className="font-bold">{rs(l.unit * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-baseline justify-between border-t-2 border-dashed border-mist-line pt-4">
          <span className="text-lg font-bold text-navy">Subtotal</span>
          <span className="font-display text-3xl font-extrabold text-pink">{rs(order.subtotal)}</span>
        </div>

        <dl className="mt-6 grid gap-4 rounded-2xl bg-mist p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-extrabold text-navy">Deliver to</dt>
            <dd className="text-muted">
              {order.customer.name}
              <br />
              {order.customer.address}, {order.customer.town}
            </dd>
          </div>
          <div>
            <dt className="font-extrabold text-navy">Contact &amp; payment</dt>
            <dd className="text-muted">
              {order.customer.phone}
              <br />
              {paymentLabel(order.customer.payment)}
            </dd>
          </div>
          {order.customer.notes && (
            <div className="sm:col-span-2">
              <dt className="font-extrabold text-navy">Notes</dt>
              <dd className="text-muted">{order.customer.notes}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={waLink(orderMessage(order))} target="_blank" rel="noreferrer" className="btn-wa py-4 text-lg">
          <WhatsAppIcon size={22} /> Send order on WhatsApp
        </a>
        <Link to="/shop" className="btn-navy py-4 text-lg">
          Continue shopping
        </Link>
      </div>

      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5"><Phone size={16} /> {STORE.phones.map((p) => p.display).join(' / ')}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin size={16} /> {STORE.address.full}</span>
      </p>
    </div>
  )
}
