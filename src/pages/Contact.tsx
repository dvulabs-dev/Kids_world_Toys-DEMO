import { useState, type FormEvent } from 'react'
import { Clock, Info, MailCheck, MapPin, Phone, Send } from 'lucide-react'
import { PageBanner, ConfirmTag } from '../components/PageBanner'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { STORE, waLink } from '../data/store'

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.'
    if (!form.contact.trim()) errs.contact = 'Please add a phone number or email.'
    if (form.message.trim().length < 5) errs.message = 'Please write a short message.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setDone(true)
  }

  const waText = `Hello Kids World Toys! My name is ${form.name.trim()} (${form.contact.trim()}).\n${form.message.trim()}`

  return (
    <>
      <PageBanner title="Contact us" eyebrow="We’d love to hear from you">
        Call, WhatsApp or drop in to the shop in Maharagama. We reply to calls and WhatsApp messages quickly.
      </PageBanner>

      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="text-2xl font-extrabold text-navy">Call or WhatsApp</h2>
            <div className="mt-4 space-y-3">
              {STORE.phones.map((p) => (
                <div key={p.tel} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist p-3 pl-4">
                  <span className="flex items-center gap-2 font-display text-xl font-extrabold text-navy">
                    <Phone size={20} className="text-pink" /> {p.display}
                  </span>
                  <span className="flex gap-2">
                    <a href={`tel:${p.tel}`} className="btn-navy btn-sm">Call</a>
                    <a href={waLink('Hello Kids World Toys!', p.wa)} target="_blank" rel="noreferrer" className="btn-wa btn-sm">
                      <WhatsAppIcon size={16} /> WhatsApp
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-extrabold text-navy">Visit the shop</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-pink" />
                <span>
                  <b className="text-navy">{STORE.name}</b>
                  <br />
                  {STORE.address.full}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 shrink-0 text-pink" />
                <span>
                  <b className="text-navy">Online service</b> — {STORE.onlineHours}
                  <ConfirmTag />
                  <br />
                  <b className="text-navy">Physical shop</b> — {STORE.storeHours}
                  <ConfirmTag />
                </span>
              </li>
            </ul>
            <a href={STORE.mapUrl} target="_blank" rel="noreferrer" className="btn-pink btn-sm mt-5">
              <MapPin size={16} /> Open in Google Maps
            </a>
          </div>

          {/* map placeholder */}
          <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-3xl bg-[#e4edfb] ring-1 ring-mist-line">
            <svg viewBox="0 0 400 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <path d="M-20 150 C 100 120, 180 110, 250 70 S 380 20, 430 10" stroke="#fff" strokeWidth="26" fill="none" />
              <path d="M140 -10 L170 190" stroke="#fff" strokeWidth="14" />
              <path d="M300 -10 L280 190" stroke="#fff" strokeWidth="10" />
            </svg>
            <MapPin size={44} className="relative fill-pink text-white drop-shadow-lg" />
            <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-muted">Map placeholder — pin to be confirmed</span>
          </div>
        </div>

        <div className="card self-start p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-navy">Send us a message</h2>
          {done ? (
            <div className="mt-5 text-center">
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-sun" aria-hidden><MailCheck size={40} /></span>
              <h3 className="mt-2 text-2xl font-extrabold text-navy">Thanks, {form.name.trim().split(' ')[0]}!</h3>
              <p className="mt-2 flex items-start gap-2 rounded-2xl bg-sun-soft p-3 text-left text-sm font-semibold text-navy">
                <Info size={18} className="mt-0.5 shrink-0 text-amber-700" />
                Demo preview: this form doesn’t send anything yet. To reach the shop now, send your message on WhatsApp.
              </p>
              <a href={waLink(waText)} target="_blank" rel="noreferrer" className="btn-wa mt-5 w-full py-4">
                <WhatsAppIcon size={20} /> Send on WhatsApp
              </a>
              <button onClick={() => { setDone(false); setForm({ name: '', contact: '', message: '' }) }} className="mt-3 text-sm font-bold text-royal hover:underline">
                Write another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-5 space-y-5">
              {([
                ['name', 'Your name', 'text', 'e.g. Nimal Perera'],
                ['contact', 'Phone or email', 'text', '07X XXX XXXX or you@example.com'],
              ] as const).map(([key, label, type, ph]) => (
                <div key={key}>
                  <label htmlFor={`c-${key}`} className="mb-1.5 block text-sm font-extrabold text-navy">{label}</label>
                  <input id={`c-${key}`} type={type} className={`field ${errors[key] ? 'field-error' : ''}`} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} aria-invalid={!!errors[key]} />
                  {errors[key] && <p role="alert" className="mt-1.5 text-sm font-bold text-pink">{errors[key]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="c-message" className="mb-1.5 block text-sm font-extrabold text-navy">Message</label>
                <textarea id="c-message" rows={5} className={`field ${errors.message ? 'field-error' : ''}`} placeholder="Tell us what you’re looking for…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} />
                {errors.message && <p role="alert" className="mt-1.5 text-sm font-bold text-pink">{errors.message}</p>}
              </div>
              <p className="text-xs text-muted">
                Privacy: we only use your details to reply to your enquiry. This demo form does not store or send them.
              </p>
              <button type="submit" className="btn-navy w-full py-4">
                <Send size={18} /> Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
