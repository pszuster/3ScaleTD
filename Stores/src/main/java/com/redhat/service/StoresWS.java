package com.redhat.service;

@javax.jws.WebService(endpointInterface="com.redhat.service.Stores")
public class StoresWS implements Stores {

	@Override
	public String createStore(StoreType store) {
		// TODO Auto-generated method stub
		return "CREATED";
	}

	@Override
	public String deleteStore(int storeID) {
		// TODO Auto-generated method stub
		return "DELETED";
	}

	@Override
	public StoreType getStore(int storeID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StoresType getAllStores() {
		// TODO Auto-generated method stub
		return null;
	}

}
