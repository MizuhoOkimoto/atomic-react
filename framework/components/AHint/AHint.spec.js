context("AHint", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/extend/hint");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Hint 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Hint 2"
    );
  });
});
