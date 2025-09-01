// Currency utility for dynamic formatting
export const CURRENCY_SYMBOL = '₹'; // Indian Rupee
export const CURRENCY_CODE = 'INR';

// Function to format price with currency symbol
export const formatPrice = (price: number): string => {
  return `${CURRENCY_SYMBOL}${price.toFixed(2)}`;
};

// Function to format price without decimal places for whole numbers
export const formatPriceSimple = (price: number): string => {
  const isWholeNumber = price % 1 === 0;
  return `${CURRENCY_SYMBOL}${isWholeNumber ? price.toFixed(0) : price.toFixed(2)}`;
};

// Function to get currency symbol only
export const getCurrencySymbol = (): string => {
  return CURRENCY_SYMBOL;
};

// Function to get currency code
export const getCurrencyCode = (): string => {
  return CURRENCY_CODE;
};

// Function to convert USD to INR (basic conversion - in real app, you'd fetch from API)
export const convertToINR = (usdPrice: number, exchangeRate: number = 83): number => {
  return usdPrice * exchangeRate;
};
