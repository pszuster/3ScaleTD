import MetaModel = require("../metamodel")
import DataModel = require("./datamodel")
import Common = require("./common")

export class ValueType extends Common.Annotable{

  value():string {
    return null
  }
}

export class StringType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("string"),
    MetaModel.alias("string")
  ]
}
export class AnyType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("any"),
    MetaModel.alias("any")
  ]

}

export class NumberType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("number"),
    MetaModel.alias("number")
  ]
}
export class IntegerType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("integer"),
    MetaModel.alias("integer")
  ]
}
export class NullType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("null"),
    MetaModel.alias("null")
  ]
}
export class TimeOnlyType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("time-only"),
    MetaModel.alias("time-only")
  ]
}
export class DateOnlyType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("date-only"),
    MetaModel.alias("date-only")
  ]
}
export class DateTimeOnlyType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("datetime-only"),
    MetaModel.alias("datetime-only")
  ]
}
export class DateTimeType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("datetime"),
    MetaModel.alias("datetime")
  ]
}
export class FileType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("file"),
    MetaModel.alias("file")
  ]
}
export class BooleanType extends ValueType {
  $=[
    MetaModel.nameAtRuntime("boolean"),
    MetaModel.alias("boolean")
  ]
}//FIXME


export class Reference<T> extends ValueType {
  structuredValue: DataModel.TypeInstance
  $structuredValue=[
    MetaModel.customHandling(),
    MetaModel.description("Returns a structured object if the reference point to one.")
  ]

  name:string
  $name=[
    MetaModel.customHandling(),
    MetaModel.description("Returns name of referenced object")
  ]
}//this is not true ...FIXME


export class UriTemplate extends StringType {
  $=[
    MetaModel.description("This type currently serves both for absolute and relative urls")
  ]
}

export class StatusCodeString extends StringType {}

export class RelativeUriString extends UriTemplate {
    $=[
      MetaModel.description("This  type describes relative uri templates")
    ]
}

export class FullUriTemplateString extends UriTemplate {
  $=[
    MetaModel.description("This  type describes absolute uri templates")
  ]

}

export class FixedUriString extends StringType {
  $=[
    MetaModel.description("This  type describes fixed uris")
  ]
}

export class ContentType extends StringType {}

export class MarkdownString extends  StringType{
  $=[
    MetaModel.innerType("markdown"),
    MetaModel.description("[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)")
  ]
}

export class SchemaString extends StringType {
  $=[MetaModel.description("Schema at this moment only two subtypes are supported (json schema and xsd)"),MetaModel.alias("schema")]
}



