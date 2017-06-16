package com.redhat.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * The persistent class for the stores database table.
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "StoreType", propOrder = {
    "storeID",
    "storeName",
    "storeLat",
    "storeLong"
})
@Entity
@Table(name="stores")
@NamedQuery(name="Store.findAll", query="SELECT s FROM Store s")
public class Store implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int storeID;
	@XmlElement(required = true)
	private String storeName;
	private double storeLat;
	private double storeLong;



	public Store() {
	}

	public int getStoreID() {
		return this.storeID;
	}

	public void setStoreID(int storeID) {
		this.storeID = storeID;
	}

	public double getStoreLat() {
		return this.storeLat;
	}

	public void setStoreLat(double storeLat) {
		this.storeLat = storeLat;
	}

	public double getStoreLong() {
		return this.storeLong;
	}

	public void setStoreLong(double storeLong) {
		this.storeLong = storeLong;
	}

	public String getStoreName() {
		return this.storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

}