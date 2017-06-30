import hl = require("./highLevelAST");
import ll = require("./lowLevelAST");
import hlimpl = require("./highLevelImpl");
export declare function createStub0(parent: hl.IHighLevelNode, property: string, key?: string): hl.IHighLevelNode;
export declare function genStructuredValue(type: string, name: string, mappings: {
    key: string;
    value: string;
}[], parent: hl.IHighLevelNode): hlimpl.StructuredValue;
export declare function createStub(parent: hl.IHighLevelNode, property: string, key?: string): hl.IHighLevelNode;
export declare function createResourceStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createMethodStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createResponseStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createBodyStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createUriParameterStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createQueryParameterStub(parent: hl.IHighLevelNode, key?: string): hl.IHighLevelNode;
export declare function createAttr(_property: hl.IProperty, val: any): hl.IAttribute;
export declare function createStubNode(t: hl.ITypeDefinition, p: hl.IProperty, key?: string, unit?: ll.ICompilationUnit): hl.IHighLevelNode;
