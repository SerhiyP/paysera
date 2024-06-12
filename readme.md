# Commission Calculator

This Node.js application calculates commission fees for transactions based on a provided JSON input file. The calculator handles both "cash in" and "cash out" operations for natural and legal persons, applying specific rules and weekly limits.

## Requirements

- Node.js (v14 or higher recommended)

## Installation

   ```bash
   npm install
   ```

## Usage

1. **Input Data:**
    - Provide transaction data in a JSON file (e.g., `input.json`). The file should contain an array of objects, with each object representing a transaction:
      ```json
      [
        {
          "date": "2023-12-01",
          "user_id": 1,
          "user_type": "natural",
          "type": "cash_in",
          "operation": {
            "amount": 200,
            "currency": "EUR"
          }
        }
      ]
      ```

2. **Run the Application:**
   ```bash
   node app.js input.json
   ```
   Replace `input.json` with the name of your input file.

3. **Output:**
    - The calculated commission fee for each transaction will be printed to the console, each on a new line.

## Running Tests

This project uses Jest for testing. To run the tests:

```bash
npm test
```

## Commission Rules

**Cash In:**

- Commission fee: 0.03% of the total amount.
- Maximum commission fee: 5.00 EUR.

**Cash Out:**

**Natural Persons:**

- 1000.00 EUR per week (Monday to Sunday) is free of charge.
- Commission fee: 0.3% of the amount exceeding the free allowance.

**Legal Persons:**

- Commission fee: 0.3% of the amount.
- Minimum commission fee: 0.50 EUR per operation.

**Rounding:**

- Commission fees are rounded up to the nearest cent (0.01 EUR).

## Code Structure

- `app.js`: Contains the main application logic, including commission calculation functions and transaction processing.
- `__tests__`: Contains the Jest test suite for the application. 
