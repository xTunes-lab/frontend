<script lang="ts">
    import TableBodyColumn from "$lib/components/generals/table/TableBodyColumn.svelte";
    import TableBodySection from "$lib/components/generals/table/TableBodySection.svelte";
    import TableHeaderColumn from "$lib/components/generals/table/TableHeaderColumn.svelte";
    import TableHeaderSection from "$lib/components/generals/table/TableHeaderSection.svelte";
    import { iTunesSearchSongResult } from "$lib/entities";
    import { searchResult, selectedResult } from "$lib/stores/uploads";
    import { t } from "$locale/i18n";
    import AlbumPicture from "../../album/AlbumPicture.svelte";
</script>

{#if $searchResult}
    <table class="table-auto w-full h-full text-sm cursor-pointer">
        <TableHeaderSection>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>{$t("property.cover")}</TableHeaderColumn>
            <TableHeaderColumn>{$t("property.title")}</TableHeaderColumn>
            <TableHeaderColumn>{$t("property.album")}</TableHeaderColumn>
            <TableHeaderColumn>{$t("property.artist")}</TableHeaderColumn>
            <TableHeaderColumn>{$t("property.releasedate")}</TableHeaderColumn>
        </TableHeaderSection>
        <TableBodySection>
            {#each $searchResult as info}
                {@render tableBody(info)}
            {/each}
        </TableBodySection>
    </table>
{/if}

{#snippet tableBody(info: iTunesSearchSongResult)}
    <tr
        onclick={() => {
            $selectedResult = info;
        }}
        title="click to select"
    >
        <TableBodyColumn>
            <input type="radio" checked={$selectedResult === info} />
        </TableBodyColumn>
        <TableBodyColumn>
            <div class="flex justify-start items-start">
                <AlbumPicture
                    size={10}
                    imageSrc={info.artwork_sm}
                    coverMode={false}
                />
            </div>
        </TableBodyColumn>
        <TableBodyColumn>{info.title}</TableBodyColumn>
        <TableBodyColumn>{info.album}</TableBodyColumn>
        <TableBodyColumn>{info.artist}</TableBodyColumn>
        <TableBodyColumn>{info.releaseDate?.getFullYear()}</TableBodyColumn>
        <!-- <TableBodyColumn>{info.track_number}</TableBodyColumn>
        <TableBodyColumn>{info.track_count}</TableBodyColumn> -->
    </tr>
{/snippet}
