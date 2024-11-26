import { describe, it, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

describe('authStore tests suite', () => {
  const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get('https://example.com/user', () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      })
    }),
  ]

  const server = setupServer()

  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())

  it('should return user data', async () => {
    server.use(...handlers)
    async function app() {
      const response = await fetch('https://example.com/user')
      const user = await response.json()
      console.log(user)
    }

    await app()
  })
})
