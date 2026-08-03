import { playOrPause } from "./stores/playbackControl";
import { closeAllPopUps } from "./stores/ui";

function handleSpace(event: KeyboardEvent) {
    if (event.repeat) return;

    const target = event.target as HTMLElement | null;
    if (target) {
        const tag = target.tagName;
        const editable =
            target.isContentEditable ||
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT";

        if (editable) return;
    }

    if (event.code !== "Space") return;
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;

    event.preventDefault();
    playOrPause();
}

export function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
        case " ":
        case "Spacebar":
            handleSpace(event);
            break;

        case "Escape":
            event.preventDefault();
            closeAllPopUps();
            break;
    }
}
