import hl = require("../highLevelAST");
import parserCore = require("./parserCore");
export declare class AttributeDefaultsCalculator {
    private enabled;
    private toHighLevel;
    /**
    /**
     *
     * @param enabled - if false, defaults calculator will not return defaults from
     * attrValueOrDefault method, only original values.
     * @constructor
     */
    constructor(enabled: boolean, toHighLevel?: boolean);
    valueCalculators: ValueCalculator[];
    /**
     * These calculators are only applied when default calculator is generally disabled (this.enabled==false)
     * and should cover the cases when we -need- to insert some calculated value in any case
     * and helpers should be avoided for some reason.
     * @type {UnconditionalRequiredPropertyCalculator[]}
     */
    unconditionalValueCalculators: ValueCalculator[];
    /**
     * Return attribute default value if defaults calculator is enabled.
     * If attribute value is null or undefined, returns attribute default.
     */
    attributeDefaultIfEnabled(node: hl.IHighLevelNode, attributeProperty: hl.IProperty): any;
    getUnconditionalAttributeDefault(attributeProperty: hl.IProperty, node: hl.IHighLevelNode): any;
    /**
     * Returns attribute default.
     */
    getAttributeDefault(node: hl.IHighLevelNode, attributeProperty: hl.IProperty): any;
    getWrapperAttributeDefault(wrapperNode: parserCore.BasicNode, attributeName: string): any;
    /**
     * Returns attribute default.
     * There are so many arguments instead of just providing a single AST node and getting
     * anything we want from it as sometimes we create fake nodes in helpers and thus
     * do not have actual high-level nodes at hands.
     */
    getAttributeDefault2(attributeProperty: hl.IProperty, node: hl.IHighLevelNode): any;
    isEnabled(): boolean;
    insertionKind(node: hl.IHighLevelNode, attributeProperty: hl.IProperty): InsertionKind;
}
export declare enum InsertionKind {
    CALCULATED = 0,
    BY_DEFAULT = 1,
}
export interface ValueCalculator {
    calculate(attributeProperty: hl.IProperty, node: hl.IHighLevelNode): any;
    matches(attributeProperty: hl.IProperty, node: hl.IHighLevelNode): boolean;
    kind(): InsertionKind;
}
