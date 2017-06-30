import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import {Annotable} from "./common";
import Methods = require("./methods")

///////////////////
//// Security Scheme
//////////////////

export class SecuritySchemePart extends Methods.Operation {

  $annotations=[
    MetaModel.description("Annotations to be applied to this security scheme part. Annotations are any property whose " +
      "key begins with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is " +
      "a declared annotation name.")
  ]
}

export class SecuritySchemeSettings extends Annotable{
  $=[
    MetaModel.allowAny()
  ]
}

export class OAuth1SecuritySchemeSettings extends SecuritySchemeSettings {
  $=[
    MetaModel.allowAny(),
    MetaModel.functionalDescriminator("$parent.type=='OAuth 1.0'")
  ]

  requestTokenUri:Sys.FixedUriString
  $requestTokenUri=[
    MetaModel.required(),
    MetaModel.description("The URI of the Temporary Credential Request endpoint as defined in RFC5849 Section 2.1"),
    MetaModel.valueDescription("FixedUriString")
  ]

  authorizationUri:Sys.FixedUriString
  $authorizationUri=[
    MetaModel.required(),
    MetaModel.description("The URI of the Resource Owner Authorization endpoint as defined in RFC5849 Section 2.2"),
    MetaModel.valueDescription("FixedUriString")
  ]

  tokenCredentialsUri:Sys.FixedUriString
  $tokenCredentialsUri=[
    MetaModel.required(),
    MetaModel.description("The URI of the Token Request endpoint as defined in RFC5849 Section 2.3"),
    MetaModel.valueDescription("FixedUriString")
  ]

  signatures:string[]
  $signatures=[
    MetaModel.oneOf(["HMAC-SHA1","RSA-SHA1","PLAINTEXT"]),
    MetaModel.hide(),
    MetaModel.description("List of the signature methods used by the server. Available methods: HMAC-SHA1, RSA-SHA1, PLAINTEXT")
  ]
}

export class OAuth2SecuritySchemeSettings extends SecuritySchemeSettings {
  $=[
    MetaModel.allowAny()
  ]

  accessTokenUri:Sys.FixedUriString
  $accessTokenUri=[
    MetaModel.required(),
    MetaModel.description("The URI of the Token Endpoint as defined in RFC6749 Section 3.2. Not required forby implicit grant type."),
    MetaModel.valueDescription("FixedUriString")
  ]

  authorizationUri:Sys.FixedUriString
  $authorizationUri=[
    MetaModel.description("The URI of the Authorization Endpoint as defined in RFC6749 Section 3.1. Required forby authorization_code and implicit grant types."),
    MetaModel.valueDescription("FixedUriString")
  ]

  authorizationGrants:string[]
  $authorizationGrants=[
    MetaModel.required(),
    MetaModel.oftenKeys(["authorization_code",
    "password",
    "client_credentials",
    "implicit"]),
    MetaModel.description("A list of the Authorization grants supported by the API as defined in RFC6749 Sections 4.1, 4.2, 4.3 and " +
      "4.4, can be any of: authorization_code, password, client_credentials, implicit, or any absolute url."),
    MetaModel.markdownDescription("A list of the Authorization grants supported by the API as defined in RFC6749 Sections " +
      "4.1, 4.2, 4.3 and 4.4, can be any of:<br>* authorization_code<br>* password<br>* client_credentials<br>* implicit " +
      "<br>*  or any absolute url.")
  ]

  scopes:string[]

  $scopes=[
    MetaModel.description("A list of scopes supported by the security scheme as defined in RFC6749 Section 3.3")
  ]
}



export class SecuritySchemeRef extends Sys.Reference<AbstractSecurityScheme>{
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

export class AbstractSecurityScheme  extends Annotable{
  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
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
    MetaModel.oneOf(["OAuth 1.0","OAuth 2.0","Basic Authentication","Digest Authentication","Pass Through","x-{other}"]),
    MetaModel.descriminatingProperty(),//FIXME (we need more clear connection with SecuritySchemeType)
    MetaModel.description("The securitySchemes property MUST be used to specify an API's security mechanisms, including the required settings and the authentication methods that the API supports. one authentication method is allowed if the API supports them."),
    MetaModel.valueDescription("string<br><br>The value MUST be one of<br>* OAuth 1.0,<br>* OAuth 2.0,<br>* BasicSecurityScheme Authentication<br>* DigestSecurityScheme Authentication<br>* Pass Through<br>* x-&lt;other&gt;")
  ]



  description:Sys.MarkdownString;
  $description=[
    MetaModel.description("The description attribute MAY be used to describe a security schemes property."),
    MetaModel.description("The description MAY be used to describe a securityScheme.")
  ]

  describedBy:SecuritySchemePart;
  $describedBy=[
    MetaModel.description("A description of the request components related to Security that are determined by the scheme: " +
      "the headers, query parameters or responses. As a best practice, even for standard security schemes, API designers SHOULD " +
      "describe these properties of security schemes. Including the security scheme description completes an API documentation.")
  ]
  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the security scheme display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
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

class OAuth2SecurityScheme extends AbstractSecurityScheme {
  type="OAuth 2.0"

  settings:OAuth2SecuritySchemeSettings

  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")
  ]
}

class OAuth1SecurityScheme extends AbstractSecurityScheme {
  type="OAuth 1.0"

  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")]

  settings: OAuth1SecuritySchemeSettings
}

class PassThroughSecurityScheme extends AbstractSecurityScheme {
  type="Pass Through"

  settings:SecuritySchemeSettings

  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")
  ]
}

class BasicSecurityScheme extends AbstractSecurityScheme {
  type="Basic Authentication"
  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")
  ]
}

class DigestSecurityScheme extends AbstractSecurityScheme {
  type="Digest Authentication"
  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")
  ]
}

class CustomSecurityScheme extends AbstractSecurityScheme {
  type="x-{other}"
  $=[
    MetaModel.description("Declares globally referable security scheme definition"),
    MetaModel.actuallyExports("$self"),
    MetaModel.referenceIs("settings")
  ]
}
