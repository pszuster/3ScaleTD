
export interface MatchResult {
    path: string;
    params: {
        [key: string]: any;
    };
}
export declare type PathMatchResult = MatchResult | boolean;
export interface OptionsObject {
    end?: boolean;
    strict?: boolean;
    sensitive?: boolean;
}
export declare type PathMatchFunction = (path: string) => PathMatchResult;
export declare function ramlPathMatch(path: string, parameters: Raml08Parser.NamedParameterMap, options: OptionsObject): PathMatchFunction;
