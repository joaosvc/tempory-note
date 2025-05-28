const memoryStore = new Map<string, string>();

export function saveText(id: string, content: string) {
    memoryStore.set(id, content);
}

export function getText(id: string): string | undefined {
    return memoryStore.get(id);
}