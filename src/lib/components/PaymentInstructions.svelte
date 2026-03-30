<script lang="ts">
	import {
		invoice,
		paymentFields,
		addPaymentField,
		removePaymentField,
		updatePaymentField
	} from '$lib/stores/invoice';
</script>

<div class="flex-1">
	<div class="rounded-2xl p-6 print-bg" style="background-color: var(--primary-ultralight);">
		<h4 class="font-semibold text-gray-700 flex items-center gap-2 mb-4">
			<span class="material-symbols-outlined" style="color: var(--primary);">account_balance</span>
			Payment Instructions
		</h4>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each $paymentFields as field (field.id)}
			<div class="relative group">
				<div class="flex items-center gap-1 mb-1">
					<input
						type="text"
						class="text-xs font-medium text-gray-500 bg-transparent border-none outline-none w-full cursor-text"
						value={field.label}
						oninput={(e) => updatePaymentField(field.id, 'label', e.currentTarget.value)}
						aria-label="Field label"
					/>
					<button
						class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
						onclick={() => removePaymentField(field.id)}
						title="Remove this field"
						aria-label="Remove {field.label} field"
					>
						<span class="material-symbols-outlined" style="font-size:15px;">close</span>
					</button>
				</div>
				<input
					type="text"
					class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm"
					placeholder="Enter {field.label.toLowerCase()}"
					value={field.value}
					oninput={(e) => updatePaymentField(field.id, 'value', e.currentTarget.value)}
					aria-label={field.label}
				/>
			</div>
			{/each}

			{#if $invoice.showPaymentMemo}
			<div class="relative">
				<div class="flex items-center gap-1 mb-1">
					<span class="text-xs font-medium text-gray-500 flex-1">Payment Memo / Reference</span>
					<button
						class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
						onclick={() => invoice.update((inv) => ({ ...inv, showPaymentMemo: false }))}
						title="Remove this field"
						aria-label="Remove payment memo field"
					>
						<span class="material-symbols-outlined" style="font-size:15px;">close</span>
					</button>
				</div>
				<input
					type="text"
					class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm"
					value={$invoice.invoiceNumber}
					aria-label="Payment Memo"
					readonly
				/>
			</div>
			{/if}
		</div>

		<div class="no-print mt-4 flex items-center gap-3 flex-wrap">
			<button
				onclick={addPaymentField}
				class="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl border transition-colors text-gray-600 hover:bg-gray-50"
				style="border-color: var(--primary-faint);"
			>
				<span class="material-symbols-outlined" style="font-size:16px; color: var(--primary);">add</span>
				Add Field
			</button>
			{#if !$invoice.showPaymentMemo}
			<button
				onclick={() => invoice.update((inv) => ({ ...inv, showPaymentMemo: true }))}
				class="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl border transition-colors text-gray-600 hover:bg-gray-50"
				style="border-color: var(--primary-faint);"
			>
				<span class="material-symbols-outlined" style="font-size:16px; color: var(--primary);">visibility</span>
				Show Memo
			</button>
			{/if}
		</div>

		{#if $invoice.showPaymentNote}
		<div class="mt-4">
			<div class="flex items-center gap-1 mb-1">
				<label for="noteField" class="text-xs font-medium text-gray-500 flex-1">Note</label>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => invoice.update((inv) => ({ ...inv, showPaymentNote: false }))}
					title="Remove note"
					aria-label="Remove note field"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			<textarea
				id="noteField"
				rows="3"
				class="w-full bg-white rounded-2xl p-4 text-sm focus:outline-none editable-field"
				style="border: 1px solid var(--accent-border);"
				placeholder="Enter additional note here..."
				value={$invoice.note}
				oninput={(e) => invoice.update((inv) => ({ ...inv, note: (e.currentTarget as HTMLTextAreaElement).value }))}
			></textarea>
		</div>
		{:else}
		<button
			class="no-print text-xs text-gray-400 hover:text-gray-600 transition-colors mt-4 block"
			onclick={() => invoice.update((inv) => ({ ...inv, showPaymentNote: true }))}
		>↺ Restore note</button>
		{/if}
	</div>
</div>
