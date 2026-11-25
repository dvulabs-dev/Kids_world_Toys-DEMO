import { Link } from 'react-router-dom'
import { Clock, CreditCard, PackageCheck, RefreshCw, Truck } from 'lucide-react'
import { PageBanner, ConfirmTag } from '../components/PageBanner'
import { STORE, PRIMARY_PHONE } from '../data/store'

export default function DeliveryReturns() {
  const blocks = [
    {
      icon: Truck,
      title: 'Delivery coverage',
      tag: true,
      text: `${STORE.deliveryNote}. We deliver across Sri Lanka — the shop will confirm whether your area is covered when it calls you about your order.`,
    },
    {
      icon: Clock,
      title: 'Estimated delivery time',
      tag: true,
      text: 'Delivery times depend on your location and the item. The shop will give you an estimate when confirming your order.',
    },
    {
      icon: CreditCard,
      title: 'Delivery charges',
      tag: true,
      text: STORE.deliveryChargeNote,
    },
    {
      icon: RefreshCw,
      title: 'Exchanges & returns',
      tag: true,
      text: 'If an item arrives faulty or not as described, contact us as soon as possible. Eligible items, the time window and the item condition required for an exchange will be confirmed by the shop.',
    },
    {
      icon: PackageCheck,
      title: 'Warranty on ride-ons',
      tag: true,
      text: 'Warranty on ride-on jeeps and electric toys is confirmed by the shop — please ask before you order.',
    },
  ]

  return (
    <>
      <PageBanner title="Delivery & returns" eyebrow="Good to know">
        How delivery works, and what to do if something isn’t right.
      </PageBanner>
      <section className="container-x max-w-4xl py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {blocks.map(({ icon: Icon, title, text, tag }) => (
            <div key={title} className="card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-soft text-amber-700"><Icon size={24} /></span>
              <h2 className="mt-4 text-xl font-bold text-navy">
                {title}
                {tag && <ConfirmTag />}
              </h2>
              <p className="mt-1 text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-navy p-6 text-center text-white sm:p-8">
          <h2 className="text-2xl font-extrabold">Questions about your order?</h2>
          <p className="mt-1 text-white/75">Call us on {PRIMARY_PHONE.display} or check the FAQ.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/faq" className="btn-sun">Read the FAQ</Link>
            <Link to="/contact" className="btn bg-white/10 text-white hover:bg-white/20">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
