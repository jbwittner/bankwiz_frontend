import ApplicationBar from "../../src/components/ApplicationBar.vue";

describe('ApplicationBar', () => {
  it('playground', () => {
    cy.mount(ApplicationBar, {
      props: {
        showAppBar: true,
      },
    })
    cy.get('h3').contains("You’ve successfully")
  })
})
