import { type IMusicOperation, SongInfo, AlbumInfoLite, GenreInfoLite, ArtistInfoLite } from "$lib/entities";
import { get, writable } from "svelte/store";

//! do not change this !!!!
export let contextObject: SongInfo | AlbumInfoLite | GenreInfoLite | ArtistInfoLite | undefined = undefined;
// pos is cursor position when right click occur
export let pos = { x: 0, y: 0 };
// menu is dimension (height and width) of context menu
let menu = { h: 0, w: 0 };
// browser/window dimension (height and width)
let browser = { h: 0, w: 0 };
// showMenu is state of context-menu visibility
export const showMenu = writable(false);

export function isPlayable(): boolean {
    return contextObject instanceof SongInfo
        || contextObject instanceof AlbumInfoLite
        || contextObject instanceof GenreInfoLite
        || contextObject instanceof ArtistInfoLite
}
export function isEditable(): boolean {
    return contextObject instanceof AlbumInfoLite;
}

export function rightClickContextMenu(e: any) {
    showMenu.set(false);
    setTimeout(() => showMenu.set(true), 50);

    browser = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
    pos = {
        x: e.clientX,
        y: e.clientY,
    };
    // If bottom part of context menu will be displayed
    // after right-click, then change the position of the
    // context menu. This position is controlled by `top` and `left`
    // at inline style.
    // Instead of context menu is displayed from top left of cursor position
    // when right-click occur, it will be displayed from bottom left.
    if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
    if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
}
/**
 * Parsing interfaces to right click menu, so we can give different operation based on the interface
 * @param obj
 */
export function rightClickObjectParsing(obj: any) {
    contextObject = obj;
}

export function onWindowContextmenu(e: any) {
    const t = e.target;
    const isInput =
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t.isContentEditable;
    if (!isInput) {
        e.preventDefault();
        // show your custom context menu here, using e.clientX / e.clientY
    }
    // otherwise do nothing -> browser default menu shown
}

export function onPageClick(e: any) {
    // To make context menu disappear when
    // mouse is clicked outside context menu
    if (get(showMenu) == true) {
        showMenu.set(false);
        e.preventDefault();
    }
}

export function onPageScroll() {
    // Hide the context menu when the page scrolls
    if (get(showMenu) == true) {
        showMenu.set(false);
    }
}

export function getContextMenuDimension(node: any) {
    // This function will get context menu dimension
    // when navigation is shown => showMenu = true
    let height = node.offsetHeight;
    let width = node.offsetWidth;
    menu = {
        h: height,
        w: width,
    };
}