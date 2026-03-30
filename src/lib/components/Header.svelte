<script lang="ts">
	import ThemeCustomizer from './ThemeCustomizer.svelte';

	function handlePrint() {
		window.print();
	}

	let showCustomizer = $state(false);
</script>

<header class="mb-6 no-print bg-white rounded-2xl border px-5 py-4" style="border-color: var(--primary-faint);">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center gap-2.5">
			<span class="material-symbols-outlined" style="font-size: 22px; color: var(--primary);">edit_note</span>
			<h1 class="text-lg font-bold text-gray-700">The Editorial Ledger</h1>
		</div>

		<div class="flex items-center gap-3">
			<button
				onclick={() => (showCustomizer = !showCustomizer)}
				class="border px-4 py-2 rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2 text-gray-600 hover:bg-gray-50"
				style="border-color: var(--primary-faint);"
				title="Customize appearance"
				aria-expanded={showCustomizer}
			>
				<span class="material-symbols-outlined" style="font-size:18px; color: var(--primary);">palette</span>
				<span class="hidden sm:inline">Customize</span>
			</button>
			<button
				onclick={handlePrint}
				class="btn-primary text-white px-5 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2"
			>
				<span class="material-symbols-outlined" style="font-size:18px;">print</span>
				Print / Save as PDF
			</button>
		</div>
	</div>

	{#if showCustomizer}
		<div class="mt-4 pt-4 border-t" style="border-color: var(--primary-faint);">
			<ThemeCustomizer />
		</div>
	{/if}
</header>
