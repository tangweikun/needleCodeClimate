import {
  getIdealWeight,
  squareOfHeightInMeters,
  getBMI,
  getEnergyCoefficient,
  getDailyEnergyNeeds,
} from '../utils/getDailyDietToken'

describe('when height is null, weight null', () => {
  const height = null
  const weight = null
  it('squared is 2.72', () => {
    expect(squareOfHeightInMeters(height)).toBe(2.72)
  })
  it('ideal weight is 59.84kg (22*height²)', () => {
    expect(getIdealWeight(height)).toBe(59.84)
  })
  it('BMI is 22.06 (weight/height²)', () => {
    expect(getBMI({ weight, height })).toBe(22.06)
  })
  it('Energy Coefficient', () => {
    expect(getEnergyCoefficient({ weight, height })).toBe(30)
  })
  it('Daily Energy Requirement (ideal weight * EC)', () => {
    expect(getDailyEnergyNeeds({ weight, height })).toBe(1795.2)
  })
})

describe('when height is undefined, weight undefined', () => {
  it('squared is 2.72', () => {
    expect(squareOfHeightInMeters()).toBe(2.72)
  })
  it('ideal weight is 59.84kg (22*height²)', () => {
    expect(getIdealWeight()).toBe(59.84)
  })
  it('BMI is 22.06 (weight/height²)', () => {
    expect(getBMI({})).toBe(22.06)
  })
  it('Energy Coefficient', () => {
    expect(getEnergyCoefficient({})).toBe(30)
  })
  it('Daily Energy Requirement (ideal weight * EC)', () => {
    expect(getDailyEnergyNeeds({})).toBe(1795.2)
  })
})

describe('when height is 200cm, weight 100kg', () => {
  const height = 200
  const weight = 100
  it('squared', () => {
    expect(squareOfHeightInMeters(height)).toBe(4)
  })
  it('ideal weight (22*height²)', () => {
    expect(getIdealWeight(height)).toBe(88)
  })
  it('BMI (weight/height²)', () => {
    expect(getBMI({ weight, height })).toBe(25)
  })
  it('Energy Coefficient', () => {
    expect(getEnergyCoefficient({ weight, height })).toBe(25)
  })
  it('Daily Energy Requirement is 2200 (ideal weight * EC)', () => {
    expect(getDailyEnergyNeeds({ weight, height })).toBe(2200)
  })
})
describe('when height is 173cm, weight 72kg', () => {
  const height = 173
  const weight = 72
  it('squared', () => {
    expect(squareOfHeightInMeters(height)).toBe(2.99)
  })
  it('ideal weight (22*height²)', () => {
    expect(getIdealWeight(height)).toBe(65.78)
  })
  it('BMI (weight/height²)', () => {
    expect(getBMI({ weight, height })).toBe(24.08)
  })
  it('Energy Coefficient', () => {
    expect(getEnergyCoefficient({ weight, height })).toBe(25)
  })
  it('Daily Energy Requirement (ideal weight * EC)', () => {
    expect(getDailyEnergyNeeds({ weight, height })).toBe(1644.5)
  })
})

describe('when height is 183cm, weight 91kg', () => {
  const height = 183
  const weight = 91
  it('squared', () => {
    expect(squareOfHeightInMeters(height)).toBe(3.35)
  })
  it('ideal weight (22*height²)', () => {
    expect(getIdealWeight(height)).toBe(73.7)
  })
  it('BMI (weight/height²)', () => {
    expect(getBMI({ weight, height })).toBe(27.16)
  })
  it('Energy Coefficient', () => {
    expect(getEnergyCoefficient({ weight, height })).toBe(25)
  })
  it('Daily Energy Requirement (ideal weight * EC)', () => {
    expect(getDailyEnergyNeeds({ weight, height })).toBe(1842.5)
  })
})
