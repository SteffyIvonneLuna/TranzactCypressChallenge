class Products
{
    //Locators
    get = {
        title:()=> cy.get('span[class="title"]'),
        
        addCartBikeLightButton:()=> cy.contains('Sauce Labs Bike Light').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('button'),
        
        cartItemsQuantity:()=> cy.get('a[class="shopping_cart_link"]').children('span'),
        
        sortButton:()=> cy.get('select[class="product_sort_container"]'),
        
        lowToHighSortByOption:() => cy.get('select[class="product_sort_container"]').find('option[value="lohi"]'),
        
        productsPrices:() => cy.get('div[class="inventory_item_price"]'),
        
        addCartFleeceJacketButton:()=> cy.contains('Sauce Labs Fleece Jacket').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('button'),
        
        addCartOnesieButton:()=> cy.contains('Sauce Labs Onesie').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('button'),

        removetFleeceJacketButton:()=> cy.get('button[name="remove-sauce-labs-fleece-jacket"]'),

        removetOnesieButton:()=> cy.get('button[name="remove-sauce-labs-onesie"]'),

        itemFleeceJacketPrice:()=> cy.contains('Sauce Labs Fleece Jacket').parents('div[class="inventory_item_label"]')
        .siblings('div[class="pricebar"]').children('div[class="inventory_item_price"]'),

        itemOnesiePrice:()=> cy.contains('Sauce Labs Onesie').parents('div[class="inventory_item_label"]').siblings('div[class="pricebar"]')
        .children('div[class="inventory_item_price"]'),

        cartIcon:()=> cy.get('a[class="shopping_cart_link"]')
    }

    //Methods / Functions
    verifyCartIconItemsQuantity(expected){
        cy.verifyText(products.get.cartItemsQuantity(),'2')

    }
    
    clickAddCartBikeLightButton(){
        cy.verifyText(products.get.addCartBikeLightButton(),'Add to cart')
        products.get.addCartBikeLightButton().click()
    }

    sortByOption(option){
        products.get.sortButton().select(option)
    }

    verifySortedByOption(option){
        option.should("be.selected")
    }

    verifySortedPricesLowToHigh(){
        products.get.productsPrices()
        .then(($prices) =>
            Cypress._.map($prices, (el) => el.innerText),
        )
        // only the numbers and .
        .then((list) => list.map((str) => str.replace(/[^0-9.]/g, '')))
        .then((list) => list.map(parseFloat))
        .should('be.an', 'array')
        .then((list) => {
           // confirm the list is sorted by sorting it using Lodash
           // and comparing the original and sorted lists
            const sorted = Cypress._.sortBy(list)
            expect(sorted).to.deep.equal(list)
        })
    }

    clickAddCartFleeceJacketButton(){
        cy.verifyText(products.get.addCartFleeceJacketButton(),'Add to cart')
        products.get.addCartFleeceJacketButton().click()
    }

    clickAddCartOnesieButton(){
        cy.verifyText(products.get.addCartOnesieButton(),'Add to cart')
        products.get.addCartOnesieButton().click()
    }
    
    verifyRemoveEnabledButton(element){
        cy.verifyText(element,'Remove')
    }

};

export const products = new Products;