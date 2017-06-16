package com.redhat.service;

import javax.inject.Inject;
import javax.jws.WebService;

import com.redhat.model.Store;
import com.redhat.model.StoreDao;

@WebService(endpointInterface="com.redhat.service.Stores")
public class StoresWS implements Stores {
	
	@Inject
	StoreDao storeDAO;
	
	@Override
	public String createStore(Store store) {
		store = new Store(store.getStoreName(),store.getStoreLat(),store.getStoreLong());
		storeDAO.createStore(store);
		return "Store ID:" + store.getStoreID() + " CREATED";
	}

	@Override
	public String deleteStore(int storeID) {
		storeDAO.deleteStore(storeID);
		return "Store ID: " + storeID + " DELETED";
	}

	@Override
	public Store getStore(int storeID) {
		return storeDAO.getStoreById(storeID);
	}

	@Override
	public StoresType getAllStores() {
		StoresType st = new StoresType();
		st.store = storeDAO.getAll();
		return st;
	}

}
