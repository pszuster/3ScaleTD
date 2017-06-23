
package com.redhat.service;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import com.redhat.model.Store;


/**
 * <p>Java class for StoresType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="StoresType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="store" type="{http://www.rhmart.com/Stores/}StoreType" maxOccurs="unbounded"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "StoresType", propOrder = {
    "store"
})
public class StoresType {

    @XmlElement(required = true)
    protected List<Store> store;

    /**
     * Gets the value of the store property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the store property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getStore().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link StoreType }
     * 
     * 
     */
    public List<Store> getStore() {
        if (store == null) {
            store = new ArrayList<Store>();
        }
        return this.store;
    }
    public void setStore(ArrayList<Store> stores){
    	this.store = stores;
    }

}
