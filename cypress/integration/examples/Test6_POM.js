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

        // Validations for check-out
        productPage.checkoutButton().click();
    });
});
