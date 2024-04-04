class HomePage {
    // Get the input box for entering name
    getNameInput() {
        return cy.get('input[name="name"]:nth-child(2)');
    }

    // Get the element for displaying two-way data binding result
    getDataBindingElement() {
        return cy.get(':nth-child(4) > .ng-untouched');
    }

    // Get the dropdown element for selecting gender
    getGenderDropdown() {
        return cy.get('select');
    }

    // Get the radio button for selecting entrepreneur option
    getEntrepreneurRadioButton() {
        return cy.get('#inlineRadio3');
    }

    // Get the 'Shop' tab element
    getShopTab() {
        return cy.get(':nth-child(2) > .nav-link');
    }
}

// Makes this file readable for all
export default HomePage;
