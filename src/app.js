const fs = require('fs');
const { processOperations } = require('./utils');

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
