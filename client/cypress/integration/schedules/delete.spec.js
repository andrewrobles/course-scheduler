describe('Cypress', () => {
    beforeEach(() => {
        cy.exec('./setuptest.sh')
    })


    it('opens the app', () => {   
        cy.visit('http://localhost:3000') 
    })

    it('opens dropdown', () => {
        // Create new schedule
        cy.get('#create-schedule').click()

        // Click on schedule dropdown
        cy.get('#select-schedule').click()

        // Verify created schedule exists
        cy.contains('Schedule #2').should('exist')

        // Click on delete button
        cy.get('#delete-schedule').click()

        // Click on schedule dropdown
        cy.get('#select-schedule').click()

        // Verify that schedule no longer exists
        cy.contains('Schedule #2').should('not.exist')

        // Verify that close button does not exist
        cy.get('#delete-schedule').should('not.exist')
    })
})