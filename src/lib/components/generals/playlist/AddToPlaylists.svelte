<script lang="ts">
    import Modal from "../modal/Modal.svelte";
    import TableBodySection from "../table/TableBodySection.svelte";
    import TableHeaderColumn from "../table/TableHeaderColumn.svelte";
    import TableHeaderSection from "../table/TableHeaderSection.svelte";
    import TableBodyColumn from "../table/TableBodyColumn.svelte";
    import { isPlaylistSelectOpen } from "$lib/stores/ui";
    import { playListsPageData } from "$lib/stores/pages";
    import { PlaylistInfoLite } from "$lib/entities";
    import SpinButton from "../misc/SpinButton.svelte";
    import { t } from "$locale/i18n";

    let selected: PlaylistInfoLite[] = $state([]);

    let playlists = $derived(
        $playListsPageData.filter((playlist) => playlist.id !== undefined),
    );
    let allSelected = $derived(
        playlists.length > 0 && selected.length === playlists.length,
    );

    function togglePlaylist(playlist: PlaylistInfoLite) {
        if (selected.includes(playlist)) {
            selected = selected.filter((item) => item !== playlist);
        } else {
            selected = [...selected, playlist];
        }
    }

    function toggleAll() {
        selected = allSelected ? [] : [...playlists];
    }

    let headerCheckbox: HTMLInputElement | null = null;

    $effect(() => {
        if (headerCheckbox) {
            headerCheckbox.indeterminate = selected.length > 0 && !allSelected;
        }
    });
</script>

<Modal isModalOpen={isPlaylistSelectOpen}>
    <div class="flex w-full h-full">
        <div class="flex flex-col gap-2 w-full h-full pt-8 px-2">
            {@render tableArea()}
            {@render functionalArea()}
        </div>
    </div>
</Modal>

{#snippet tableArea()}
    <div class="overflow-auto h-64 w-full">
        <table class="table-auto w-full h-full text-sm text-left">
            <TableHeaderSection>
                <TableHeaderColumn>
                    <input
                        bind:this={headerCheckbox}
                        type="checkbox"
                        checked={allSelected}
                        onclick={toggleAll}
                    />
                </TableHeaderColumn>
                <TableHeaderColumn
                    >{$t("playlistselect.table.name")}</TableHeaderColumn
                >
                <TableHeaderColumn
                    >{$t("playlistselect.table.songs")}</TableHeaderColumn
                >
            </TableHeaderSection>

            <TableBodySection>
                {#each playlists as playlist}
                    <tr
                        onclick={() => togglePlaylist(playlist)}
                        class="cursor-pointer"
                    >
                        <TableBodyColumn>
                            <input
                                type="checkbox"
                                value={playlist}
                                bind:group={selected}
                                onclick={(e) => e.stopPropagation()}
                            />
                        </TableBodyColumn>
                        <TableBodyColumn>{playlist.name}</TableBodyColumn>
                        <TableBodyColumn
                            >{playlist.song_ids.length}</TableBodyColumn
                        >
                    </tr>
                {/each}
            </TableBodySection>
        </table>
    </div>
{/snippet}

{#snippet functionalArea()}
    <div class="flex w-full items-end justify-end">
        <SpinButton
            width={16}
            height={8}
            callBack={() => {
                throw new Error("not implemented");
            }}>{$t("playlistselect.table.save")}</SpinButton
        >
    </div>
{/snippet}
