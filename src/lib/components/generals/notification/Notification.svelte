<script lang="ts">
    import {
        borderStyle,
        buttonStyle,
        textStyle,
    } from "$lib/global";
    import { InfoCircleFill, XCircle, X } from "svelte-bootstrap-icons";
    import { fly } from "svelte/transition";
    import {
        isNotificationVisible,
        notificationTitle,
        notificationDescription,
        notificationType,
        NotificationType,
    } from "$lib/stores/notification";

    function getNotificationColor() {
        switch ($notificationType) {
            case NotificationType.INFO:
                return "text-gray-500/70 dark:text-white/70";
            case NotificationType.ERROR:
                return "text-red-500/70 dark:text-red-500/70";
            case NotificationType.WARNING:
                return "text-yellow-500/70 dark:text-yellow-500/70";
            default:
                return "text-gray-500 dark:text-white/70";
        }
    }
</script>

{#if $isNotificationVisible}
    <div
        class="fixed inset-x-0 top-5 flex justify-center z-50 p-2"
        transition:fly={{ y: -20, duration: 200 }}
    >
        <div
            class="flex max-w-xl w-full {borderStyle} bg-white dark:bg-stone-700 shadow-md rounded-md px-4 py-3 justify-between"
        >
            <div class="flex p-1 pt-2 {buttonStyle}">
                <InfoCircleFill
                    class="size-4 {getNotificationColor()}"
                />
            </div>

            <div class="flex-1 max-w-lg p-1">
                <p
                    class="flex text-md max-w-lg font-medium {textStyle} select-none break-normal"
                >
                    {$notificationTitle}
                </p>
                <p
                    class="flex text-sm max-w-lg {textStyle} select-none break-normal"
                >
                    {$notificationDescription}
                </p>
            </div>

            <button
                onclick={() => {
                    $isNotificationVisible = !$isNotificationVisible;
                }}
                class="flex p-1 {buttonStyle}"
                aria-label="Close notification"
            >
                <X height="20" width="20" />
            </button>
        </div>
    </div>
{/if}
