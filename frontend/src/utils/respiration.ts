export type Rhythm = {
  id: string
  name: string
  description: string
  inhale: number
  hold: number
  exhale: number
}

export const rhythms: Rhythm[] = [
  {
    id: '748',
    name: 'Rythme 748',
    description: 'Inspiration 7 s / Apnée 4 s / Expiration 8 s',
    inhale: 7,
    hold: 4,
    exhale: 8,
  },
  {
    id: '55',
    name: 'Rythme 55',
    description: 'Inspiration 5 s / Expiration 5 s',
    inhale: 5,
    hold: 0,
    exhale: 5,
  },
  {
    id: '46',
    name: 'Rythme 46',
    description: 'Inspiration 4 s / Expiration 6 s',
    inhale: 4,
    hold: 0,
    exhale: 6,
  },
]

export const customRhythm: Rhythm = {
  id: 'custom',
  name: 'Rythme personnalisé',
  description: 'Choisir ses propres durées',
  inhale: 4,
  hold: 0,
  exhale: 6,
}

export function getCycleDuration(rhythm: Rhythm) {
  return rhythm.inhale + rhythm.hold + rhythm.exhale
}

export function getSteps(rhythm: Rhythm) {
  const steps = [
    {
      label: 'Inspire',
      instruction: 'Inspirez lentement par le nez.',
      duration: rhythm.inhale,
      className: 'is-inhaling',
    },
  ]

  if (rhythm.hold > 0) {
    steps.push({
      label: 'Apnée',
      instruction: 'Gardez doucement votre souffle.',
      duration: rhythm.hold,
      className: 'is-holding',
    })
  }

  steps.push({
    label: 'Expire',
    instruction: 'Expirez doucement par la bouche.',
    duration: rhythm.exhale,
    className: 'is-exhaling',
  })

  return steps
}
