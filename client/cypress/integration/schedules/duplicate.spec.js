describe('Cypress', () => {
    beforeEach(() => {
        cy.exec('./setuptest.sh')
    })


    it('opens the app', () => {   
        cy.visit('http://localhost:3000') 
    })

    it('Attempts to duplicate schedule', () => {
        // Attempt to duplicate the schedule
        cy.get('#duplicate-schedule').click()

        // Verify created schedule exists
        cy.contains('Default schedule (Copy)').should('exist')
    })
})