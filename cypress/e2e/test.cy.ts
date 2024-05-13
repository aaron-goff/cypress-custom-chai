describe('Todo MVC Tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#todo-input').type('grocery shopping{enter}');
        cy.get('#todo-input').type('fold laundry{enter}');
        cy.get('#todo-input').type('pay bills{enter}');
    })

    it('validates the todo items have the correct CSS styles via cy.should', () => {
        cy.get('[data-testid="todo-item-label"]')
          .each(($el) => {
            cy.wrap($el)
              .should('have.css', 'padding', '15px 15px 15px 60px')
              .and('have.css', 'text-decoration', 'none solid rgb(72, 72, 72)');
          });    
    });
    
    it('validates the todo items have the correct CSS styles via Cypress Custom Command', () => {
        cy.get('[data-testid="todo-item-label"]')
          .each(($el) => {
            cy.wrap($el)
              .shouldBeATodoItem();
          });
    });

    it('validates the todo items have the correct CSS styles via Custom Chai chainers', () => {
        cy.get('[data-testid="todo-item-label"]')
          .each(($el) => { 
            cy.wrap($el)
              .should('be.a.todoItem');
          });
    });

    it('validates the completed todo items have the correct CSS styles via Custom Chai chainers', () => {
        cy.get('.toggle').each(($toggle) => {
            cy.wrap($toggle)
              .click();
        });
        cy.get('[data-testid="todo-item-label"]')
          .should('be.a.completedTodoItem');
    });
});