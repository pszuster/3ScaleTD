package com.redhat.model;

public class JSONResponse {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public JSONResponse(String message) {
		super();
		this.message = message;
	}
	
}
