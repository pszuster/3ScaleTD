#!/bin/sh
sudo iptables -F


myExtIP=$(curl -s http://www.opentlc.com/getip)
myGUID=$(hostname|cut -f2 -d-|cut -f1 -d.)

echo IP: $myExtIP
echo GUID: $myGUID


if [[ $myGUID == 'repl' ]]
   then
	DOMAIN=$myExtIP.xip.io
	HOST=$DOMAIN
	SUFFIX=apps.$DOMAIN
else

	DOMAIN=$myGUID.generic.opentlc.com
	HOST=threescale-$DOMAIN
	SUFFIX=apps-$DOMAIN
fi
echo DOMAIN: $DOMAIN
profile=threescale

echo y | /home/jboss/oc-cluster-wrapper/oc-cluster destroy $profile
rm -rf /root/.oc
/home/jboss/oc-cluster-wrapper/oc-cluster up $profile --public-hostname=$HOST --routing-suffix=$SUFFIX

sleep 10s

#echo y | oc login https://localhost:8443 --username=admin --password=admin --insecure-skip-tls-verify
echo y | oc login -u system:admin --insecure-skip-tls-verify
oc delete project myproject

### Fix router to accept wildcard routes
oc scale dc router --replicas=0 --timeout=0s -n default
oc set env deploymentconfig/router ROUTER_ALLOW_WILDCARD_ROUTES=true -n default
oc scale --replicas=1 deploymentconfig/router -n default
#chcat -d /root/.oc/profiles/$profile/volumes/vol{01..10}

### IMPORT IMAGE STREAMS
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/jboss-image-streams.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/image-streams-rhel7.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/amq62-basic.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/datavirt63-basic-s2i.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/eap70-basic-s2i.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/fis-image-streams.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/amp.yml -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/products-api.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/stock-api.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/stores-api.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/stores-fis.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/sso72-image-stream.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/sso72-x509-https.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/benefits.json -n openshift
#oc delete is nodejs -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/swagger-import.json -n openshift


### Create Assets

### GitBook
oc new-project gitbook --display-name="GitBook"
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/gitbook-template.json
oc adm policy add-scc-to-user anyuid system:serviceaccount:gitbook:default
oc new-app --template=gitbook --param=ROUTE_HOSTNAME=gitbook.$SUFFIX --param=GUID_PARAM=$myGUID --param=GITBOOK_URL_PARAM=https://github.com/pszuster/3scaleTD_gitbook --param=HOSTNAME_PARAM=$HOST --param=SUFFIX_PARAM=$SUFFIX

## Products API
oc new-project products-api --display-name='Products API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:products-api:default
oc new-app --template=products-api --param HOSTNAME_HTTP=products.$DOMAIN

## Stores API

oc new-project stores-api --display-name='Stores API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:stores-api:default

## RH SSO
oc new-project rh-sso --display-name='RedHat Single Sign-on'
oc create serviceaccount sso-service-account
oc policy add-role-to-user view system:serviceaccount:rh-sso:sso-service-account
#curl https://raw.githubusercontent.com/pszuster/3ScaleTD/master/certs/jgroups.jceks -o jgroups.jceks
#curl https://raw.githubusercontent.com/pszuster/3ScaleTD/master/certs/keystore.jks -o keystore.jks
#curl https://raw.githubusercontent.com/pszuster/3ScaleTD/master/certs/truststore.jks -o truststore.jks
#oc secret new sso-app-secret jgroups.jceks keystore.jks truststore.jks
#oc secrets link sso-service-account sso-app-secret
oc new-app --template=sso72-x509-https --param HOSTNAME_HTTP=sso.$DOMAIN --param HOSTNAME_HTTPS=secure-sso.$DOMAIN

## Stock API
oc new-project stock-api --display-name='Stock API'
curl https://raw.githubusercontent.com/pszuster/3ScaleTD/master/Stock/datasources.env -o datasources.env
oc secret new datavirt-app-config datasources.env 
oc create serviceaccount datavirt-service-account
oc policy add-role-to-user view system:serviceaccount:stock-api:datavirt-service-account
oc secret link datavirt-service-account datavirt-app-config
oc adm policy add-scc-to-user anyuid system:serviceaccount:stock-api:default

## Swagger Import Tool
oc new-project swagger-import --display-name='Swagger Import Tool'
oc new-app --template=threescale-swagger-importer --param APPLICATION_DOMAIN=swagger-import.$DOMAIN
