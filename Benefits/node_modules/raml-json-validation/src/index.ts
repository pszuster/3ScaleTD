declare function require(arg: string): any;

var ZSchema = require('z-schema');

export class JSONValidator {
    private validator = new ZSchema({
        ignoreUnknownFormats: true
    });

    setRemoteReference(reference: string, content: any): void {
        this.validator.setRemoteReference(reference, content);
    }

    validateSchema(jsonSchema: any): void {
        this.validator.validateSchema(jsonSchema);
    }

    getMissingRemoteReferences(): any[] {
        return this.validator.getMissingRemoteReferences();
    }

    isResourceLoaded(reference: string): boolean {
        return this.validator.cache[reference] == null ? false : true;
    }
    
    validate(content: any, schema: any): void {
        this.validator.validate(content, schema);
    }

    getLastErrors(): any[] {
        return this.validator.getLastErrors();
    }
}