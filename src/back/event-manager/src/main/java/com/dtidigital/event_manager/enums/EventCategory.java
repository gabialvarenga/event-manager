package com.dtidigital.event_manager.enums;

public enum EventCategory {
    CONFERENCE("Conferência"),
    WORKSHOP("Workshop"),
    SEMINAR("Seminário"),
    MEETUP("Meetup"),
    HACKATHON("Hackathon"),
    TRAINING("Treinamento"),
    NETWORKING("Networking"),
    PRESENTATION("Apresentação"),
    COURSE("Curso"),
    OTHER("Outro");

    private final String displayName;

    EventCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
