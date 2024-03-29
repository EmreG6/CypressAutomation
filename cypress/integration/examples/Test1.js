it('My First Test case', function() {
    // Visit the website
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")

    // Type 'ca' into the search box
    cy.get('.search-keyword').type('ca')

    // Wait for 2 seconds
    cy.wait(2000)

    // Assert the number of visible products
    cy.get('.product').should('have.length', 5)
    cy.get('.product:visible').should('have.length', 4)

    // Alias the product list container
    cy.get('.products').as('productLocator')

    // Assert the number of products using the alias
    cy.get('@productLocator').find('.product').should('have.length', 4)

    // Click on the button of the third product
    cy.get(':nth-child(3) > .product-action > button').click()

    // Click on the "ADD TO CART" button of the third product using alias
    cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function() {
        console.log('Clicked on ADD TO CART button of the third product')
    })

    // Loop through each product, find Cashews, and click its button
    cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text()
        if (textVeg.includes('Cashews')) {
            $el.find('button').click()
        }
    })

    // Assert if the logo text is correctly displayed
    cy.get('.brand').should('have.text', 'GREENKART')

    // Log the logo text
    cy.get('.brand').then(function(logoelement) {
        cy.log(logoelement.text())
    })
})
