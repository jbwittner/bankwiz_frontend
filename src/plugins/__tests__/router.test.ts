import { isAuthenticatedRoute } from '@/plugins/router.ts'
import { assert, describe, it } from 'vitest'

describe('isAuthenticatedRoute tests suite', () => {
  it.each(['home'])('should return true if value is authenticatedRoutes (%s)', (route) => {
    assert.equal(isAuthenticatedRoute(route), true)
  })

  it('should return false if value is not authenticatedRoutes', () => {
    assert.equal(isAuthenticatedRoute('/'), false)
  })
})
