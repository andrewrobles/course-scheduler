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
        cy.contains('Default schedule').click()
        cy.contains('Default schedule').should('exist')
        cy.contains('Schedule #2').should('exist')
        cy.contains('Schedule #3').should('exist')
    })
})