import {login} from '../../support/POM/Page/Login.Page';
import {products} from '../../support/POM/Page/Products.Page';
const {standardUserName, standardUserPassword} = Cypress.env('authorizedUser')
const {principalPage} = Cypress.env('endpoint')

describe("Happy Path Workflow",()=>
{

    beforeEach(()=>{
        cy.visit("/")
    })
    
    it("Happy Path Workflow",()=>{
        login.enterUserName(standardUserName)
        login.enterPassword(standardUserPassword)
        login.clickLoginButton()
        cy.url().should("contain",principalPage)
        products.clickAddCartBikeLightButton()
        cy.verifyText(products.get.cartIcon(),'1')
        cy.wait(1500)
        cy.logoutEC()
        cy.wait(1500)
    })

})