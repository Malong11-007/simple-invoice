<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { invoice, updateInvoiceInitial } from '$lib/stores/invoice';
	import { DATE_FORMATS, formatDate } from '$lib/utils/currency';
	import type { DateFormatId } from '$lib/utils/currency';

	let isDateIssuedOpen = false;
	let isDueDateOpen = false;

	function updateField(field: string, value: string | boolean) {
		invoice.update((inv) => ({ ...inv, [field]: value }));
	}

	function updateFromName(value: string) {
		invoice.update((inv) => ({ ...inv, fromName: value }));
		updateInvoiceInitial(value);
	}

	function updateMemo() {
		// paymentMemo is synced from invoiceNumber (read-only field in PaymentInstructions)
		invoice.update((inv) => ({ ...inv }));
	}

	function toggleDueDate() {
		invoice.update((inv) => ({ ...inv, showDueDate: !inv.showDueDate }));
	}

	function restoreSenderFields() {
		invoice.update((inv) => ({
			...inv,
			showFromAddress1: true,
			showFromAddress2: true,
			showFromEmail: true,
			showFromPhone: true
		}));
	}

	// Convert YYYY-MM-DD string to Date object (local time)
	function parseDate(dateStr: string): Date | null {
		if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
		const d = new Date(dateStr + 'T00:00:00');
		return isNaN(d.getTime()) ? null : d;
	}

	// Convert Date object or timestamp to YYYY-MM-DD string
	function toISODate(date: Date | number): string {
		if (date == null) return '';
		const d = date instanceof Date ? date : new Date(date);
		if (isNaN(d.getTime())) return '';
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${y}-${m}-${day}`;
	}

	// Format a YYYY-MM-DD string using the selected date format
	function formatDisplay(dateStr: string): string {
		if (!dateStr) return '';
		return formatDate(dateStr, $invoice.dateFormat);
	}
</script>

<section class="flex flex-col md:flex-row justify-between gap-4 mb-7" id="invoiceHeader">
	<!-- Left: Icon + Sender Info -->
	<div class="min-w-0 max-w-sm" style="resize: horizontal; overflow: hidden;">
		<div class="w-14 h-14 rounded-xl flex items-center justify-center mb-2 no-print" style="background-color: var(--primary-light);">
			<span class="material-symbols-outlined" style="font-size: 32px; color: var(--primary);">edit_note</span>
		</div>
		<div class="space-y-0.5">
			<input
				type="text"
				class="editable-field block text-lg font-bold text-gray-800 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.fromName}
				oninput={(e) => updateFromName(e.currentTarget.value)}
				aria-label="Your Name"
			/>
			{#if $invoice.showFromAddress1}
			<div class="flex items-center gap-1">
				<input
					type="text"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-px flex-1 min-w-0"
					value={$invoice.fromAddress1}
					oninput={(e) => updateField('fromAddress1', e.currentTarget.value)}
					aria-label="Your Address"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showFromAddress1', false)}
					title="Remove this line"
					aria-label="Remove address line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if $invoice.showFromAddress2}
			<div class="flex items-center gap-1">
				<input
					type="text"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-px flex-1 min-w-0"
					value={$invoice.fromAddress2}
					oninput={(e) => updateField('fromAddress2', e.currentTarget.value)}
					aria-label="Your City and State"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showFromAddress2', false)}
					title="Remove this line"
					aria-label="Remove city/state line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if $invoice.showFromEmail || $invoice.showFromPhone}
			<div class="mt-1 space-y-0.5">
				{#if $invoice.showFromEmail}
				<div class="flex items-center gap-1">
					<input
						type="email"
						class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-px flex-1 min-w-0"
						value={$invoice.fromEmail}
						oninput={(e) => updateField('fromEmail', e.currentTarget.value)}
						aria-label="Your Email"
					/>
					<button
						class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
						onclick={() => updateField('showFromEmail', false)}
						title="Remove this line"
						aria-label="Remove email line"
					>
						<span class="material-symbols-outlined" style="font-size:15px;">close</span>
					</button>
				</div>
				{/if}
				{#if $invoice.showFromPhone}
				<div class="flex items-center gap-1">
					<input
						type="tel"
						class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-px flex-1 min-w-0"
						value={$invoice.fromPhone}
						oninput={(e) => updateField('fromPhone', e.currentTarget.value)}
						aria-label="Your Phone"
					/>
					<button
						class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
						onclick={() => updateField('showFromPhone', false)}
						title="Remove this line"
						aria-label="Remove phone line"
					>
						<span class="material-symbols-outlined" style="font-size:15px;">close</span>
					</button>
				</div>
				{/if}
			</div>
			{/if}
			{#if !$invoice.showFromAddress1 || !$invoice.showFromAddress2 || !$invoice.showFromEmail || !$invoice.showFromPhone}
			<button
				class="no-print text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1 block"
				onclick={restoreSenderFields}
			>↺ Restore hidden fields</button>
			{/if}
		</div>
	</div>

	<!-- Right: INVOICE title + Details -->
	<div class="text-right">
		<h2 class="text-4xl font-bold mb-4" style="color: var(--primary);">INVOICE</h2>
		<div class="space-y-2">
			<div>
				<label for="invoiceNumber" class="text-xs font-semibold uppercase tracking-wider" style="color: var(--primary-muted);">Invoice Number</label>
				<input
					type="text"
					id="invoiceNumber"
					class="editable-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-52 block ml-auto"
					style="background-color: var(--primary-ultralight);"
					value={$invoice.invoiceNumber}
					oninput={(e) => {
					updateField('invoiceNumber', e.currentTarget.value);
					updateMemo();
					}}
				/>
			</div>
			<div>
				<label for="dateIssued" class="text-xs font-semibold uppercase tracking-wider" style="color: var(--primary-muted);">Date Issued</label>
				<DatePicker
					bind:isOpen={isDateIssuedOpen}
					startDate={parseDate($invoice.dateIssued)}
					onDateChange={({ startDate }: { startDate: Date | number }) => updateField('dateIssued', toISODate(startDate))}
					enableFutureDates={true}
					align="right"
					includeFont={false}
				>
					<input
						type="text"
						id="dateIssued"
						class="editable-field date-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-52 block ml-auto cursor-pointer"
						style="background-color: var(--primary-ultralight);"
						readonly
						value={formatDisplay($invoice.dateIssued)}
						onclick={() => (isDateIssuedOpen = !isDateIssuedOpen)}
						aria-label="Date Issued"
					/>
				</DatePicker>
			</div>
			{#if $invoice.showDueDate}
			<div>
				<label for="dueDate" class="text-xs font-semibold uppercase tracking-wider" style="color: var(--primary-muted);">Due Date</label>
				<DatePicker
					bind:isOpen={isDueDateOpen}
					startDate={parseDate($invoice.dueDate)}
					onDateChange={({ startDate }: { startDate: Date | number }) => updateField('dueDate', toISODate(startDate))}
					enableFutureDates={true}
					align="right"
					includeFont={false}
				>
					<input
						type="text"
						id="dueDate"
						class="editable-field date-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-52 block ml-auto cursor-pointer"
						style="background-color: var(--primary-ultralight);"
						readonly
						value={formatDisplay($invoice.dueDate)}
						onclick={() => (isDueDateOpen = !isDueDateOpen)}
						aria-label="Due Date"
					/>
				</DatePicker>
			</div>
			{/if}
			<div class="flex items-center justify-end gap-3 no-print">
				<label for="dueDateToggle" class="text-sm text-gray-500 mr-1">Show Due Date</label>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					id="dueDateToggle"
					class="toggle-track"
					class:active={$invoice.showDueDate}
					onclick={toggleDueDate}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDueDate(); }}
					role="switch"
					aria-checked={$invoice.showDueDate}
					tabindex="0"
				>
					<div class="toggle-thumb"></div>
				</div>
			</div>
			<div class="no-print">
				<label for="dateFormat" class="text-xs font-semibold uppercase tracking-wider" style="color: var(--primary-muted);">Date Format</label>
				<select
					id="dateFormat"
					class="editable-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-52 block ml-auto cursor-pointer"
					style="background-color: var(--primary-ultralight);"
					value={$invoice.dateFormat}
					onchange={(e) => updateField('dateFormat', e.currentTarget.value)}
				>
					{#each DATE_FORMATS as fmt}
						<option value={fmt.id}>{fmt.label} ({fmt.example})</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</section>
