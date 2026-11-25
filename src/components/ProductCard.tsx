import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { ProductVisual } from './ProductVisual'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useCart } from '../context/CartContext'
import { categoryName } from '../data/categories'
import { waLink } from '../data/store'
import { discountPct, priceOf, rs } from '../lib/format'
import { productEnquiry } from '../lib/whatsapp'
import type { Badge, Product, StockStatus } from '../types'

export const BADGE_STYLE: Record<Badge, string> = {
  'Best Seller': 'bg-sun text-navy-deep',
  New: 'bg-mint text-white',
  'Gift Pick': 'bg-pink text-white',
  Sale: 'bg-pink-deep text-white',
}

export const STOCK_STYLE: Record<StockStatus, { dot: string; text: string }> = {
  'In stock': { dot: 'bg-mint', text: 'text-mint' },
  'Few left': { dot: 'bg-sun-deep', text: 'text-amber-700' },
  'Ask the shop': { dot: 'bg-royal', text: 'text-royal' },
}

export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart()
  const pct = discountPct(p)
  const stock = STOCK_STYLE[p.stock]

  return (
    <article className="group card flex h-full flex-col overflow-hidden transition duration-300 ease-[var(--ease-snap)] hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/product/${p.id}`} className="relative block aspect-[4/3] overflow-hidden bg-mist" aria-label={`View ${p.name}`}>
        <div className="h-full w-full transition duration-500 ease-[var(--ease-snap)] group-hover:scale-105">
          <ProductVisual product={p} />
        </div>
        {p.badge && (
          <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ${BADGE_STYLE[p.badge]}`}>
            {p.badge}
          </span>
        )}
        {pct > 0 && (
          <span className="absolute top-3 right-3 flex h-11 w-11 -rotate-6 items-center justify-center rounded-full bg-sun text-xs leading-none font-extrabold text-navy-deep shadow-sm">
            -{pct}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-extrabold tracking-wide text-pink uppercase">{categoryName(p.category)}</p>
        <h3 className="mt-1 text-lg leading-snug font-bold text-navy">
          <Link to={`/product/${p.id}`} className="hover:text-royal">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{p.blurb}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold">
          <span className="rounded-full bg-mist px-2.5 py-1 text-navy">Age {p.ageLabel}</span>
          <span className={`inline-flex items-center gap-1.5 ${stock.text}`}>
            <span className={`h-2 w-2 rounded-full ${stock.dot}`} />
            {p.stock}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-2xl font-extrabold text-navy">{rs(priceOf(p))}</span>
            {p.salePrice && <span className="text-sm text-muted line-through">{rs(p.price)}</span>}
          </p>
          <p className="text-[11px] font-semibold text-muted/80">Demo price</p>

          <div className="mt-3 flex gap-2">
            <button onClick={() => add(p.id)} className="btn-navy btn-sm flex-1 !px-3" aria-label={`Add ${p.name} to cart`}>
              <ShoppingCart size={16} /> Add<span className="hidden xl:inline"> to Cart</span>
            </button>
            <Link to={`/product/${p.id}`} className="btn-outline btn-sm !px-3">
              Details
            </Link>
            {p.stock === 'Ask the shop' && (
              <a
                href={waLink(productEnquiry(p.name))}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ask the shop about ${p.name} on WhatsApp`}
                title="Ask on WhatsApp"
                className="btn-wa btn-sm !px-3"
              >
                <WhatsAppIcon size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
