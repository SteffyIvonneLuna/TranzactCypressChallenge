import {login} from '../../support/POM/Page/Login.Page';
import {products} from '../../support/POM/Page/Products.Page';
import {cart} from '../../support/POM/Page/Cart.Page';
import {checkout} from '../../support/POM/Page/CheckOut.Page';
import {checkoutOverview} from '../../support/POM/Page/CheckoutOverview.Page';
import { checkoutComplete } from '../../support/POM/Page/CheckOutComplete.Page';
const {standardUserName, standardUserPassword} = Cypress.env('authorizedUser')
const {principalPage} = Cypress.env('endpoint')

describe("Multiple Scenarios Workflow",()=>
{

    beforeEach(()=>{
        cy.visit("/")
    })
    
    it("Happy Path Workflow",()=>{
        let TextPriceProductsPageFleeceJacket, TextPriceCartPageFleeceJacket;
        let TextPriceProductsPageOnesie, TextPriceCartPageOnesie;
        let TextLeavingPriceCartPageFleeceJacket, TextLeavingCartIconQuantity;
        let TextPriceResumePageFleeceJacket;
        //1. Login to https://www.saucedemo.com/
        login.enterUserName(standardUserName)
        login.enterPassword(standardUserPassword)
        login.clickLoginButton()
        cy.url().should("contain",principalPage)
        //2. Change the Product Sort to “Price (low to high)” on “Products” page
        products.sortByOption('Price (low to high)')
        //3. Assert if the Selected (Displayed) Item on the Product Sort is “Price (low to high)” 
        products.verifySortedByOption(products.get.lowToHighSortByOption())
        //4. Capture all prices from the product page and Assert if it is in ascending order.
        products.verifySortedPricesLowToHigh()
        //5. Click “Add to Cart” button for “Sauce Labs Fleece Jacket” and “Sauce Labs Onesie”
        products.clickAddCartFleeceJacketButton()
        products.clickAddCartOnesieButton()
        //6. Check if “Remove” button enabled for “Sauce Labs Fleece Jacket” and “Sauce Labs Onesie”
        products.verifyRemoveEnabledButton(products.get.addCartFleeceJacketButton())
        cy.verifyVisibleElement(products.get.removetFleeceJacketButton())
        products.verifyRemoveEnabledButton(products.get.addCartOnesieButton())
        cy.verifyVisibleElement(products.get.removetOnesieButton())
        //7. Capture price of “Sauce Labs Fleece Jacket” from “Products” page
        products.get.itemFleeceJacketPrice().invoke('text')
        .then((text) =>
        {
            TextPriceProductsPageFleeceJacket = text;
        });
        //8. Capture price of “Sauce Labs Onesie” from “Products” page
        products.get.itemOnesiePrice().invoke('text')
        .then((text) =>
        {
            TextPriceProductsPageOnesie = text;
        });
        //9. Capture value from “Cart Icon” on the top right and assert is its “2”.
        cy.verifyText(products.get.cartItemsQuantity(),'2')
        //10. Click “Cart” icon
        products.get.cartIcon().click()
        //11. Capture price of “Sauce Labs Fleece Jacket” from “Your Cart” page
        cart.get.itemFleeceJacketPrice().invoke('text')
        .then((text) =>
        {
            TextPriceCartPageFleeceJacket = text;
        });
        //12. Capture price of “Sauce Labs Onesie” from “Your Cart“ page
        cart.get.itemOnesiePrice().invoke('text')
        .then((text) =>
        {
            TextPriceCartPageOnesie = text;
        });
        //13. Assert price values from step 7 and step 11
        cart.get.itemFleeceJacketPrice().invoke('text')
            .then((text) =>{
                TextPriceCartPageFleeceJacket = text;
                expect(TextPriceProductsPageFleeceJacket).to.contain(TextPriceCartPageFleeceJacket);
            });
        //14. Assert price values from step 8 and step 12
        cart.get.itemOnesiePrice().invoke('text')
            .then((text) =>{
                TextPriceCartPageOnesie = text;
                expect(TextPriceProductsPageOnesie).to.contain(TextPriceCartPageOnesie);
            });
        //15. Click “Remove” button for “Sauce Labs Onesie” on “Your Cart“ page
        cart.clickOnsieRemoveButton()
        cy.wait(1000)
        //16. Capture quantity of “Sauce Labs Fleece Jacket” from “Your Cart“page
        cart.get.fleeceJacketItems()
            .then((elements) =>{
                TextLeavingPriceCartPageFleeceJacket = elements.length;
         });
        //17. Capture value from “Cart Icon” on the top right from “Your Cart“page
        cart.get.cartItemsQuantity().invoke('text')
            .then((text) =>{
            TextLeavingCartIconQuantity = text;
        });
        //18. Assert quantity values from step 16 and step 17
        cart.get.cartItemsQuantity().invoke('text')
            .then((text) =>{
            TextLeavingCartIconQuantity = text;
            expect(TextLeavingPriceCartPageFleeceJacket).equal(parseInt(TextLeavingCartIconQuantity));
        });
        //19. Click “Checkout” button on “Your Cart“ page
        cart.clickCheckOutButton()
        //20. Fill the “Checkout: Your Information” page (Random data).
        cy.fixture('checkoutData').then((data) => {
            checkout.get.inputFirstName().type(data.name)
            checkout.get.inputLastName().type(data.lastName)
            checkout.get.inputPostalCode().type(data.postalCode)
        })
        cy.wait(1500)
        //21. Click “Continue” button
        checkout.clickContinueButton()
        cy.wait(1500)
        //22. Capture “Item total” from “Checkout: Overview” page and Assert it with price from step 7
        checkoutOverview.get.itemFleeceJacketPrice().invoke('text')
            .then((text) =>{
                TextPriceResumePageFleeceJacket = text;
                expect(TextPriceProductsPageFleeceJacket).to.contain(TextPriceResumePageFleeceJacket);
            });
        cy.wait(1500)
        //23. Click “Finish” button on “Checkout: Overview” page
        checkoutOverview.clickFinishButton()
        cy.wait(1500)
        //24. Capture “Thank you for your order” text from “Checkout Complete” page and Assert it
        checkoutComplete.get.completeHeader().invoke('text').should('contain','Thank you for your order!')
        //25. Click “Menu” Icon on top left of the header
        //26. Click “Logout” button
        cy.logoutEC()
        cy.wait(1500)
    })

})