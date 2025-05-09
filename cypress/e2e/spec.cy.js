/* globals describe, cy, it */

describe("Succesfull login", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.get("#username").type("admin");
    cy.get("#password").type(1234);
    cy.wait(1000);
    cy.get(".sc-gDpztx").click();
  });
});
describe("Wrong login", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.get("#username").type("admin123");
    cy.get("#password").type(5678);
    cy.wait(1000);
    cy.get(".sc-gDpztx").click();
  });
});
