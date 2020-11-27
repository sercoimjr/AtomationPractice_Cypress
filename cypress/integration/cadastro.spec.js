/// <reference types="cypress" />


//biblioteca para uso de dados randomicos
let Chance = require('chance')
let chance = new Chance()


var first_name = chance.first()
var last_name = chance.last()


context('Cadastro', () => {
  it('Novo usuario', () => {

    //Acesso a home 
    cy.visit('index.php')

    //clicar em login na home
    cy.get('.login').click()
    //deve ser direcionado para a página de login
    cy.title().should('contain', 'Login')

    //peenche campo com email, e avança para criação de conta
    cy.get('#email_create').type(chance.email())
    cy.get('#SubmitCreate').click()

    //deve ser direcionado para a página de cadastro
    cy.url().should('contain', 'authentication')
    cy.get('body').should('contain', 'Create an account')

    //preenchimento dos campos de cadastro
    cy.get('#id_gender1').click()
    cy.get('#customer_firstname').type(first_name)
    cy.get('#customer_lastname').type(last_name)
    cy.get('#passwd').type('passwd123')
    cy.get('#days').select('3')
    cy.get('#months').select('May')
    cy.get('#years').select('1982')
    cy.get('#firstname').clear().type(first_name)
    cy.get('#lastname').clear().type(last_name)
    cy.get('#company').type(chance.company())
    cy.get('#address1').type('Rua do Endereço')
    cy.get('#address2').type('Numero 123')
    cy.get('#city').type('New City')
    cy.get('#id_state').select('Alaska')
    cy.get('#postcode').type('12345')
    cy.get('#phone').type(chance.phone({ formatted: false }))
    cy.get('#phone_mobile').type(chance.phone({ formatted: false, mobile: true }))
    cy.get('#alias').clear().type('My address')

    cy.get('#submitAccount').click()

    //deve ser direcionado para a página de Minha Conta
    //Cadastro concluido
    cy.title().should('be.eq', 'My account - My Store')
    cy.get('body').should('contain', 'Welcome to your account')
  })
})
