import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	invoice,
	lineItems,
	subtotal,
	taxAmount,
	totalDue,
	addLineItem,
	removeLineItem,
	updateLineItem
} from '$lib/stores/invoice';

describe('invoice store', () => {
	beforeEach(() => {
		// Reset to defaults
		invoice.set({
			invoiceNumber: 'INV-TEST-001',
			dateIssued: '2024-01-01',
			dueDate: '2024-01-31',
			currencySymbol: '$',
			showDueDate: true,
			includeTax: false,
			taxRateSelect: '0',
			customTaxRate: '',
			note: 'Test note',
			fromName: 'Test Name',
			fromAddress1: '123 Test St',
			fromAddress2: 'Test City, TS 12345',
			fromEmail: 'test@test.com',
			fromPhone: '+1 555 0000',
			billToCompany: 'Client Co',
			billToContact: 'Contact Person',
			billToAddress1: 'Client Address',
			billToAddress2: 'Client City, CS 67890',
			billToEmail: 'client@test.com',
			showFromAddress1: true,
			showFromAddress2: true,
			showFromEmail: true,
			showFromPhone: true,
			showBillToContact: true,
			showBillToAddress1: true,
			showBillToAddress2: true,
			showBillToEmail: true,
			showPaymentMemo: true,
			showPaymentNote: true
		});
		lineItems.set([{ id: 1, title: '', description: '', qty: 1, rate: 0 }]);
	});

	it('has correct default currency symbol', () => {
		expect(get(invoice).currencySymbol).toBe('$');
	});

	it('calculates subtotal from line items', () => {
		updateLineItem(1, 'qty', 2);
		updateLineItem(1, 'rate', 50);
		expect(get(subtotal)).toBe(100);
	});

	it('calculates subtotal with multiple items', () => {
		updateLineItem(1, 'qty', 2);
		updateLineItem(1, 'rate', 50);
		addLineItem();
		const items = get(lineItems);
		const newId = items[items.length - 1].id;
		updateLineItem(newId, 'qty', 3);
		updateLineItem(newId, 'rate', 25);
		expect(get(subtotal)).toBe(175);
	});

	it('adds line items', () => {
		addLineItem();
		expect(get(lineItems).length).toBe(2);
	});

	it('removes line items but keeps at least one', () => {
		addLineItem();
		expect(get(lineItems).length).toBe(2);
		const firstId = get(lineItems)[0].id;
		removeLineItem(firstId);
		expect(get(lineItems).length).toBe(1);
	});

	it('does not remove the last line item', () => {
		const firstId = get(lineItems)[0].id;
		removeLineItem(firstId);
		expect(get(lineItems).length).toBe(1);
	});

	it('calculates tax when enabled', () => {
		updateLineItem(1, 'qty', 1);
		updateLineItem(1, 'rate', 100);
		invoice.update((inv) => ({ ...inv, includeTax: true, taxRateSelect: '10' }));
		expect(get(taxAmount)).toBe(10);
		expect(get(totalDue)).toBe(110);
	});

	it('calculates custom tax rate', () => {
		updateLineItem(1, 'qty', 1);
		updateLineItem(1, 'rate', 200);
		invoice.update((inv) => ({
			...inv,
			includeTax: true,
			taxRateSelect: 'custom',
			customTaxRate: '7.5'
		}));
		expect(get(taxAmount)).toBe(15);
		expect(get(totalDue)).toBe(215);
	});

	it('does not apply tax when disabled', () => {
		updateLineItem(1, 'qty', 1);
		updateLineItem(1, 'rate', 100);
		invoice.update((inv) => ({ ...inv, includeTax: false, taxRateSelect: '10' }));
		expect(get(taxAmount)).toBe(0);
		expect(get(totalDue)).toBe(100);
	});

	it('updates line item fields', () => {
		updateLineItem(1, 'title', 'Test Item');
		updateLineItem(1, 'description', 'Test Description');
		const items = get(lineItems);
		expect(items[0].title).toBe('Test Item');
		expect(items[0].description).toBe('Test Description');
	});
});
