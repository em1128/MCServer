// inpa.tistory.com/entry/Cypress-Studio-더욱-간편해진-웹-테스트-자동화-툴

describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('ClickButton', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:5000');
    cy.get(':nth-child(3) > a').click();
    cy.get('#check-server').click();
    cy.get(':nth-child(2) > a').click();
    cy.get(':nth-child(1) > a').click();
    cy.get('#backup-world').click();
    cy.get('.server-control').click();
    cy.get('#run-mcserver').click();
    /* ==== End Cypress Studio ==== */
  });
})