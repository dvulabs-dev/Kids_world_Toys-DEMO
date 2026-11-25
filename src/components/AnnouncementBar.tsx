import { PRIMARY_PHONE, STORE } from '../data/store'

const MESSAGES = [
  'Toys, soft toys, RC cars & ride-ons',
  `Call / WhatsApp ${PRIMARY_PHONE.display}`,
  `Visit us in ${STORE.town}`,
  'Gifts for every birthday',
  'All-island delivery — ask the shop',
]

const DOT = ['bg-pink', 'bg-sky', 'bg-lime', 'bg-orange', 'bg-royal']

export function AnnouncementBar() {
  const row = [...MESSAGES, ...MESSAGES]
  return (
    <div className="relative z-50 flex items-center border-b-2 border-ink bg-sun text-sm font-bold text-ink">
      <span className="z-10 hidden shrink-0 border-r-2 border-ink bg-ink px-3 py-2 text-[11px] font-extrabold tracking-widest text-sun uppercase sm:block">
        Demo preview
      </span>
      <div className="relative flex-1 overflow-hidden py-2" aria-label="Store announcements">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pr-10 hover:[animation-play-state:paused]">
          {row.map((m, i) => (
            <span key={i} aria-hidden={i >= MESSAGES.length} className="inline-flex items-center gap-10">
              {m}
              <span className={`h-2.5 w-2.5 rotate-45 border-2 border-ink ${DOT[i % DOT.length]}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
