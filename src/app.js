const fs = require('fs');

// Function to round to the nearest cent (upper bound)
const roundToCents = (amount) => Math.ceil(amount * 100) / 100;

// Function to calculate cash in commission fee
const calculateCashInCommission = (amount) => {
  const commissionFee = Math.min(0.0003 * amount, 5.00);
  return roundToCents(commissionFee);
};

// Function to calculate cash out commission fee for natural persons
const calculateCashOutCommissionNatural = (amount, userWeeklyOperations) => {
  const commissionValue = 0.3 / 100;
  const commissionFee = 0;
  const freeAmount = 1000.00; // Free allowance per week

  if (userWeeklyOperations + amount < freeAmount) {
    return commissionFee;
  }

  if (userWeeklyOperations > freeAmount) {
    return roundToCents(amount * commissionValue);
  }

  const amountToFee = (userWeeklyOperations + amount) - freeAmount;

  return roundToCents(amountToFee * commissionValue);
};

// Function to calculate cash out commission fee for legal persons
const calculateCashOutCommissionJuridical = (amount) => {
  const commissionFee = Math.max(0.003 * amount, 0.50);
  return roundToCents(commissionFee);
};

function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

// Function to process the operations
const processOperations = (operations) => {
  // Store user weekly operations for tracking free allowance
  const userWeeklyOperations = {};

  return operations.map((operation) => {
    const {
      date, user_id: id, user_type: userType, type, operation: { amount },
    } = operation;
    const weekYear = `${new Date(date).getFullYear()}-W${getWeekNumber(new Date(date))}`;

    // Initialize user's weekly data if not already initialized
    if (!userWeeklyOperations[id]) {
      userWeeklyOperations[id] = {};
    }
    if (!userWeeklyOperations[id][weekYear]) {
      userWeeklyOperations[id][weekYear] = 0;
    }

    let commissionFee = 0;
    if (type === 'cash_in') {
      commissionFee = calculateCashInCommission(amount);
    } else if (type === 'cash_out') {
      if (userType === 'natural') {
        // Pass the array of user's weekly operations to track free allowance
        commissionFee = calculateCashOutCommissionNatural(
          amount,
          userWeeklyOperations[id][weekYear],
        );

        // Add current operation details to the weekly operations array
        userWeeklyOperations[id][weekYear] += amount;
      } else if (userType === 'juridical') {
        commissionFee = calculateCashOutCommissionJuridical(amount);
      }
    }

    return commissionFee;
  });
};

// Get the input filename from command line arguments
const inputFilename = process.argv[2];

// Check if input file is provided
if (!inputFilename) {
  console.error('Error: Input file not specified.');
  console.error('Usage: node app.js <input_file.json>');
  process.exit(1);
}

// Read the input JSON file
try {
  const inputData = JSON.parse(fs.readFileSync(inputFilename, 'utf8'));

  // Process the operations and get the output
  const outputData = processOperations(inputData);

  // Output each commission fee on a new line
  outputData.forEach((commission) => console.log(commission));
} catch (error) {
  console.error('Error reading or parsing the input file:', error);
  process.exit(1);
}
