import { cubicOut } from "svelte/easing";

export const iconStyle = "text-gray-500 dark:text-white";
export const textStyle = "text-gray-500 dark:text-white";
export const shuffleStyle = "text-blue-400 hover:text-blue-500 active:text-blue-600"
export const selectableListItemButton = "hover:bg-gray-100 dark:hover:bg-stone-800"
export const iconEnable = "text-gray-900 dark:text-white";
export const buttonStyle = `${iconStyle} transition-colors duration-75 dark:text-white dark:hover:text-stone-300 dark:active:text-stone-500 hover:text-gray-800 dark:hover:text-white hover:text-stone-600 active:text-stone-800`;
export const buttonEnableStyle = `${iconEnable} transition-colors duration-75 dark:${iconStyle} group-hover:text-gray-800 dark:group-hover:text-white hover:text-black`;
export const textBadgeStyle =
    "inline-flex justify-center items-center px-2 ms-3 font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300";
export const desktopDeviceShow = "md:hidden sm:hidden";
export const mobileDeviceShow = "lg:hidden";
export const backgroundStyle = "bg-white/50 dark:bg-stone-900/50 backdrop-blur-lg";
export const modalBackground = "bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg";
export const divideYStyle = "divide-y divide-slate-200 dark:divide-stone-700"
export const borderStyle = "border-slate-200 dark:border-stone-700";
export const focusBorderStyle = "focus:border-slate-400 hover:border-slate-300 dark:hover:border-stone-600"
export const transitionColor = "transition-colors duration-300"
export const mdWidth = 640;


export const inputBoxStyle = `w-full rounded-md border ${borderStyle} dark:active:bg-stone-700 px-3 py-2 text-sm hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-stone-800 ${textStyle}`

export const normalButtonStyle = `w-full rounded-full border ${borderStyle}  px-3 py-2 text-sm bg-transparent hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-stone-800 dark:active:bg-stone-700 ${textStyle}`

export const selectBoxStyle = `w-full rounded-md border ${borderStyle} dark:active:bg-stone-800 px-3 py-2 text-sm hover:bg-gray-200  dark:hover:bg-stone-800 ${textStyle}`
export const fadeParams = { duration: 100 };
export const scaleParams = {
    delay: 50,
    duration: 200,
    start: 0.7,
    easing: cubicOut,
};


