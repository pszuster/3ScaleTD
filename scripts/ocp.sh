#!/bin/sh
sudo iptables -F

h=$(hostname -s)
name=threescale
long=${#name}
num=${h:$long}

DOMAIN=rhtechofficelatam.com
threescaleDomain=3scale$num.$DOMAIN
threescaleHost=$name.$threescaleDomain

echo y | oc-cluster destroy threescale
oc-cluster up threescale --public-hostname=$threescaleHost --routing-suffix=apps.$threescaleDomain

sleep 5s
echo y | oc login https://localhost:8443 --username=admin --password=admin --insecure-skip-tls-verify
oc delete project myproject
oc set env dc/router ROUTER_ALLOW_WILDCARD_ROUTES=true -n default
oc project openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/jboss-image-streams.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/image-streams-rhel7.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/amq62-basic.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/datavirt63-basic-s2i.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/eap70-basic-s2i.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/fis-image-streams.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/amp_cors.yml
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/products-api.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/stock-api.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/stores-api.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/stores-fis.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/sso71-https.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/benefits.json
#oc delete is nodejs -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/templates/swagger-import.json
chcat -d /root/.oc/profiles/threescale/volumes/vol{01..10}
oc new-project products-api --display-name='Products API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:products-api:default
oc new-app --template=products-api --param HOSTNAME_HTTP=products.$threescaleDomain
oc new-project stores-api --display-name='Stores API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:stores-api:default
#oc new-app --template=stores-soap --param HOSTNAME_HTTP=stores-soap.$threescaleDomain
#oc new-app --template=stores-fis --param ROUTE_HOST=stores-fis.$threescaleDomain
oc new-project rh-sso --display-name='RedHat Single Sign-on'
oc create serviceaccount sso-service-account
oc policy add-role-to-user view system:serviceaccount:rh-sso:sso-service-account
curl https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/certs/jgroups.jceks -o jgroups.jceks
curl https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/certs/keystore.jks -o keystore.jks
curl https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/certs/truststore.jks -o truststore.jks
oc secret new sso-app-secret jgroups.jceks keystore.jks truststore.jks
oc secrets link sso-service-account sso-app-secret
oc new-app --template=sso71-https --param HOSTNAME_HTTP=sso.$threescaleDomain --param HOSTNAME_HTTPS=secure-sso.$threescaleDomain
oc new-project stock-api --display-name='Stock API'
curl https://raw.githubusercontent.com/pszuster/3ScaleTD/v2.0/Stock/datasources.env -o datasources.env
oc secret new datavirt-app-config datasources.env 
oc create serviceaccount datavirt-service-account
oc policy add-role-to-user view system:serviceaccount:stock-api:datavirt-service-account
oc secret link datavirt-service-account datavirt-app-config
oc adm policy add-scc-to-user anyuid system:serviceaccount:stock-api:default
#oc new-app --template=stock-api
oc new-project swagger-import --display-name='Swagger Import Tool'
oc new-app --template=threescale-swagger-importer --param APPLICATION_DOMAIN=swagger-import.$threescaleDomain
