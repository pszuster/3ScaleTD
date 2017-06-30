export interface BaseNode {
    type: string;
}
export interface Union extends BaseNode {
    first: BaseNode;
    rest: BaseNode;
}
export interface Parens extends BaseNode {
    expr: BaseNode;
    arr: number;
}
export interface Literal extends BaseNode {
    value: string;
    arr?: number;
    params?: BaseNode[];
}
export declare function visit(node: BaseNode, action: (n: BaseNode) => void): void;
export declare function serializeToString(node: BaseNode): string;
export declare function parse(str: string): BaseNode;
