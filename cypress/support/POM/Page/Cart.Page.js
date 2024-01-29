class Cart
{
    //Locators
    get = {

        itemFleeceJacketPrice:()=> cy.get('#item_5_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]'),

        itemOnesiePrice:()=> cy.get('#item_2_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]'),

        itemOnesieButton:()=> cy.get('#item_2_title_link').siblings('div[class="item_pricebar"]')
        .children('button'),

        fleeceJacketItems:()=> cy.get('#item_5_title_link'),

        cartItemsQuantity:()=> cy.get('a[class="shopping_cart_link"]').children('span'),

        checkOutButton:()=> cy.get('button[data-test="checkout"]'),

        
    }

    //Methods / Functions

    clickOnsieRemoveButton(){
        cy.clickVerfiedTextButton(cart.get.itemOnesieButton(),'Remove')
    }

    clickCheckOutButton(){
        cy.clickVerfiedTextButton(cart.get.checkOutButton(),'Checkout')
    }

    

};

export const cart = new Cart;