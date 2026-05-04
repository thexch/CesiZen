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
    description: '7 s inspiration / 4 s apnée / 8 s expiration',
    inhale: 7,
    hold: 4,
    exhale: 8,
  },
  {
    id: '55',
    name: 'Rythme 55',
    description: '5 s inspiration / 5 s expiration',
    inhale: 5,
    hold: 0,
    exhale: 5,
  },
  {
    id: '46',
    name: 'Rythme 46',
    description: '4 s inspiration / 6 s expiration',
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

/*
  Résumé du fichier :
  - Sert à stocker les rythmes de respiration et les étapes de l'exercice.
  - Fonctionne avec des objets Rhythm utilisés ensuite par la page Respiration.
*/
