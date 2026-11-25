import type { Product } from '../types'

export const rs = (n: number) => 'Rs. ' + n.toLocaleString('en-US')

export const priceOf = (p: Product) => p.salePrice ?? p.price

export const discountPct = (p: Product) =>
  p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0
