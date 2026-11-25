import type { PlacedOrder } from '../types'

const COUNTER_KEY = 'kidsland-demo-order-counter'
const ORDER_KEY = 'kidsland-demo-last-order'

/** DEMO-001, DEMO-002 … (only a local counter; nothing leaves the browser). */
export function nextOrderRef(): string {
  let n = 0
  try {
    n = Number(localStorage.getItem(COUNTER_KEY)) || 0
    localStorage.setItem(COUNTER_KEY, String(n + 1))
  } catch {
    /* ignore */
  }
  return `DEMO-${String(n + 1).padStart(3, '0')}`
}

/** Kept in sessionStorage only, so it disappears when the tab is closed. */
export function saveOrder(order: PlacedOrder) {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order))
  } catch {
    /* ignore */
  }
}

export function loadOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY)
    return raw ? (JSON.parse(raw) as PlacedOrder) : null
  } catch {
    return null
  }
}
