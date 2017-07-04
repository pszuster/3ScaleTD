import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  Bodies=require("./bodies")
import  Common=require("./common")
import  Declarations=require("./declarations")

export enum ModelLocation{
  QUERY,HEADERS,URI,FORM,BURI,ANNOTATION,MODEL,SECURITYSCHEMATYPE
}

export enum LocationKind{
  APISTRUCTURE,DECLARATIONS,MODELS
}
/**
 * never produced directly any more
 */
export class ExampleSpec  extends Annotable{
  $=[
    MetaModel.customHandling(),
    MetaModel.possibleInterfaces(["FragmentDeclaration"])
  ]

  value:any
  $value=[
    MetaModel.example(),
    MetaModel.selfNode(),
    MetaModel.description("String representation of example"),
    MetaModel.required(),
    MetaModel.valueDescription("* Valid value for this type<br>* String representing the serialized version of a valid value")
  ]

  structuredValue:TypeInstance;
  $structuredValue=[
    MetaModel.customHandling(),
    MetaModel.description("Returns object representation of example, if possible")
  ]

  strict:boolean
  $strict=[
    MetaModel.description("By default, examples are validated against any type declaration. Set this to false to allow " +
      "examples that need not validate.")
  ]

  name:string
  $name=[
    MetaModel.key(),
    MetaModel.hide(),
    MetaModel.description("Example identifier, if specified")
  ]
  displayName: string
  description: Sys.MarkdownString

  $displayName=[
    MetaModel.description("An alternate, human-friendly name for the example")
  ]

  $description = [
    MetaModel.description("A longer, human-friendly description of the example"),
    MetaModel.valueDescription("markdown string")
  ]

  $annotations = [
    MetaModel.markdownDescription("Annotations to be applied to this example. Annotations are any property whose key " +
      "begins with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is " +
      "a declared annotation name.")
  ]
}



