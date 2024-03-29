describe('Web Controls Interaction', function() {

    it('Tests searching for products and adding them to cart', function() {
        // Visit the website
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")

        // Type 'ca' into search box
        cy.get('.search-keyword').type('ca')

        // Wait for 2 seconds
        cy.wait(2000)

        // Get the product list container and alias it
        cy.get('.products').as('productLocator')

        // Iterate over each product and add Cashews to cart
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                $el.find('button').click()
            }
        })

        // Click on the cart icon to view the cart
        cy.get('.cart-icon > img').click()
    })

})
