<script lang="ts">
    import {
        backgroundStyle,
        borderStyle,
        iconStyle,
        transitionColor,
    } from "$lib/global";
    import { t } from "$locale/i18n";
    let { description }: { description: string } = $props();
    const dictMapping: Record<string, string> = {
        "@this_week": "yearbanner.thisweek",
        "@last_week": "yearbanner.lastweek",
        "@last_month": "yearbanner.lastmonth",
        "@this_month": "yearbanner.thismonth",
        "@last_3_months": "yearbanner.last3month",
        "@this_year": "yearbanner.thisyear",
        "@unknown": "yearbanner.unkown",
    };
</script>

<div
    class="sticky top-16 flex h-9 w-full {backgroundStyle} items-center shadow border-b {borderStyle} {transitionColor}"
>
    <div
        class="select-none flex pl-8 text-md items-center {iconStyle} font-mono font-bold"
    >
        {#if description in dictMapping}
            {$t(dictMapping[description])}
        {:else}
            {description}
        {/if}
    </div>
</div>
