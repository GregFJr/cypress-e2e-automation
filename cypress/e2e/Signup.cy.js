const timestamp = Date.now();
const email = `testuser${timestamp}@gmail.com`;
const password = 'password1234'
const testForm = {
    fullName: 'Test Name',
    firstName: 'Test',
    lastName: 'Name',
    company: 'The Company',
    address: '0101 Test Blvd',
    country: 'United States', 
    state: 'Arizona',
    city: 'Phoenix',
    zipcode: '55555',
    mobile: '555-555-5555'


}
const dates = {
    days: 27,
    months: 9,
    years: '1990',
}

describe('Create an Accouunt', () => {
    it('Should signup and create an account', () => {
        cy.visit('/');

        const typeInput = (selector, value) => cy.get(selector).type(value);
        const typeSelect = (selector, value) => cy.get(selector).select(value);

        cy.get('.navbar-nav a[href="/login"]').click();
        //Initial Signup
        typeInput('input[data-qa="signup-name"]', testForm.fullName)
        typeInput('input[data-qa="signup-email"]', email);
        cy.get('button[data-qa="signup-button"]').click();

        //Account Information
        cy.get('input[value="Mr"]').click();
        typeInput('form[action="/signup"] input[data-qa="password"]', password);
        typeSelect('.form-group select[data-qa="days"]', dates.days);
        typeSelect('.form-group select[data-qa="months"]', dates.months);
        typeSelect('.form-group select[data-qa="years"]', dates.years);

        //Promo Newsletter Options
        cy.get('.checker input[name="newsletter"]').should('be.visible').check();
        cy.get('.checker input[name="optin"]').should('be.visible').check();

        //Address Information
        typeInput('.required input[data-qa="first_name"]', testForm.firstName);
        typeInput('.required input[data-qa="last_name"]', testForm.lastName);
        typeInput('.form-group input[data-qa="company"]', testForm.country)
        typeInput('.required input[data-qa="address"]', testForm.address);
        typeSelect('.required select[data-qa="country"]', testForm.country);
        typeInput('.required input[data-qa="state"]', testForm.state);
        typeInput('.required input[data-qa="city"]', testForm.city);
        typeInput('.required input[data-qa="zipcode"]', testForm.zipcode);
        typeInput('.required input[data-qa="mobile_number"]', testForm.mobile);
        cy.get('button[data-qa="create-account"]').click();

        //Verify Account was created
        cy.url().should('include', 'account_created');
        cy.contains('Account Created').should('be.visible');




    }) 
})