describe('registrazione', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  })

  it('register new user valid', () => {
    cy.contains('Registrazione').click();

    cy.url().should('include', 'registrazione');

    cy.get('input[name=nomeUtente]').type("nomeE2E");
    cy.get("[type='email']").type("test@E2E");
    cy.get('input[name=password]').type("passwordE2E");
    cy.get('input[name=dataNascita]').type("2022-11-15");

    cy.get('[type=submit]').click();

    cy.intercept('POST', 'http://localhost:8080/users/register', {
      statusCode: 201,
    })

    cy.on('window:alert', (textWindow) => {
      expect(textWindow).to.contains('Registrazione effettuata');
    })

    cy.url().should('include', 'login');

  })

  it('register new user invalid', () => {
    cy.contains('Registrazione').click();

    cy.url().should('include', 'registrazione');

    cy.get('input[name=nomeUtente]').type("nomeE2E");
    cy.get("[type='email']").type("test@test");
    cy.get('input[name=password]').type("passwordE2E");
    cy.get('input[name=dataNascita]').type("2022-11-15");

    cy.get('[type=submit]').click();

    cy.intercept('POST', 'http://localhost:8080/users/register', {
      statusCode: 400,
    })
  })

  it('email - invalida', () => {

    cy.contains('Registrazione').click();

    cy.get("[type='email']").type('testE2E')

    cy.get('[type=submit]').should('be.disabled')
  })

})
