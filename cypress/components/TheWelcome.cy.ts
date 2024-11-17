import HelloWorld from "../../src/components/HelloWorld.vue";

describe('TheWelcome.cy.ts', () => {
  it('playground', () => {
    cy.mount(HelloWorld)
    cy.get('h3').contains("You’ve successfully")
  })
})
