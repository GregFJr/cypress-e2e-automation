# E-Commerce Cypress Test Suite

## Overview
This repository contains an **end-to-end (E2E) Cypress test suite** for an e-commerce website. The test suite automates the user flow, including adding items to the cart, signing up or logging in, checking out, and verifying a successful order placement.

## Tech Stack
- **Cypress**: JavaScript-based testing framework
- **Mocha**: Test runner
- **Chai**: Assertion library

## Test Scenarios
### **1. User Checkout Flow**
- Visit the homepage
- Add multiple items to the cart
- Proceed to checkout
- Sign up (or log in if the user already exists)
- Enter shipping details
- Place the order
- Verify successful payment and order confirmation

## Installation & Setup
### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Setup**
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/ecommerce-cypress-tests.git
   cd ecommerce-cypress-tests
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

## Running Tests
### **Open Cypress Test Runner**
```sh
npx cypress open
```
Then, select the test file and run it through the Cypress GUI.

### **Run Tests in Headless Mode**
```sh
npx cypress run
```
This runs all tests in headless mode using the default browser.

## Test Data
The test suite uses **fixtures** to load dynamic test data from `cypress/fixtures/formData.json`. You can modify this file to customize user details for testing.

## File Structure
```
/ecommerce-cypress-tests
│── cypress/
│   ├── fixtures/
│   │   ├── formData.json  # Test data (e.g., user details)
│   ├── integration/
│   │   ├── checkout.spec.js  # User checkout flow test
│   ├── support/
│   │   ├── commands.js  # Custom Cypress commands (if any)
│── cypress.json  # Cypress configuration file
│── package.json  # Dependencies & scripts
```

## Future Improvements
- Add more negative test cases
- Implement data-driven testing
- Integrate with CI/CD pipelines

## Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new test case"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---
Made with ❤️ using Cypress 🚀

