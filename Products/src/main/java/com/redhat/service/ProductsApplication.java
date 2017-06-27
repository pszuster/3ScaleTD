package com.redhat.service;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.swagger.jaxrs.config.BeanConfig;

@ApplicationPath("rest")
public class ProductsApplication extends Application {
	public ProductsApplication(){
		 BeanConfig beanConfig = new BeanConfig();
	        beanConfig.setVersion("1.0.2");
	        beanConfig.setSchemes(new String[]{"http"});
	        beanConfig.setHost("localhost:8080");
	        beanConfig.setBasePath("/rest");
	        beanConfig.setResourcePackage("com.redhat.service");
	        beanConfig.setScan(true);
	        beanConfig.setTitle("Products");
	        beanConfig.setDescription("RHMart's Products API");
	        beanConfig.setPrettyPrint(true);
	}
	
}
