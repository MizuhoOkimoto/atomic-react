context("ATabs", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-tabs--usage-1&viewMode=docs"
    );
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(0)
      .focus()
      .tab();
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(1)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("has appropriate roles", () => {
    cy.get("#story--components-tabs--usage-1 .a-tab-group")
      .eq(0)
      .should("have.attr", "role", "tablist");
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "role", "tab")
      .should("have.attr", "aria-selected", "false");
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "role", "tab")
      .should("have.attr", "aria-selected", "true");
  });

  it("controlled selects/deselects appropriately", () => {
    cy.get("#story--components-tabs--usage-2 .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
    cy.get("#story--components-tabs--usage-2 .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "aria-selected", "false")
      .type("{enter}")
      .should("have.attr", "aria-selected", "true");
    cy.get("#story--components-tabs--usage-2 .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false");
  });

  it("uncontrolled selects/deselects appropriately", () => {
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "aria-selected", "false")
      .type("{enter}")
      .should("have.attr", "aria-selected", "true");
    cy.get("#story--components-tabs--usage-1 .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-tabs--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tab--usage-1");

    cy.get("#story--components-tabs--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tab--variants-1");

    cy.get("#story--components-tabs--variants-2")
      .parent()
      .parent()
      .matchImageSnapshot("a-tab--variants-2");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-tabs--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tab--dusk-1");

    cy.get("#story--components-tabs--variants-2")
      .parent()
      .parent()
      .matchImageSnapshot("a-tab--dusk-2");
  });
});
