/**
 * Format a number as a currency string with the given symbol.
 */
export function formatCurrency(amount: number, symbol: string): string {
	return symbol + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get today's date as an ISO string (YYYY-MM-DD).
 */
export function todayISO(): string {
	return new Date().toISOString().split('T')[0];
}

/**
 * Get a future date as an ISO string (YYYY-MM-DD).
 */
export function futureDateISO(daysFromNow: number): string {
	const d = new Date();
	d.setDate(d.getDate() + daysFromNow);
	return d.toISOString().split('T')[0];
}
