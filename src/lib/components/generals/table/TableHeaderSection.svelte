<script>
    import {
        backgroundStyle,
        borderStyle,
        iconStyle,
    } from "$lib/global";

    let { children } = $props();
</script>

<thead
    class="w-full {iconStyle} {backgroundStyle} sticky top-0 shadow"
>
    <tr>
        {@render children()}
    </tr>
</thead>
