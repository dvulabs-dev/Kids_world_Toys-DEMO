import React, { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { Product, rs } from './data'

const BADGE: Record<string, string> = {
  New: 'bg-royal text-white',
  'Best Seller': 'bg-sun text-navy-deep',
  'Gift Pick': 'bg-pink text-white',
  Sale: 'bg-pink text-white',
}

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product
  onOpen?: () => void
  onAdd?: () => void
}) {
  const [added, setAdded] = useState(false)
  const add = () => {
    onAdd?.()
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }
  return (
    <article className="group flex h-full flex-col">
      <button
        onClick={onOpen}
        className="relative aspect-square overflow-hidden rounded-2xl bg-sky"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-snap group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-extrabold ${BADGE[product.badge]}`}>
            {product.badge}
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col pt-3">
        <p className="text-xs font-bold text-muted">{product.ageLabel}</p>
        <button onClick={onOpen} className="mt-0.5 text-left">
          <h3 className="font-display text-lg font-bold leading-snug text-navy transition-colors duration-150 hover:text-royal">
            {product.name}
          </h3>
        </button>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.blurb}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-tight">
            {product.salePrice ? (
              <>
                <p className="text-lg font-extrabold text-pink">{rs(product.salePrice)}</p>
                <p className="text-xs text-muted line-through">{rs(product.price)}</p>
              </>
            ) : (
              <p className="text-lg font-extrabold text-ink">{rs(product.price)}</p>
            )}
          </div>
          <button
            onClick={add}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold transition-colors duration-150 active:scale-[0.97] ${
              added ? 'bg-whatsapp text-white' : 'bg-navy text-white hover:bg-royal'
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
