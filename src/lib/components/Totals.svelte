<script lang="ts">
	import { invoice, subtotal, taxAmount, totalDue } from '$lib/stores/invoice';
	import { formatCurrency } from '$lib/utils/currency';

	function toggleTax() {
		invoice.update((inv) => ({ ...inv, includeTax: !inv.includeTax }));
	}

	function handleTaxRateChange(e: Event) {
		const target = e.currentTarget as HTMLSelectElement;
		invoice.update((inv) => ({ ...inv, taxRateSelect: target.value }));
	}

	function handleCustomTaxChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		invoice.update((inv) => ({ ...inv, customTaxRate: target.value }));
	}
</script>

<div class="w-full lg:w-80">
	<div class="rounded-2xl p-6 space-y-4" style="background-color: var(--primary-ultralight);">
		<div class="flex justify-between items-center">
			<span class="text-sm text-gray-500">Subtotal</span>
			<span class="text-sm font-semibold text-gray-700">{formatCurrency($subtotal, $invoice.currencySymbol)}</span>
		</div>

		<div class="flex items-center justify-between no-print">
			<label for="taxToggle" class="text-sm text-gray-500">Include Tax</label>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				id="taxToggle"
				class="toggle-track"
				class:active={$invoice.includeTax}
				onclick={toggleTax}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTax(); }}
				role="switch"
				aria-checked={$invoice.includeTax}
				tabindex="0"
			>
				<div class="toggle-thumb"></div>
			</div>
		</div>

		{#if $invoice.includeTax}
			<div>
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<span class="text-sm text-gray-500">Tax Rate</span>
						<select
							value={$invoice.taxRateSelect}
							onchange={handleTaxRateChange}
							class="bg-white rounded-xl px-3 py-1 text-sm focus:outline-none"
							style="border: 1px solid var(--accent-border);"
						>
							<option value="0">0%</option>
							<option value="5">5%</option>
							<option value="8">8%</option>
							<option value="10">10%</option>
							<option value="custom">Custom %</option>
						</select>
						{#if $invoice.taxRateSelect === 'custom'}
							<input
								type="number"
								min="0"
								max="100"
								step="0.01"
								class="w-20 bg-white rounded-xl px-3 py-1 text-sm focus:outline-none"
								style="border: 1px solid var(--accent-border);"
								placeholder="%"
								value={$invoice.customTaxRate}
								oninput={handleCustomTaxChange}
							/>
						{/if}
					</div>
					<span class="text-sm font-semibold text-gray-700">{formatCurrency($taxAmount, $invoice.currencySymbol)}</span>
				</div>
			</div>
		{/if}

		<hr style="border-color: var(--accent-border);" />

		<div class="flex justify-between items-center">
			<span class="text-lg font-bold text-gray-800">Total Due</span>
			<span class="text-lg font-bold" style="color: var(--primary);">{formatCurrency($totalDue, $invoice.currencySymbol)}</span>
		</div>
	</div>
</div>
