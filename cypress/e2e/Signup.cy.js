const timestamp = Date.now();
const email = `testuser${timestamp}@gmail.com`;

describe("Create an Accouunt", () => {
  beforeEach(() => {
    cy.fixture("formData").as("formData");
  });
  it("Should signup and create an account", () => {
    cy.get("@formData").then((formData) => {
      cy.visit("/");

      const typeInput = (selector, value) => cy.get(selector).type(value);
      const typeSelect = (selector, value) => cy.get(selector).select(value);

      cy.get('.navbar-nav a[href="/login"]').click();

      //Initial Signup
      typeInput('input[data-qa="signup-name"]', formData.full_name);
      typeInput('input[data-qa="signup-email"]', email);
      cy.get('button[data-qa="signup-button"]').click();

      //Account Information
      cy.get('input[value="Mr"]').click();
      typeInput('form[action="/signup"] input[data-qa="password"]',formData.password);
      typeSelect('.form-group select[data-qa="days"]', formData.days);
      typeSelect('.form-group select[data-qa="months"]', formData.months);
      typeSelect('.form-group select[data-qa="years"]', formData.years);

      //Promo Newsletter Options
      cy.get('.checker input[name="newsletter"]').should("be.visible").check();
      cy.get('.checker input[name="optin"]').should("be.visible").check();

      //Address Information
      typeInput('.required input[data-qa="first_name"]', formData.first_name);
      typeInput('.required input[data-qa="last_name"]', formData.last_name);
      typeInput('.form-group input[data-qa="company"]', formData.country);
      typeInput('.required input[data-qa="address"]', formData.address);
      typeSelect('.required select[data-qa="country"]', formData.country);
      typeInput('.required input[data-qa="state"]', formData.state);
      typeInput('.required input[data-qa="city"]', formData.city);
      typeInput('.required input[data-qa="zipcode"]', formData.zip);
      typeInput('.required input[data-qa="mobile_number"]', formData.mobile);
      cy.get('button[data-qa="create-account"]').click();

      //Verify Account was created
      cy.url().should("include", "account_created");
      cy.contains("Account Created").should("be.visible");
    });
  });
});
