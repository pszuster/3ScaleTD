import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import DataModel=require("./datamodel")
import Security=require("./security")
import Methods=require("./methods")

///////////////////
//// Resource Type
//////////////////

export class ResourceTypeRef extends Sys.Reference<ResourceType>{
    resourceType:ResourceType
    $resourceType=[
        MetaModel.customHandling(),
        MetaModel.description("Returns referenced resource type")
    ]
}

export class ResourceType extends ResourceBase  {
    $=[
       MetaModel.inlinedTemplates(),MetaModel.allowQuestion(),
       MetaModel.possibleInterfaces(["FragmentDeclaration"])
    ]

    displayName:string
    $displayName=[
        MetaModel.description("The displayName attribute specifies the resource type display name. It is a friendly name used only for  " +
            "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
            "property itself).")
    ]

    name:string
    $name=[
        MetaModel.key(),
        MetaModel.description("Name of the resource type")
    ]

    usage:string
    $usage=[
        MetaModel.description("Instructions on how and when the resource type should be used.")
    ]



    parametrizedProperties:DataModel.TypeInstance
    $parametrizedProperties = [
        MetaModel.customHandling(),
        MetaModel.description("Returns object representation of parametrized properties of the resource type")
    ]
}

///////////////////
//// Resource
//////////////////

export class ResourceBase extends Annotable{
    methods:Methods.Method[];
    $methods=[
        MetaModel.description("Methods that are part of this resource type definition"),
        //MetaModel.issue("definition system did not represents that ? is allowed after method names here"),
        MetaModel.markdownDescription("The methods available on this resource."),
        MetaModel.documentationTableLabel("get?<br>patch?<br>put?<br>post?<br>delete?<br>options?<br>head?"),
        MetaModel.valueDescription("Object describing the method")
    ]

    is:Methods.TraitRef[]
    $is=[
        MetaModel.description("A list of the traits to apply to all methods declared (implicitly or explicitly) for this resource. Individual methods may override this declaration"),
        MetaModel.valueDescription("array, which can contain each of the following elements:<br>* name of unparametrized trait " +
            "<br>* a key-value pair with trait name as key and a map of trait parameters as value<br>* inline trait declaration " +
            "<br><br>(or a single element of any above kind)")
    ]

    type:ResourceTypeRef
    $type=[
        MetaModel.description("The resource type which this resource inherits."),
        MetaModel.valueDescription("one of the following elements:<br>* name of unparametrized resource type<br>* a key-value pair " +
            "with resource type name as key and a map of its parameters as value<br>* inline resource type declaration")
    ]

    description: Sys.MarkdownString

    //TODO FIXME
    securedBy:Security.SecuritySchemeRef[]
    $securedBy=[
        MetaModel.allowNull(),
        MetaModel.description("The security schemes that apply to all methods declared (implicitly or explicitly) for this resource."),
        MetaModel.valueDescription("array of security scheme names or a single security scheme name")
    ]


    uriParameters:DataModel.TypeDeclaration[]
    $uriParameters=[
        MetaModel.setsContextValue("location",DataModel.ModelLocation.URI),
        MetaModel.setsContextValue("locationKind",DataModel.LocationKind.APISTRUCTURE),
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.description("Detailed information about any URI parameters of this resource"),
        MetaModel.valueDescription("object whose property names are the URI parameter names and whose values describe the values")
    ]
}

export class Resource extends ResourceBase {
    relativeUri:Sys.RelativeUriString
    $relativeUri=[MetaModel.key(),
        MetaModel.startFrom("/"),
        MetaModel.description("Relative URL of this resource from the parent resource"),
        MetaModel.hide()
    ]

    displayName:string
    $displayName=[
        MetaModel.description("The displayName attribute specifies the resource display name. It is a friendly name used only for  " +
            "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
            "property itself).")
    ]

    resources:Resource[];
    $resources=[
        MetaModel.newInstanceName("New Resource"),
        MetaModel.description("A nested resource is identified as any property whose name begins with a slash (\"/\") and is therefore " +
            "treated as a relative URI."),
        MetaModel.documentationTableLabel("/&lt;relativeUri&gt;"),
        MetaModel.valueDescription("object describing the nested resource")
    ]



    $description=[
        MetaModel.description("A longer, human-friendly description of the resource."),
        MetaModel.valueDescription("Markdown string")
    ]

    $annotations=[
        MetaModel.markdownDescription("Annotations to be applied to this resource. Annotations are any property whose key begins " +
            "with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is a declared " +
            "annotation name.")
    ]
}
