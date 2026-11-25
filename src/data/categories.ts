import type { AgeId, CategoryId } from '../types'
import type { IconName } from '../components/AppIcon'

export interface Category {
  id: CategoryId
  name: string
  blurb: string
  image: string
  icon: IconName
  tint: string
}

export const CATEGORIES: Category[] = [
  { id: 'toys', name: 'Toys', blurb: 'Blocks, sets & play', image: '/images/blocks.jpg', icon: 'toys', tint: 'bg-sun-soft' },
  { id: 'dolls', name: 'Soft Toys & Dolls', blurb: 'Cuddly companions', image: '/images/teddy.jpg', icon: 'dolls', tint: 'bg-pink-soft' },
  { id: 'vehicles', name: 'Vehicles', blurb: 'Cars, trucks & RC', image: '/images/rc-car.jpg', icon: 'vehicles', tint: 'bg-mist' },
  { id: 'ride-ons', name: 'Ride-ons', blurb: 'Jeeps, bikes & trikes', image: '/images/ride-on.jpg', icon: 'ride-ons', tint: 'bg-sun-soft' },
  { id: 'games', name: 'Games & Puzzles', blurb: 'Fun for the family', image: '/images/puzzle.jpg', icon: 'games', tint: 'bg-sun-soft' },
  { id: 'educational', name: 'Educational', blurb: 'Learn through play', image: '/images/stem.jpg', icon: 'educational', tint: 'bg-mist' },
  { id: 'gifts', name: 'Gifts', blurb: 'Ready to give', image: '/images/gift-set.jpg', icon: 'gifts', tint: 'bg-pink-soft' },
  { id: 'baby', name: 'Baby Care', blurb: 'Feeding & first toys', image: '/images/feeding.jpg', icon: 'baby', tint: 'bg-pink-soft' },
]

export interface AgeGroup {
  id: AgeId
  label: string
  icon: IconName
  short: string
}

export const AGES: AgeGroup[] = [
  { id: '0-12m', label: '0–12 months', short: 'Babies', icon: 'baby' },
  { id: '1-3', label: '1–3 years', short: 'Toddlers', icon: 'smile' },
  { id: '3-5', label: '3–5 years', short: 'Preschool', icon: 'shapes' },
  { id: '6-8', label: '6–8 years', short: 'Explorers', icon: 'rocket' },
  { id: '9+', label: '9+ years', short: 'Big kids', icon: 'gamepad' },
]

export const categoryName = (id?: string | null) =>
  CATEGORIES.find((c) => c.id === id)?.name ?? 'All products'

export const ageLabel = (id?: string | null) => AGES.find((a) => a.id === id)?.label ?? ''
