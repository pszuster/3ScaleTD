
/**
 * Exported API.
 */
export interface Sanitize {
    (parameters: Raml08Parser.NamedParameterMap): (value: ParameterValueMap) => any;
    rule: (parameter: Raml08Parser.NamedParameter) => any;
    RULES: RulesObject;
    TYPES: TypesObject;
}
export declare type ParameterValueMap = {
    [parameterName: string]: any;
};
export declare type SanitizeFunction = (check: any, key?: string, src?: ParameterValueMap) => any;
export declare type RuleFunction = (rule: any, key: string) => SanitizeFunction;
export declare type RulesObject = {
    [rule: string]: RuleFunction;
};
export declare type TypesObject = {
    [rule: string]: SanitizeFunction;
};
export declare function sanitize(): Sanitize;
