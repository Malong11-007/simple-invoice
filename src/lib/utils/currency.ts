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

// ============================================
// Date Format Options
// ============================================

export type DateFormatId = 'iso' | 'uk' | 'us' | 'compact' | 'long';

export interface DateFormatOption {
	id: DateFormatId;
	label: string;
	example: string;
}

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export const DATE_FORMATS: DateFormatOption[] = [
	{ id: 'iso', label: 'ISO 8601', example: 'YYYY-MM-DD' },
	{ id: 'uk', label: 'UK / European', example: 'DD/MM/YYYY' },
	{ id: 'us', label: 'US', example: 'MM/DD/YYYY' },
	{ id: 'compact', label: 'Compact', example: 'YYYYMMDD' },
	{ id: 'long', label: 'Long', example: 'DD - Month - YYYY' }
];

/**
 * Format a YYYY-MM-DD date string according to the specified format.
 * Returns the original string if it cannot be parsed.
 */
export function formatDate(dateStr: string, format: DateFormatId): string {
	if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr || '';
	const [y, m, d] = dateStr.split('-');
	switch (format) {
		case 'iso':
			return `${y}-${m}-${d}`;
		case 'uk':
			return `${d}/${m}/${y}`;
		case 'us':
			return `${m}/${d}/${y}`;
		case 'compact':
			return `${y}${m}${d}`;
		case 'long': {
			const monthIndex = parseInt(m, 10) - 1;
			const monthName = MONTH_NAMES[monthIndex] ?? m;
			const dayNum = parseInt(d, 10);
			return `${dayNum} - ${monthName} - ${y}`;
		}
		default:
			return `${m}/${d}/${y}`;
	}
}
