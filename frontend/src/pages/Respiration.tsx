import { type FormEvent, useEffect, useMemo, useState } from 'react'
import '../css/Respiration.css'

type BreathingStep = {
  label: string
  instruction: string
  duration: number
  className: string
}

type BreathingRhythm = {
  id: string
  name: string
  description: string
  steps: BreathingStep[]
}

type CustomDurations = {
  inhale: number
  hold: number
  exhale: number
}

function createBreathingSteps(durations: CustomDurations): BreathingStep[] {
  const steps: BreathingStep[] = [
    {
      label: 'Inspire',
      instruction: 'Inspirez lentement par le nez.',
      duration: durations.inhale,
      className: 'is-inhaling',
    },
  ]

  if (durations.hold > 0) {
    steps.push({
      label: 'Apnée',
      instruction: 'Gardez doucement votre souffle.',
      duration: durations.hold,
      className: 'is-holding',
    })
  }

  steps.push({
    label: 'Expire',
    instruction: 'Expirez doucement par la bouche.',
    duration: durations.exhale,
    className: 'is-exhaling',
  })

  return steps
}

const breathingRhythms: BreathingRhythm[] = [
  {
    id: '748',
    name: 'Rythme 748',
    description: 'Inspiration 7 s / Apnée 4 s / Expiration 8 s',
    steps: createBreathingSteps({ inhale: 7, hold: 4, exhale: 8 }),
  },
  {
    id: '55',
    name: 'Rythme 55',
    description: 'Inspiration 5 s / Apnée 0 s / Expiration 5 s',
    steps: createBreathingSteps({ inhale: 5, hold: 0, exhale: 5 }),
  },
  {
    id: '46',
    name: 'Rythme 46',
    description: 'Inspiration 4 s / Apnée 0 s / Expiration 6 s',
    steps: createBreathingSteps({ inhale: 4, hold: 0, exhale: 6 }),
  },
]

const defaultCustomDurations = {
  inhale: 4,
  hold: 0,
  exhale: 6,
}

function Respiration() {
  const [selectedRhythmId, setSelectedRhythmId] = useState('46')
  const [customDraft, setCustomDraft] = useState(defaultCustomDurations)
  const [customDurations, setCustomDurations] = useState(defaultCustomDurations)
  const [customError, setCustomError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  const selectedRhythm = useMemo(() => {
    if (selectedRhythmId === 'custom') {
      return {
        id: 'custom',
        name: 'Rythme personnalisé',
        description: `Inspiration ${customDurations.inhale} s / Apnée ${customDurations.hold} s / Expiration ${customDurations.exhale} s`,
        steps: createBreathingSteps(customDurations),
      }
    }

    return (
      breathingRhythms.find((rhythm) => rhythm.id === selectedRhythmId) ??
      breathingRhythms[2]
    )
  }, [customDurations, selectedRhythmId])

  const breathingSteps = selectedRhythm.steps
  const currentStep = breathingSteps[stepIndex]

  const [secondsLeft, setSecondsLeft] = useState(currentStep.duration)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timer = window.setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1)
        return
      }

      const nextStepIndex = (stepIndex + 1) % breathingSteps.length
      setStepIndex(nextStepIndex)
      setSecondsLeft(breathingSteps[nextStepIndex].duration)
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [breathingSteps, isRunning, secondsLeft, stepIndex])

  function resetExercise(firstStepDuration: number) {
    setIsRunning(false)
    setStepIndex(0)
    setSecondsLeft(firstStepDuration)
  }

  function handleSelectRhythm(rhythmId: string) {
    const rhythm = breathingRhythms.find((item) => item.id === rhythmId)

    if (!rhythm) {
      return
    }

    setSelectedRhythmId(rhythm.id)
    setCustomError('')
    resetExercise(rhythm.steps[0].duration)
  }

  function handleSelectCustomRhythm() {
    setSelectedRhythmId('custom')
    setCustomError('')
    resetExercise(customDurations.inhale)
  }

  function handleCustomChange(field: keyof CustomDurations, value: string) {
    setCustomDraft({
      ...customDraft,
      [field]: Number(value),
    })
  }

  function handleApplyCustom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (customDraft.inhale < 1 || customDraft.exhale < 1 || customDraft.hold < 0) {
      setCustomError(
        "L'inspiration et l'expiration doivent durer au moins 1 seconde.",
      )
      return
    }

    setCustomDurations(customDraft)
    setSelectedRhythmId('custom')
    setCustomError('')
    resetExercise(customDraft.inhale)
  }

  function handleToggle() {
    setIsRunning(!isRunning)
  }

  function handleReset() {
    resetExercise(breathingSteps[0].duration)
  }

  return (
    <main className="breathing-page">
      <section className="breathing-header">
        <p className="breathing-label">Exercice</p>
        <h1>Respiration guidée</h1>
        <p>
          Suivez le rythme affiché à l'écran pour ralentir votre respiration et
          retrouver progressivement votre calme.
        </p>
      </section>

      <section className="breathing-exercise">
        <div className="rhythm-selector" aria-label="Choix du rythme">
          {breathingRhythms.map((rhythm) => (
            <button
              type="button"
              className={rhythm.id === selectedRhythmId ? 'is-selected' : ''}
              onClick={() => handleSelectRhythm(rhythm.id)}
              key={rhythm.id}
            >
              <span>{rhythm.name}</span>
              <small>{rhythm.description}</small>
            </button>
          ))}

          <button
            type="button"
            className={selectedRhythmId === 'custom' ? 'is-selected' : ''}
            onClick={handleSelectCustomRhythm}
          >
            <span>Rythme personnalisé</span>
            <small>Choisir ses propres durées</small>
          </button>
        </div>

        {selectedRhythmId === 'custom' && (
          <>
            <form className="custom-rhythm" onSubmit={handleApplyCustom}>
              <label>
                Inspiration
                <input
                  type="number"
                  min="1"
                  value={customDraft.inhale}
                  onChange={(event) =>
                    handleCustomChange('inhale', event.target.value)
                  }
                />
              </label>

              <label>
                Apnée
                <input
                  type="number"
                  min="0"
                  value={customDraft.hold}
                  onChange={(event) =>
                    handleCustomChange('hold', event.target.value)
                  }
                />
              </label>

              <label>
                Expiration
                <input
                  type="number"
                  min="1"
                  value={customDraft.exhale}
                  onChange={(event) =>
                    handleCustomChange('exhale', event.target.value)
                  }
                />
              </label>

              <button type="submit">Appliquer</button>
            </form>

            {customError && <p className="custom-error">{customError}</p>}
          </>
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
          <button type="button" onClick={handleToggle}>
            {isRunning ? 'Mettre en pause' : 'Démarrer'}
          </button>
          <button type="button" className="secondary-button" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </section>
    </main>
  )
}

export default Respiration
