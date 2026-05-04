import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import '../css/CustomCursor.css'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isClickable, setIsClickable] = useState(false)

  useEffect(() => {
    function moveCursor(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    function checkTarget(event: MouseEvent) {
      const target = event.target as HTMLElement
      setIsClickable(Boolean(target.closest('a, button, [role="button"]')))
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', checkTarget)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', checkTarget)
    }
  }, [])

  return (
    <div className="custom-cursor">
      <motion.div
        className="custom-cursor-halo"
        animate={{
          x: position.x - 22,
          y: position.y - 22,
          scale: isClickable ? 1.45 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />

      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClickable ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </div>
  )
}

export default CustomCursor

/*
  Résumé du fichier :
  - Sert à remplacer le curseur classique par un curseur animé personnalisé.
  - Fonctionne en suivant la position de la souris et en détectant les éléments cliquables.
*/
