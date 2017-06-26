package com.redhat.model;

public class JsonResponse {
 private String message="";

public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}

public JsonResponse(String message) {
	super();
	this.message = message;
}
 
}
