import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { PageBanner } from '../components/PageBanner'
import { PRIMARY_PHONE, STORE } from '../data/store'

const FAQS = [
  {
    group: 'Ordering',
    items: [
      { q: 'How do I place an order?', a: `Add toys to your cart and follow the checkout steps, or simply call / WhatsApp us on ${PRIMARY_PHONE.display}. The shop will confirm price and availability with you.` },
      { q: 'Can I order at night?', a: 'Yes — online orders can be placed any time. The shop replies to calls and messages as soon as it can.' },
      { q: 'Is the website taking real orders yet?', a: 'This is a demo preview. Orders placed here are not sent to the shop. To order now, use WhatsApp or call.' },
    ],
  },
  {
    group: 'Payment & delivery',
    items: [
      { q: 'How can I pay?', a: 'Cash on delivery, bank transfer or arranging payment with the shop are the options shown in the demo. The shop will confirm exactly which methods it supports.' },
      { q: 'Do you deliver to my area?', a: `${STORE.deliveryNote}. The shop will confirm the delivery time and charge for your location.` },
    ],
  },
  {
    group: 'Products',
    items: [
      { q: 'How do I know a toy is right for my child’s age?', a: 'Every product shows a recommended age. Please follow it and any manufacturer warnings — and ask us if you’re unsure.' },
      { q: 'Is the item in stock?', a: 'Stock shown in the demo is sample information. The shop confirms availability when you order or enquire.' },
      { q: 'What warranty do ride-on jeeps have?', a: 'Warranty terms are confirmed by the shop for each item. Please ask when you order.' },
    ],
  },
  {
    group: 'Returns',
    items: [
      { q: 'What if my item is faulty?', a: 'Contact the shop as soon as you notice a problem. Return and exchange rules will be confirmed by the shop.' },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(FAQS[0].items[0].q)
  return (
    <>
      <PageBanner title="Frequently asked questions" eyebrow="Quick answers" />
      <section className="container-x max-w-3xl space-y-10 py-12">
        {FAQS.map((g) => (
          <div key={g.group}>
            <h2 className="mb-3 text-sm font-extrabold tracking-wide text-pink uppercase">{g.group}</h2>
            <ul className="space-y-3">
              {g.items.map(({ q, a }) => {
                const isOpen = open === q
                return (
                  <li key={q} className={`card overflow-hidden transition ${isOpen ? 'ring-2 ring-royal/30' : ''}`}>
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : q)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-bold text-navy"
                      >
                        {q}
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isOpen ? 'bg-navy text-white' : 'bg-mist text-navy'}`}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && <p className="px-5 pb-5 text-muted">{a}</p>}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <p className="text-center text-muted">
          Still have a question? <Link to="/contact" className="font-bold text-royal hover:underline">Contact us</Link>
        </p>
      </section>
    </>
  )
}
