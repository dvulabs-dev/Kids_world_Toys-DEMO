import { Minus, Plus } from 'lucide-react'
import { MAX_QTY } from '../context/CartContext'

interface Props {
  value: number
  onChange: (n: number) => void
  min?: number
  label?: string
}

export function QuantityStepper({ value, onChange, min = 1, label = 'Quantity' }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border-2 border-mist-line bg-white" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-mist disabled:opacity-35"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center font-extrabold text-navy" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-mist disabled:opacity-35"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
