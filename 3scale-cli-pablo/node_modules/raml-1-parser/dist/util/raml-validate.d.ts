
export declare type ParameterValueMap = {
    [parameterName: string]: any;
};
/**
 * Exported API
 */
export interface Validate {
    (parameters: Raml08Parser.NamedParameterMap): (check: ParameterValueMap) => ValidationsResult;
    rule: (parameter: Raml08Parser.NamedParameter) => ValidationFunction;
    RULES: RulesObject;
    TYPES: TypesObject;
}
export interface ValidationResult {
    valid: boolean;
    key: string;
    value: any;
    rule: string;
    attr: any;
}
export interface ValidationsResult {
    valid: boolean;
    errors: ValidationResult[];
}
export declare type CheckFunction = (check: any, key?: string, src?: ParameterValueMap) => boolean;
export declare type RuleFunction = (rule: any, key: string) => CheckFunction;
export declare type ValidationFunction = (check: any, key: string, src: ParameterValueMap) => ValidationResult;
export declare type RulesObject = {
    [rule: string]: RuleFunction;
};
export declare type TypesObject = {
    [rule: string]: CheckFunction;
};
export declare function validate(): Validate;
