describe('Various examples', () => {
  beforeEach(() => {
    cy.visit('/examples');
  });
  it('multi-page testing', () => {
    cy.getDataTest('nav-why-cypress').click();
    cy.location('pathname').should('equal', '/');

    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should('equal', '/overview');

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should('equal', '/fundamentals');

    cy.getDataTest('nav-examples').click();
    cy.location('pathname').should('equal', '/examples');
  });

  it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      statusCode: 200,
      fixture: 'example.json',
    });
    cy.getDataTest('post-button').click();
  });

  it.only('grudge', () => {
    cy.contains(/add some grudge/i);

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some grudge');
    });
    cy.getDataTest('grudge-button').click();

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('grudge 2');
    });
    cy.getDataTest('grudge-button').click();
    cy.contains(/grudges/i).should('exist');

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li')
        .its(0)
        .within(() => {
          cy.get('button').click();
        });
    });

    const buttonClear = cy.getDataTest('grudge-clear-list');

    if (buttonClear) {
      buttonClear.click();
      cy.contains(/add some grudge/i).should('exist');
    }
  });
});
