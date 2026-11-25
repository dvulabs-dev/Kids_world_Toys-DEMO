export type PageId =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'about'
  | 'contact'
  | 'help'

export type ShopFilter = {
  category?: string
  age?: string
  query?: string
  offers?: boolean
}

export type NavigateFn = (page: PageId, opts?: ShopFilter & { productId?: string }) => void

export type CartLine = { id: string; qty: number }

export type Product = {
  id: string
  name: string
  category: string
  age: string
  ageLabel: string
  price: number
  salePrice?: number
  badge?: 'New' | 'Best Seller' | 'Gift Pick' | 'Sale'
  blurb: string
  description: string
  image: string
  stock: 'In stock' | 'Few left' | 'Ask the shop'
  addedOrder: number
}

const IMG = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/fde03fbd-6975-464b-b726-b7a284785d94.jpg',
  blocks: 'https://cdn.magicpatterns.com/patterns/generated-images/306a23b7-d2fb-48a0-bf6b-7e3a07f5c22d.jpg',
  teddy: 'https://cdn.magicpatterns.com/patterns/generated-images/912aee0b-f3d0-4592-bcca-033e04cb2407.jpg',
  rcCar: 'https://cdn.magicpatterns.com/patterns/generated-images/c23fb0d7-cfdf-47fe-bfcf-203d908c88ec.jpg',
  rattles: 'https://cdn.magicpatterns.com/patterns/generated-images/d3a1b831-debc-4a3a-ac3c-02fdd482230e.jpg',
  rideOn: 'https://cdn.magicpatterns.com/patterns/generated-images/9f6b1063-6986-4dad-a44b-71900a0aa023.jpg',
  puzzle: 'https://cdn.magicpatterns.com/patterns/generated-images/44c0df1a-2357-447e-855f-8a1eae0482a5.jpg',
  feeding: 'https://cdn.magicpatterns.com/patterns/generated-images/78f50861-986c-42db-bf60-16f74a35cf13.jpg',
  doll: 'https://cdn.magicpatterns.com/patterns/generated-images/fac780ee-fec7-44bd-ab32-9ac2153287c9.jpg',
  xylophone: 'https://cdn.magicpatterns.com/patterns/generated-images/d81d7803-c6be-42b9-b2d0-5aeab51d6b0a.jpg',
  truck: 'https://cdn.magicpatterns.com/patterns/generated-images/9b88fedc-72b7-4175-8289-9d131782fdf4.jpg',
  stem: 'https://cdn.magicpatterns.com/patterns/generated-images/258b85f7-d589-4685-bcf6-be70fc214ed6.jpg',
  boardGame: 'https://cdn.magicpatterns.com/patterns/generated-images/a3a26ab9-426d-4b8d-aed1-e99a19b66baf.jpg',
  giftSet: 'https://cdn.magicpatterns.com/patterns/generated-images/445b4ae7-f650-4f26-ada0-06032d3e7304.jpg',
  outdoor: 'https://cdn.magicpatterns.com/patterns/generated-images/a0543d90-e645-49ea-968e-a2849c1829cc.jpg',
}

export const HERO_IMAGE = IMG.hero

export const STORE = {
  name: 'Asanka Toys',
  town: 'Kurunegala',
  phone: '077 883 9780',
  whatsapp: '077 883 9780',
  address: 'Main Street, Kurunegala, Sri Lanka',
  storeHours: 'Mon – Sat · 9.00 am – 8.00 pm',
  onlineHours: 'Orders taken online anytime · replies 9.00 am – 8.00 pm',
}

export const CATEGORIES = [
  { id: 'toys', name: 'Toys', image: IMG.blocks },
  { id: 'baby', name: 'Baby Care', image: IMG.feeding },
  { id: 'educational', name: 'Educational', image: IMG.stem },
  { id: 'ride-ons', name: 'Ride-ons', image: IMG.rideOn },
  { id: 'dolls', name: 'Dolls & Soft Toys', image: IMG.teddy },
  { id: 'vehicles', name: 'Vehicles', image: IMG.rcCar },
  { id: 'games', name: 'Games & Puzzles', image: IMG.puzzle },
  { id: 'gifts', name: 'Gifts', image: IMG.giftSet },
]

