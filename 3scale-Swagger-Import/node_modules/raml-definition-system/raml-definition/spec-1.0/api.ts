import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")

import Methods=require("./methods")
import Resources=require("./resources")
import Decls=require("./declarations")
import Params=require("./parameters")
import Common=require("./common")
import Bodies=require("./bodies")
import DataModel=require("./datamodel")
import Security=require("./security")
import {TypeDeclaration} from "./datamodel";
///////////////////
//// Library
//////////////////

export class Library extends LibraryBase {
  usage:string
  $usage=[
    MetaModel.description("contains description of why library exist")
  ]

  name:string
  $name=[
    MetaModel.key(),
    MetaModel.description("Namespace which the library is imported under")
  ]
}

export class LibraryBase extends FragmentDeclaration{
  $=[
    MetaModel.internalClass()
  ]

  schemas:TypeDeclaration[]
  $schemas=[
    MetaModel.embeddedInMaps(),
    MetaModel.description("Alias for the equivalent \"types\" property, for compatibility with RAML 0.8. Deprecated - " +
      "API definitions should use the \"types\" property, as the \"schemas\" alias for that property name may be removed " +
      "in a future RAML version. The \"types\" property allows for XML and JSON schemas.")
  ]

  types:DataModel.TypeDeclaration[]
  $types=[MetaModel.embeddedInMaps(),
    MetaModel.setsContextValue("locationKind",DataModel.LocationKind.MODELS),
    MetaModel.description("Declarations of (data) types for use within this API"),
    MetaModel.markdownDescription("Declarations of (data) types for use within this API."),
    MetaModel.valueDescription("An object whose properties map type names to type declarations; or an array of such objects")
  ]

  traits:Methods.Trait[]
  $traits=[
    MetaModel.embeddedInMaps(),MetaModel.description("Declarations of traits used in this API"),
    MetaModel.description("Declarations of traits for use within this API"),
    MetaModel.markdownDescription("Declarations of traits for use within this API."),
    MetaModel.valueDescription("An object whose properties map trait names to trait declarations; or an array of such objects")
  ]

  resourceTypes:Resources.ResourceType[]
  $resourceTypes=[
    MetaModel.embeddedInMaps(),MetaModel.description("Declaration of resource types used in this API"),
    MetaModel.description("Declarations of resource types for use within this API"),
    MetaModel.markdownDescription("Declarations of resource types for use within this API."),
    MetaModel.valueDescription("An object whose properties map resource type names to resource type declarations; or an array of such objects")
  ]

  annotationTypes:DataModel.TypeDeclaration[];
  $annotationTypes=[
    MetaModel.setsContextValue("decls","true"),
    MetaModel.embeddedInMaps(),
    MetaModel.description("Declarations of annotation types for use by annotations"),
    MetaModel.markdownDescription("Declarations of annotation types for use by annotations."),
    MetaModel.valueDescription("An object whose properties map annotation type names to annotation type declarations; or an array of such objects")
  ]

  securitySchemes:Security.AbstractSecurityScheme[];
  $securitySchemes=[
    MetaModel.embeddedInMaps(),
    MetaModel.description("Security schemas declarations"),
    MetaModel.description("Declarations of security schemes for use within this API."),
    MetaModel.markdownDescription("Declarations of security schemes for use within this API."),
    MetaModel.valueDescription("An object whose properties map security scheme names to security scheme declarations; or an array of such objects")
  ]

 
}

///////////////////
//// Api (root-level)
//////////////////

class Api extends LibraryBase {
  title:string
  $title=[
    MetaModel.required(),MetaModel.description("Short plain-text label for the API")
  ]

  description: Sys.MarkdownString
  $description=[
    MetaModel.description("A substantial, human-friendly description of the API. Its value is a string and MAY be formatted using markdown.")
  ]
  version:string
  $version=[
    MetaModel.description("The version of the API, e.g. 'v1'")
  ]

  baseUri:Sys.FullUriTemplateString
  $baseUri=[
    MetaModel.description("A URI that's to be used as the base of all the resources' URIs. Often used as the base of the URL of " +
      "each resource, containing the location of the API. Can be a template URI.")
  ]

