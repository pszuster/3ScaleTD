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
import com.redhat.model.JsonResponse;
import com.redhat.model.Product;
import com.redhat.model.ProductDao;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Path("/services")
@Api(value="services")
@Produces("application/json")
public class ProductServices {

	@Inject
	ProductDao productDAO;
	
	@Path("/products")
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public List<Product> getAllProducts(){
         List<Product> prod= productDAO.getAll();
        return prod;
		
	}
	
	
	@Path("/product/{productId}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Product getProduct(@PathParam("productId") Integer productId){
        return productDAO.getProductById(productId);
		
	}
	
	@Path("/product")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonResponse createProduct(Product product){
		JsonResponse jr =  new JsonResponse("");
		try{
			productDAO.createProduct(product);
		}catch(Exception e){jr.setMessage(e.getMessage()); return jr;};
		
		jr.setMessage("Product created");
		return jr;
	}
	
	@Path("/product/{productId}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public JsonResponse deleteProduct(@PathParam("productId") Integer productId){
		JsonResponse jr =  new JsonResponse("");
		try{
			productDAO.deleteProduct(productId);
		}catch (Exception e) { jr.setMessage(e.getMessage()); return jr;};
		jr.setMessage("Product " + productId + " deleted");
		return jr;
	}
}
