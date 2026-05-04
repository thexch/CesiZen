import { type FormEvent, useEffect, useState } from 'react'
import '../css/Respiration.css'
import { customRhythm, getSteps, rhythms, type Rhythm } from '../utils/respiration'

function Respiration() {
  const [selectedRhythm, setSelectedRhythm] = useState(rhythms[0])
  const [isRunning, setIsRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(rhythms[0].inhale)

  const steps = getSteps(selectedRhythm)
  const currentStep = steps[stepIndex]

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
      <section className="breathing-header">
        <p className="breathing-label">Exercice</p>
        <h1>Respiration guidée</h1>
        <p>
          Choisissez un rythme, lancez l'exercice, puis suivez simplement les
          indications affichées à l'écran.
        </p>
      </section>

      <section className="breathing-exercise">
        <div className="rhythm-selector" aria-label="Choix du rythme">
          {[...rhythms, customRhythm].map((rhythm) => (
            <button
              type="button"
              className={rhythm.id === selectedRhythm.id ? 'is-selected' : ''}
              onClick={() => selectRhythm(rhythm)}
              key={rhythm.id}
            >
              <span>{rhythm.name}</span>
              <small>{rhythm.description}</small>
            </button>
          ))}
        </div>

        {selectedRhythm.id === 'custom' && (
          <form className="custom-rhythm" onSubmit={applyCustomRhythm}>
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
          </form>
        )}

        <div
          className={`breathing-animation ${isRunning ? currentStep.className : ''}`}
          style={{ transitionDuration: `${currentStep.duration}s` }}
        >
          <span>{currentStep.label}</span>
        </div>

        <div className="breathing-status">
          <h2>{isRunning ? currentStep.instruction : 'Prêt à commencer ?'}</h2>
          <p>
            {selectedRhythm.name} - {secondsLeft} secondes
          </p>
        </div>

        <div className="breathing-actions">
          <button type="button" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Mettre en pause' : 'Démarrer'}
          </button>
          <button type="button" className="secondary-button" onClick={() => resetExercise(selectedRhythm)}>
            Réinitialiser
          </button>
        </div>
      </section>
    </main>
  )
}

export default Respiration
