<script lang="ts">
	import { scale } from "svelte/transition";
	import { MoonFill, SunFill } from "svelte-bootstrap-icons";
	import { buttonStyle, scaleParams } from "$lib/global";
	import { config } from "$lib/stores/configs";
	import { ThemeMode } from "$lib/stores/enums";
	import { toggleTheme } from "$lib/stores/ui";
</script>

<button
	onclick={() => toggleTheme()}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$config.theme === ThemeMode.Light}
	title="Toggle Theme Mode"
	class="rounded relative inline-flex h-10 w-10 items-center justify-center px-2 focus-visible:ring-2 focus-visible:ring-offset-2"
>
	{#if $config.theme == ThemeMode.Light}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={scaleParams}
		>
			<MoonFill class="{buttonStyle} size-5" aria-label="Moon" />
		</div>
	{:else}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={scaleParams}
		>
			<SunFill class="{buttonStyle} size-5" aria-label="Sun" />
		</div>
	{/if}
</button>
