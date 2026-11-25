import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Banknote, Landmark, Info, PhoneCall } from 'lucide-react'
import { ProductVisual } from '../components/ProductVisual'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'
import { priceOf, rs } from '../lib/format'
import { nextOrderRef, saveOrder } from '../lib/orders'
import { validateOrder, type OrderErrors } from '../lib/validation'
import type { OrderDetails, PaymentPreference } from '../types'

const PAYMENTS: { id: PaymentPreference; title: string; text: string; icon: typeof Banknote }[] = [
  { id: 'cod', title: 'Cash on Delivery', text: 'Pay when your order arrives.', icon: Banknote },
  { id: 'bank', title: 'Bank transfer', text: 'The shop will share account details.', icon: Landmark },
  { id: 'contact', title: 'Contact the shop', text: 'We’ll call you to arrange payment.', icon: PhoneCall },
]

const EMPTY: OrderDetails = { name: '', phone: '', address: '', town: '', payment: 'cod', notes: '' }

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<OrderDetails>(EMPTY)
  const [errors, setErrors] = useState<OrderErrors>({})
  const [touched, setTouched] = useState(false)

  if (lines.length === 0) return <Navigate to="/cart" replace />

  const update = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (touched) setErrors(validateOrder(next))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validateOrder(form)
    setErrors(errs)
    setTouched(true)
    if (Object.keys(errs).length > 0) {
      const first = (['name', 'phone', 'address', 'town'] as const).find((k) => errs[k])
      if (first) document.getElementById(`f-${first}`)?.focus()
      return
    }
    saveOrder({
      ref: nextOrderRef(),
      placedAt: new Date().toISOString(),
      customer: { ...form, name: form.name.trim(), address: form.address.trim(), town: form.town.trim(), notes: form.notes.trim() },
      lines: lines.flatMap((l) => {
        const p = findProduct(l.id)
        return p ? [{ id: p.id, name: p.name, qty: l.qty, unit: priceOf(p) }] : []
      }),
      subtotal,
    })
    clear()
    navigate('/order-confirmation')
  }

  return (
    <div className="container-x py-10">
      <p className="font-script text-2xl leading-none text-pink">Last step</p>
      <h1 className="text-4xl font-extrabold text-navy sm:text-5xl">Checkout</h1>

      <div className="mt-5 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sm font-semibold text-navy ring-1 ring-sun/50">
        <Info size={20} className="mt-0.5 shrink-0 text-amber-700" />
        <p>
          <b>Demo order.</b> This preview does not send your details to the store and no payment is taken. Please
          don’t enter real card or bank information.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <fieldset className="card space-y-5 p-6">
            <legend className="sr-only">Customer and delivery details</legend>
            <h2 className="text-2xl font-extrabold text-navy">Delivery details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="f-name" label="Full name" error={errors.name}>
                <input id="f-name" className={`field ${errors.name ? 'field-error' : ''}`} autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Nimal Perera" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'f-name-err' : undefined} />
              </Field>
              <Field id="f-phone" label="Phone number" error={errors.phone}>
                <input id="f-phone" type="tel" inputMode="tel" className={`field ${errors.phone ? 'field-error' : ''}`} autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="07X XXX XXXX" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'f-phone-err' : undefined} />
              </Field>
            </div>
            <Field id="f-address" label="Delivery address" error={errors.address}>
              <textarea id="f-address" rows={3} className={`field ${errors.address ? 'field-error' : ''}`} autoComplete="street-address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="House no., street, area" aria-invalid={!!errors.address} aria-describedby={errors.address ? 'f-address-err' : undefined} />
            </Field>
            <Field id="f-town" label="Town / city" error={errors.town}>
              <input id="f-town" className={`field ${errors.town ? 'field-error' : ''}`} autoComplete="address-level2" value={form.town} onChange={(e) => update('town', e.target.value)} placeholder="e.g. Maharagama" aria-invalid={!!errors.town} aria-describedby={errors.town ? 'f-town-err' : undefined} />
            </Field>
            <Field id="f-notes" label="Notes for the shop (optional)">
              <textarea id="f-notes" rows={2} className="field" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Gift wrapping, preferred call time…" />
            </Field>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="sr-only">Payment preference</legend>
            <h2 className="text-2xl font-extrabold text-navy">Payment preference</h2>
            <p className="mt-1 text-sm text-muted">Demo options — the shop will confirm the payment methods it supports.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map(({ id, title, text, icon: Icon }) => {
                const on = form.payment === id
                return (
                  <label key={id} className={`relative flex cursor-pointer flex-col gap-1 rounded-2xl border-2 p-4 transition ${on ? 'border-navy bg-mist' : 'border-mist-line hover:border-royal/40'}`}>
                    <input type="radio" name="payment" value={id} checked={on} onChange={() => update('payment', id)} className="sr-only" />
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${on ? 'bg-navy text-white' : 'bg-mist text-navy'}`}>
                      <Icon size={20} />
                    </span>
                    <span className="mt-1 font-bold text-navy">{title}</span>
                    <span className="text-xs text-muted">{text}</span>
                    <span className={`absolute top-3 right-3 h-5 w-5 rounded-full border-2 ${on ? 'border-navy bg-navy ring-2 ring-white ring-inset' : 'border-mist-line'}`} aria-hidden />
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="card p-6">
            <h2 className="text-2xl font-extrabold text-navy">Your order</h2>
            <ul className="mt-4 divide-y divide-mist-line">
              {lines.map((l) => {
                const p = findProduct(l.id)
                if (!p) return null
                return (
                  <li key={l.id} className="flex items-center gap-3 py-3">
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <ProductVisual product={p} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm leading-tight">
                      <span className="block truncate font-bold text-navy">{p.name}</span>
                      <span className="text-muted">Qty {l.qty}</span>
                    </span>
                    <span className="font-bold text-navy">{rs(priceOf(p) * l.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-2 flex items-baseline justify-between border-t-2 border-dashed border-mist-line pt-4">
              <span className="text-lg font-bold text-navy">Subtotal</span>
              <span className="font-display text-3xl font-extrabold text-pink">{rs(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Delivery charge confirmed by the shop.</p>
            <button type="submit" className="btn-pink mt-5 w-full py-4 text-lg">
              Place demo order
            </button>
            <Link to="/cart" className="mt-3 block text-center text-sm font-bold text-royal hover:underline">
              ← Back to cart
            </Link>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-bold text-pink">
          {error}
        </p>
      )}
    </div>
  )
}
