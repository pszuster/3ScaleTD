package com.redhat.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the "Products" database table.
 * 
 */
@Entity
@Table(name="products")
//@NamedQuery(name="Product.findAll", query="SELECT p FROM Product p")
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer productid;

	private String productname;

	private double productprice;

	public Product() {
	}

	public Integer getProductid() {
		return this.productid;
	}

	public void setProductid(Integer productid) {
		this.productid = productid;
	}

	public String getProductname() {
		return this.productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public double getProductprice() {
		return this.productprice;
	}

	public void setProductprice(double productprice) {
		this.productprice = productprice;
	}

}