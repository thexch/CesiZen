import { describe, expect, it } from 'vitest'
import { getCycleDuration, getSteps, rhythms } from './respiration'

describe('Respiration', () => {
  it('TU-01 calcule la durée du cycle 7-4-8', () => {
    const rhythm748 = rhythms.find((rhythm) => rhythm.id === '748')

    expect(rhythm748).toBeDefined()
    expect(getCycleDuration(rhythm748!)).toBe(19)
  })

  it('TNR-02 conserve les rythmes de base du sujet', () => {
    expect(rhythms.map((rhythm) => rhythm.id)).toEqual(['748', '55', '46'])
    expect(getSteps(rhythms[0]).map((step) => step.label)).toEqual(['Inspire', 'Apnée', 'Expire'])
  })
})
