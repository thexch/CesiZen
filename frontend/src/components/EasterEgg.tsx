import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import '../css/EasterEgg.css'

type EasterEffect = 'black-hole' | 'drowning' | null

const stars = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  angle: index * 137,
  delay: (index % 12) * 0.035,
  distance: 160 + (index % 8) * 42,
  size: 2 + (index % 4),
}))

const bubbles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: 4 + (index * 19) % 92,
  size: 8 + (index % 5) * 7,
  delay: (index % 10) * 0.18,
  duration: 2.8 + (index % 6) * 0.35,
}))

function getStarPosition(angle: number, distance: number) {
  const radians = (angle * Math.PI) / 180

  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  }
}

function EasterEgg() {
  const [activeEffect, setActiveEffect] = useState<EasterEffect>(null)

  useEffect(() => {
    if (!activeEffect) {
      return
    }

    const className = activeEffect === 'black-hole' ? 'black-hole-active' : 'drowning-active'
    document.body.classList.add(className)

    return () => {
      document.body.classList.remove(className)
    }
  }, [activeEffect])

  function closeEffect() {
    setActiveEffect(null)
  }

  return (
    <div className="easter-actions">
      <button
        type="button"
        className="easter-button black-hole-button"
        aria-label="Activer le trou noir secret"
        onClick={() => setActiveEffect('black-hole')}
      >
        <span className="easter-button-core"></span>
      </button>

      <button
        type="button"
        className="easter-button drowning-button"
        aria-label="Noyer l'application"
        onClick={() => setActiveEffect('drowning')}
      >
        <span className="drowning-button-drop"></span>
      </button>

      {createPortal(
        <AnimatePresence>
          {activeEffect === 'black-hole' && (
            <motion.div
              className="black-hole-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEffect}
            >
              <motion.div
                className="black-hole-vortex"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.15, 1], rotate: 720 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 2.6, ease: 'easeInOut' }}
              />

              <motion.div
                className="black-hole-core"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                exit={{ scale: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {stars.map((star) => {
                const position = getStarPosition(star.angle, star.distance)

                return (
                  <motion.span
                    className="black-hole-star"
                    key={star.id}
                    style={{ width: star.size, height: star.size }}
                    initial={{
                      x: position.x,
                      y: position.y,
                      scale: 1,
                      opacity: 0,
                    }}
                    animate={{
                      x: [position.x, position.x * 0.45, 0],
                      y: [position.y, position.y * 0.45, 0],
                      scale: [1, 1.8, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 260, 720],
                    }}
                    transition={{
                      duration: 1.9,
                      delay: star.delay,
                      repeat: Infinity,
                      repeatDelay: 0.2,
                      ease: 'easeIn',
                    }}
                  />
                )
              })}

              <motion.p
                className="black-hole-text"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 }}
              >
                Tout a disparu... mais pas vraiment. Cliquez pour fermer le trou noir.
              </motion.p>
            </motion.div>
          )}

          {activeEffect === 'drowning' && (
            <motion.div
              className="drowning-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEffect}
            >
              <motion.div
                className="drowning-water"
                initial={{ y: '100%' }}
                animate={{ y: ['100%', '34%', '0%'] }}
                exit={{ y: '100%' }}
                transition={{ duration: 3.2, ease: 'easeInOut' }}
              />

              <motion.div
                className="drowning-wave drowning-wave-one"
                initial={{ y: '100%' }}
                animate={{ y: ['100%', '28%', '-6%'], x: ['-8%', '7%', '-4%'] }}
                exit={{ y: '100%' }}
                transition={{ duration: 3.4, ease: 'easeInOut' }}
              />

              <motion.div
                className="drowning-wave drowning-wave-two"
                initial={{ y: '105%' }}
                animate={{ y: ['105%', '36%', '6%'], x: ['8%', '-6%', '4%'] }}
                exit={{ y: '105%' }}
                transition={{ duration: 3.8, ease: 'easeInOut' }}
              />

              {bubbles.map((bubble) => (
                <motion.span
                  className="drowning-bubble"
                  key={bubble.id}
                  style={{ left: `${bubble.left}%`, width: bubble.size, height: bubble.size }}
                  initial={{ y: '110vh', opacity: 0, scale: 0.4 }}
                  animate={{ y: '-12vh', opacity: [0, 0.9, 0], scale: [0.4, 1, 0.65] }}
                  transition={{
                    duration: bubble.duration,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}

              <motion.p
                className="drowning-text"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.35 }}
              >
                L'application prend l'eau. Cliquez pour remonter à la surface.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export default EasterEgg
