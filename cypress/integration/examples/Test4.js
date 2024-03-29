describe('handling alerts', function() {

    it('handles alerts',function() {
        // cypress auto accepts alerts and pop-ups
        // cypress have capability browser events
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        // window:alert is the event which get fired on alert open
        cy.on('window:alert',(str) =>
        {
            // assertions come from Mocha
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm',(str) =>
        {
            // assertions come from Mocha
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
        })
    })

    it('handles child tabs',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // cy.get("#opentab").click() #opens browser in another tab
        cy.get("#opentab").invoke('removeAttr','target').click()
        cy.origin("https://www.qaclickacademy.com",()=>
       {
        cy.get("#navbarSupportedContent a[href*='about']").click()
        cy.get(".mt-50 h2").should('contain','QAClick Academy')
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
        // cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({force: true})
        cy.url().should('include','top')
    })



})