import { browser } from '$app/environment';

function getSymbols(): string[] {
    const symbols = [];
    for (let i = 33; i <= 126; i++) {
        symbols.push(String.fromCharCode(i));
    }
    return symbols;
}

function shuffle(arr: any[]): any[] {
    for (let i = arr.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export interface CardData {
    symbol: string;
    flipped: boolean;
}

export function createDeck(size: number): CardData[] {
    const deck = shuffle(getSymbols()).slice(0, size * size / 2).flatMap(el => [el, el]).map((el) => {
        return {symbol: el, flipped: false};
    });
    return shuffle(deck);
}

export interface GameRecord {
    elapsed: number;
    elapsedStr: string;
    steps: number;
}

export function getGameRecord(size: number): GameRecord | null {
    if (!browser) {
        return null;
    }
    const record = localStorage?.getItem(`record_${size}`);
    return (record !== null) ? JSON.parse(record) : null;
}

export function setGameRecord(size: number, elapsed: number, elapsedStr: string, steps: number) {
    if (!browser) {
        return;
    }
    localStorage?.setItem(`record_${size}`, JSON.stringify({elapsed, elapsedStr, steps}));
}
