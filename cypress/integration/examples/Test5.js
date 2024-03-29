/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Automating Frames and Calendars', function() {

    it('Handles frames', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Wait for frame to load
        cy.frameLoaded('#courses-iframe')

        // Interacting with elements inside frame
        cy.iframe().find("a[href*='mentorship']").eq(0).click()

        // Assertions within frame
        cy.wait(500) // Waiting for elements to load
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })

    it('Tests calendars', function() {
        // Test data for calendar date
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber, date, year];

        // Visiting the page
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        cy.wait(500) // Wait for elements to load

        // Interacting with the calendar
        cy.get(".react-date-picker__inputGroup").click();
        cy.get(".react-calendar__navigation__label").click().click(); // Navigating to the desired year
        cy.contains("button", year).click(); // Selecting the desired year
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click(); // Selecting the desired month
        cy.contains("abbr", date).click(); // Selecting the desired date

        // Assertions for selected date
        cy.get(".react-date-picker__inputGroup__input").each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', expectedList[index]);
        })
    })
})
