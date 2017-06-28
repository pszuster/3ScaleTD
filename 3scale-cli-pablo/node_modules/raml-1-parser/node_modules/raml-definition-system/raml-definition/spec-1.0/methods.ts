import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Bodies=require("./bodies")
import DataModel=require("./datamodel")
import Security=require("./security")


///////////////////
//// Trait
//////////////////

export class TraitRef extends Sys.Reference<Trait>{
    trait:Trait
    $trait=[
        MetaModel.customHandling(),
        MetaModel.description("Returns referenced trait")
    ]
}

export class Trait extends MethodBase{
    name:string
    $name=[MetaModel.key(),MetaModel.description("Name of the trait")]

    $displayName=[
        MetaModel.description("The displayName attribute specifies the trait display name. It is a friendly name used only for  " +
            "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
            "property itself).")
    ]

    usage:string
    $usage = [ MetaModel.description("Instructions on how and when the trait should be used.") ]

    $=[
        MetaModel.inlinedTemplates(),MetaModel.allowQuestion(),
        MetaModel.possibleInterfaces(["FragmentDeclaration"])
    ]



    parametrizedProperties:DataModel.TypeInstance
    $parametrizedProperties = [
        MetaModel.customHandling(),
        MetaModel.description("Returns object representation of parametrized properties of the trait")
    ]
}


///////////////////
//// Method
//////////////////

export class MethodBase extends Operation{

    body:DataModel.TypeDeclaration[]
    $body=[
        MetaModel.newInstanceName("New Body"),
        MetaModel.description("Some method verbs expect the resource to be sent as a request body. For example, to create a resource, " +
            "the request must include the details of the resource to create. Resources CAN have alternate representations. For example, " +
            "an API might support both JSON and XML representations. A method's body is defined in the body property as a hashmap, in " +
            "which the key MUST be a valid media type.")
    ]

    protocols:string[]
    $protocols=[MetaModel.oneOf(["HTTP","HTTPS"]),
        //MetaModel.issue("Not clear how it should work in combination with baseUri also is it also related to resources and types/traits"),MetaModel.needsClarification("Actually it is a set"),
        MetaModel.description("A method can override the protocols specified in the resource or at the API root, by employing this property."),
        MetaModel.valueDescription("array of strings of value HTTP or HTTPS, or a single string of such kind, case-insensitive")
    ]


    is:TraitRef[]
    $is=[MetaModel.description("Instantiation of applyed traits")]

    securedBy:Security.SecuritySchemeRef[]
    $securedBy=[
        MetaModel.allowNull(),
        MetaModel.description("securityScheme may also be applied to a resource by using the securedBy key, which is equivalent " +
            "to applying the securityScheme to all methods that may be declared, explicitly or implicitly, by defining the resourceTypes " +
            "or traits property for that resource. To indicate that the method may be called without applying any securityScheme, the " +
            "method may be annotated with the null securityScheme.")
    ]

    description: Sys.MarkdownString

    displayName:string
}

export class Method extends MethodBase {
    method:string;
    $method=[MetaModel.key(),
        MetaModel.extraMetaKey("methods"),
        MetaModel.oneOf(["get","put","post","delete","options","head","patch"]),
        MetaModel.description("Method that can be called"),
        MetaModel.hide()
    ]

    $displayName=[
        MetaModel.description("The displayName attribute specifies the method display name. It is a friendly name used only for  " +
            "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
            "property itself).")
    ]

    parametrizedProperties:DataModel.TypeInstance
    $parametrizedProperties = [
        MetaModel.customHandling(),
        MetaModel.description("For types defined in resource types returns object representation of parametrized properties")
    ]

}

export class Operation extends Annotable {
    queryParameters:DataModel.TypeDeclaration[]
    $queryParameters=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",DataModel.ModelLocation.QUERY),
        MetaModel.setsContextValue("locationKind",DataModel.LocationKind.APISTRUCTURE),
        MetaModel.newInstanceName("New query parameter"),
        MetaModel.description("An APIs resources MAY be filtered (to return a subset of results) or altered (such as transforming " +
            " a response body from JSON to XML format) by the use of query strings. If the resource or its method supports a query " +
            "string, the query string MUST be defined by the queryParameters property")
    ]

    headers:DataModel.TypeDeclaration[];
    $headers=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",DataModel.ModelLocation.HEADERS),
        MetaModel.setsContextValue("locationKind",DataModel.LocationKind.APISTRUCTURE),
        MetaModel.description("Headers that allowed at this position"),
        MetaModel.newInstanceName("New Header")
    ]

    queryString:DataModel.TypeDeclaration
    $queryString=[
        MetaModel.description("Specifies the query string needed by this method. Mutually exclusive with queryParameters.")
    ]

    responses:Bodies.Response[]
    $responses=[
        MetaModel.setsContextValue("response","true"),
        MetaModel.newInstanceName("New Response"),
        MetaModel.description("Information about the expected responses to a request"),
        MetaModel.valueDescription("An object whose keys are the HTTP status codes of the responses and whose values describe the responses.")
    ]

}