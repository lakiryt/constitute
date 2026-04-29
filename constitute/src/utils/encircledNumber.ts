export function formatEncircledNumber(value: number): string {
    // ⓪のUnicodeコードポイントをvalue分だけ進める
    return String.fromCodePoint("①".codePointAt(0)! + value - 1);
}