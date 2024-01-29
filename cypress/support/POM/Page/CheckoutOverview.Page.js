class ChecoutOverview
{
    //Locators
    get = {

        itemFleeceJacketPrice:()=> cy.get('#item_5_title_link').siblings('div[class="item_pricebar"]')
        .children('div[class="inventory_item_price"]'),
        
        finishButton:()=> cy.get('#finish')
    }

    //Methods / Functions
    clickFinishButton(){
        cy.clickVerfiedTextButton(checkoutOverview.get.finishButton(),'Finish')
    }

    

};

export const checkoutOverview = new ChecoutOverview;