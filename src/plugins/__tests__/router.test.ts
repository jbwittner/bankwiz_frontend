import { isAuthenticatedRoute } from '@/plugins/router.ts'
import { assert, describe, it } from 'vitest'

describe('isAuthenticatedRoute tests suite', () => {
  it('should return true if value is authenticatedRoutes', () => {
    assert.equal(isAuthenticatedRoute('/home'), true)
  })

  it('should return false if value is not authenticatedRoutes', () => {
    assert.equal(isAuthenticatedRoute('/'), false)
  })
})
