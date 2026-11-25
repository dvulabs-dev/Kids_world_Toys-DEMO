import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, SearchX, SlidersHorizontal, Tag, X } from 'lucide-react'
import { AppIcon } from '../components/AppIcon'
import { ProductCard } from '../components/ProductCard'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AGES, CATEGORIES, ageLabel, categoryName } from '../data/categories'
import { PRODUCTS } from '../data/products'
import { waLink } from '../data/store'
import { priceOf } from '../lib/format'
import type { Product } from '../types'

const PRICE_RANGES = [
  { id: 'u2500', label: 'Under Rs. 2,500', test: (n: number) => n < 2500 },
  { id: '2500-5000', label: 'Rs. 2,500 – 5,000', test: (n: number) => n >= 2500 && n < 5000 },
  { id: '5000-10000', label: 'Rs. 5,000 – 10,000', test: (n: number) => n >= 5000 && n < 10000 },
  { id: '10000+', label: 'Rs. 10,000 and above', test: (n: number) => n >= 10000 },
]

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest first' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
]

function applySort(list: Product[], sort: string) {
  const out = [...list]
  if (sort === 'newest') out.sort((a, b) => b.added - a.added)
  else if (sort === 'price-asc') out.sort((a, b) => priceOf(a) - priceOf(b))
  else if (sort === 'price-desc') out.sort((a, b) => priceOf(b) - priceOf(a))
  return out
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const age = params.get('age') ?? ''
  const price = params.get('price') ?? ''
  const offers = params.get('offers') === '1'
  const available = params.get('avail') === '1'
  const sort = params.get('sort') ?? 'featured'

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const toggle = (key: string, value: string) => set(key, params.get(key) === value ? null : value)
  const clearAll = () => setParams({}, { replace: true })

  const results = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
    const range = PRICE_RANGES.find((r) => r.id === price)
    const filtered = PRODUCTS.filter((p) => {
      if (category && p.category !== category) return false
      if (age && p.age !== age) return false
      if (offers && !p.salePrice) return false
      if (available && p.stock === 'Ask the shop') return false
      if (range && !range.test(priceOf(p))) return false
      if (tokens.length) {
        const hay = `${p.name} ${categoryName(p.category)} ${p.blurb} ${p.description} ${p.badge ?? ''}`.toLowerCase()
        if (!tokens.every((t) => hay.includes(t))) return false
      }
      return true
    })
    return applySort(filtered, sort)
  }, [q, category, age, price, offers, available, sort])

  const active: { key: string; label: string }[] = [
    q && { key: 'q', label: `“${q}”` },
    category && { key: 'category', label: categoryName(category) },
    age && { key: 'age', label: `Age ${ageLabel(age)}` },
    price && { key: 'price', label: PRICE_RANGES.find((r) => r.id === price)?.label ?? price },
    offers && { key: 'offers', label: 'On offer' },
    available && { key: 'avail', label: 'Available now' },
  ].filter(Boolean) as { key: string; label: string }[]

  const title = offers ? 'Offers & deals' : q ? 'Search results' : category ? categoryName(category) : 'All products'

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Category">
        <Chip active={!category} onClick={() => set('category', null)}>All</Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={category === c.id} onClick={() => toggle('category', c.id)}>
            <AppIcon name={c.icon} size={16} /> {c.name}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Age">
        {AGES.map((a) => (
          <Chip key={a.id} active={age === a.id} onClick={() => toggle('age', a.id)}>
            {a.label}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        {PRICE_RANGES.map((r) => (
          <Chip key={r.id} active={price === r.id} onClick={() => toggle('price', r.id)}>
            {r.label}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="More">
        <Chip active={offers} onClick={() => set('offers', offers ? null : '1')}><Tag size={14} /> On offer</Chip>
        <Chip active={available} onClick={() => set('avail', available ? null : '1')}><CheckCircle2 size={14} /> Available now</Chip>
      </FilterGroup>
    </div>
  )

  return (
    <>
      {/* Page banner */}
      <section className="relative overflow-hidden bg-mist">
        <div className="dotted-bg absolute inset-0" />
        <div className="container-x relative py-10 sm:py-12">
          <nav className="text-sm font-bold text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-royal">Home</Link> <span aria-hidden>›</span>{' '}
            <span className="text-navy">Shop</span>
          </nav>
          <h1 className="mt-2 text-4xl font-extrabold text-navy sm:text-5xl">{title}</h1>
          <p className="mt-1 text-muted">Sample products and prices for the demo — final catalogue to be confirmed with the shop.</p>
        </div>
      </section>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[17rem_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="card sticky top-36 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-navy">Filters</h2>
              {active.length > 0 && (
                <button onClick={clearAll} className="text-sm font-bold text-pink hover:underline">Clear all</button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button onClick={() => setFiltersOpen(true)} className="btn-outline btn-sm lg:hidden">
              <SlidersHorizontal size={16} /> Filters{active.length > 0 && ` (${active.length})`}
            </button>
            <p className="font-bold text-navy" aria-live="polite">
              {results.length} product{results.length === 1 ? '' : 's'}
            </p>
            <label className="ml-auto flex items-center gap-2 text-sm font-bold text-muted">
              Sort by
              <select
                value={sort}
                onChange={(e) => set('sort', e.target.value === 'featured' ? null : e.target.value)}
                className="rounded-full border-2 border-mist-line bg-white py-2 pr-8 pl-4 font-bold text-navy focus:border-royal focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {active.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {active.map((a) => (
                <button
                  key={a.key}
                  onClick={() => set(a.key, null)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-sm font-bold text-white hover:bg-royal"
                  aria-label={`Remove filter ${a.label}`}
                >
                  {a.label} <X size={14} />
                </button>
              ))}
              <button onClick={clearAll} className="px-2 text-sm font-bold text-pink hover:underline">Clear all</button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center px-6 py-14 text-center">
              <SearchX size={56} className="text-pink" aria-hidden />
              <h2 className="mt-3 text-2xl font-extrabold text-navy">No toys found</h2>
              <p className="mt-1 max-w-md text-muted">
                Try removing a filter or searching for something else. Can’t find it? Ask us — we may have it in the shop.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button onClick={clearAll} className="btn-navy btn-sm">Clear filters</button>
                <a
                  href={waLink(`Hello Kids World Toys! I'm looking for: ${q || categoryName(category)}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa btn-sm"
                >
                  <WhatsAppIcon size={16} /> Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button className="absolute inset-0 bg-navy-deep/60" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-[2rem] bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-mist-line px-5 py-4">
              <h2 className="text-xl font-extrabold text-navy">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full bg-mist">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5">{filters}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-mist-line p-4">
              <button onClick={clearAll} className="btn-outline">Clear all</button>
              <button onClick={() => setFiltersOpen(false)} className="btn-navy">Show {results.length}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-extrabold tracking-wide text-pink uppercase">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`chip ${active ? 'chip-active' : ''}`}>
      {children}
    </button>
  )
}
