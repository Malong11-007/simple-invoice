<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register(`${base}/sw.js`).then((registration) => {
				console.log('Service Worker registered with scope:', registration.scope);
			}).catch((err) => {
				console.log('Service Worker registration failed:', err);
			});
		}
	});
</script>

<svelte:head>
	<title>The Editorial Ledger — Simple Invoice Generator</title>
</svelte:head>

{@render children()}
