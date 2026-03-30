<script lang="ts">
	import { invoice } from '$lib/stores/invoice';

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLSelectElement;
		invoice.update((inv) => ({ ...inv, currencySymbol: target.value }));
	}
</script>

<section class="flex items-center gap-3 mb-6 no-print">
	<label for="currencySelect" class="text-sm font-medium text-gray-600">Display Currency:</label>
	<select
		id="currencySelect"
		value={$invoice.currencySymbol}
		onchange={handleChange}
		class="bg-white rounded-2xl px-4 py-2 text-sm font-medium focus:outline-none"
		style="border: 1px solid var(--accent-border);"
	>
		<option value="$">USD ($)</option>
		<option value="£">GBP (£)</option>
		<option value="€">EUR (€)</option>
	</select>
</section>
