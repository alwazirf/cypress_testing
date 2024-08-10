describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    const dataForm = "alwaz@gmail.com";
    const dataFail = "alwaz@gmail.con";
    cy.contains(/testing forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input");
    cy.get("@subscribe-input").type(`${dataForm}`);
    cy.contains(new RegExp(`Successfully subbed: ${dataForm}`, "i")).should(
      "not.exist"
    );
    cy.getDataTest("subscribe-button").click();
    cy.contains(new RegExp(`Successfully subbed: ${dataForm}`, "i")).should(
      "exist"
    );
    cy.wait(3000);
    cy.contains(new RegExp(`Successfully subbed: ${dataForm}`, "i")).should(
      "not.exist"
    );

    cy.get("@subscribe-input").type(`${dataFail}`);
    cy.getDataTest("subscribe-button").click();
    cy.contains(new RegExp(`invalid email: ${dataFail}`, "i")).should("exist");
  });
});
