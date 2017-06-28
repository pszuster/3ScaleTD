import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  DataModel=require("./datamodel")

//////////////////////////////////////
// Parameters related declarations
var index:MetaModel.SpecPartMetaData={
  title:"Named Parameters"
}

export class FileTypeDeclaration extends DataModel.TypeDeclaration {
  type="file"

  fileTypes:Sys.ContentType[]
  $fileTypes=[
    MetaModel.description("It should also include a new property: fileTypes, which should be a list of valid content-type " +
      "strings for the file. The file type */* should be a valid value.")
  ]

  minLength:number
  $minLength=[MetaModel.description("The minLength attribute specifies the parameter value's minimum number of bytes.")]

  maxLength:number
  $maxLength=[
    MetaModel.description("The maxLength attribute specifies the parameter value's maximum number of bytes.")
  ]

  $=[
    MetaModel.description("(Applicable only to Form properties) Value is a file. Client generators SHOULD use this type to " +
      "handle file uploads correctly.")
    ]
}


