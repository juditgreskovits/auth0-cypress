// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginWithAuth0', (overrides = {}) => {
  Cypress.log({
    name: 'loginWithAuth0',
  });

  const options = {
    method: 'POST',
    url: 'https://127.0.0.1:8443/authorize',
  };

  // allow us to override defaults with passed in overrides
  Cypress._.extend(options, overrides);

  cy.clearCookies();
  cy.request(options);
});
