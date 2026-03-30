<script lang="ts">
	import { invoice } from '$lib/stores/invoice';

	function updateField(field: string, value: string | boolean) {
		invoice.update((inv) => ({ ...inv, [field]: value }));
	}

	function restoreBillToFields() {
		invoice.update((inv) => ({
			...inv,
			showBillToContact: true,
			showBillToAddress1: true,
			showBillToAddress2: true,
			showBillToEmail: true
		}));
	}
</script>

<section class="mt-8 mb-10" id="billToSection">
	<div class="rounded-2xl p-4 max-w-sm" style="background-color: var(--primary-ultralight); border: 1px solid var(--primary-faint);">
		<h4 class="text-xs font-semibold uppercase tracking-wider mb-3" style="color: var(--primary-muted);">Bill To</h4>
		<div class="space-y-1">
			<input
				type="text"
				class="editable-field block text-lg font-bold text-gray-800 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.billToCompany}
				oninput={(e) => updateField('billToCompany', e.currentTarget.value)}
				aria-label="Client Company Name"
			/>
			{#if $invoice.showBillToContact}
			<div class="flex items-center gap-1">
				<input
					type="text"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 flex-1 min-w-0"
					value={$invoice.billToContact}
					oninput={(e) => updateField('billToContact', e.currentTarget.value)}
					aria-label="Client Contact Person"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showBillToContact', false)}
					title="Remove this line"
					aria-label="Remove contact line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if $invoice.showBillToAddress1}
			<div class="flex items-center gap-1">
				<input
					type="text"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 flex-1 min-w-0"
					value={$invoice.billToAddress1}
					oninput={(e) => updateField('billToAddress1', e.currentTarget.value)}
					aria-label="Client Address"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showBillToAddress1', false)}
					title="Remove this line"
					aria-label="Remove address line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if $invoice.showBillToAddress2}
			<div class="flex items-center gap-1">
				<input
					type="text"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 flex-1 min-w-0"
					value={$invoice.billToAddress2}
					oninput={(e) => updateField('billToAddress2', e.currentTarget.value)}
					aria-label="Client City and State"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showBillToAddress2', false)}
					title="Remove this line"
					aria-label="Remove city/state line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if $invoice.showBillToEmail}
			<div class="flex items-center gap-1">
				<input
					type="email"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 flex-1 min-w-0"
					value={$invoice.billToEmail}
					oninput={(e) => updateField('billToEmail', e.currentTarget.value)}
					aria-label="Client Email"
				/>
				<button
					class="no-print shrink-0 text-gray-300 hover:text-red-400 transition-colors rounded p-0.5"
					onclick={() => updateField('showBillToEmail', false)}
					title="Remove this line"
					aria-label="Remove email line"
				>
					<span class="material-symbols-outlined" style="font-size:15px;">close</span>
				</button>
			</div>
			{/if}
			{#if !$invoice.showBillToContact || !$invoice.showBillToAddress1 || !$invoice.showBillToAddress2 || !$invoice.showBillToEmail}
			<button
				class="no-print text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1 block"
				onclick={restoreBillToFields}
			>↺ Restore hidden fields</button>
			{/if}
		</div>
	</div>
</section>