export class TypeDeclaration extends Annotable{
  name:string
  $name=[
    MetaModel.key(),
    MetaModel.description("name of the parameter"),
    MetaModel.extraMetaKey("headers"),
    MetaModel.hide()
  ]

  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the type display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
  ]

  facets:TypeDeclaration[];
  $facets=[
    MetaModel.declaringFields(),
    MetaModel.description("When extending from a type you can define new facets (which can then be set to " +
      "concrete values by subtypes)."),
    MetaModel.hide()
  ]

  fixedFacets:TypeInstance;
  $fixedFacets = [
    MetaModel.customHandling(),
    MetaModel.description("Returns facets fixed by the type. Value is an object with properties named after facets fixed. " +
      "Value of each property is a value of the corresponding facet.")
  ];

  schema: string
  $schema=[
    MetaModel.typeExpression(),
    MetaModel.allowMultiple(),
    MetaModel.description("Alias for the equivalent \"type\" property, for compatibility with RAML 0.8. Deprecated - API " +
      "definitions should use the \"type\" property, as the \"schema\" alias for that property name may be removed in a " +
      "future RAML version. The \"type\" property allows for XML and JSON schemas."),
    MetaModel.valueDescription("Single string denoting the base type or type expression")
  ]

  type:string;
  $type=[
    MetaModel.typeExpression(),
    MetaModel.allowMultiple(),
    MetaModel.canBeValue(),
    MetaModel.defaultValue("string"),
    MetaModel.descriminatingProperty(),
    MetaModel.description("A base type which the current type extends, or more generally a type expression."),
    MetaModel.valueDescription("string denoting the base type or type expression")
  ]

  structuredType:TypeInstance;
  $structuredType=[
    MetaModel.customHandling(),
    MetaModel.typeExpression(),
    MetaModel.description("Inlined supertype definition."),
    MetaModel.valueDescription("Inlined supertype definition")
  ]

  

  location:ModelLocation
  $location=[
    MetaModel.system(),
    MetaModel.description("Location of the parameter (can not be edited by user)"),
    MetaModel.hide()
  ]

  locationKind:LocationKind;
  $locationKind=[
    MetaModel.system(),MetaModel.description("Kind of location"),
    MetaModel.hide()
  ]

  default:any
  $default=[
    MetaModel.description("Provides default value for a property"),
    MetaModel.hide()
  ]

  example:ExampleSpec
  $example=[
    MetaModel.example(),
    MetaModel.selfNode(),
    MetaModel.description("An example of this type instance represented as string or yaml map/sequence. This can be used, e.g., by documentation " +
      "generators to generate sample values for an object of this type. Cannot be present if the examples property is present."),
    MetaModel.valueDescription("* Valid value for this type<br>* String representing the serialized version of a valid value")
  ]

  examples:ExampleSpec[]
  $examples=[
    MetaModel.example(),
    MetaModel.selfNode(),
    MetaModel.description("An example of this type instance represented as string. This can be used, e.g., by documentation " +
        "generators to generate sample values for an object of this type. Cannot be present if the example property is present."),
    MetaModel.valueDescription("* Valid value for this type<br>* String representing the serialized version of a valid value")
  ]
  
  required: boolean
  $required=[
    MetaModel.requireValue("fieldOrParam",true),
    MetaModel.description("Sets if property is optional or not"),
    MetaModel.describesAnnotation("required"),
    MetaModel.hide(),
    MetaModel.defaultBooleanValue(true)
  ]

  $=[
    MetaModel.convertsToGlobalOfType("SchemaString"),MetaModel.canInherit("mediaType"),
    MetaModel.possibleInterfaces(["FragmentDeclaration"])
  ]


  description: Sys.MarkdownString

  $description=[
    MetaModel.description("A longer, human-friendly description of the type"),
    MetaModel.valueDescription("markdown string")
  ]

  $annotations=[
    MetaModel.markdownDescription("Annotations to be applied to this type. Annotations are any property whose key " +
      "begins with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is a " +
      "declared annotation name.")
  ]

  xml: XMLFacetInfo

  allowedTargets:AnnotationTarget[]
  $allowedTargets=[
    MetaModel.oneOf([
      "API",
      "DocumentationItem",
      "Resource",
      "Method",
      "Response",
      "RequestBody",
      "ResponseBody",
      "TypeDeclaration",
      "NamedExample",
      "ResourceType",
      "Trait",
      "SecurityScheme",
      "SecuritySchemeSettings",
      "AnnotationTypeDeclaration",
      "Library",
      "Overlay",
      "Extension",
      "Scalar"
    ]),
    MetaModel.description("Restrictions on where annotations of this type can be applied. If this property is specified, " +
        "annotations of this type may only be applied on a property corresponding to one of the target names specified as the " +
        "value of this property."),
    MetaModel.valueDescription("An array, or single, of names allowed target nodes.")
  ]
  
  isAnnotation:boolean
  $isAnnotation = [ MetaModel.description("Whether the type represents annotation") ]

  parametrizedProperties:TypeInstance
  $parametrizedProperties = [
    MetaModel.customHandling(),
    MetaModel.description("For types defined in traits or resource types returns object representation of parametrized properties")
  ]
}
export class XMLFacetInfo extends Annotable{
  attribute:	boolean
  $attribute=[MetaModel.description("If attribute is set to true, a type instance should be serialized as an XML attribute. It can only be true for scalar types.")]

  wrapped:boolean
  $wrapped=[MetaModel.description('If wrapped is set to true, a type instance should be wrapped in its own XML element. It can not be true for scalar types and it can not be true at the same moment when attribute is true.')]

  name:	string
  $name=[MetaModel.description("Allows to override the name of the XML element or XML attribute in it's XML representation.")]

  namespace: string
  $namespace=[MetaModel.description("Allows to configure the name of the XML namespace.")]
  prefix: string
  $prefix=[MetaModel.description("Allows to configure the prefix which will be used during serialization to XML.")]

}



export class ArrayTypeDeclaration extends TypeDeclaration {
  type="array"

