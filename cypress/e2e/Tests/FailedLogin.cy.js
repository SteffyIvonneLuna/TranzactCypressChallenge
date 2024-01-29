import {login} from '../../support/POM/Page/Login.Page';
import {products} from '../../support/POM/Page/Products.Page';
const {lockedUserName, lockedUserPassword} = Cypress.env('lockedUser')
const {principalPage} = Cypress.env('endpoint')

describe("Failed Log In",()=>
{

    beforeEach(()=>{
        cy.visit("/")
    })
    
    it("Failed Log In",()=>{
        login.enterUserName(lockedUserName)
        login.enterPassword(lockedUserPassword)
        login.clickLoginButton()
        cy.verifyText(login.get.lockedError(),'Epic sadface: Sorry, this user has been locked out.')
        cy.wait(1500)
    })

})