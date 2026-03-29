import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'editorialLedger';

// ============================================
// Types
// ============================================

export interface LineItem {
	id: number;
	title: string;
	description: string;
	qty: number;
	rate: number;
}

export interface InvoiceData {
	invoiceNumber: string;
	dateIssued: string;
	dueDate: string;
	currencySymbol: string;
	showDueDate: boolean;
	includeTax: boolean;
	taxRateSelect: string;
	customTaxRate: string;
	note: string;
	fromName: string;
	fromAddress1: string;
	fromAddress2: string;
	fromEmail: string;
	fromPhone: string;
	billToCompany: string;
	billToContact: string;
	billToAddress1: string;
	billToAddress2: string;
	billToEmail: string;
}

// ============================================
// Default values
// ============================================

function getDefaults(): InvoiceData {
	const today = new Date();
	const todayStr = today.toISOString().split('T')[0];
	const due = new Date(today);
	due.setDate(due.getDate() + 30);
	const dueStr = due.toISOString().split('T')[0];

	return {
		invoiceNumber: 'INV-Y2403-001',
		dateIssued: todayStr,
		dueDate: dueStr,
		currencySymbol: '$',
		showDueDate: true,
		includeTax: false,
		taxRateSelect: '0',
		customTaxRate: '',
		note: 'Payment is due upon receipt. Please include the invoice number as a reference with your payment.',
		fromName: 'Your Name',
		fromAddress1: '123 Street Address',
		fromAddress2: 'City, State 12345',
		fromEmail: 'your@email.com',
		fromPhone: '+1 (555) 000-0000',
		billToCompany: 'Client Company Name',
		billToContact: 'Contact Person',
		billToAddress1: 'Company Address',
		billToAddress2: 'City, State 12345',
		billToEmail: 'billing@company.com'
	};
}

// ============================================
// Load from localStorage
// ============================================

function loadFromStorage(): InvoiceData {
	const defaults = getDefaults();
	if (!browser) return defaults;

	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return defaults;
		const data = JSON.parse(saved);
		return { ...defaults, ...data };
	} catch {
		return defaults;
	}
}

// ============================================
// Stores
// ============================================

export const invoice = writable<InvoiceData>(loadFromStorage());

let nextId = 1;

function createInitialLineItem(): LineItem {
	return { id: nextId++, title: '', description: '', qty: 1, rate: 0 };
}

export const lineItems = writable<LineItem[]>([createInitialLineItem()]);

// ============================================
// Derived: calculations
// ============================================

export const subtotal = derived(lineItems, ($lineItems) => {
	return $lineItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
});

export const taxRate = derived(invoice, ($invoice) => {
	if (!$invoice.includeTax) return 0;
	if ($invoice.taxRateSelect === 'custom') {
		return parseFloat($invoice.customTaxRate) || 0;
	}
	return parseFloat($invoice.taxRateSelect) || 0;
});

export const taxAmount = derived([subtotal, taxRate], ([$subtotal, $taxRate]) => {
	return $subtotal * ($taxRate / 100);
});

export const totalDue = derived([subtotal, taxAmount], ([$subtotal, $taxAmount]) => {
	return $subtotal + $taxAmount;
});

// ============================================
// Actions
// ============================================

export function addLineItem(): void {
	lineItems.update((items) => [...items, { id: nextId++, title: '', description: '', qty: 1, rate: 0 }]);
}

export function removeLineItem(id: number): void {
	lineItems.update((items) => {
		if (items.length <= 1) return items;
		return items.filter((item) => item.id !== id);
	});
}

export function updateLineItem(id: number, field: keyof LineItem, value: string | number): void {
	lineItems.update((items) =>
		items.map((item) => {
			if (item.id !== id) return item;
			return { ...item, [field]: value };
		})
	);
}

// ============================================
// Persistence: auto-save on changes
// ============================================

if (browser) {
	invoice.subscribe(($invoice) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify($invoice));
		} catch {
			// Storage not available
		}
	});
}
