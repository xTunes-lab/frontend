import { get, writable } from "svelte/store";

export enum NotificationType {
    INFO = "info",
    ERROR = "error",
    WARNING = "warning"
}

export const isNotificationVisible = writable(false);
export const notificationTitle = writable();
export const notificationDescription = writable();
export const notificationType = writable(NotificationType.INFO);

function showNotification(title: string, description: string, type: NotificationType = NotificationType.INFO) {
    isNotificationVisible.set(false);
    notificationTitle.set(title);
    notificationDescription.set(description);
    notificationType.set(type);
    setTimeout(() => isNotificationVisible.set(true), 50);
}

export function showInfo(title: string, description: string) {
    showNotification(title, description, NotificationType.INFO);
}
export function showError(title: string, description: string) {
    showNotification(title, description, NotificationType.ERROR);
    console.log(description);
}
export function showWarn(title: string, description: string) {
    showNotification(title, description, NotificationType.WARNING);
    console.log(description);
}

export function close() {
    isNotificationVisible.set(false);
    notificationTitle.set(undefined);
    notificationDescription.set(undefined);
}