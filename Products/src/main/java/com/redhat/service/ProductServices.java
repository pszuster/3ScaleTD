package com.redhat.service;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import com.google.gson.Gson;
import com.redhat.model.Product;
import com.redhat.model.ProductDao;


@Path("/services")
@Produces("application/json")
public class ProductServices {

	@Inject
	ProductDao productDAO;
	
	@Path("/products")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getAllProducts(){
        Gson gson = new Gson();
        String resp="";
        try{
         List<Product> prod= productDAO.getAll();
         resp=gson.toJson(prod);
        }catch(Exception e){resp="{\"error\": \"" + e.getMessage() + "\"}";};
        return resp;
		
	}
	
	
	@Path("/product/{productId}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getProduct(@PathParam("productId") Integer productId){
        Gson gson = new Gson();
        String resp="";
        Product prod=null;
        try{
         prod= productDAO.getProductById(productId);
         if(prod==null)
        	 resp="{\"error\": \"Product not found\" }";
         else
        	 resp=gson.toJson(prod);
        }catch(Exception e){resp="{\"error\": \"" + e.getMessage() + "\"}";};
        return resp;
		
	}
	
	@Path("/product")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public String createProduct(String product){
	public String createProduct(Product product){
		String resp="";
		try{
			productDAO.createProduct(product);
		}catch(Exception e){resp="{\"error\": \"" + e.getMessage() + "\"}";};
		
		return "{ \"result\": \"Product created\"}";
	}
	
	@Path("/product/{productId}")
	//@ApiOperation(value = "productDelete")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteProduct(@PathParam("productId") Integer productId){
		String resp="";
		try{
			productDAO.deleteProduct(productId);
		}catch (Exception e) { return "{\"error\": \"" + e.getMessage() + "\"}";};
		return "{\"result\": \"Product " + productId + " deleted\"}";
	}
}