  $=[
    MetaModel.convertsToGlobalOfType("SchemaString"),
    MetaModel.alias("array"),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

  uniqueItems:boolean
  $uniqueItems=[
    MetaModel.facetId("uniqueItems"),
    MetaModel.description("Should items in array be unique")
  ]

  items: string
  $items=[
    MetaModel.typeExpression(),
    MetaModel.allowMultiple(),
    MetaModel.canBeValue(),
    MetaModel.description("Array component type."),
    MetaModel.valueDescription("Inline type declaration or type name.")
  ]

  structuredItems:TypeInstance;
  $structuredItems=[
    MetaModel.customHandling(),
    MetaModel.typeExpression(),
    MetaModel.description("Inlined component type definition"),
    MetaModel.valueDescription("Inlined component type definition")
  ]

  minItems: number
  $minItems=[
    MetaModel.facetId("minItems"),
    MetaModel.description("Minimum amount of items in array"),
    MetaModel.valueDescription("integer ( >= 0 ). Defaults to 0")
  ]

  maxItems: number
  $maxItems=[
    MetaModel.facetId("maxItems"),
    MetaModel.description("Maximum amount of items in array"),
    MetaModel.valueDescription("integer ( >= 0 ). Defaults to undefined.")
  ]
}

export class UnionTypeDeclaration extends TypeDeclaration {
  type="union"

  $=[
    MetaModel.convertsToGlobalOfType("SchemaString"),
    MetaModel.requireValue("locationKind",LocationKind.MODELS),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]
}
export class ObjectTypeDeclaration extends TypeDeclaration{
  type="object"
  $type=[
    MetaModel.hide()
  ]

  $=[
    MetaModel.definingPropertyIsEnough("properties"),
    MetaModel.setsContextValue("field","true"),
    MetaModel.convertsToGlobalOfType("SchemaString"),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

  properties:TypeDeclaration[]
  $properties=[
    MetaModel.setsContextValue("fieldOrParam",true),
    MetaModel.description("The properties that instances of this type may or must have."),
    MetaModel.valueDescription("An object whose keys are the properties' names and whose values are property declarations.")
  ]


  minProperties:number
  $minProperties=[
    MetaModel.facetId("minProperties"),
    MetaModel.description("The minimum number of properties allowed for instances of this type.")
  ]

  maxProperties:number
  $maxProperties=[
    MetaModel.facetId("maxProperties"),
    MetaModel.description("The maximum number of properties allowed for instances of this type.")
  ]

  additionalProperties:boolean;
  $additionalProperties=[
    MetaModel.description("A Boolean that indicates if an object instance has additional properties.")
  ]


  // patternProperties:TypeDeclaration[];
  // $patternProperties=[
  //   MetaModel.description("JSON schema style syntax for declaring key restricted maps"),
  //   MetaModel.markdownDescription("JSON schema style syntax for declaring key restricted maps. See [[raml-10-spec-map-types|Map Types]]."),
  //   MetaModel.valueDescription("An object whose properties map regular expressions (which are regarded as defining ranges for property names) to types of properties expressed as Inline type declaration or typename.")
  // ]

  discriminator:string
  $discriminator=[
    MetaModel.description("Type property name to be used as discriminator, or boolean")
  ]

  discriminatorValue:string
  $discriminatorValue=[
    MetaModel.description("The value of discriminator for the type.")
  ]

  enum:any[]
}

export class StringTypeDeclaration extends TypeDeclaration {
  type="string"
  $=[MetaModel.description("Value must be a string"),MetaModel.declaresSubTypeOf("TypeDeclaration")]

  pattern:string;
  $pattern=[
    MetaModel.facetId("pattern"),
    MetaModel.description("Regular expression that this string should path"),
    MetaModel.valueDescription("regexp")
  ]

  minLength:number
  $minLength=[
    MetaModel.facetId("minLength"),
    MetaModel.description("Minimum length of the string")
  ]

  maxLength:number
  $maxLength=[
      MetaModel.facetId("maxLength"),
      MetaModel.description("Maximum length of the string")]

  enum:string[]
  $enum=[
    MetaModel.facetId("enum"),
    MetaModel.describesAnnotation("oneOf"),
    MetaModel.description("(Optional, applicable only for parameters of type string) The enum attribute provides an " +
      "enumeration of the parameter's valid values. This MUST be an array. If the enum attribute is defined, API clients and " +
      "servers MUST verify that a parameter's value matches a value in the enum array. If there is no matching value, the " +
      "clients and servers MUST treat this as an error."),
    MetaModel.hide()
  ]
}

export class BooleanTypeDeclaration extends TypeDeclaration{
  type="boolean"
  $=[
    MetaModel.description("Value must be a boolean"),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]
  enum:boolean[]
}



export class NumberTypeDeclaration extends TypeDeclaration{
  type="number"

