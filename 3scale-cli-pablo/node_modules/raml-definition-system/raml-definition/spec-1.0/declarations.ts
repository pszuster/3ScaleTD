import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  DataModel=require("./datamodel")
import  Common=require("./common")

export class AnnotationRef extends Sys.Reference<DataModel.TypeDeclaration> {
  // TODO: this should have more info on Annotations and their usage
  $=[
    MetaModel.description("Annotations allow you to attach information to your API"),
    MetaModel.tags(['annotations'])
  ]

  annotation:DataModel.TypeDeclaration
  $annotation=[
    MetaModel.customHandling(),
    MetaModel.description("Returns referenced annotation")
  ]
}

export class AnnotationTarget extends Sys.ValueType{
  $=[
    // TODO: enum
    MetaModel.description("Elements to which this Annotation can be applied (enum)"),
    MetaModel.tags(['annotations'])
  ]
}

