export function saveToLocalStorage(key: string, object: any) {
    if (typeof window !== 'undefined')
        localStorage.setItem(key, JSON.stringify(object));
}

export function readFromLocalStorage(key: string) {
    if (typeof window === 'undefined')
        return null

    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}


export function searchLibrary(keyword: string) {

}

