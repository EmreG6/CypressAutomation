/// <reference types="Cypress" />

describe('Handling Web Controls', function() {

    it('Handles checkboxes', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Checking and unchecking checkboxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option1','option2']) // Checking multiple checkboxes with array
    })

    it('Handles static dropdowns by using select command', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Selecting options from static dropdown
        cy.get('select').select('option2')
        cy.get('select').select('option1').should('have.value','option1')  // Assertion
        cy.get('select').select('option1').should('not.have.value','option2')  // Assertion
    })

    it('Handles dynamic dropdowns with each command iteration', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Typing into dynamic dropdown and selecting option
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === "India") {
                $el.click()
            }
        })
        cy.get('#autocomplete').should('have.value','India')  // Assertion
        cy.get('#autocomplete').should('not.have.value','Netherlands')  // Assertion
    })

    it('Handles visible and invisible elements by using assertions', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Checking visibility of elements
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('Checks the radio button', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Checking radio button
        cy.get('[value="radio2"]').check().should('be.checked')
    })
})
