class Login
{
    //Locators
    get = {
        usernameInput:()=> cy.get('[placeholder="Username"]'),
        passwordInput:()=> cy.get('[placeholder="Password"]'),
        loginButton:()=> cy.get('[name="login-button"]'),
        lockedError:()=> cy.get('h3[data-test="error"]')
    }
    

    //Functions / Methods
    enterUserName(username)
    {
        username && this.get.usernameInput().type(username)
    }

    enterPassword(password)
    {
        password && this.get.passwordInput().type(password),{log:false}
    }

    clickLoginButton()
    {
        this.get.loginButton().click()
    }

};

export const login = new Login;