/**
 * Converts USD to INR using a fixed exchange rate.
 * @param {number} usd - The amount in USD.
 * @returns {number} The equivalent amount in INR.
 */
export const convertUSDToINR = (usd) => {
  const exchangeRate = 83; // 1 USD ≈ 83 INR
  const result = usd * exchangeRate;
  console.log(`Currency: Converting ${usd} USD to ${result} INR`);
  return result;
};

/**
 * Parses a formatted INR string to a number.
 * @param {string} inrString - The formatted INR string, e.g., "₹1,999".
 * @returns {number} The numeric value.
 */
export const parseINR = (inrString) => {
  if (typeof inrString !== 'string') return 0;
  // Remove ₹ symbol and commas, then parse as float
  const numericString = inrString.replace(/₹/g, '').replace(/,/g, '');
  const parsed = parseFloat(numericString);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats a number to a formatted INR string.
 * @param {number} amount - The numeric amount.
 * @returns {string} The formatted INR string, e.g., "₹1,999".
 */
export const formatINR = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  // Format with commas for thousands
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
};