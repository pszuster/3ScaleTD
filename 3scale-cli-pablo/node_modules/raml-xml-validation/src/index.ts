declare function require(arg: string): any;

var validator = require('xmllint-jsparser');

export class XMLValidator {
    private schemaObject: any;

    constructor(private schema:string) {

    }

    validate(xml: string, references: XMLSchemaReference[] = []): Error[] {
        if(references.length === 0) {
            var result = validator.validateXML({xml: xml, schema: this.schema});
            
            return (result && result.errors && result.errors.map((error: any) => new Error(error))) || [];
        }
        
        var schemas: string[] = this.remoteSchemas(references);

        schemas.push(this.schema);
        
        var result = validator.validateXML({xml: xml, schema: schemas});

        return (result && result.errors && result.errors.map((error: any) => {
                return new Error(error)
            })) || [];
    }
    
    private remoteSchemas(refs: XMLSchemaReference[]): string[] {
        return refs.map(ref => ref.patchedContent);
    }
}

export class XMLSchemaReference {
    constructor(public originalPath: string, public virtualIndex: number, public patchedContent: string) {
        
    }
}