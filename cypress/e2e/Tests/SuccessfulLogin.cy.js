import {login} from '../../support/POM/Page/Login.Page';
import {products} from '../../support/POM/Page/Products.Page';
const {standardUserName, standardUserPassword} = Cypress.env('authorizedUser')
const {principalPage} = Cypress.env('endpoint')

describe("Successful Log In",()=>
{

    beforeEach(()=>{
        cy.visit("/")
    })
    
    it("Successful Log In",()=>{
        login.enterUserName(standardUserName)
        login.enterPassword(standardUserPassword)
        login.clickLoginButton()
        cy.url().should("contain",principalPage)
        cy.verifyText(products.get.title(),'Products')
        cy.wait(1000)
        cy.logoutEC()
        cy.wait(1000)
    })

})