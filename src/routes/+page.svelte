<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PrivacyBanner from '$lib/components/PrivacyBanner.svelte';
	import InvoiceHeader from '$lib/components/InvoiceHeader.svelte';
	import BillTo from '$lib/components/BillTo.svelte';
	import CurrencySelector from '$lib/components/CurrencySelector.svelte';
	import LineItems from '$lib/components/LineItems.svelte';
	import PaymentInstructions from '$lib/components/PaymentInstructions.svelte';
	import Totals from '$lib/components/Totals.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="p-3 md:p-8 lg:p-10">
	<div class="max-w-7xl mx-auto app-shell p-4 md:p-6 lg:p-7">
		<Header />
		<PrivacyBanner />

		<!-- Invoice Container -->
		<main class="invoice-container max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-[#2b3f7f]/10 p-6 md:p-10">
			<InvoiceHeader />
			<BillTo />
			<CurrencySelector />
			<LineItems />

			<!-- Bottom Section: Payment Info + Totals -->
			<section class="flex flex-col lg:flex-row gap-6 mt-6" id="bottomSection">
				<PaymentInstructions />
				<Totals />
			</section>
		</main>

		<Footer />
	</div>
</div>
