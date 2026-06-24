package com.assurance.souscription.exception;


public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}