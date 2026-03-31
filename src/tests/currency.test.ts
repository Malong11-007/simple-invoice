import { describe, it, expect } from 'vitest';
import { formatCurrency, todayISO, futureDateISO, formatDate, DATE_FORMATS } from '$lib/utils/currency';
import type { DateFormatId } from '$lib/utils/currency';

describe('formatCurrency', () => {
	it('formats zero with dollar sign', () => {
		expect(formatCurrency(0, '$')).toBe('$0.00');
	});

	it('formats a whole number', () => {
		expect(formatCurrency(100, '$')).toBe('$100.00');
	});

	it('formats with thousands separator', () => {
		expect(formatCurrency(1234.56, '$')).toBe('$1,234.56');
	});

	it('formats large numbers', () => {
		expect(formatCurrency(1000000, '€')).toBe('€1,000,000.00');
	});

	it('uses provided currency symbol', () => {
		expect(formatCurrency(50, '£')).toBe('£50.00');
		expect(formatCurrency(50, '€')).toBe('€50.00');
	});

	it('rounds to two decimal places', () => {
		expect(formatCurrency(10.999, '$')).toBe('$11.00');
		expect(formatCurrency(10.001, '$')).toBe('$10.00');
	});
});

describe('todayISO', () => {
	it('returns a valid date string in YYYY-MM-DD format', () => {
		const result = todayISO();
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe('futureDateISO', () => {
	it('returns a date 30 days in the future', () => {
		const result = futureDateISO(30);
		const expected = new Date();
		expected.setDate(expected.getDate() + 30);
		expect(result).toBe(expected.toISOString().split('T')[0]);
	});

	it('returns today for 0 days', () => {
		const result = futureDateISO(0);
		expect(result).toBe(todayISO());
	});
});

describe('formatDate', () => {
	it('formats as ISO 8601 (YYYY-MM-DD)', () => {
		expect(formatDate('2025-10-01', 'iso')).toBe('2025-10-01');
	});

	it('formats as UK/European (DD/MM/YYYY)', () => {
		expect(formatDate('2025-10-01', 'uk')).toBe('01/10/2025');
	});

	it('formats as US (MM/DD/YYYY)', () => {
		expect(formatDate('2025-10-01', 'us')).toBe('10/01/2025');
	});

	it('formats as compact (YYYYMMDD)', () => {
		expect(formatDate('2025-10-01', 'compact')).toBe('20251001');
	});

	it('formats as long (DD - Month - YYYY)', () => {
		expect(formatDate('2026-03-21', 'long')).toBe('21 - March - 2026');
	});

	it('handles single-digit day in long format', () => {
		expect(formatDate('2025-01-05', 'long')).toBe('5 - January - 2025');
	});

	it('returns empty string for empty input', () => {
		expect(formatDate('', 'us')).toBe('');
	});

	it('returns original string for invalid date format', () => {
		expect(formatDate('not-a-date', 'us')).toBe('not-a-date');
	});

	it('handles all months in long format', () => {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];
		months.forEach((name, i) => {
			const m = String(i + 1).padStart(2, '0');
			expect(formatDate(`2025-${m}-15`, 'long')).toBe(`15 - ${name} - 2025`);
		});
	});
});

describe('DATE_FORMATS', () => {
	it('has 5 format options', () => {
		expect(DATE_FORMATS).toHaveLength(5);
	});

	it('includes all expected format ids', () => {
		const ids = DATE_FORMATS.map((f) => f.id);
		expect(ids).toEqual(['iso', 'uk', 'us', 'compact', 'long']);
	});
});
