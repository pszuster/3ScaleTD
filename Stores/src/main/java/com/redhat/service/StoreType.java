
package com.redhat.service;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for StoreType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="StoreType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="storeID" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="storeName" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="storeLat" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="storeLong" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "StoreType", propOrder = {
    "storeID",
    "storeName",
    "storeLat",
    "storeLong"
})
public class StoreType {

    protected int storeID;
    @XmlElement(required = true)
    protected String storeName;
    protected double storeLat;
    protected double storeLong;

    /**
     * Gets the value of the storeID property.
     * 
     */
    public int getStoreID() {
        return storeID;
    }

    /**
     * Sets the value of the storeID property.
     * 
     */
    public void setStoreID(int value) {
        this.storeID = value;
    }

    /**
     * Gets the value of the storeName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStoreName() {
        return storeName;
    }

    /**
     * Sets the value of the storeName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStoreName(String value) {
        this.storeName = value;
    }

    /**
     * Gets the value of the storeLat property.
     * 
     */
    public double getStoreLat() {
        return storeLat;
    }

    /**
     * Sets the value of the storeLat property.
     * 
     */
    public void setStoreLat(double value) {
        this.storeLat = value;
    }

    /**
     * Gets the value of the storeLong property.
     * 
     */
    public double getStoreLong() {
        return storeLong;
    }

    /**
     * Sets the value of the storeLong property.
     * 
     */
    public void setStoreLong(double value) {
        this.storeLong = value;
    }

}
