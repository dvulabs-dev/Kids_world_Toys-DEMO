import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { findProduct } from '../data/products'
import { priceOf } from '../lib/format'
import type { CartLine } from '../types'

const KEY = 'kidsland-demo-cart'
const MAX_QTY = 20

interface CartValue {
  lines: CartLine[]
  count: number
  subtotal: number
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  /** Last item added, used to flash a confirmation toast. */
  lastAdded: { id: string; at: number } | null
}

const CartContext = createContext<CartValue | null>(null)

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((l): l is CartLine => !!l && typeof l.id === 'string' && Number.isInteger(l.qty) && l.qty > 0)
      .filter((l) => !!findProduct(l.id))
      .map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  const [lastAdded, setLastAdded] = useState<CartValue['lastAdded']>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* private mode etc. — cart just won't persist */
    }
  }, [lines])

  const add = useCallback((id: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id)
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l))
      }
      return [...prev, { id, qty: Math.min(qty, MAX_QTY) }]
    })
    setLastAdded({ id, at: Date.now() })
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
    )
  }, [])

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), [])
  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => {
      const p = findProduct(l.id)
      return p ? n + priceOf(p) * l.qty : n
    }, 0)
    return { lines, count, subtotal, add, setQty, remove, clear, lastAdded }
  }, [lines, add, setQty, remove, clear, lastAdded])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

export { MAX_QTY }
