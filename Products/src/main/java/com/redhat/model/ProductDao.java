package com.redhat.model;

import java.util.List;


public interface ProductDao {
	
	 	void createProduct(Product prod);

	    List<Product> getAll();
	    
	    Product getProductById(Integer prodID);

	    void deleteProduct(Integer prodID);
	
}
