import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Params = require("./parameters")
import Bodies = require("./bodies")
import Common = require("./common")
import Methods=require("./methods")

///////////////////
//// Security
//////////////////

export class SecuritySchemePart extends Methods.MethodBase {
    $headers=[
        MetaModel.markdownDescription("Optional array of headers, documenting the possible headers that could be accepted."),
        MetaModel.valueDescription("Object whose property names are the request header names and whose values describe the values.")
    ]

    $queryParameters=[
        MetaModel.markdownDescription("Query parameters, used by the schema in order to authorize the request. Mutually exclusive with queryString."),
        MetaModel.valueDescription("Object whose property names are the query parameter names and whose values describe the values.")
    ]

    $queryString=[
        MetaModel.description("Specifies the query string, used by the schema in order to authorize the request. Mutually exclusive with queryParameters."),
        MetaModel.valueDescription("Type name or type declaration")
    ]

    $responses=[
        MetaModel.description("Optional array of responses, describing the possible responses that could be sent.")
    ]
    //
    // $is=[
    //     MetaModel.hide()
    // ]
    //
    // $securedBy=[
    //     MetaModel.hide()
    // ]

    displayName:string
    $displayName=[
        MetaModel.description("An alternate, human-friendly name for the security scheme part")
    ]

    $description=[
        MetaModel.description("A longer, human-friendly description of the security scheme part"),
        MetaModel.valueDescription("Markdown string")
    ]

    is:TraitRef[]
    $is=[
        MetaModel.description("Instantiation of applyed traits")
    ]
}


export class SecuritySchemeSettings {
    $=[
        MetaModel.allowAny()
    ]
}

export class AbstractSecurityScheme implements Sys.Referencable<AbstractSecurityScheme> {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    name:string
    $name=[
        MetaModel.key(),
        MetaModel.startFrom(""),
        MetaModel.hide(),
        MetaModel.description("Name of the security scheme")
    ]

    type:string
    $type=[
        MetaModel.required(),
        MetaModel.oneOf(["OAuth 1.0","OAuth 2.0","Basic Authentication","DigestSecurityScheme Authentication","x-{other}"]),
        MetaModel.descriminatingProperty(),//FIXME (we need more clear connection with SecuritySchemeType)
        MetaModel.description("The securitySchemes property MUST be used to specify an API's security mechanisms, including " +
            "the required settings and the authentication methods that the API supports. one authentication method is allowed if the API supports them."),
        MetaModel.valueDescription("string<br><br>The value MUST be one of<br>* OAuth 1.0,<br>* OAuth 2.0, " +
            "<br>* BasicSecurityScheme Authentication<br>* DigestSecurityScheme Authentication<br>* x-&lt;other&gt;")
    ]

    description:Sys.MarkdownString;
    $description=[
        MetaModel.description("The description attribute MAY be used to describe a security schemes property.")
    ]

    describedBy:SecuritySchemePart;
    $describedBy=[
        MetaModel.description("A description of the request components related to Security that are determined by the scheme: " +
            "the headers, query parameters or responses. As a best practice, even for standard security schemes, API designers SHOULD " +
            "describe these properties of security schemes. Including the security scheme description completes an API documentation.")
    ]

    settings:SecuritySchemeSettings;
    $settings=[
        MetaModel.description("The settings attribute MAY be used to provide security scheme-specific information. The required " +
            "attributes vary depending on the type of security scheme is being declared. It describes the minimum set of properties " +
            "which any processing application MUST provide and validate if it chooses to implement the security scheme. Processing " +
            "applications MAY choose to recognize other properties for things such as token lifetime, preferred cryptographic algorithms, " +
            "and more.")
    ]
}

export class SecuritySchemeRef extends Sys.Reference<AbstractSecurityScheme>{
    $=[
        MetaModel.allowAny()
    ]

    securitySchemeName:string
    $securitySchemeName=[
        MetaModel.customHandling(),
        MetaModel.description("Returns the name of security scheme, this reference refers to.")
    ]

    securityScheme:AbstractSecurityScheme
    $securityScheme=[
        MetaModel.customHandling(),
        MetaModel.description("Returns AST node of security scheme, this reference refers to, or null.")
    ]
}

export class OAuth1SecuritySchemeSettings extends  SecuritySchemeSettings {
    $=[
        MetaModel.allowAny(),
        MetaModel.functionalDescriminator("$parent.type=='OAuth 1.0'")
    ]

    requestTokenUri:Sys.FixedUri
    $requestTokenUri=[
        MetaModel.required(),
        MetaModel.description("The URI of the Temporary Credential Request endpoint as defined in RFC5849 Section 2.1"),
        MetaModel.valueDescription("FixedUriString")
    ]

    authorizationUri:Sys.FixedUri
    $authorizationUri=[
        MetaModel.required(),
        MetaModel.description("The URI of the Resource Owner Authorization endpoint as defined in RFC5849 Section 2.2"),
        MetaModel.valueDescription("FixedUriString")
    ]

    tokenCredentialsUri:Sys.FixedUri
    $tokenCredentialsUri=[
        MetaModel.required(),
        MetaModel.description("The URI of the Token Request endpoint as defined in RFC5849 Section 2.3"),
        MetaModel.valueDescription("FixedUriString")
    ]
}
export class OAuth2SecuritySchemeSettings extends  SecuritySchemeSettings {
    $=[
        MetaModel.allowAny()
    ]

    accessTokenUri:Sys.FixedUri
    $accessTokenUri=[
        MetaModel.required(),
        MetaModel.description("The URI of the Token Endpoint as defined in RFC6749 Section 3.2. Not required forby implicit grant type."),
        MetaModel.valueDescription("FixedUriString")
    ]

    authorizationUri:Sys.FixedUri
    $authorizationUri=[
        MetaModel.required(),
        MetaModel.description("The URI of the Authorization Endpoint as defined in RFC6749 Section 3.1. Required forby " +
            "authorization_code and implicit grant types."),
        MetaModel.valueDescription("FixedUriString")
    ]

    authorizationGrants:string[]
    $authorizationGrants = [
        MetaModel.description("A list of the Authorization grants supported by the API as defined in RFC6749 Sections 4.1, 4.2, 4.3 " +
            "and 4.4, can be any of: authorization_code, password, client_credentials, implicit, or refresh_token."),
        MetaModel.markdownDescription("A list of the Authorization grants supported by the API as defined in RFC6749 " +
            "Sections 4.1, 4.2, 4.3 and 4.4, can be any of:<br>* authorization_code<br>* password<br>* client_credentials " +
            "<br>* implicit<br>* refresh_token."),
    ]

    scopes:string[]
    $scopes=[
        MetaModel.description("A list of scopes supported by the security scheme as defined in RFC6749 Section 3.3")
    ]
}

class OAuth2SecurityScheme extends AbstractSecurityScheme {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    type="OAuth 2.0"

    settings:OAuth2SecuritySchemeSettings
}
class OAuth1SecurityScheme extends AbstractSecurityScheme {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    type="OAuth 1.0"

    settings: OAuth1SecuritySchemeSettings
}

class BasicSecurityScheme extends AbstractSecurityScheme {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    type="Basic Authentication"
}

class DigestSecurityScheme extends AbstractSecurityScheme {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    type="Digest Authentication"
}

class CustomSecurityScheme extends AbstractSecurityScheme {
    $=[
        MetaModel.description("Declares globally referable security schema definition"),
        MetaModel.actuallyExports("$self"),
        MetaModel.referenceIs("settings")
    ]

    type="x-{other}"
}
