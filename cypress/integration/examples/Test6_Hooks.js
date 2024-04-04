/// <reference types="Cypress" />

describe('Performing hooks', function () {
    let testData;

    before(function () {
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

        // Note: Debugging methods
        // cy.debug()
        // cy.pause()

        // Navigate to product page
        cy.get(':nth-child(2) > .nav-link').click();

        // Select products
        testData.productName.forEach(function (productName) {
            cy.selectProduct(productName);
        });
    });
});
