const {
  roundToCents,
  processOperations,
  calculateCashOutCommissionNatural,
} = require('../utils');
const transactions = require('../__mock__/transactions'); // Update with your actual file name

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

  describe('calculateCashOutCommissionNatural', () => {
    it('should apply no commission if total weekly amount is below the free allowance', () => {
      expect(calculateCashOutCommissionNatural(200, 300)).toBe(0);
      expect(calculateCashOutCommissionNatural(500, 0)).toBe(0);
    });

    it('should apply commission to the full amount if weekly amount is already above the free allowance', () => {
      expect(calculateCashOutCommissionNatural(200, 1200)).toBe(0.60);
      expect(calculateCashOutCommissionNatural(500, 1500)).toBe(1.50);
    });

    it('should apply commission only to the amount exceeding the free allowance', () => {
      expect(calculateCashOutCommissionNatural(500, 700)).toBe(0.6);
      expect(calculateCashOutCommissionNatural(2000, 800)).toBe(5.4);
    });
  });
});
