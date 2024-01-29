// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginEC',(username,password) =>{
    cy.visit("https://www.saucedemo.com/")
    cy.get('[placeholder="Username"]').type(username)  
    cy.get('[placeholder="Password"]').type(password)
    cy.wait(1500)
    cy.get('[type="submit"]').click()
})

Cypress.Commands.add('logoutEC',() =>{
    cy.get("#react-burger-menu-btn").click()
    cy.wait(1000)
    cy.get('#logout_sidebar_link').click()
})

Cypress.Commands.add('verifyText',(element,text)=>{
    element.should(($text) => {
        expect($text.first()).to.contain(text)          
    })
})

Cypress.Commands.add('verifyVisibleElement',(element)=>{
    element.should('be.visible')
})

Cypress.Commands.add('clickVerfiedTextButton',(element,text)=>{
    cy.verifyText(element,text)
    element.click()
})