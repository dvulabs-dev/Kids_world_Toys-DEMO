import type { OrderDetails } from '../types'

/** Sri Lankan numbers: 07X XXX XXXX, 0XX XXX XXXX or +94 …, spaces/dashes allowed. */
export function isValidPhone(input: string) {
  const digits = input.replace(/[\s\-()]/g, '')
  return /^(?:\+94|0)\d{9}$/.test(digits)
}

export type OrderErrors = Partial<Record<keyof OrderDetails, string>>

export function validateOrder(d: OrderDetails): OrderErrors {
  const e: OrderErrors = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!d.phone.trim()) e.phone = 'Please enter a phone number so the shop can reach you.'
  else if (!isValidPhone(d.phone)) e.phone = 'Enter a valid Sri Lankan number, e.g. 077 123 4567.'
  if (d.address.trim().length < 5) e.address = 'Please enter your delivery address.'
  if (d.town.trim().length < 2) e.town = 'Please enter your town or city.'
  return e
}
