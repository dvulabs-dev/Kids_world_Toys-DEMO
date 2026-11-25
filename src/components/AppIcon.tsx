import {
  Baby, Blocks, CarFront, FlaskConical, Gamepad2, Gift, PawPrint, Puzzle, Rocket, Shapes, Smile, Truck,
  type LucideIcon,
} from 'lucide-react'

const ICONS = {
  toys: Blocks,
  dolls: PawPrint,
  vehicles: Truck,
  'ride-ons': CarFront,
  games: Puzzle,
  educational: FlaskConical,
  gifts: Gift,
  baby: Baby,
  smile: Smile,
  shapes: Shapes,
  rocket: Rocket,
  gamepad: Gamepad2,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

export function AppIcon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const Icon = ICONS[name]
  return <Icon size={size} className={className} aria-hidden />
}
