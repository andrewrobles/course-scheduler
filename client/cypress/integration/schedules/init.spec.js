describe('Cypress', () => {
    beforeEach(() => {
        cy.exec('./setuptest.sh')
    })

    it('is working', () => {     
        expect(true).to.equal(true)   
    }) 
    
    it('opens the app', () => {   
        cy.visit('http://localhost:3000') 
    })

    it('opens dropdown', () => {
        cy.contains('Default schedule').should('exist')

        cy.get('#select-schedule').click()
        cy.contains('Schedule #2').should('exist')
        cy.get('#select-schedule').click()
        cy.contains('Schedule #3').click()
        cy.contains('Default schedule').should('exist')
        cy.contains('Schedule #2').should('exist')
        cy.contains('Schedule #3').should('exist')

        cy.contains('Schedule #3').click()
        cy.get('#select-schedule').click()
        cy.contains('Schedule #4').click()
        cy.contains('Schedule #2').should('exist')
        cy.contains('Schedule #3').should('exist')
        cy.contains('Schedule #4').should('exist')
    })
})