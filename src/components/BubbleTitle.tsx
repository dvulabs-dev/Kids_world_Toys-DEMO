import { motion } from 'framer-motion'

/** Letter colours copied from the shop's sign: KIDS / WORLD / TOYS */
const WORDS: { text: string; colors: string[] }[] = [
  { text: 'KIDS', colors: ['#e8202f', '#ffd21f', '#1ba4e6', '#2bb24a'] },
  { text: 'WORLD', colors: ['#e6168c', '#3b34b5', '#e8202f', '#f7851e', '#2bb24a'] },
  { text: 'TOYS', colors: ['#e8202f', '#1ba4e6', '#9fd62f', '#f7851e'] },
]

/**
 * Glossy bubble lettering, like the shop sign.
 * Motion: letters drop in with a springy overshoot (follow-through), staggered 40ms
 * so the whole entrance stays under ~0.9s; hover = a small jump; press = squash.
 */
export function BubbleTitle({ className = '', animate = true }: { className?: string; animate?: boolean }) {
  let i = 0
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-[0.35em] ${className}`} role="img" aria-label="Kids World Toys">
      {WORDS.map((w) => (
        <span key={w.text} className="inline-flex" aria-hidden>
          {w.text.split('').map((ch, k) => {
            const idx = i++
            const tilt = ((idx * 7) % 9) - 4 // -4..4deg, deterministic
            return (
              <motion.span
                key={k}
                className="bubble-letter"
                style={{ ['--c' as string]: w.colors[k] }}
                initial={animate ? { y: '-1.4em', opacity: 0, rotate: -14, scaleY: 1.25 } : false}
                animate={{ y: 0, opacity: 1, rotate: tilt, scaleY: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 13, delay: 0.1 + idx * 0.04 }}
                whileHover={{ y: '-0.12em', rotate: tilt + (idx % 2 ? 7 : -7), scale: 1.1, transition: { type: 'spring', stiffness: 500, damping: 16 } }}
                whileTap={{ scaleY: 0.82, scaleX: 1.1, transition: { duration: 0.08 } }}
              >
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
