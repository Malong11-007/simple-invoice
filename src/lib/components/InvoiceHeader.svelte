<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { invoice } from '$lib/stores/invoice';

	let isDateIssuedOpen = false;
	let isDueDateOpen = false;

	function updateField(field: string, value: string) {
		invoice.update((inv) => ({ ...inv, [field]: value }));
	}

	function updateMemo() {
		// paymentMemo is synced from invoiceNumber (read-only field in PaymentInstructions)
		invoice.update((inv) => ({ ...inv }));
	}

	function toggleDueDate() {
		invoice.update((inv) => ({ ...inv, showDueDate: !inv.showDueDate }));
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

	// Format a YYYY-MM-DD string as MM/DD/YYYY for display
	function formatDisplay(dateStr: string): string {
		if (!dateStr) return '';
		const d = parseDate(dateStr);
		if (!d) return dateStr;
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${m}/${day}/${d.getFullYear()}`;
	}
</script>

<section class="flex flex-col md:flex-row justify-between gap-4 mb-7" id="invoiceHeader">
	<!-- Left: Icon + Sender Info -->
	<div>
		<div class="w-14 h-14 rounded-xl flex items-center justify-center mb-2" style="background-color: var(--primary-light);">
			<span class="material-symbols-outlined" style="font-size: 32px; color: var(--primary);">edit_note</span>
		</div>
		<div class="space-y-1">
			<input
				type="text"
				class="editable-field block text-lg font-bold text-gray-800 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.fromName}
				oninput={(e) => updateField('fromName', e.currentTarget.value)}
				aria-label="Your Name"
			/>
			<input
				type="text"
				class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.fromAddress1}
				oninput={(e) => updateField('fromAddress1', e.currentTarget.value)}
				aria-label="Your Address"
			/>
			<input
				type="text"
				class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.fromAddress2}
				oninput={(e) => updateField('fromAddress2', e.currentTarget.value)}
				aria-label="Your City and State"
			/>
			<div class="mt-2 space-y-1">
				<input
					type="email"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
					value={$invoice.fromEmail}
					oninput={(e) => updateField('fromEmail', e.currentTarget.value)}
					aria-label="Your Email"
				/>
				<input
					type="tel"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
					value={$invoice.fromPhone}
					oninput={(e) => updateField('fromPhone', e.currentTarget.value)}
					aria-label="Your Phone"
				/>
			</div>
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
					class="editable-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-44 block ml-auto"
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
						class="editable-field date-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-44 block ml-auto cursor-pointer"
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
						class="editable-field date-field rounded-2xl px-4 py-2 text-sm font-semibold text-right w-44 block ml-auto cursor-pointer"
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
		</div>
	</div>
</section>
