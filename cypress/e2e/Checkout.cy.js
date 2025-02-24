const randomDate = Date.now();

describe("User Checkout", () => {

  beforeEach(() => {
    cy.fixture("formData").as("formData");
  });

  it("Should Test User Flow Of Adding and Checking Out", function () {
    cy.visit("/");

    cy.get('@formData').then((formData) => {
      const rngMonth = Math.floor(Math.random() * 12) + 1;
      const rngDay = Math.floor(Math.random() * 31) + 1; 
      
    //Add Multiple Items To Cart
    const addCart = (selector,index, value) => cy.get(selector).eq(index).find(value).click();

    addCart(".features_items .productinfo",0,".add-to-cart");
    cy.get('.modal-footer button[data-dismiss="modal"]').click();
    addCart(".features_items .productinfo",3,".add-to-cart");
    cy.get('.modal-footer button[data-dismiss="modal"]').click();
    addCart(".features_items .productinfo",4,".add-to-cart");
    cy.get('.modal-footer button[data-dismiss="modal"]').click();
    addCart(".features_items .productinfo",5,".add-to-cart");

    //Navigate to Cart and Checkout
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.get(".container .check_out").click();
    cy.get('.modal-body a[href="/login"]').click();

    // Signup If User Doesn't Exists
    cy.get('input[data-qa="signup-name"]').type(formData.first_name);
    cy.get('input[data-qa="signup-email"]').type(formData.email);
    cy.get('form[action="/signup"] button[data-qa="signup-button"]').click();

    //Signin If the User Does Exists And Return Back To Cart
    cy.get("body").then((body) => {
      if (body.text().includes("Email Address already exist!")) {
        //signin
        cy.get('input[data-qa="login-email"]').type("Butthurts@email.com");
        cy.get('input[data-qa="login-password"]').type("password123");
        cy.get('button[data-qa="login-button"]').click();
      } else {
        //Continue to Signup
        cy.get('.radio-inline .radio input[value="Mr"]').click();
        cy.get('.required input[data-qa="password"]').type(formData.password);
        cy.get('.selector select[data-qa="days"]').select(rngDay);
        cy.get('.selector select[data-qa="months"]').select(rngMonth);
        cy.get('.selector select[data-qa="years"]').select('1990');
        cy.get('.checkbox .checker input[name="newsletter"]').click();
        cy.get('.checkbox .checker input[name="optin"]').click();
        //Additional Info For Signup
        cy.get('.required input[data-qa="first_name"]').type(formData.first_name);
        cy.get('.required input[data-qa="last_name"]').type(formData.last_name);
        cy.get('.form-group input[data-qa="company"]').type(formData.company);
        cy.get('.required input[data-qa="address"]').type(formData.address);
        cy.get('.required select[data-qa="country"]').select(formData.country);
        cy.get('.required input[data-qa="state"]').type(formData.state);
        cy.get('.required input[data-qa="city"]').type(formData.city);
        cy.get('.required input[data-qa="zipcode"]').type(formData.zip);
        cy.get('.required input[data-qa="mobile_number"]').type(formData.mobile);
        cy.get('.login-form button[type="submit"]').click();
      }
    });

    //Redirecting Back to Cart
    cy.get('.navbar-nav a[href="/view_cart"]').click();

    cy.get('.container .check_out').click();

    cy.get('#ordermsg .form-control').type('This is a random message');

    cy.get('.check_out').contains('Place Order').click();

    //Inputting Credit Card info

    cy.get('form[action="/payment"] input[data-qa="name-on-card"]' ).type(formData.full_name);
    cy.get('form[action="/payment"] input[data-qa="card-number"]' ).type(formData.card_number);
    cy.get('form[action="/payment"] input[data-qa="cvc"]' ).type(formData.cvc);
    cy.get('form[action="/payment"] input[data-qa="expiry-month"]' ).type(rngMonth);
    cy.get('form[action="/payment"] input[data-qa="expiry-year"]' ).type('2027');

    //pay
    cy.get('Button[data-qa="pay-button"]').click();
    
    //Verify Successful Payment
    cy.url().should('include', 'payment_done');
    cy.contains('Order Placed!').should('be.visible');
  })
    
  });
});
