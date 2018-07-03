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
profile=ignite

echo y | /home/jboss/oc-cluster-wrapper/oc-cluster destroy $profile
rm -rf /root/.oc
/home/jboss/oc-cluster-wrapper/oc-cluster up $profile --public-hostname=$HOST --routing-suffix=$SUFFIX

sleep 10s

#echo y | oc login https://localhost:8443 --username=admin --password=admin --insecure-skip-tls-verify
echo y | oc login -u system:admin --insecure-skip-tls-verify
oc delete project myproject

chcat -d /root/.oc/profiles/$profile/volumes/vol{01..10}

### IMPORT IMAGE STREAMS
oc create -f https://raw.githubusercontent.com/pszuster/Fuse7TD/master/amq/amq63-image-stream.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/Fuse7TD/master/rhdg/datagrid71-image-stream.json -n openshift
oc create -f https://raw.githubusercontent.com/pszuster/Fuse7TD/master/StockApp/openjdk18-image-stream.json -n openshift
### Create Assets

### GitBook
oc new-project gitbook --display-name="GitBook"
oc create -f https://raw.githubusercontent.com/pszuster/Fuse7TD/master/gitbookApp/gitbook-template.json
oc adm policy add-scc-to-user anyuid system:serviceaccount:gitbook:default
oc new-app --template=gitbook --param=ROUTE_HOSTNAME=gitbook.$SUFFIX --param=GUID_PARAM=$myGUID --param=GITBOOK_URL_PARAM=https://github.com/pszuster/fuse7td-gitbookv2


### 3scale
oc create -f https://raw.githubusercontent.com/pszuster/3ScaleTD/master/templates/amp.yml
