/**
 * Invoice number generation utilities.
 *
 * Format: INV-{initial}{YYYYMM}-{sequence}
 * Example: INV-Y202603-001  (initial "Y" from name "Yellow Fellow", March 2026, sequence 001)
 */

/**
 * Extract the first letter (uppercased) from a name string.
 * Falls back to 'X' if the name is empty or has no alphabetic characters.
 */
export function getInitialFromName(name: string): string {
	const trimmed = name.trim();
	if (!trimmed) return 'X';
	// Find the first alphabetic character
	const match = trimmed.match(/[a-zA-Z]/);
	return match ? match[0].toUpperCase() : 'X';
}

/**
 * Parse an existing invoice number to extract its parts.
 * Expected format: INV-{initial}{YYYYMM}-{sequence}
 * Returns null if the format doesn't match.
 */
export function parseInvoiceNumber(invoiceNumber: string): {
	prefix: string;
	initial: string;
	yearMonth: string;
	sequence: number;
} | null {
	const match = invoiceNumber.match(/^(INV)-([A-Z])(\d{6})-(\d{3,})$/);
	if (!match) return null;
	return {
		prefix: match[1],
		initial: match[2],
		yearMonth: match[3],
		sequence: parseInt(match[4], 10)
	};
}

/**
 * Get the current year-month string in YYYYMM format.
 */
export function getCurrentYearMonth(): string {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, '0');
	return `${y}${m}`;
}

/**
 * Generate the next invoice number based on the previous one and the current user name.
 *
 * Rules:
 * - The initial is derived from the first letter of `fromName`.
 * - If the year-month has changed from the previous invoice, reset sequence to 1.
 * - If the year-month is the same, increment the sequence by 1.
 * - If the previous number can't be parsed, start fresh with sequence 001.
 */
export function generateNextInvoiceNumber(previousInvoiceNumber: string, fromName: string): string {
	const initial = getInitialFromName(fromName);
	const currentYM = getCurrentYearMonth();
	const parsed = parseInvoiceNumber(previousInvoiceNumber);

	let sequence = 1;
	if (parsed && parsed.yearMonth === currentYM) {
		sequence = parsed.sequence + 1;
	}

	const seqStr = String(sequence).padStart(3, '0');
	return `INV-${initial}${currentYM}-${seqStr}`;
}

/**
 * Generate the initial invoice number for a user.
 * Uses the current date and sequence 001.
 */
export function generateInitialInvoiceNumber(fromName: string): string {
	const initial = getInitialFromName(fromName);
	const currentYM = getCurrentYearMonth();
	return `INV-${initial}${currentYM}-001`;
}
