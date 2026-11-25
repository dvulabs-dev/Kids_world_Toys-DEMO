import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Info, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import { ProductVisual } from '../components/ProductVisual'
import { ProductCard, BADGE_STYLE, STOCK_STYLE } from '../components/ProductCard'
import { QuantityStepper } from '../components/QuantityStepper'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useCart } from '../context/CartContext'
import { categoryName } from '../data/categories'
import { findProduct, PRODUCTS } from '../data/products'
import { STORE, waLink } from '../data/store'
import { discountPct, priceOf, rs } from '../lib/format'
import { productEnquiry } from '../lib/whatsapp'

export default function ProductDetails() {
  const { id } = useParams()
  const product = findProduct(id)
  const { add, lines } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <span className="text-7xl" aria-hidden>🧸</span>
        <h1 className="mt-4 text-4xl font-extrabold text-navy">We couldn’t find that toy</h1>
        <p className="mt-2 text-muted">It may have been moved or is no longer listed.</p>
        <Link to="/shop" className="btn-navy mt-6">Back to the shop</Link>
      </div>
    )
  }

  const p = product
  const pct = discountPct(p)
  const stock = STOCK_STYLE[p.stock]
  const inCart = lines.find((l) => l.id === p.id)?.qty ?? 0
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)

  const handleAdd = () => {
    add(p.id, qty)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <>
      <div className="container-x pt-6">
        <nav className="text-sm font-bold text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-royal">Home</Link> <span aria-hidden>›</span>{' '}
          <Link to="/shop" className="hover:text-royal">Shop</Link> <span aria-hidden>›</span>{' '}
          <Link to={`/shop?category=${p.category}`} className="hover:text-royal">{categoryName(p.category)}</Link>{' '}
          <span aria-hidden>›</span> <span className="text-navy">{p.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-8 py-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <div className="sticky top-36">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-lift ring-1 ring-mist-line">
              <ProductVisual product={p} eager />
              {p.badge && (
                <span className={`absolute top-4 left-4 rounded-full px-4 py-1.5 text-sm font-extrabold shadow-sm ${BADGE_STYLE[p.badge]}`}>
                  {p.badge}
                </span>
              )}
              {pct > 0 && (
                <span className="absolute top-4 right-4 flex h-14 w-14 -rotate-6 items-center justify-center rounded-full bg-sun text-sm font-extrabold text-navy-deep shadow-sm">
                  -{pct}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold tracking-wide text-pink uppercase">{categoryName(p.category)}</p>
          <h1 className="mt-1 text-4xl leading-tight font-extrabold text-navy sm:text-5xl">{p.name}</h1>
          <p className="mt-2 text-lg text-muted">{p.blurb}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-bold text-navy">Recommended age: {p.ageLabel}</span>
            <span className={`inline-flex items-center gap-2 text-sm font-bold ${stock.text}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${stock.dot}`} /> {p.stock}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-5xl font-extrabold text-navy">{rs(priceOf(p))}</span>
            {p.salePrice && <span className="text-xl text-muted line-through">{rs(p.price)}</span>}
            <span className="rounded-full bg-pink-soft px-2.5 py-0.5 text-xs font-extrabold text-pink">Demo price</span>
          </div>

          <p className="mt-5 leading-relaxed text-ink/85">{p.description}</p>

          {p.features && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-semibold text-navy">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <button onClick={handleAdd} className={`${justAdded ? 'btn bg-mint text-white' : 'btn-navy'} min-w-48 px-7 py-3.5`}>
              {justAdded ? (
                <>
                  <Check size={18} /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>
          {inCart > 0 && (
            <p className="mt-3 text-sm font-bold text-muted">
              {inCart} in your cart · <Link to="/cart" className="text-royal hover:underline">View cart</Link>
            </p>
          )}

          <a
            href={waLink(productEnquiry(p.name))}
            target="_blank"
            rel="noreferrer"
            className="btn-wa mt-4 w-full sm:w-auto"
          >
            <WhatsAppIcon size={18} /> Ask about this on WhatsApp
          </a>

          <ul className="mt-8 space-y-3 rounded-3xl bg-mist p-5 text-sm">
            <li className="flex gap-3 font-semibold text-navy">
              <Truck size={20} className="shrink-0 text-pink" /> {STORE.deliveryNote}. {STORE.deliveryChargeNote}
            </li>
            <li className="flex gap-3 font-semibold text-navy">
              <ShieldCheck size={20} className="shrink-0 text-pink" /> Please check the age guidance and any manufacturer warnings before use.
            </li>
            <li className="flex gap-3 text-muted">
              <Info size={20} className="shrink-0 text-royal" /> Demo preview: price, photo and availability are samples and will be confirmed by the shop.
            </li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x pt-8 pb-4">
          <SectionHeading eyebrow="You might also like" title="More from this category" linkTo={`/shop?category=${p.category}`} />
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
