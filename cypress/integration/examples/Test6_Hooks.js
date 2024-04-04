/// <reference types="Cypress" />

describe('Performing hooks', () => {
    let testData;

    before(() => {
        // Load test data before each test
        cy.fixture('example').then((data) => {
            testData = data;
        });
    });

    it('tests with collecting data from fixtures', () => {
        cy.visit("https://rahulshettyacademy.com/angularpractice/");

        // Fill out the form with test data
        cy.get('input[name="name"]:nth-child(2)').type(testData.name);
        cy.get('select').select(testData.gender);

        // Adding assertions to validate form input
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', testData.name);
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2');
        cy.get('#inlineRadio3').should('be.disabled');

        // Navigate to product page and select a product by using commands
        cy.get(':nth-child(2) > .nav-link').click();
        cy.selectProduct('BlackBerry');
    });
});
