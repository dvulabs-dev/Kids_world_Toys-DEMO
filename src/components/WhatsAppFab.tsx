import { useLocation } from 'react-router-dom'
import { WhatsAppIcon } from './WhatsAppIcon'
import { waLink } from '../data/store'

/** Floating WhatsApp button. Hidden on small screens at checkout so it never covers form controls. */
export function WhatsAppFab() {
  const { pathname } = useLocation()
  const hideOnMobile = true // phones use the bottom action bar instead
  void pathname
  return (
    <a
      href={waLink('Hello Kids World Toys! I have a question.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kids World Toys on WhatsApp"
      className={`group fixed right-4 bottom-4 z-50 items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-lift transition hover:bg-whatsapp-deep sm:right-6 sm:bottom-6 ${
        hideOnMobile ? 'hidden lg:flex' : 'flex'
      } animate-pulse-ring`}
    >
      <WhatsAppIcon size={28} />
      <span className="hidden max-w-0 overflow-hidden font-bold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-2 lg:inline">
        Chat with us
      </span>
    </a>
  )
}
