/**
 * Utility functions for consistent number and currency formatting
 */

// Format number with Indonesian thousands separator (titik) - SSR safe
export function formatNumber(num: number): string {
  // Use consistent formatting that works the same on server and client
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Format number with Indonesian thousands separator (titik) - legacy
export function formatNumberLocale(num: number): string {
  return num.toLocaleString('id-ID')
}

// Format currency in Rupiah with consistent formatting
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

// Format large numbers with appropriate suffix (Jt, M, etc.)
export function formatLargeNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace('.', ',')} Milyar`
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace('.', ',')} Juta`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace('.', ',')} Ribu`
  }
  return num.toString()
}

// Format currency with large number suffix for display
export function formatRupiahLarge(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1).replace('.', ',')} M`
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1).replace('.', ',')} Jt`
  }
  return formatRupiah(amount)
}

// Format volume for display (always show full number for transparency)
export function formatVolume(amount: number): string {
  return formatRupiah(amount)
}

// Format activity count
export function formatActivity(count: number): string {
  return formatNumber(count)
}

// Format date consistently (Indonesian format)
export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Format date short (for compact displays)
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1).replace('.', ',')}%`
}
