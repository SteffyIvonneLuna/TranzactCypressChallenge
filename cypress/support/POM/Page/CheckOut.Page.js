class Checkout
{
    //Locators
    get = {

        inputFirstName:()=> cy.get('[placeholder="First Name"]'),
        inputLastName:()=> cy.get('[placeholder="Last Name"]'),
        inputPostalCode:()=> cy.get('[name="postalCode"]'),
        continueButton:()=> cy.get('#continue')
    }

    //Methods / Functions
    clickContinueButton(){
        cy.clickVerfiedTextButton(checkout.get.continueButton(),'Continue')
    }

};

export const checkout = new Checkout;