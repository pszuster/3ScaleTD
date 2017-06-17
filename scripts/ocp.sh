iptables -F

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
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/jboss-image-streams.json
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/amq/amq62-basic.json
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/datavirt/datavirt63-extensions-support-s2i.json
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/eap/eap70-basic-s2i.json
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/sso/sso71-https.json
oc create -f https://raw.githubusercontent.com/jboss-fuse/application-templates/master/fis-image-streams.json
oc create -f https://raw.githubusercontent.com/jboss-openshift/application-templates/master/webserver/jws30-tomcat8-basic-s2i.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/amp_cors.yml
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/products-api.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/stores-api_2.json
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/stores-fis.json
chcat -d /root/.oc/profiles/threescale/volumes/vol{01..10}
oc new-project products-api --display-name='Products API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:products-api:default
oc new-app --template=products-api --param HOSTNAME_HTTP=products.$threescaleDomain
oc new-project stores-api --display-name='Stores API'
oc adm policy add-scc-to-user anyuid system:serviceaccount:stores-api:default
oc new-app --template=stores-api --param HOSTNAME_HTTP=stores-soap.$threescaleDomain
oc new-app --template=stores-fis --param HOSTNAME_HTTP=stores-api.$threescaleDomain

