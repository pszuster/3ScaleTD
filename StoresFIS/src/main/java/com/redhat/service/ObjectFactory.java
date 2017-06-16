
package com.redhat.service;

import javax.xml.bind.annotation.XmlRegistry;

import com.redhat.model.Store;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.redhat.service package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.redhat.service
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetAllStores }
     * 
     */
    public GetAllStores createGetAllStores() {
        return new GetAllStores();
    }

    /**
     * Create an instance of {@link GetAllStoresResponse }
     * 
     */
    public GetAllStoresResponse createGetAllStoresResponse() {
        return new GetAllStoresResponse();
    }

    /**
     * Create an instance of {@link StoresType }
     * 
     */
    public StoresType createStoresType() {
        return new StoresType();
    }

    /**
     * Create an instance of {@link GetStore }
     * 
     */
    public GetStore createGetStore() {
        return new GetStore();
    }

    /**
     * Create an instance of {@link GetStoreResponse }
     * 
     */
    public GetStoreResponse createGetStoreResponse() {
        return new GetStoreResponse();
    }

    /**
     * Create an instance of {@link StoreType }
     * 
     */
    public Store createStore() {
        return new Store();
    }

    /**
     * Create an instance of {@link CreateStore }
     * 
     */
    public CreateStore createCreateStore() {
        return new CreateStore();
    }

    /**
     * Create an instance of {@link CreateStoreResponse }
     * 
     */
    public CreateStoreResponse createCreateStoreResponse() {
        return new CreateStoreResponse();
    }

    /**
     * Create an instance of {@link DeleteStore }
     * 
     */
    public DeleteStore createDeleteStore() {
        return new DeleteStore();
    }

    /**
     * Create an instance of {@link DeleteStoreResponse }
     * 
     */
    public DeleteStoreResponse createDeleteStoreResponse() {
        return new DeleteStoreResponse();
    }

}
