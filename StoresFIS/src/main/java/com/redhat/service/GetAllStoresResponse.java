
package com.redhat.service;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Stores" type="{http://www.rhmart.com/Stores/}StoresType"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "stores"
})
@XmlRootElement(name = "getAllStoresResponse")
public class GetAllStoresResponse {

    @XmlElement(name = "Stores", required = true)
    protected StoresType stores;

    /**
     * Gets the value of the stores property.
     * 
     * @return
     *     possible object is
     *     {@link StoresType }
     *     
     */
    public StoresType getStores() {
        return stores;
    }

    /**
     * Sets the value of the stores property.
     * 
     * @param value
     *     allowed object is
     *     {@link StoresType }
     *     
     */
    public void setStores(StoresType value) {
        this.stores = value;
    }

}
