/**
 * Utility functions for currency formatting
 */

/**
 * Formats a number to Indonesian Rupiah with proper thousand separators
 * @param value - The numeric value or string to format
 * @returns Formatted currency string (e.g., "Rp 25.000.000")
 */
export function formatRupiah(value: number | string): string {
  // Convert to number if string
  const numValue = typeof value === 'string' ? 
    parseFloat(value.replace(/[^\d]/g, '')) : value;
  
  // Handle invalid numbers
  if (isNaN(numValue)) return 'Rp 0';
  
  // Format with Indonesian thousand separators (dots)
  const formatted = numValue.toLocaleString('id-ID');
  
  return `Rp ${formatted}`;
}

/**
 * Formats cryptocurrency values with proper separators
 * @param value - The crypto value
 * @param symbol - The crypto symbol (e.g., 'BTC', 'ETH')
 * @returns Formatted crypto string
 */
export function formatCrypto(value: number | string, symbol: string): string {
  const numValue = typeof value === 'string' ? 
    parseFloat(value.replace(/[^\d.]/g, '')) : value;
  
  if (isNaN(numValue)) return `0 ${symbol}`;
  
  // For crypto, use standard comma separators
  const formatted = numValue.toLocaleString('en-US', {
    minimumFractionDigits: numValue < 1 ? 8 : 2,
    maximumFractionDigits: numValue < 1 ? 8 : 2
  });
  
  return `${formatted} ${symbol}`;
}
