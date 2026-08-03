<script lang="ts">
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";
    import TableBodyColumn from "$lib/components/generals/table/TableBodyColumn.svelte";
    import TableBodySection from "$lib/components/generals/table/TableBodySection.svelte";
    import TableHeaderColumn from "$lib/components/generals/table/TableHeaderColumn.svelte";
    import TableHeaderSection from "$lib/components/generals/table/TableHeaderSection.svelte";
    import { Time, type SongInfo } from "$lib/entities";
    import { t } from "$locale/i18n";
    let { songInfos }: { songInfos: SongInfo[] } = $props();
</script>

<table class="table-auto w-full h-auto text-sm">
    <TableHeaderSection>
        <TableHeaderColumn>{"#"}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.title")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.album")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.artist")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.duration")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.playcount")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.rating")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.genre")}</TableHeaderColumn>
        <TableHeaderColumn>{$t("property.releasedate")}</TableHeaderColumn>
    </TableHeaderSection>
    <TableBodySection>
        {#each songInfos as info, index}
            <tr
                oncontextmenu={(e) => {
                    rightClickContextMenu(e);
                    rightClickObjectParsing(info);
                }}
            >
                <TableBodyColumn>{index + 1}</TableBodyColumn>
                <TableBodyColumn>{info.title}</TableBodyColumn>
                <TableBodyColumn>{info.album_name}</TableBodyColumn>
                <TableBodyColumn>{info.artists}</TableBodyColumn>
                <TableBodyColumn
                    >{info.durationTime?.toMinSecString()}</TableBodyColumn
                >
                <TableBodyColumn>{info.play_count}</TableBodyColumn>
                <TableBodyColumn>{info.rating}</TableBodyColumn>
                <TableBodyColumn>{info.genre}</TableBodyColumn>
                <TableBodyColumn
                    >{info.releaseDate?.getFullYear()}</TableBodyColumn
                >
            </tr>
        {/each}
    </TableBodySection>
</table>
