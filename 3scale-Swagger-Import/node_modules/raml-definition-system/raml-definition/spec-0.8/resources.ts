import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Params = require("./parameters")
import Bodies = require("./bodies")
import Common = require("./common")
import Methods=require("./methods")
import Security=require("./security")

///////////////////
//// Resource
//////////////////

export class Resource {
    relativeUri:Sys.RelativeUriString
    $relativeUri=[
        MetaModel.key(),
        MetaModel.startFrom("/"),
        MetaModel.description("Relative URL of this resource from the parent resource")
    ]

    type:ResourceTypeRef
    $type=[
        MetaModel.description("Instantiation of applyed resource type")
    ]

    is:TraitRef[]
    $is=[
        MetaModel.description("Instantiation of applyed traits")
    ]

    securedBy:SecuritySchemeRef[]
    $securedBy=[
        MetaModel.allowNull(),
        MetaModel.description("securityScheme may also be applied to a resource by using the securedBy key, which is " +
            "equivalent to applying the securityScheme to all methods that may be declared, explicitly or implicitly, by " +
            "defining the resourceTypes or traits property for that resource. To indicate that the method may be called " +
            "without applying any securityScheme, the method may be annotated with the null securityScheme.")
    ]

    uriParameters:Params.Parameter[]
    $uriParameters=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",Params.ParameterLocation.URI),
        MetaModel.description("Uri parameters of this resource")
    ]

    methods:Methods.Method[];
    $methods=[
        MetaModel.newInstanceName("New Method"),
        MetaModel.description("Methods that can be called on this resource")
    ]

    resources:Resource[];
    $resources=[
        MetaModel.newInstanceName("New Resource"),
        MetaModel.description("Children resources")
    ]

    displayName:string
    $displayName=[
        MetaModel.description("An alternate, human-friendly name for the resource")
    ]

    baseUriParameters:Params.Parameter[]
    $baseUriParameters=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",Params.ParameterLocation.BURI),
        MetaModel.description("A resource or a method can override a base URI template's values. This is useful to restrict or change "+
            "the default or parameter selection in the base URI. The baseUriParameters property MAY be used to override any or all " +
            "parameters defined at the root level baseUriParameters property, as well as base URI parameters not specified at the root level.")
    ]

    description:Sys.MarkdownString
    $description=[
        MetaModel.description("The description attribute describes the intended use or " +
            "meaning of the $self. This value MAY be formatted using Markdown.")
    ]
}


///////////////////
//// Resource Type
//////////////////

export class ResourceTypeRef extends Sys.Reference<ResourceType> {
    resourceType:ResourceType
    $resourceType=[
        MetaModel.customHandling(),
        MetaModel.description("Returns referenced resource type")
    ]
}

export class ResourceType implements Sys.DeclaresDynamicType<ResourceType> {
    $=[
        MetaModel.inlinedTemplates(),
        MetaModel.allowQuestion()
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

    methods:Methods.Method[];
    //FIXME
    $methods=[
        MetaModel.description("Methods that are part of this resource type definition")
    ]

    is:Security.TraitRef[]
    $is=[
        MetaModel.description("Instantiation of applyed traits")
    ]

    type:ResourceTypeRef
    $type=[
        MetaModel.description("Instantiation of applyed resource type")
    ]
    //TODO FIXME

    securedBy:Security.SecuritySchemeRef[]
    $securedBy=[
        MetaModel.allowNull(),
        MetaModel.description("securityScheme may also be applied to a resource by using the securedBy key, which is " +
            "equivalent to applying the securityScheme to all methods that may be declared, explicitly or implicitly, by " +
            "defining the resourceTypes or traits property for that resource. To indicate that the method may be called without " +
            "applying any securityScheme, the method may be annotated with the null securityScheme.")
    ]


    uriParameters:Params.Parameter[]
    $uriParameters=[
        MetaModel.setsContextValue("location",Params.ParameterLocation.URI),
        MetaModel.description("Uri parameters of this resource")
    ]
    //TODO MERGE REUSED STUFF WITH RESOURCE

    displayName: string
    $displayName=[
        MetaModel.description("An alternate, human-friendly name for the resource type")
    ]

    baseUriParameters:Params.Parameter[]
    $baseUriParameters=[
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",Params.ParameterLocation.BURI),
        MetaModel.description("A resource or a method can override a base URI template's values. This is useful to restrict " +
            "or change the default or parameter selection in the base URI. The baseUriParameters property MAY be used to " +
            "override any or all parameters defined at the root level baseUriParameters property, as well as base URI " +
            "parameters not specified at the root level.")
    ]

    parametrizedProperties:Sys.TypeInstance
    $parametrizedProperties = [
        MetaModel.customHandling(),
        MetaModel.description("Returns object representation of parametrized properties of the resource type")
    ]

    description:Sys.MarkdownString
    $description=[
        MetaModel.description("The description attribute describes the intended use or " +
            "meaning of the $self. This value MAY be formatted using Markdown.")
    ]
}
