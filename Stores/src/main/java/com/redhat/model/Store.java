package com.redhat.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the stores database table.
 * 
 */
@Entity
@Table(name="stores")
@NamedQuery(name="Store.findAll", query="SELECT s FROM Store s")
public class Store implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int storeID;

	private double storeLat;

	private double storeLong;

	private String storeName;

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