export declare class KeyValuePair<T> {
    key: string;
    value: T;
}
export declare class Map<T> {
    constructor(ms?: KeyValuePair<T>[]);
    private mappings;
    volume(): number;
    pairs(): any[];
    set(key: string, value: T): void;
    get(key: string): T;
    map<U>(callbackfn: (elem: T, index: number, array: T[]) => U): U[];
    forEach(callbackfn: (elem: T, index: number, array: T[]) => void): void;
    filter(callbackfn: (elem: T, index: number, array: T[]) => boolean): T[];
}
