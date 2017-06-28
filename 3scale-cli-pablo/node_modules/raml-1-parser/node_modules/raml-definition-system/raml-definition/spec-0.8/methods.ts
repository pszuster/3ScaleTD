import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Params = require("./parameters")
import Bodies = require("./bodies")
import Common = require("./common")
import Security=require("./security")

///////////////////
//// Method
//////////////////

export class MethodBase {
    $=[
        MetaModel.description("Method object allows description of http methods")
    ]

    responses:Bodies.Response[]
    $responses=[
        MetaModel.newInstanceName("New Response"),
        MetaModel.description("Resource methods MAY have one or more responses. Responses MAY be described using the description " +
            "property, and MAY include example attributes or schema properties.")
    ]

    body:Bodies.BodyLike[]
    $body=[
        MetaModel.newInstanceName("New Body"),
        MetaModel.description("Some method verbs expect the resource to be sent as a request body. For example, to create a " +
            "resource, the request must include the details of the resource to create. Resources CAN have alternate representations. " +
            "For example, an API might support both JSON and XML representations. A method's body is defined in the body property as a " +
            "hashmap, in which the key MUST be a valid media type.")
    ]

    protocols:string[]
    $protocols=[
        MetaModel.oneOf(["HTTP","HTTPS"]),
        MetaModel.description("A method can override an API's protocols value for that single method by setting a different value " +
            "for the fields.")
    ]

    securedBy:SecuritySchemeRef[]
    $securedBy=[
        MetaModel.allowNull(),
        MetaModel.description("A list of the security schemas to apply, these must be defined in the securitySchemes declaration. " +
            "To indicate that the method may be called without applying any securityScheme, the method may be annotated with the null " +
            "securityScheme. Security schemas may also be applied to a resource with securedBy, which is equivalent to applying the security " +
            "schemas to all methods that may be declared, explicitly or implicitly, by defining the resourceTypes or traits property for " +
            "that resource.")
    ]

    baseUriParameters:Params.Parameter[]
    $baseUriParameters=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",Params.ParameterLocation.BURI),
        MetaModel.description("A resource or a method can override a base URI template's values. This is useful to restrict or " +
            "change the default or parameter selection in the base URI. The baseUriParameters property MAY be used to override any or " +
            "all parameters defined at the root level baseUriParameters property, as well as base URI parameters not specified at the root level.")
    ]

    queryParameters:Params.Parameter[]
    $queryParameters=[
        MetaModel.setsContextValue("location",ParameterLocation.QUERY),
        MetaModel.newInstanceName("New query parameter"),
        MetaModel.description("An APIs resources MAY be filtered (to return a subset of results) or altered (such as transforming " +
            "a response body from JSON to XML format) by the use of query strings. If the resource or its method supports a query " +
            "string, the query string MUST be defined by the queryParameters property")
    ]

    headers:Params.Parameter[];
    $headers=[
        MetaModel.setsContextValue("location",ParameterLocation.HEADERS),
        MetaModel.description("Headers that allowed at this position"),
        MetaModel.newInstanceName("New Header"),
    ]

    description:Sys.MarkdownString
}

export class Method extends MethodBase {
    method:string;
    $method=[
        MetaModel.key(),
        MetaModel.extraMetaKey("methods"),
        MetaModel.oneOf(["get","put","post","delete","patch","options","head","trace","connect"]),
        MetaModel.description("Method that can be called")]


    is:TraitRef[]
    $is=[
        MetaModel.description("Instantiation of applyed traits")
    ]
}

///////////////////
//// Trait
//////////////////

export class Trait extends MethodBase implements Sys.DeclaresDynamicType<Trait> {
    $=[
        MetaModel.inlinedTemplates(),
        MetaModel.allowQuestion()
    ]

    name:string
    $name=[
        MetaModel.key(),
        MetaModel.description("Name of the trait")
    ]

    usage:string
    $usage=[
        MetaModel.description("Instructions on how and when the trait should be used.")
    ]

    parametrizedProperties:Sys.TypeInstance
    $parametrizedProperties=[
        MetaModel.customHandling(),
        MetaModel.description("Returns object representation of parametrized properties of the trait")
    ]

    displayName:string
    $displayName=[
        MetaModel.description("An alternate, human-friendly name for the trait")
    ]
}

export class TraitRef extends Sys.Reference<Trait> {
    trait:Trait
    $trait=[
        MetaModel.customHandling(),
        MetaModel.description("Returns referenced trait")
    ]
}
