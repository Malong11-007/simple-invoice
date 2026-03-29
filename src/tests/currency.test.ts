import { describe, it, expect } from 'vitest';
import { formatCurrency, todayISO, futureDateISO } from '$lib/utils/currency';

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
