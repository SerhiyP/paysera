const {
  roundToCents,
  processOperations,
} = require('../utils');
const transactions = require('./transactions'); // Update with your actual file name

// Describe blocks work the same way in Jest
describe('Commission Calculation Functions', () => {
  describe('roundToCents', () => {
    it('should round numbers to the nearest cent (upper bound)', () => {
      expect(roundToCents(0.023)).toBe(0.03); // Jest uses toBe for equality checks
      expect(roundToCents(1.555)).toBe(1.56);
      expect(roundToCents(10)).toBe(10); // Integers should remain unchanged
    });
  });

  describe('processTransactions', () => {
    it('should correctly process a list of transactions', () => {
      const expectedOutput = [
        0.06,
        0.90,
      ];

      const results = processOperations(transactions);

      // Check if console.log was called with the correct output
      expectedOutput.forEach((output, i) => {
        expect(results[i]).toEqual(output);
      });
    });
  });
});
