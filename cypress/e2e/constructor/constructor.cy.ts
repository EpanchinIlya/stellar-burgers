/// <reference types="cypress" />

describe('add ingredients to constructor works correctly', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('should add bun', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i (низ)')
      .should('exist');
  });

  it('should add ingredient', function () {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  it('should open and close modal', function () {
    cy.get('[data-cy=bun-ingredients]')
      .contains('Краторная булка N-200i')
      .click();

    cy.get('[data-cy=modal-ingredient]')
      .contains('Детали ингредиента')
      .should('exist');

    cy.get('[data-cy=closeButton]').click();
    cy.get('[data-cy=modal-ingredient]').should('not.exist');
  });

  it('should open and close on overlay modal ', function () {
    cy.get('[data-cy=bun-ingredients]')
      .contains('Краторная булка N-200i')
      .click();

    cy.get('[data-cy=modal-ingredient]')
      .contains('Детали ингредиента')
      .should('exist');

    cy.get('[data-cy=closeButton]').trigger('click', {
      clientX: 100,
      clientY: -100
    });
    cy.get('[data-cy=modal-ingredient]').should('not.exist');
  });
});
