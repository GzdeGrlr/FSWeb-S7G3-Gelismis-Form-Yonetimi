describe("Open the webpage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("finds an element", () => {
    cy.get("#name").should("have.value", "");
  });

  it("finds an element", () => {
    cy.get("#email").should("have.value", "");
  });

  it("finds an element", () => {
    cy.get("#password").should("have.value", "");
  });
  it("finds an element", () => {
    cy.get("#terms").should("not.be.checked");
  });

  it("finds an element", () => {
    cy.get(".cy-submit").should("be.disabled");
  });

  it("checks for false conditions ", () => {
    cy.contains("Name");
    cy.get("#name").click().type("Gözde").should("have.value", "Gözde");

    cy.contains("Email");
    cy.get("input[type=email]")
      .click()
      .type("ggurlerebay.com")
      .should("have.value", "ggurlerebay.com");
    cy.wait(2000);
    cy.get(".cy-mailError").should(
      "include.text",
      "this must be a valid email"
    );

    cy.contains("Password");
    cy.get("#password").click().type("abcde").should("have.value", "abcde");
    cy.wait(2000);
    cy.get(".cy-passwordError").should(
      "include.text",
      "Password must be at least 6 characters"
    );

    cy.get("#terms").check();

    cy.get(".cy-submit").should("be.disabled");
  });

  it("checks for true conditions", () => {
    cy.contains("Name");
    cy.get("#name")
      .click()
      .type("Gözde Gürler")
      .should("have.value", "Gözde Gürler");

    cy.contains("Email");
    cy.get("input[type=email]")
      .click()
      .type("ggurler@ebay.com")
      .should("have.value", "ggurler@ebay.com");

    cy.contains("Password");
    cy.get("#password").click().type("abcdef").should("have.value", "abcdef");

    cy.get("#terms").check();

    cy.get(".cy-submit").click();
    cy.wait(1000);
    cy.get(".cy-uyeDiv").should("be.visible");
  });
});

// it("Check for some conditions", () => {
//   cy.visit("http://localhost:3000/");

//

// it("finds an element", () => {
//   cy.visit("http://localhost:3000/");
//   cy.contains("Email");
//   cy.get("#email").type("olalala").should("have.value", "olalala");
// });

// cy.get(“selector”).should(“be.checked”)

// cy.get('button[type=submit]').click()

//     cy.log('**redirects to /confirm**')
//     cy.location('pathname').should('equal', '/confirm')
