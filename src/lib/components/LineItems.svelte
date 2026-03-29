<script lang="ts">
	import { invoice, lineItems, addLineItem, removeLineItem, updateLineItem, type LineItem } from '$lib/stores/invoice';
	import { formatCurrency } from '$lib/utils/currency';

	let ariaMessage = $state('');

	function handleRemove(id: number) {
		removeLineItem(id);
		ariaMessage = 'Line item removed';
		setTimeout(() => {
			ariaMessage = '';
		}, 1000);
	}

	function handleInput(id: number, field: keyof LineItem, e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		if (field === 'qty' || field === 'rate') {
			updateLineItem(id, field, parseFloat(target.value) || 0);
		} else {
			updateLineItem(id, field, target.value);
		}
	}
</script>

<section class="mb-7">
	<div class="line-header grid grid-cols-12 gap-3 text-sm font-semibold text-gray-500 px-3 mb-3">
		<div class="col-span-6">Item</div>
		<div class="col-span-2 text-center">Qty</div>
		<div class="col-span-2 text-center">Rate</div>
		<div class="col-span-2 text-right">Amount</div>
	</div>

	<div id="lineItems">
		{#each $lineItems as item (item.id)}
			<div class="line-item-row grid grid-cols-12 gap-3 items-center mb-3">
				<div class="col-span-6">
					<label for="title-{item.id}" class="sm:hidden text-xs font-medium text-gray-500 mb-1 block">Title</label>
					<input
						type="text"
						id="title-{item.id}"
						placeholder="Item title..."
						class="editable-field w-full bg-[#f8faff] rounded-2xl px-4 py-2 text-sm font-semibold"
						aria-label="Item title"
						value={item.title}
						oninput={(e) => handleInput(item.id, 'title', e)}
					/>
					<label for="desc-{item.id}" class="sm:hidden text-xs font-medium text-gray-500 mb-1 block mt-1">Description</label>
					<input
						type="text"
						id="desc-{item.id}"
						placeholder="Description..."
						class="editable-field w-full bg-[#f8faff] rounded-2xl px-4 py-2 text-sm text-gray-500 mt-1"
						aria-label="Item description"
						value={item.description}
						oninput={(e) => handleInput(item.id, 'description', e)}
					/>
				</div>
				<div class="col-span-2">
					<label for="qty-{item.id}" class="sm:hidden text-xs font-medium text-gray-500 mb-1 block">Qty</label>
					<input
						type="number"
						id="qty-{item.id}"
						min="0"
						step="1"
						class="editable-field w-full bg-[#f8faff] rounded-2xl px-4 py-3 text-sm text-center"
						aria-label="Quantity"
						value={item.qty}
						oninput={(e) => handleInput(item.id, 'qty', e)}
					/>
				</div>
				<div class="col-span-2">
					<label for="rate-{item.id}" class="sm:hidden text-xs font-medium text-gray-500 mb-1 block">Rate</label>
					<input
						type="number"
						id="rate-{item.id}"
						min="0"
						step="0.01"
						class="editable-field w-full bg-[#f8faff] rounded-2xl px-4 py-3 text-sm text-center"
						aria-label="Rate"
						value={item.rate}
						oninput={(e) => handleInput(item.id, 'rate', e)}
					/>
				</div>
				<div class="col-span-2 flex items-center justify-end gap-2">
					<span class="line-amount text-sm font-semibold text-gray-700">
						{formatCurrency(item.qty * item.rate, $invoice.currencySymbol)}
					</span>
					<button
						onclick={() => handleRemove(item.id)}
						class="line-item-delete text-gray-400 hover:text-red-500 transition-colors no-print p-2"
						title="Remove line item"
					>
						<span class="material-symbols-outlined" style="font-size: 20px;">delete</span>
					</button>
				</div>
			</div>
		{/each}
	</div>

	<button
		onclick={addLineItem}
		class="mt-6 flex items-center gap-2 text-[#2b3f7f] hover:text-[#223263] font-medium no-print"
	>
		<span class="material-symbols-outlined">add_circle</span>
		Add Line Item
	</button>
</section>

<!-- Accessibility announcements -->
<div role="status" aria-live="polite" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">
	{ariaMessage}
</div>
