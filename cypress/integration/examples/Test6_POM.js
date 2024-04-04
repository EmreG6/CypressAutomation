/// <reference types="Cypress" />
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";

describe('Performing hooks in POM', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('example').then((data) => {
            testData = data;
        });
    });

    it('tests with collecting data from fixtures', () => {
        Cypress.config('defaultCommandTimeout', 8000); // Specify the waiting duration for this test (explicit time out)
        const homePage = new HomePage();
        const productPage = new ProductPage();

        cy.visit(Cypress.env('url')+"/angularpractice/")

        // Destructure test data
        const { name, gender, productName } = testData;

        // Fill out the form with test data
        homePage.getNameInput().type(name);
        homePage.getGenderDropdown().select(gender);

        // Adding assertions to validate form input
        homePage.getDataBindingElement().should('have.value', name);
        homePage.getNameInput().should('have.attr', 'minlength', '2');
        homePage.getEntrepreneurRadioButton().should('be.disabled');

        // Navigate to product page
        homePage.getShopTab().click();

        // Select products using custom command
        cy.wrap(productName).each(product => cy.selectProduct(product));

        // Consolidate checkout steps
        productPage.checkoutButton().click();
        cy.contains('Checkout').click();
        cy.get('#country').type('Netherlands');
        cy.get(".suggestions > ul > li > a").click();
        cy.get('#checkbox2').check({force: true});
        cy.get('input[type="submit"]').click();

        // Verify order confirmation message
        cy.get('.alert').should('contain.text', "Success");
    });
});
