const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:{
    authorizedUser:{
      standardUserName: "standard_user",
      standardUserPassword: "secret_sauce"
    },
    lockedUser:{
      lockedUserName: "locked_out_user",
      lockedUserPassword: "secret_sauce"
    },
    endpoint:{
      principalPage: "/inventory"
    }
  },
});