export const AGES = [
  { id: '0-12m', label: '0–12 months' },
  { id: '1-3', label: '1–3 years' },
  { id: '3-5', label: '3–5 years' },
  { id: '6-8', label: '6–8 years' },
  { id: '9+', label: '9+ years' },
]

export function categoryName(id?: string) {
  return CATEGORIES.find((c) => c.id === id)?.name ?? 'All products'
}

export function ageLabel(id?: string) {
  return AGES.find((a) => a.id === id)?.label ?? ''
}

export function rs(n: number) {
  return 'Rs. ' + n.toLocaleString('en-US')
}

export function priceOf(p: Product) {
  return p.salePrice ?? p.price
}

export function findProduct(id?: string) {
  return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]
}

export function cartCount(cart: CartLine[]) {
  return cart.reduce((n, l) => n + l.qty, 0)
}

export function cartSubtotal(cart: CartLine[]) {
  return cart.reduce((n, l) => n + priceOf(findProduct(l.id)) * l.qty, 0)
}

export const PRODUCTS: Product[] = [
  { id: 'blocks', name: 'Mini Building Blocks Set', category: 'toys', age: '3-5', ageLabel: '3+ years', price: 1850, badge: 'Best Seller', blurb: 'A fun creative set for little builders', description: '120 chunky bricks in bright colours, with windows, a door and a base plate. Builds houses, towers and anything a small imagination invents. Pieces store back in the tub.', image: IMG.blocks, stock: 'In stock', addedOrder: 3 },
  { id: 'teddy', name: 'Cuddle Teddy with Bow', category: 'dolls', age: '0-12m', ageLabel: 'All ages', price: 2400, salePrice: 1990, badge: 'Sale', blurb: 'Extra-soft plush friend for naps and hugs', description: 'A 35 cm plush bear with a satin ribbon. Stitched eyes, no small parts, and soft enough for the youngest hands. Surface washable.', image: IMG.teddy, stock: 'In stock', addedOrder: 8 },
  { id: 'rc-car', name: 'Off-Road RC Monster Car', category: 'vehicles', age: '6-8', ageLabel: '6+ years', price: 6950, badge: 'Best Seller', blurb: 'Big tyres, real suspension, 2.4 GHz remote', description: 'A rugged remote-control car that climbs over grass and gravel. Rechargeable battery pack and USB cable included; remote takes 2 × AA batteries.', image: IMG.rcCar, stock: 'Few left', addedOrder: 5 },
  { id: 'rattles', name: 'Wooden Rattle & Teether Set', category: 'baby', age: '0-12m', ageLabel: '0+ months', price: 2250, badge: 'New', blurb: 'Gentle shapes for teething little ones', description: 'Three beech-wood rattles with soft silicone bunny, star and cloud shapes, plus a textured teether ring. Food-grade silicone, no paint on the wood.', image: IMG.rattles, stock: 'In stock', addedOrder: 15 },
  { id: 'balance-bike', name: 'First Balance Bike', category: 'ride-ons', age: '1-3', ageLabel: '2–4 years', price: 9800, salePrice: 8900, badge: 'Sale', blurb: 'Learn to balance before learning to pedal', description: 'Light steel frame with puncture-free wheels and an adjustable seat. Helps toddlers build balance and confidence for their first bicycle.', image: IMG.rideOn, stock: 'Ask the shop', addedOrder: 6 },
  { id: 'farm-puzzle', name: 'Farm Animals Wooden Puzzle', category: 'games', age: '1-3', ageLabel: '18+ months', price: 1450, blurb: 'Chunky pieces that are easy to lift', description: 'Eight thick wooden animal pieces that lift out of a bright farm scene. Builds hand-eye coordination and early words.', image: IMG.puzzle, stock: 'In stock', addedOrder: 11 },
  { id: 'feeding-set', name: 'Baby Feeding Starter Set', category: 'baby', age: '0-12m', ageLabel: '0+ months', price: 3600, badge: 'Gift Pick', blurb: 'Two bottles, suction bowl and soft spoon', description: 'Everything for the first months of feeding: two anti-colic bottles, a suction silicone bowl and a soft-tip spoon. BPA-free.', image: IMG.feeding, stock: 'In stock', addedOrder: 13 },
  { id: 'rag-doll', name: 'Rosie Rag Doll', category: 'dolls', age: '3-5', ageLabel: '3+ years', price: 2950, blurb: 'Hand-finished doll with curly yarn hair', description: 'A 40 cm fabric doll in a floral dress, white shoes and striped socks. Soft body, gentle for pretend play and bedtime.', image: IMG.doll, stock: 'In stock', addedOrder: 9 },
  { id: 'xylophone', name: 'Rainbow Wooden Xylophone', category: 'educational', age: '1-3', ageLabel: '18+ months', price: 2100, badge: 'New', blurb: 'Eight bright notes and two mallets', description: 'A tuned eight-note xylophone with colour-coded keys. Encourages rhythm, colour recognition and early music play.', image: IMG.xylophone, stock: 'In stock', addedOrder: 14 },
  { id: 'dump-truck', name: 'Big Yellow Dump Truck', category: 'vehicles', age: '1-3', ageLabel: '2+ years', price: 1650, blurb: 'Tipping bed for sand, blocks and toys', description: 'A sturdy push-along truck with a tipping bed. Durable plastic for indoor and sandpit play.', image: IMG.truck, stock: 'In stock', addedOrder: 4 },
  { id: 'stem-kit', name: 'Junior Science Lab Kit', category: 'educational', age: '6-8', ageLabel: '6+ years', price: 4500, badge: 'New', blurb: 'Gears, test tubes and a solar robot', description: 'A beginner STEM kit with a magnifier, four test tubes, interlocking gears and a small solar-powered robot to assemble. Adult supervision recommended.', image: IMG.stem, stock: 'Few left', addedOrder: 16 },
  { id: 'board-game', name: 'Adventure Trail Board Game', category: 'games', age: '6-8', ageLabel: '5+ years', price: 1900, blurb: 'Roll, race and reach the castle', description: 'A colourful race-to-the-finish game for 2–4 players. Teaches counting and taking turns. Includes board, dice and four pawns.', image: IMG.boardGame, stock: 'In stock', addedOrder: 7 },
  { id: 'gift-box', name: 'Little Bunny Gift Box', category: 'gifts', age: '1-3', ageLabel: '2+ years', price: 3200, salePrice: 2490, badge: 'Gift Pick', blurb: 'Plush bunny, crayons and a wooden car', description: 'A ready-to-give box with a plush bunny, eight chunky crayons and a wooden push car, wrapped with a satin ribbon.', image: IMG.giftSet, stock: 'In stock', addedOrder: 12 },
  { id: 'outdoor-set', name: 'Beach & Bubbles Play Set', category: 'toys', age: '3-5', ageLabel: '3+ years', price: 1350, blurb: 'Bucket, spade, bubble wand and ball', description: 'An outdoor starter set: sand bucket, spade, bubble wand and an inflatable ball. Perfect for garden and beach days.', image: IMG.outdoor, stock: 'In stock', addedOrder: 10 },
  { id: 'mega-blocks', name: 'Mega Builder Bucket (250 pcs)', category: 'toys', age: '6-8', ageLabel: '6+ years', price: 4200, blurb: 'More bricks for bigger builds', description: 'A 250-piece bucket of classic bricks with special shapes. Compatible with the Mini Building Blocks Set.', image: IMG.blocks, stock: 'Ask the shop', addedOrder: 2 },
  { id: 'rc-car-junior', name: 'Explorer RC Car — Junior', category: 'vehicles', age: '9+', ageLabel: '8+ years', price: 8400, blurb: 'Faster model with spare tyres', description: 'A higher-speed remote-control car for older kids, with spare tyres and a two-battery pack for longer play.', image: IMG.rcCar, stock: 'Ask the shop', addedOrder: 1 },
]
