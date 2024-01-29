class ChecoutComplete
{
    //Locators
    get = {

        completeHeader:()=> cy.get('h2[class="complete-header"]')
    }

    //Methods / Functions

    

};

export const checkoutComplete = new ChecoutComplete;