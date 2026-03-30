<script lang="ts">
	import { invoice } from '$lib/stores/invoice';
</script>

<div class="flex-1">
	<div class="rounded-2xl p-6 print-bg" style="background-color: var(--primary-ultralight);">
		<h4 class="font-semibold text-gray-700 flex items-center gap-2 mb-4">
			<span class="material-symbols-outlined" style="color: var(--primary);">account_balance</span>
			Payment Instructions
		</h4>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div>
				<label for="bankName" class="text-xs font-medium text-gray-500 mb-1 block">Bank Name</label>
				<input id="bankName" type="text" class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm" placeholder="Enter bank name" aria-label="Bank Name" />
			</div>
			<div>
				<label for="accountHolder" class="text-xs font-medium text-gray-500 mb-1 block">Account Holder</label>
				<input id="accountHolder" type="text" class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm" placeholder="Enter account holder" aria-label="Account Holder" />
			</div>
			<div>
				<label for="routingNumber" class="text-xs font-medium text-gray-500 mb-1 block">Routing Number</label>
				<input id="routingNumber" type="text" class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm" placeholder="Enter routing number" aria-label="Routing Number" />
			</div>
			<div>
				<label for="accountNumber" class="text-xs font-medium text-gray-500 mb-1 block">Account Number</label>
				<input id="accountNumber" type="text" class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm" placeholder="Enter account number" aria-label="Account Number" />
			</div>
			<div>
				<label for="accountType" class="text-xs font-medium text-gray-500 mb-1 block">Account Type</label>
				<input id="accountType" type="text" class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm" placeholder="e.g. Checking" aria-label="Account Type" />
			</div>
			<div>
				<label for="paymentMemo" class="text-xs font-medium text-gray-500 mb-1 block">Payment Memo / Reference</label>
				<input
					type="text"
					id="paymentMemo"
					class="editable-field w-full bg-white rounded-xl px-3 py-2 text-sm"
					value={$invoice.invoiceNumber}
					aria-label="Payment Memo"
					readonly
				/>
			</div>
		</div>

		<div class="mt-4">
			<label for="noteField" class="text-xs font-medium text-gray-500 mb-1 block">Note</label>
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
	</div>
</div>
