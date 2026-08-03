<script>
    import { desktopDeviceShow, buttonStyle } from "$lib/global";
    import { List } from "svelte-bootstrap-icons";
    import { toggleSideMenu } from "$lib/stores/ui";
</script>

<button class="items-center justify-center">
    <div class="flex {desktopDeviceShow}">
        <List
            width="20"
            height="20"
            class={buttonStyle}
            onclick={() => toggleSideMenu()}
        />
    </div>
</button>