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

    // it('adds some schedules', () => {
    //     cy.contains('Default schedule').should('exist')
    // })

    it('opens dropdown', () => {
        cy.contains('Schedule #3').click()
        cy.contains('Default schedule').should('exist')
        cy.contains('Schedule #2').should('exist')
        cy.contains('Schedule #3').should('exist')
    })

    it('adds another schedule', () => {
        cy.contains('Schedule #3').click()
        cy.get('#select-schedule').click()
        cy.contains('Schedule #4').click()
        cy.contains('Schedule #4').should('exist')
    })
})