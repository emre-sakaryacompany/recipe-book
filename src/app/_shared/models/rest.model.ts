export interface Rest<T> {
    number: number,
    offset: number,
    results: T[],
    totalResults: number
}