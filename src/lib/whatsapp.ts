import { STORE } from '../data/store'
import { findProduct } from '../data/products'
import { priceOf, rs } from './format'
import type { CartLine, PlacedOrder } from '../types'

export function cartMessage(lines: CartLine[], subtotal: number) {
  const rows = lines
    .map((l) => {
      const p = findProduct(l.id)
      return p ? `• ${p.name} × ${l.qty} — ${rs(priceOf(p) * l.qty)}` : ''
    })
    .filter(Boolean)
  return [
    `Hello ${STORE.short}! I'd like to order:`,
    ...rows,
    `Subtotal: ${rs(subtotal)}`,
    'Please confirm availability and delivery.',
  ].join('\n')
}

export function orderMessage(o: PlacedOrder) {
  return [
    `Hello ${STORE.short}! I'd like to place this order (ref ${o.ref}):`,
    ...o.lines.map((l) => `• ${l.name} × ${l.qty} — ${rs(l.unit * l.qty)}`),
    `Subtotal: ${rs(o.subtotal)}`,
    '',
    `Name: ${o.customer.name}`,
    `Phone: ${o.customer.phone}`,
    `Address: ${o.customer.address}, ${o.customer.town}`,
    `Payment: ${paymentLabel(o.customer.payment)}`,
    o.customer.notes ? `Notes: ${o.customer.notes}` : '',
  ]
    .filter((l, i, arr) => l !== '' || (i > 0 && arr[i - 1] !== ''))
    .join('\n')
}

export function paymentLabel(p: PlacedOrder['customer']['payment']) {
  return p === 'cod' ? 'Cash on Delivery' : p === 'bank' ? 'Bank transfer' : 'Contact the shop'
}

export function productEnquiry(name: string) {
  return `Hello ${STORE.short}! I'd like to know about "${name}" — is it available, and what's the delivery time?`
}
