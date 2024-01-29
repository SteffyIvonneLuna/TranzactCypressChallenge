/// <reference types="cypress"/>


describe("Hello world",()=>
{

    beforeEach(()=>{
        cy.visit("https://www.saucedemo.com/")
    })
    
    it("Success",()=>{
        cy.loginEC('standard_user','secret_sauce')
        cy.get('span[class="title"]').should(($title) => {
            expect($title.first()).to.contain('Products')          
        })
        cy.wait(1500)
        cy.logoutEC()
        cy.wait(1500)
    })

    it("Fails",()=>{
        cy.loginEC('locked_out_user','secret_sauce')
        cy.get('h3[data-test="error"]').should(($error) => {
            expect($error.first()).to.contain('Epic sadface: Sorry, this user has been locked out.')          
        })
        cy.wait(1500)
    })

    it("Happy Path Workflow",()=>{
        cy.loginEC('standard_user','secret_sauce')
        cy.contains('Sauce Labs Bike Light').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('button').should(($button) => {
            expect($button.first()).to.contain('Add to cart')          
        }).click()
        cy.get('a[class="shopping_cart_link"]').children('span').should(($added) => {
            expect($added.first()).to.contain('1')          
        })
        cy.wait(1500)
        cy.logoutEC()
        cy.wait(1500)
    })

    it("Multiple scenarios Workflow",()=>{
        let TextPriceProductsPageFleeceJacket, TextPriceCartPageFleeceJacket;
        let TextPriceProductsPageOnesie, TextPriceCartPageOnesie;
        let TextLeavingPriceCartPageFleeceJacket, TextLeavingCartIconQuantity;
        let TextPriceResumePageFleeceJacket;
        //1. Login to https://www.saucedemo.com/
        cy.loginEC('standard_user','secret_sauce')
        //2. Change the Product Sort to “Price (low to high)” on “Products” page
        cy.get('select[class="product_sort_container"]').select('Price (low to high)')
        //3. Assert if the Selected (Displayed) Item on the Product Sort is “Price (low to high)” 
        cy.get('select[class="product_sort_container"]').find('option[value="lohi"]').should("be.selected")
        //4. Capture all prices from the product page and Assert if it is in ascending order.
        cy.get('div[class="inventory_item_price"]')
        .then(($prices) =>
            Cypress._.map($prices, (el) => el.innerText),
        )
        .should('be.an', 'array')
        // only the numbers and .
        .then((list) => list.map((str) => str.replace(/[^0-9.]/g, '')))
        .should('be.an', 'array')
        .then((list) => list.map(parseFloat))
        .should('be.an', 'array')
        .then((list) => {
           // confirm the list is sorted by sorting it using Lodash
           // and comparing the original and sorted lists
            const sorted = Cypress._.sortBy(list)
            expect(sorted).to.deep.equal(list)
        })
        //5. Click “Add to Cart” button for “Sauce Labs Fleece Jacket” and “Sauce Labs Onesie”
        cy.contains('Sauce Labs Fleece Jacket').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('button').should(($button) => {        
            // make sure the first contains some text content
            expect($button.first()).to.contain('Add to cart')          
        }).click()
        cy.contains('Sauce Labs Onesie').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]').children('button').should(($button) => {        
            // make sure the first contains some text content
            expect($button.first()).to.contain('Add to cart')          
        }).click()
        //6. Check if “Remove” button enabled for “Sauce Labs Fleece Jacket” and “Sauce Labs Onesie”
        cy.contains('Sauce Labs Fleece Jacket').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]').children('button').should(($button) => {        
            expect($button.first()).to.contain('Remove')          
        })
        cy.get('button[name="remove-sauce-labs-fleece-jacket"]').should('be.visible')
        cy.contains('Sauce Labs Onesie').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]').children('button').should(($button) => {        
            expect($button.first()).to.contain('Remove')          
        })
        cy.get('button[name="remove-sauce-labs-onesie"]').should('be.visible')
        //7. Capture price of “Sauce Labs Fleece Jacket” from “Products” page
        cy.contains('Sauce Labs Fleece Jacket').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
        .then((text) =>
        {
            TextPriceProductsPageFleeceJacket = text;
        });
        //8. Capture price of “Sauce Labs Onesie” from “Products” page
        cy.contains('Sauce Labs Onesie').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
        .then((text) =>
        {
            TextPriceProductsPageOnesie = text;
        });
        //9. Capture value from “Cart Icon” on the top right and assert is its “2”.
        cy.get('a[class="shopping_cart_link"]').children('span').should(($added) => {        
            // make sure the first contains some text content
            expect($added.first()).to.contain('2')          
        })
        //10. Click “Cart” icon
        cy.get('a[class="shopping_cart_link"]').click()
        //11. Capture price of “Sauce Labs Fleece Jacket” from “Your Cart” page
        cy.get('#item_5_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
        .then((text) =>
        {
            TextPriceCartPageFleeceJacket = text;
        });
        //12. Capture price of “Sauce Labs Onesie” from “Your Cart“ page
        cy.get('#item_2_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
        .then((text) =>
        {
            TextPriceCartPageOnesie = text;
        });
        //13. Assert price values from step 7 and step 11
        expect(TextPriceProductsPageFleeceJacket === TextPriceCartPageFleeceJacket);
        cy.get('#item_5_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
            .then((text) =>{
                TextPriceCartPageFleeceJacket = text;
                expect(TextPriceProductsPageFleeceJacket).to.contain(TextPriceCartPageFleeceJacket);
            });
        //14. Assert price values from step 8 and step 12
        expect(TextPriceProductsPageOnesie === TextPriceCartPageOnesie);
        cy.get('#item_2_title_link').siblings('div[class="item_pricebar"]')
            .children('div[class="inventory_item_price"]').invoke('text')
            .then((text) =>{
                TextPriceCartPageOnesie = text;
                expect(TextPriceProductsPageOnesie).to.contain(TextPriceCartPageOnesie);
            });
        //15. Click “Remove” button for “Sauce Labs Onesie” on “Your Cart“ page
        cy.get('#item_2_title_link').siblings('div[class="item_pricebar"]')
        .children('button').should(($button) => {        
            expect($button.first()).to.contain('Remove')          
        }).click()
        cy.wait(1500)
        //16. Capture quantity of “Sauce Labs Fleece Jacket” from “Your Cart“page
        cy.get('#item_5_title_link')
            .then((elements) =>{
                TextLeavingPriceCartPageFleeceJacket = elements.length;
                cy.log(TextLeavingPriceCartPageFleeceJacket);
         });
        //17. Capture value from “Cart Icon” on the top right from “Your Cart“page
        cy.get('a[class="shopping_cart_link"]').children('span').invoke('text')
            .then((text) =>{
            TextLeavingCartIconQuantity = text;
            cy.log(TextLeavingCartIconQuantity);
        });
        //18. Assert quantity values from step 16 and step 17
        expect(TextLeavingPriceCartPageFleeceJacket === parseInt(TextLeavingCartIconQuantity));
        cy.get('a[class="shopping_cart_link"]').children('span').invoke('text')
            .then((text) =>{
            TextLeavingCartIconQuantity = text;
            expect(TextLeavingPriceCartPageFleeceJacket).equal(parseInt(TextLeavingCartIconQuantity));
        });
        //19. Click “Checkout” button on “Your Cart“ page
        cy.get('button[data-test="checkout"]').should(($button) => {        
            expect($button.first()).to.contain('Checkout')          
        }).click()
        //20. Fill the “Checkout: Your Information” page (Random data).
        cy.get('[placeholder="First Name"]').type('Xavier')
        cy.get('[placeholder="Last Name"]').type('Luna')
        cy.get('[name="postalCode"]').type('51')
        cy.wait(1500)
        //21. Click “Continue” button
        cy.get('#continue').should(($button) => {        
            expect($button.first()).to.contain('Continue')          
        }).click()
        cy.wait(1500)
        //22. Capture “Item total” from “Checkout: Overview” page and Assert it with price from step 7
        cy.get('#item_5_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]').invoke('text')
            .then((text) =>{
                TextPriceResumePageFleeceJacket = text;
                expect(TextPriceProductsPageFleeceJacket).to.contain(TextPriceResumePageFleeceJacket);
            });
        cy.wait(1500)
        //23. Click “Finish” button on “Checkout: Overview” page
        cy.get('#finish').should(($button) => {        
            expect($button.first()).to.contain('Finish')          
        }).click()
        cy.wait(1500)
        //24. Capture “Thank you for your order” text from “Checkout Complete” page and Assert it
        cy.get('h2[class="complete-header"]').invoke('text').should('contain','Thank you for your order!')
        //25. Click “Menu” Icon on top left of the header
        //26. Click “Logout” button
        cy.logoutEC()
        cy.wait(1500)
    })

})