<script lang="ts">
	function handlePrint() {
		window.print();
	}
</script>

<header class="mb-6 no-print bg-white rounded-2xl border border-[#2b3f7f]/10 px-5 py-4">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center gap-2.5">
			<span class="material-symbols-outlined text-[#2b3f7f]" style="font-size: 22px;">edit_note</span>
			<h1 class="text-lg font-bold text-gray-700">The Editorial Ledger</h1>
		</div>

		<div class="flex items-center gap-3">
			<button
				onclick={handlePrint}
				class="bg-[#2b3f7f] hover:bg-[#223263] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2"
			>
				<span class="material-symbols-outlined" style="font-size:18px;">print</span>
				Print / Save as PDF
			</button>
		</div>
	</div>
</header>
