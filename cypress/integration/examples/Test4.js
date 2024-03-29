describe('Handling Alerts, Child Tabs, Web Tables, and Mouse Hover Popups', function() {

    it('Handles alerts', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Clicking on alert button and confirming alert
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()

        // Handling alert and confirmation alert
        cy.on('window:alert', (str) => {
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm', (str) => {
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
        })
    })

    it('Handles child tabs', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Opening child tab
        cy.get("#opentab").invoke('removeAttr', 'target').click()

        // Switching to child tab and performing actions
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get("#navbarSupportedContent a[href*='about']").click()
            cy.get(".mt-50 h2").should('contain', 'QAClick Academy')
        })
    })

    it('Handles web tables', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Finding and validating data in web table
        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
            const text = $e1.text()
            if (text.includes("Python")) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                    expect(priceText).not.to.equal('26')
                })
            }
        })
    })

    it('Handles mouse hover popups', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Triggering mouse hover popup by clicking
        cy.contains('Top').click({ force: true })

        // Asserting the URL after clicking
        cy.url().should('include', 'top')
    })
})
