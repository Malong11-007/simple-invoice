<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { currentTheme, currentFont, FONTS } from '$lib/stores/theme';

	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register(`${base}/sw.js`)
				.then((registration) => {
					console.log('Service Worker registered with scope:', registration.scope);
				})
				.catch((err) => {
					console.log('Service Worker registration failed:', err);
				});
		}
	});

	// Apply theme CSS variables to the document root reactively
	$effect(() => {
		const theme = $currentTheme;
		const font = $currentFont;
		const root = document.documentElement;
		root.style.setProperty('--primary', theme.colors.primary);
		root.style.setProperty('--primary-dark', theme.colors.primaryDark);
		root.style.setProperty('--primary-light', theme.colors.primaryLight);
		root.style.setProperty('--primary-ultralight', theme.colors.primaryUltralight);
		root.style.setProperty('--primary-faint', theme.colors.primaryFaint);
		root.style.setProperty('--primary-muted', theme.colors.primaryMuted);
		root.style.setProperty('--accent-border', theme.colors.accentBorder);
		root.style.setProperty('--body-bg', theme.colors.bodyBg);
		root.style.setProperty('--shell-bg', theme.colors.shellBg);
		root.style.setProperty('--font-body', font.stack);

		// Dynamically load Google Font if needed
		if (font.googleParam) {
			const id = `gfont-${font.id}`;
			if (!document.getElementById(id)) {
				const link = document.createElement('link');
				link.id = id;
				link.rel = 'stylesheet';
				link.href = `https://fonts.googleapis.com/css2?family=${font.googleParam}&display=swap`;
				document.head.appendChild(link);
			}
		}
	});
</script>

<svelte:head>
	<title>The Editorial Ledger — Simple Invoice Generator</title>
</svelte:head>

{@render children()}
