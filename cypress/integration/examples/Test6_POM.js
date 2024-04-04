/// <reference types="Cypress" />
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";

describe('Performing hooks in POM', () => {
    let testData;

    before(() => {
        cy.fixture('example').then((data) => {
            testData = data;
        });
    });

    it('tests with collecting data from fixtures', () => {
        Cypress.config('defaultCommandTimeout',8000) // Specify the waiting duration for this test (explicit time out)
        const homePage = new HomePage();
        const productPage = new ProductPage();

        cy.visit("https://rahulshettyacademy.com/angularpractice/");

        // Fill out the form with test data
        const { name, gender, productName } = testData; // Destructuring
        homePage.getNameInput().type(name);
        homePage.getGenderDropdown().select(gender);

        // Adding assertions to validate form input
        homePage.getDataBindingElement().should('have.value', name);
        homePage.getNameInput().should('have.attr', 'minlength', '2');
        homePage.getEntrepreneurRadioButton().should('be.disabled');

        // Navigate to product page
        homePage.getShopTab().click();

        // Select products using custom command
        productName.forEach(product => cy.selectProduct(product));

        // Validations and check-out operations
        productPage.checkoutButton().click()

        // Navigate to checkout page
        cy.contains('Checkout').click();

        // Fill out country field
        cy.get('#country').type('Netherlands');
        cy.get(".suggestions > ul > li > a").click();

        // Agree to terms and conditions
        cy.get('#checkbox2').check({force: true});

        // Submit order
        cy.get('input[type="submit"]').click();

        // Verify order confirmation message
        cy.get('.alert').then($element => {
            const actualText = $element.text();
            expect(actualText.includes("Success")).to.be.true;
        });

    });
});
