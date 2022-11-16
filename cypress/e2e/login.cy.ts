describe('login spec', () => {

    beforeEach(() => {
    cy.visit('http://localhost:4200')
    })

    it('login - valida', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputEmail1').type('test@qwert')
        .get('#exampleInputPassword1').type('123456789')
        .get('[type=submit]').click()
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 200
      })
    })

    it('nuovo utente', ()=> {
      cy.contains("Clicca qui").click()
      .intercept('http://localhost:8080/registrazione')
      .url().should('include', 'registrazione')
    })

     it('email - con requisiti ma invalida', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputEmail1').type('test@invalida')
        .get('#exampleInputPassword1').type('123456789')
        .get('[type=submit]').click()
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 400
      }) 
    })

    it('password - con requisiti ma invalida', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputEmail1').type('test@test')
        .get('#exampleInputPassword1').type('1234567890')
        .get('[type=submit]').click()
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 400
      }) 
    })

    it('password - invalida', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputEmail1').type('test@test')
        .get('#exampleInputPassword1').type('1234567890')
        .get('[type=submit]').click()
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 400
      }) 
    })

    it('email - invalida, non soddisfa i requisiti di validazione', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputEmail1').type('test')
        .get('[type=submit]').should('be.disabled')
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 400
      }) 
    })

    it('password - invalida, non soddisfa i requisiti di validazione', ()=> {
      cy.contains("Accedi").click()
        .get('#exampleInputPassword1').type('1234')
        .get('[type=submit]').should('be.disabled')
        .intercept('GET', 'http://localhost:8080/login', {
        statusCode: 400
      }) 
    })

    it('test traduzione - en', () => {
      cy.contains("Accedi").click()
        .get('select').select('en-EN')
        .get('mat-toolbar').contains('Log in')
        .get('mat-toolbar').contains('Registration')
    })

})