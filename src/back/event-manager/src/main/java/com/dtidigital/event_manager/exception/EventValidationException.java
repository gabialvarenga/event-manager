package com.dtidigital.event_manager.exception;

public class EventValidationException extends RuntimeException {
    
    public EventValidationException(String message) {
        super(message);
    }
    
    public EventValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
