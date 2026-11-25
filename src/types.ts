export type CategoryId =
  | 'toys'
  | 'baby'
  | 'educational'
  | 'ride-ons'
  | 'dolls'
  | 'vehicles'
  | 'games'
  | 'gifts'

export type AgeId = '0-12m' | '1-3' | '3-5' | '6-8' | '9+'

export type Badge = 'New' | 'Best Seller' | 'Gift Pick' | 'Sale'

export type StockStatus = 'In stock' | 'Few left' | 'Ask the shop'

/** Illustrated placeholder used until the owner supplies a real photo. */
export type ProductArt =
  | { kind: 'jeep'; color: string; accent?: string }
  | { kind: 'bike'; color: string; accent?: string }
  | { kind: 'emoji'; emoji: string; from: string; to: string }

export interface Product {
  id: string
  name: string
  category: CategoryId
  age: AgeId
  ageLabel: string
  price: number
  salePrice?: number
  badge?: Badge
  blurb: string
  description: string
  /** Bullet list shown on the details page (optional). */
  features?: string[]
  /** Path under /public. When missing, `art` is drawn instead. */
  image?: string
  art?: ProductArt
  stock: StockStatus
  /** Higher = newer. Used by the "Newest" sort. */
  added: number
}

export interface CartLine {
  id: string
  qty: number
}

export type PaymentPreference = 'cod' | 'bank' | 'contact'

export interface OrderDetails {
  name: string
  phone: string
  address: string
  town: string
  payment: PaymentPreference
  notes: string
}

export interface PlacedOrder {
  ref: string
  placedAt: string
  customer: OrderDetails
  lines: { id: string; name: string; qty: number; unit: number }[]
  subtotal: number
}
