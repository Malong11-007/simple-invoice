<script lang="ts">
	import { invoice } from '$lib/stores/invoice';

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
				<input
					type="date"
					id="dateIssued"
					class="editable-field date-field rounded-2xl px-3 py-2 text-sm font-semibold block ml-auto"
					style="background-color: var(--primary-ultralight);"
					value={$invoice.dateIssued}
					oninput={(e) => updateField('dateIssued', e.currentTarget.value)}
				/>
			</div>
			{#if $invoice.showDueDate}
				<div>
					<label for="dueDate" class="text-xs font-semibold uppercase tracking-wider" style="color: var(--primary-muted);">Due Date</label>
					<input
						type="date"
						id="dueDate"
						class="editable-field date-field rounded-2xl px-3 py-2 text-sm font-semibold block ml-auto"
						style="background-color: var(--primary-ultralight);"
						value={$invoice.dueDate}
						oninput={(e) => updateField('dueDate', e.currentTarget.value)}
					/>
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
