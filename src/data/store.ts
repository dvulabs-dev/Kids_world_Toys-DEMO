/**
 * Everything the shop owner may want to correct lives here, in one place.
 * Demo details — the shop owner must confirm everything marked 'owner to confirm'.
 */
export const STORE = {
  name: 'Kids World Toys',
  short: 'Kids World Toys',
  town: 'Maharagama',
  tagline: 'Where every child’s smile begins', // demo wording

  phones: [
    { display: '074 295 0405', tel: '+94742950405', wa: '94742950405' }, // call & WhatsApp
  ],

  address: {
    line1: 'Maharagama',
    full: 'Maharagama, Sri Lanka',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Kids+World+Toys+Maharagama',

  onlineHours: 'Order online any time', // owner to confirm
  storeHours: 'Shop opening hours — please call to confirm', // owner to supply

  deliveryNote: 'All-island delivery available', // owner to confirm
  deliveryChargeNote: 'Delivery charges are confirmed by the shop when your order is accepted.',
} as const

export const PRIMARY_PHONE = STORE.phones[0]

/** Open WhatsApp with a ready-made message. */
export function waLink(message: string, number: string = PRIMARY_PHONE.wa) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const JEEP_FROM_PRICE = 23800 // demo price

/** Feature pills shown on the Ride-on Jeep promo (from leaflet). */
export const JEEP_FEATURES = [
  { icon: 'truck', title: 'All-island delivery', sub: 'Available' },
  { icon: 'shield', title: 'Warranty', sub: 'Ask the shop for terms' },
  { icon: 'zap', title: 'Powerful rear motors', sub: 'Climbs & cruises' },
  { icon: 'battery', title: 'Rechargeable battery', sub: 'Plug in & go' },
  { icon: 'lock', title: 'Strong & safe', sub: 'Sturdy build' },
  { icon: 'clock', title: 'Long battery life', sub: 'More play per charge' },
  { icon: 'seat', title: 'Comfortable seat', sub: 'Made for little riders' },
] as const
