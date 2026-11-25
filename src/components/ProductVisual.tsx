import { useState } from 'react'
import type { Product } from '../types'
import { BikeArt, JeepArt } from './RideOnArt'

interface Props {
  product: Pick<Product, 'id' | 'name' | 'image' | 'art'>
  className?: string
  eager?: boolean
}

/**
 * One consistent frame for every product: the real photo when we have it
 * (explicit `image`, or public/images/products/<id>.jpg), otherwise an illustration.
 * Falls back to the illustration if the photo is missing or fails to load.
 */
export function ProductVisual({ product, className = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false)
  const { art, name } = product
  // A photo dropped into public/images/products/<id>.jpg is picked up automatically.
  const image = product.image ?? `/images/products/${product.id}.jpg`

  if (image && !failed) {
    return (
      <img
        src={image}
        alt={name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  if (art?.kind === 'jeep' || art?.kind === 'bike') {
    const Art = art.kind === 'jeep' ? JeepArt : BikeArt
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sun-soft via-white to-pink-soft ${className}`}
        role="img"
        aria-label={name}
      >
        <div className="dotted-bg absolute inset-0 opacity-60" />
        <Art color={art.color} accent={art.accent} className="relative w-[88%] drop-shadow-md" />
      </div>
    )
  }

  const emoji = art?.kind === 'emoji' ? art : { emoji: '🧸', from: '#f1f6ff', to: '#dbe6fb' }
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${emoji.from}, ${emoji.to})` }}
      role="img"
      aria-label={name}
    >
      <span className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-white/40" />
      <span className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/30" />
      <span className="relative text-7xl drop-shadow-sm sm:text-8xl" aria-hidden>
        {emoji.emoji}
      </span>
    </div>
  )
}
