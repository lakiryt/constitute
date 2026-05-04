export function formatEncircledNumber(value: number): string {
    // ①のUnicodeコードポイントをvalue-1だけ進める
    return String.fromCodePoint("①".codePointAt(0)! + value - 1);
}