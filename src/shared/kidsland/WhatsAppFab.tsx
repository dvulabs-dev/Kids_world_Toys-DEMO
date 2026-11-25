import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Floating WhatsApp button. Hidden on screens with their own checkout controls. */
export function WhatsAppFab() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="fixed bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors duration-150 hover:bg-[#178d47] sm:hidden"
      aria-label="Order on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Order on WhatsApp
    </a>
  )
}