  $=[
    MetaModel.description("Value MUST be a number. Indicate floating point numbers as defined by YAML."),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

  minimum:number
  $minimum=[
    MetaModel.facetId("minimum"),
    MetaModel.description("(Optional, applicable only for parameters of type number or integer) The minimum attribute specifies " +
      "the parameter's minimum value.")
  ]

  maximum:number
  $maximum=[
    MetaModel.facetId("maximum"),
    MetaModel.description("(Optional, applicable only for parameters of type number or integer) The maximum attribute " +
      "specifies the parameter's maximum value.")
  ]

  enum:number[]
  $enum=[
    MetaModel.facetId("enum"),
    MetaModel.describesAnnotation("oneOf"),
    MetaModel.description("(Optional, applicable only for parameters of type string) The enum attribute provides an " +
      "enumeration of the parameter's valid values. This MUST be an array. If the enum attribute is defined, API clients " +
      "and servers MUST verify that a parameter's value matches a value in the enum array. If there is no matching value, the " +
      "clients and servers MUST treat this as an error."),
    MetaModel.hide()
  ]

  format:string
  $format=[
    MetaModel.oneOf(["int32","int64","int","long","float","double","int16","int8"]),
    MetaModel.description("Value format")
  ]

  multipleOf:number
  $multipleOf=[MetaModel.description('A numeric instance is valid against "multipleOf" if the result of the division of the instance by this keyword\'s value is an integer.')]
}
export class IntegerTypeDeclaration extends NumberTypeDeclaration{
  type="integer"

  $=[
    MetaModel.description("Value MUST be a integer."),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

  format:string
  $format=[
    MetaModel.oneOf(["int32","int64","int","long","int16","int8"]),
    MetaModel.description("Value format")
  ]
}

export class DateOnlyTypeDeclaration extends TypeDeclaration{
  type="date-only"

  $=[
    MetaModel.description(`the "full-date" notation of RFC3339, namely yyyy-mm-dd (no implications about time or timezone-offset)`),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]


}
export class TimeOnlyTypeDeclaration extends TypeDeclaration{
  type="time-only"

  $=[
    MetaModel.description(`the "partial-time" notation of RFC3339, namely hh:mm:ss[.ff...] (no implications about date or timezone-offset)`),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

}
export class DateTimeOnlyTypeDeclaration extends TypeDeclaration{
  type="datetime-only"

  $=[
    MetaModel.description(`combined date-only and time-only with a separator of "T", namely yyyy-mm-ddThh:mm:ss[.ff...] (no implications about timezone-offset)`),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]


}
export class DateTimeTypeDeclaration extends TypeDeclaration{
  type="datetime"

  $=[
    MetaModel.description(`a timestamp, either in the "date-time" notation of RFC3339, if format is omitted or is set to rfc3339, or in the format defined in RFC2616, if format is set to rfc2616.`),
    MetaModel.declaresSubTypeOf("TypeDeclaration")
  ]

  format:string;
  $format=[MetaModel.oneOf(['rfc3339','rfc2616']),MetaModel.description('Format used for this date time rfc3339 or rfc2616')]
}

export class TypeInstance {
  $ = [
    MetaModel.customHandling()
  ]

  properties:TypeInstanceProperty[]
  $properties=[
    MetaModel.description("Array of instance properties")
  ]

  isScalar:boolean
  $isScalar=[
    MetaModel.description("Whether the type is scalar")
  ]

  value:any
  $value=[
    MetaModel.description("For instances of scalar types returns scalar value")
  ]

  isArray:boolean
  $isArray=[
    MetaModel.description("Indicates whether the instance is array")
  ]

  items:TypeInstance[]
  $items=[
    MetaModel.description("Returns components of array instances")
  ]
}

export class TypeInstanceProperty {
  $=[
    MetaModel.customHandling()
  ]

  name:string
  $name=[
    MetaModel.description("Property name")
  ]

  value:TypeInstance
  $value=[
    MetaModel.description("Property value")
  ]

  values:TypeInstance[]
  $values=[
    MetaModel.description("Array of values if property value is array")
  ]

  isArray:boolean
  $isArray = [
    MetaModel.description("Whether property has array as value")
  ]
}
