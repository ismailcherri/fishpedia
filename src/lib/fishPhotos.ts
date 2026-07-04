// Resolves the bundled real photo for a species (id → URL) at build time and
// pairs it with its attribution from the generated photoCredits table.
import { photoCredits, type PhotoCredit } from '../data/photoCredits'

const photos = import.meta.glob('../assets/fish/photos/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>

// Map bare species id → bundled asset URL, ignoring the file extension.
const byId: Record<string, string> = {}
for (const [path, url] of Object.entries(photos)) {
    const id = path
        .split('/')
        .pop()!
        .replace(/\.[^.]+$/, '')
    byId[id] = url
}

export interface FishPhoto {
    url: string
    credit: PhotoCredit
}

export function fishPhoto(id: string): FishPhoto | null {
    const url = byId[id]
    const credit = photoCredits[id]
    if (!url || !credit) return null
    return { url, credit }
}
