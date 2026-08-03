<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import SideMenu from "$lib/components/generals/sidemenu/SideMenu.svelte";
	import BottomPlayControl from "$lib/components/music/player/BottomPlayControl.svelte";
	import NavBar from "$lib/components/generals/navbar/NavBar.svelte";
	import Popups from "$lib/components/layouts/Popups.svelte";
	import { transitionColor } from "$lib/global";
	import { onMount } from "svelte";
	let { children } = $props();
	onMount(() => {
		// loadSetting();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex bg-white dark:bg-stone-900 {transitionColor}">
	<!-- nav bar should be here -->
	<NavBar />
	<!-- side menu should be here -->
	<SideMenu />

	<!-- content should be here -->
	{@render children()}

	<BottomPlayControl />

	<!-- all popups should be here -->
	<Popups />
</div>
