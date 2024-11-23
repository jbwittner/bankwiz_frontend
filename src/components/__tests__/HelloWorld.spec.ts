import { describe, it, expect } from 'vitest'

export function sum(a: number, b: number) {
  console.log('sum')
  return a + b
}

describe('HelloWorld', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
