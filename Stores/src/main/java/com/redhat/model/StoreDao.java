package com.redhat.model;

import java.util.List;


public interface StoreDao {
	
	 	void createStore(Store prod);

	    List<Store> getAll();
	    
	    Store getStoreById(Integer storeID);

	    void deleteStore(Integer storeID);
	
}
