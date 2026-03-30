import { describe, it, expect } from 'vitest';
import {
	getInitialFromName,
	parseInvoiceNumber,
	getCurrentYearMonth,
	generateNextInvoiceNumber,
	generateInitialInvoiceNumber
} from '$lib/utils/invoiceNumber';

describe('getInitialFromName', () => {
	it('returns first letter uppercased from a simple name', () => {
		expect(getInitialFromName('Yellow Fellow')).toBe('Y');
	});

	it('returns first letter uppercased from a lowercase name', () => {
		expect(getInitialFromName('john doe')).toBe('J');
	});

	it('returns X for an empty string', () => {
		expect(getInitialFromName('')).toBe('X');
	});

	it('returns X for whitespace-only string', () => {
		expect(getInitialFromName('   ')).toBe('X');
	});

	it('returns X for a string with no alphabetic characters', () => {
		expect(getInitialFromName('123 456')).toBe('X');
	});

	it('skips leading non-alpha characters', () => {
		expect(getInitialFromName('  123 Alice')).toBe('A');
	});

	it('handles single character name', () => {
		expect(getInitialFromName('m')).toBe('M');
	});
});

describe('parseInvoiceNumber', () => {
	it('parses a valid invoice number', () => {
		const result = parseInvoiceNumber('INV-Y202603-001');
		expect(result).toEqual({
			prefix: 'INV',
			initial: 'Y',
			yearMonth: '202603',
			sequence: 1
		});
	});

	it('parses a high sequence number', () => {
		const result = parseInvoiceNumber('INV-A202501-123');
		expect(result).toEqual({
			prefix: 'INV',
			initial: 'A',
			yearMonth: '202501',
			sequence: 123
		});
	});

	it('returns null for invalid format', () => {
		expect(parseInvoiceNumber('INVOICE-001')).toBeNull();
		expect(parseInvoiceNumber('INV-Y2403-001')).toBeNull(); // only 4-digit yearMonth
		expect(parseInvoiceNumber('')).toBeNull();
		expect(parseInvoiceNumber('random text')).toBeNull();
	});

	it('returns null for lowercase initial', () => {
		expect(parseInvoiceNumber('INV-y202603-001')).toBeNull();
	});
});

describe('getCurrentYearMonth', () => {
	it('returns a 6-digit string', () => {
		const result = getCurrentYearMonth();
		expect(result).toMatch(/^\d{6}$/);
	});

	it('returns current year and month', () => {
		const now = new Date();
		const expected =
			now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, '0');
		expect(getCurrentYearMonth()).toBe(expected);
	});
});

describe('generateNextInvoiceNumber', () => {
	it('increments sequence when same month', () => {
		const ym = getCurrentYearMonth();
		const result = generateNextInvoiceNumber(`INV-Y${ym}-001`, 'Yellow Fellow');
		expect(result).toBe(`INV-Y${ym}-002`);
	});

	it('resets sequence when month changes', () => {
		// Use a year-month that is definitely not the current one
		const result = generateNextInvoiceNumber('INV-Y200001-005', 'Yellow Fellow');
		const ym = getCurrentYearMonth();
		expect(result).toBe(`INV-Y${ym}-001`);
	});

	it('uses initial from the provided name', () => {
		const ym = getCurrentYearMonth();
		const result = generateNextInvoiceNumber(`INV-A${ym}-003`, 'Bob Smith');
		expect(result).toBe(`INV-B${ym}-004`);
	});

	it('handles unparseable previous number by starting at 001', () => {
		const ym = getCurrentYearMonth();
		const result = generateNextInvoiceNumber('CUSTOM-123', 'Alice');
		expect(result).toBe(`INV-A${ym}-001`);
	});

	it('handles high sequence numbers', () => {
		const ym = getCurrentYearMonth();
		const result = generateNextInvoiceNumber(`INV-Z${ym}-999`, 'Zara');
		expect(result).toBe(`INV-Z${ym}-1000`);
	});
});

describe('generateInitialInvoiceNumber', () => {
	it('generates with correct initial and sequence 001', () => {
		const result = generateInitialInvoiceNumber('Yellow Fellow');
		const now = new Date();
		const ym = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, '0');
		expect(result).toBe(`INV-Y${ym}-001`);
	});

	it('uses X for empty name', () => {
		const result = generateInitialInvoiceNumber('');
		expect(result).toMatch(/^INV-X\d{6}-001$/);
	});
});
