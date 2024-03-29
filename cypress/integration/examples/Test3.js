/// <reference types="Cypress" />

describe('handling web controls', function() {

    it('handles checkboxes',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //cy.get('input[type="checkbox"]').check([1]) // it may check desired option with the array
        cy.get('input[type="checkbox"]').check(['option1','option2']) // it may check desired option with the array
    })

    it('handles static dropdowns by using select command',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('select').select('option2')
        cy.get('select').select('option1')
        cy.get('select').select('option1').should('have.value','option1')  //assertion
        cy.get('select').select('option1').should('not.have.value','option2')  //assertion
    })

    it('handles dynamic dropdowns with each command iteration',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text()==="India")
                {
                    $el.click()
                }
        })
        cy.get('#autocomplete').should('have.value','India')  //assertion
        cy.get('#autocomplete').should('not.have.value','Netherlands')
    })

    it('handles visible and invisible elements by using assertions',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('checks the radio button',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('[value="radio2"]').check().should('be.checked')
    })
})