  baseUriParameters:DataModel.TypeDeclaration[]
  $baseUriParameters=[
    MetaModel.setsContextValue("location",DataModel.ModelLocation.BURI),
    MetaModel.setsContextValue("locationKind",DataModel.LocationKind.APISTRUCTURE),
    MetaModel.description("Named parameters used in the baseUri (template)")
  ]

  protocols:string[]
  $protocols=[
    MetaModel.oneOf(["HTTP","HTTPS"]),
    MetaModel.description("The protocols supported by the API"),
    MetaModel.valueDescription("Array of strings, with each being \"HTTP\" or \"HTTPS\", case-insensitive")
  ]

  mediaType:Bodies.MimeType[]
  $mediaType=[
    MetaModel.oftenKeys([
      "application/json",
      "application/xml",
      "application/x-www-form-urlencoded",
        "multipart/form-data"
    ]),
    MetaModel.description(`The default media type to use for request and response bodies (payloads), e.g. "application/json"`),
    MetaModel.inherited(),
    MetaModel.valueDescription("Media type string")
  ]

  securedBy:Security.SecuritySchemeRef[]
  $securedBy=[
    MetaModel.description(`The security schemes that apply to every resource and method in the API`)
  ]

  resources:Resources.Resource[]
  $resources=[ MetaModel.documentationTableLabel("/&lt;relativeUri&gt;"),
    MetaModel.newInstanceName("New Resource"),
    MetaModel.description(`The resources of the API, identified as relative URIs that begin with a slash (/). Every property whose key begins with a slash (/), and is either at the root of the API definition or is the child property of a resource property, is a resource property, e.g.: /users, /{groupId}, etc`)
  ]

  documentation:DocumentationItem[]
  $documentation=[
    MetaModel.description(`Additional overall documentation for the API`)
  ]

  

  $description=[
    MetaModel.description("A longer, human-friendly description of the API")
  ]

  $annotations=[
    MetaModel.markdownDescription("Annotations to be applied to this API. Annotations are any property whose key begins " +
      "with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is a declared " +
      "annotation name.")
  ]

  RAMLVersion:string
  $RAMLVersion=[
    MetaModel.customHandling(),
    MetaModel.description("Returns RAML version. \"RAML10\" string is returned for RAML 1.0. \"RAML08\" string is returned for RAML 0.8.")
  ]
}

///////////////////
//// Overlay & Extension
//////////////////

class Overlay extends Api {
  usage: string
  $usage=[
    MetaModel.description("contains description of why overlay exist")
  ]

  extends:string;
  $extends=[
    MetaModel.required(),
    MetaModel.description("Location of a valid RAML API definition (or overlay or extension), the overlay is applied to.")
  ]

  title:string
  $title=[
    MetaModel.description("Short plain-text label for the API")
  ]
}

class Extension extends Api{
  usage: string
  $usage=[
    MetaModel.description("contains description of why extension exist")
  ]

  extends:string;
  $extends=[
    MetaModel.required(),
    MetaModel.description("Location of a valid RAML API definition (or overlay or extension), the extension is applied to")
  ]

  title:string
  $title=[
    MetaModel.description("Short plain-text label for the API")
  ]
}


export class UsesDeclaration extends Annotable{
  key:string
  $key=[
    MetaModel.key(),
    MetaModel.description("Name prefix (without dot) used to refer imported declarations")
  ]

  value:string
  $value=[
    MetaModel.description("Content of the schema"),
    MetaModel.canBeValue(),
    MetaModel.value()
  ]//TODO FIXME
}

export class FragmentDeclaration extends Annotable{

  uses: UsesDeclaration[]
  $uses=[MetaModel.embeddedInMaps()]
}

class DocumentationItem extends Annotable{

  $ = [
    MetaModel.possibleInterfaces(["FragmentDeclaration"])
  ]
  title:string
  $title=[
    MetaModel.description("Title of documentation section"),
    MetaModel.required()
  ]

  content:Sys.MarkdownString
  $content=[
    MetaModel.description("Content of documentation section"),
    MetaModel.required()
  ]
}
