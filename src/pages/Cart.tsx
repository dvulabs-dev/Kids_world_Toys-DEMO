import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { ProductVisual } from '../components/ProductVisual'
import { QuantityStepper } from '../components/QuantityStepper'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'
import { STORE, waLink } from '../data/store'
import { priceOf, rs } from '../lib/format'
import { cartMessage } from '../lib/whatsapp'

export default function Cart() {
  const { lines, subtotal, count, setQty, remove, clear } = useCart()
  const navigate = useNavigate()

  if (lines.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <span className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-sun-soft text-6xl" aria-hidden>🛒</span>
        <h1 className="mt-5 text-4xl font-extrabold text-navy">Your cart is empty</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">Looks like you haven’t picked any toys yet. Let’s find something that makes a little one smile!</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-navy">Start shopping <ArrowRight size={18} /></Link>
          <Link to="/shop?category=ride-ons" className="btn-outline">See ride-on jeeps</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-script text-2xl leading-none text-pink">Almost there</p>
          <h1 className="text-4xl font-extrabold text-navy sm:text-5xl">Your cart</h1>
        </div>
        <button onClick={clear} className="text-sm font-bold text-muted hover:text-pink hover:underline">
          Empty cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <ul className="space-y-4">
          {lines.map((l) => {
            const p = findProduct(l.id)
            if (!p) return null
            return (
              <li key={l.id} className="card flex gap-4 p-3 sm:p-4">
                <Link to={`/product/${p.id}`} className="block aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-2xl sm:w-40">
                  <ProductVisual product={p} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-lg leading-snug font-bold text-navy">
                        <Link to={`/product/${p.id}`} className="hover:text-royal">{p.name}</Link>
                      </h2>
                      <p className="text-sm text-muted">Age {p.ageLabel} · {rs(priceOf(p))} each</p>
                    </div>
                    <button
                      onClick={() => remove(p.id)}
                      aria-label={`Remove ${p.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-pink-soft hover:text-pink"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <QuantityStepper value={l.qty} onChange={(n) => setQty(p.id, n)} label={`Quantity of ${p.name}`} />
                    <p className="font-display text-2xl font-extrabold text-navy">{rs(priceOf(p) * l.qty)}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="card p-6">
            <h2 className="text-2xl font-extrabold text-navy">Order summary</h2>
            <dl className="mt-4 space-y-2">
              <div className="flex justify-between text-muted">
                <dt>Items ({count})</dt>
                <dd className="font-bold text-ink">{rs(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Delivery</dt>
                <dd className="font-bold text-ink">Confirmed by shop</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t-2 border-dashed border-mist-line pt-4">
              <span className="text-lg font-bold text-navy">Subtotal</span>
              <span className="font-display text-3xl font-extrabold text-pink">{rs(subtotal)}</span>
            </div>
            <p className="mt-3 flex gap-2 rounded-2xl bg-mist p-3 text-sm text-muted">
              <Truck size={18} className="mt-0.5 shrink-0 text-royal" />
              {STORE.deliveryNote}. {STORE.deliveryChargeNote}
            </p>
            <button onClick={() => navigate('/checkout')} className="btn-pink mt-5 w-full py-4 text-lg">
              Proceed to Order <ArrowRight size={20} />
            </button>
            <a
              href={waLink(cartMessage(lines, subtotal))}
              target="_blank"
              rel="noreferrer"
              className="btn-wa mt-3 w-full"
            >
              <WhatsAppIcon size={18} /> Send cart on WhatsApp
            </a>
            <Link to="/shop" className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-royal hover:underline">
              <ShoppingBag size={16} /> Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
