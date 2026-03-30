import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { generateInitialInvoiceNumber, generateNextInvoiceNumber, getInitialFromName, parseInvoiceNumber } from '$lib/utils/invoiceNumber';

const STORAGE_KEY = 'editorialLedger';
const PAYMENT_FIELDS_KEY = 'editorialLedger_payment';
const LAST_INVOICE_KEY = 'editorialLedger_lastInvoice';

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

export interface PaymentField {
	id: string;
	label: string;
	value: string;
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
	// Visibility flags – sender info
	showFromAddress1: boolean;
	showFromAddress2: boolean;
	showFromEmail: boolean;
	showFromPhone: boolean;
	// Visibility flags – bill-to
	showBillToContact: boolean;
	showBillToAddress1: boolean;
	showBillToAddress2: boolean;
	showBillToEmail: boolean;
	// Visibility flags – payment section
	showPaymentMemo: boolean;
	showPaymentNote: boolean;
}

// ============================================
// Default values
// ============================================

const DEFAULT_BILL_TO = {
	billToCompany: 'Client Company Name',
	billToContact: 'Contact Person',
	billToAddress1: 'Company Address',
	billToAddress2: 'City, State 12345',
	billToEmail: 'billing@company.com'
};

const DEFAULT_NOTE = 'Payment is due upon receipt. Please include the invoice number as a reference with your payment.';

function getDefaults(): InvoiceData {
	const today = new Date();
	const todayStr = today.toISOString().split('T')[0];
	const due = new Date(today);
	due.setDate(due.getDate() + 30);
	const dueStr = due.toISOString().split('T')[0];
	const defaultName = 'Your Name';

	return {
		invoiceNumber: generateInitialInvoiceNumber(defaultName),
		dateIssued: todayStr,
		dueDate: dueStr,
		currencySymbol: '$',
		showDueDate: true,
		includeTax: false,
		taxRateSelect: '0',
		customTaxRate: '',
		note: DEFAULT_NOTE,
		fromName: defaultName,
		fromAddress1: '123 Street Address',
		fromAddress2: 'City, State 12345',
		fromEmail: 'your@email.com',
		fromPhone: '+1 (555) 000-0000',
		...DEFAULT_BILL_TO,
		// Visibility defaults – all shown
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

/**
 * Create a new invoice with auto-incremented number.
 * Saves the current invoice number as the "last" before generating the next one.
 * Resets line items and dates while preserving sender/payment info.
 */
export function newInvoice(): void {
	const current = get(invoice);

	// Save current invoice number as the last generated one
	if (browser) {
		try {
			localStorage.setItem(LAST_INVOICE_KEY, current.invoiceNumber);
		} catch {
			// Storage not available
		}
	}

	const nextNumber = generateNextInvoiceNumber(current.invoiceNumber, current.fromName);
	const today = new Date();
	const todayStr = today.toISOString().split('T')[0];
	const due = new Date(today);
	due.setDate(due.getDate() + 30);
	const dueStr = due.toISOString().split('T')[0];

	invoice.update((inv) => ({
		...inv,
		invoiceNumber: nextNumber,
		dateIssued: todayStr,
		dueDate: dueStr,
		...DEFAULT_BILL_TO,
		note: DEFAULT_NOTE
	}));

	// Reset line items
	lineItems.set([{ id: nextId++, title: '', description: '', qty: 1, rate: 0 }]);
}

/**
 * Update the invoice number initial when the from-name changes.
 * Only updates if the current invoice number follows the expected format.
 */
export function updateInvoiceInitial(newName: string): void {
	const initial = getInitialFromName(newName);
	invoice.update((inv) => {
		const parsed = parseInvoiceNumber(inv.invoiceNumber);
		if (!parsed) return inv;
		const seqStr = String(parsed.sequence).padStart(3, '0');
		return { ...inv, invoiceNumber: `INV-${initial}${parsed.yearMonth}-${seqStr}` };
	});
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

// ============================================
// Payment fields store (dynamic, persisted)
// ============================================

const DEFAULT_PAYMENT_FIELDS: PaymentField[] = [
	{ id: 'bankName', label: 'Bank Name', value: '' },
	{ id: 'accountHolder', label: 'Account Holder', value: '' },
	{ id: 'routingNumber', label: 'Routing Number', value: '' },
	{ id: 'accountNumber', label: 'Account Number', value: '' },
	{ id: 'accountType', label: 'Account Type', value: '' }
];

function loadPaymentFields(): PaymentField[] {
	if (!browser) return DEFAULT_PAYMENT_FIELDS;
	try {
		const saved = localStorage.getItem(PAYMENT_FIELDS_KEY);
		if (!saved) return DEFAULT_PAYMENT_FIELDS;
		const parsed = JSON.parse(saved);
		return Array.isArray(parsed) ? parsed : DEFAULT_PAYMENT_FIELDS;
	} catch {
		return DEFAULT_PAYMENT_FIELDS;
	}
}

export const paymentFields = writable<PaymentField[]>(loadPaymentFields());

if (browser) {
	paymentFields.subscribe(($fields) => {
		try {
			localStorage.setItem(PAYMENT_FIELDS_KEY, JSON.stringify($fields));
		} catch {
			// Storage not available
		}
	});
}

export function addPaymentField(): void {
	paymentFields.update((fields) => [
		...fields,
		{ id: `custom_${Date.now()}`, label: 'New Field', value: '' }
	]);
}

export function removePaymentField(id: string): void {
	paymentFields.update((fields) => fields.filter((f) => f.id !== id));
}

export function updatePaymentField(id: string, key: 'label' | 'value', value: string): void {
	paymentFields.update((fields) =>
		fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
	);
}
