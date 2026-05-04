import { motion } from 'framer-motion'
import '../css/ZenFlow.css'

function ZenFlow() {
  const paths = [
    'M -80 160 C 160 20, 260 300, 520 140 S 900 120, 1180 260 S 1500 240, 1680 120',
    'M -100 310 C 170 180, 330 430, 600 270 S 980 230, 1240 390 S 1480 360, 1700 250',
    'M -60 470 C 200 350, 390 560, 690 430 S 1030 390, 1300 520 S 1540 520, 1710 420',
  ]

  return (
    <div className="zen-flow" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {paths.map((path, index) => (
          <motion.path
            d={path}
            key={path}
            fill="none"
            stroke={index === 1 ? 'var(--color-yellow)' : 'var(--color-primary)'}
            strokeLinecap="round"
            strokeWidth={index === 1 ? 3 : 2}
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{
              pathLength: [0.15, 0.9, 0.15],
              pathOffset: [0, 0.35, 0.7],
            }}
            transition={{
              duration: 9 + index * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.8,
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

export default ZenFlow

/*
  Résumé du fichier :
  - Sert à afficher le fond animé zen du site.
  - Fonctionne avec des formes SVG animées par Framer Motion.
*/
