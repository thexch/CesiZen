import { AnimatePresence, motion } from 'framer-motion'
import { type FormEvent, useEffect, useState } from 'react'
import ZenFlow from '../components/ZenFlow'
import '../css/Respiration.css'
import { customRhythm, getSteps, rhythms, type Rhythm } from '../utils/respiration'

function Respiration() {
  const [selectedRhythm, setSelectedRhythm] = useState(rhythms[0])
  const [isRunning, setIsRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(rhythms[0].inhale)

  const steps = getSteps(selectedRhythm)
  const currentStep = steps[stepIndex]
  const bubbleScale = getBubbleScale()

  function getBubbleScale() {
    if (!isRunning) {
      return 0.86
    }

    if (currentStep.className === 'is-exhaling') {
      return 0.76
    }

    return 1.12
  }

  function resetExercise(rhythm: Rhythm) {
    setIsRunning(false)
    setStepIndex(0)
    setSecondsLeft(rhythm.inhale)
  }

  function selectRhythm(rhythm: Rhythm) {
    setSelectedRhythm(rhythm)
    resetExercise(rhythm)
  }

  function applyCustomRhythm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const inhale = Number(formData.get('inhale'))
    const hold = Number(formData.get('hold'))
    const exhale = Number(formData.get('exhale'))

    selectRhythm({
      id: 'custom',
      name: 'Rythme personnalisé',
      description: `Inspiration ${inhale} s / Apnée ${hold} s / Expiration ${exhale} s`,
      inhale,
      hold,
      exhale,
    })
  }

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timer = window.setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1)
        return
      }

      const nextStepIndex = (stepIndex + 1) % getSteps(selectedRhythm).length
      setStepIndex(nextStepIndex)
      setSecondsLeft(getSteps(selectedRhythm)[nextStepIndex].duration)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isRunning, secondsLeft, selectedRhythm, stepIndex])

  return (
    <main className="breathing-page">
      <ZenFlow />

      <motion.div
        className="breathing-background-halo"
        aria-hidden="true"
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.section
        className="breathing-header"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="breathing-label">Exercice</p>
        <h1>Respiration guidée</h1>
        <p>
          Laissez la bulle guider votre rythme : elle s'ouvre à l'inspiration
          et se referme doucement à l'expiration.
        </p>
      </motion.section>

      <motion.section
        className="breathing-exercise floating-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 0.45, delay: 0.1 },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="rhythm-selector" aria-label="Choix du rythme">
          {[...rhythms, customRhythm].map((rhythm) => (
            <motion.button
              type="button"
              className={rhythm.id === selectedRhythm.id ? 'is-selected' : ''}
              onClick={() => selectRhythm(rhythm)}
              key={rhythm.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{rhythm.name}</span>
              <small>{rhythm.description}</small>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedRhythm.id === 'custom' && (
            <motion.form
              className="custom-rhythm"
              onSubmit={applyCustomRhythm}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label>
                Inspiration
                <input type="number" name="inhale" min="1" defaultValue="4" />
              </label>
              <label>
                Apnée
                <input type="number" name="hold" min="0" defaultValue="0" />
              </label>
              <label>
                Expiration
                <input type="number" name="exhale" min="1" defaultValue="6" />
              </label>
              <button type="submit">Appliquer</button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className={`breathing-orbit ${currentStep.className}`}>
          {[0, 1, 2].map((wave) => (
            <motion.div
              className="breathing-ring"
              key={wave}
              animate={{
                scale: isRunning ? [0.88, 1.28, 0.88] : [0.92, 1.02, 0.92],
                opacity: isRunning ? [0.08, 0.34, 0.08] : [0.06, 0.16, 0.06],
                rotate: [0, 14, 0],
              }}
              transition={{
                duration: currentStep.duration + 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: wave * 0.35,
              }}
            />
          ))}

          <motion.div
            className="breathing-bubble"
            animate={{ scale: bubbleScale }}
            transition={{ duration: isRunning ? currentStep.duration : 0.5, ease: 'easeInOut' }}
          >
            <motion.span
              key={currentStep.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentStep.label}
            </motion.span>
            <strong>{secondsLeft}</strong>
          </motion.div>
        </div>

        <div className="breathing-status">
          <motion.h2
            key={currentStep.instruction + isRunning}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isRunning ? currentStep.instruction : 'Prêt à commencer ?'}
          </motion.h2>
          <p>
            {selectedRhythm.name} - {secondsLeft} secondes
          </p>
        </div>

        <div className="breathing-actions">
          <motion.button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRunning ? 'Mettre en pause' : 'Démarrer'}
          </motion.button>
          <motion.button
            type="button"
            className="secondary-button"
            onClick={() => resetExercise(selectedRhythm)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Réinitialiser
          </motion.button>
        </div>
      </motion.section>
    </main>
  )
}

export default Respiration
