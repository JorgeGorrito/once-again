export interface IGetter<T> {
    get(id : string) : Promise<T>;
}