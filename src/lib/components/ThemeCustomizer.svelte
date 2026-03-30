<script lang="ts">
	import { themeSettings, THEMES, FONTS } from '$lib/stores/theme';

	function selectTheme(id: string) {
		themeSettings.update((s) => ({ ...s, themeId: id }));
	}

	function selectFont(id: string) {
		themeSettings.update((s) => ({ ...s, fontId: id }));
	}
</script>

<div class="flex flex-wrap gap-6">
	<!-- Color Themes -->
	<div>
		<p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Color Theme</p>
		<div class="flex flex-wrap gap-2">
			{#each THEMES as theme}
				<button
					onclick={() => selectTheme(theme.id)}
					class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all"
					style="
						border-color: {$themeSettings.themeId === theme.id ? theme.swatch : 'transparent'};
						background-color: {$themeSettings.themeId === theme.id ? theme.swatch + '18' : '#f3f4f6'};
						color: {$themeSettings.themeId === theme.id ? theme.swatch : '#374151'};
					"
					title="Switch to {theme.name} theme"
					aria-pressed={$themeSettings.themeId === theme.id}
				>
					<span
						class="inline-block w-3 h-3 rounded-full flex-shrink-0"
						style="background-color: {theme.swatch};"
					></span>
					{theme.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Font Picker -->
	<div>
		<p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</p>
		<div class="flex flex-wrap gap-2">
			{#each FONTS as font}
				<button
					onclick={() => selectFont(font.id)}
					class="px-3 py-1.5 rounded-xl text-sm font-medium border transition-all"
					style="
						font-family: {font.stack};
						border-color: {$themeSettings.fontId === font.id ? 'var(--primary)' : 'transparent'};
						background-color: {$themeSettings.fontId === font.id ? 'var(--primary-light)' : '#f3f4f6'};
						color: {$themeSettings.fontId === font.id ? 'var(--primary)' : '#374151'};
					"
					title="Switch to {font.name} font"
					aria-pressed={$themeSettings.fontId === font.id}
				>
					{font.name}
				</button>
			{/each}
		</div>
	</div>
</div>
