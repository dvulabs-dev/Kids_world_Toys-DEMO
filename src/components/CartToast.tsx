import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'

/** Small "added to cart" confirmation that disappears by itself. */
export function CartToast() {
  const { lastAdded } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!lastAdded) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 3200)
    return () => clearTimeout(t)
  }, [lastAdded])

  const product = findProduct(lastAdded?.id)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] lg:bottom-5 flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {visible && product && (
          <motion.div
            key={lastAdded?.at}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-navy-deep py-2.5 pr-2.5 pl-3 text-white shadow-lift"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint">
              <Check size={18} strokeWidth={3} />
            </span>
            <span className="truncate text-sm font-bold">{product.name} added</span>
            <Link to="/cart" className="shrink-0 rounded-full bg-sun px-4 py-1.5 text-sm font-extrabold text-navy-deep hover:bg-sun-deep">
              View cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
