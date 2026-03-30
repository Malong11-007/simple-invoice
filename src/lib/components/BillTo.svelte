<script lang="ts">
	import { invoice } from '$lib/stores/invoice';

	function updateField(field: string, value: string) {
		invoice.update((inv) => ({ ...inv, [field]: value }));
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
			<input
				type="text"
				class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.billToContact}
				oninput={(e) => updateField('billToContact', e.currentTarget.value)}
				aria-label="Client Contact Person"
			/>
			<input
				type="text"
				class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.billToAddress1}
				oninput={(e) => updateField('billToAddress1', e.currentTarget.value)}
				aria-label="Client Address"
			/>
			<input
				type="text"
				class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
				value={$invoice.billToAddress2}
				oninput={(e) => updateField('billToAddress2', e.currentTarget.value)}
				aria-label="Client City and State"
			/>
			<div class="mt-2">
				<input
					type="email"
					class="editable-field block text-sm text-gray-500 bg-transparent rounded-lg px-2 py-0.5 w-full"
					value={$invoice.billToEmail}
					oninput={(e) => updateField('billToEmail', e.currentTarget.value)}
					aria-label="Client Email"
				/>
			</div>
		</div>
	</div>
</section>
