package com.dtidigital.event_manager.enums;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EventCategoryTest {

    @Test
    void testEnumValues() {
        assertEquals(10, EventCategory.values().length);
        
        
        assertNotNull(EventCategory.CONFERENCE);
        assertNotNull(EventCategory.WORKSHOP);
        assertNotNull(EventCategory.SEMINAR);
        assertNotNull(EventCategory.MEETUP);
        assertNotNull(EventCategory.HACKATHON);
        assertNotNull(EventCategory.TRAINING);
        assertNotNull(EventCategory.NETWORKING);
        assertNotNull(EventCategory.PRESENTATION);
        assertNotNull(EventCategory.COURSE);
        assertNotNull(EventCategory.OTHER);
    }

    @Test
    void testDisplayNames() {
        // Given & When & Then
        assertEquals("Conferência", EventCategory.CONFERENCE.getDisplayName());
        assertEquals("Workshop", EventCategory.WORKSHOP.getDisplayName());
        assertEquals("Seminário", EventCategory.SEMINAR.getDisplayName());
        assertEquals("Meetup", EventCategory.MEETUP.getDisplayName());
        assertEquals("Hackathon", EventCategory.HACKATHON.getDisplayName());
        assertEquals("Treinamento", EventCategory.TRAINING.getDisplayName());
        assertEquals("Networking", EventCategory.NETWORKING.getDisplayName());
        assertEquals("Apresentação", EventCategory.PRESENTATION.getDisplayName());
        assertEquals("Curso", EventCategory.COURSE.getDisplayName());
        assertEquals("Outro", EventCategory.OTHER.getDisplayName());
    }

    @Test
    void testValueOf() {
        assertEquals(EventCategory.CONFERENCE, EventCategory.valueOf("CONFERENCE"));
        assertEquals(EventCategory.WORKSHOP, EventCategory.valueOf("WORKSHOP"));
        assertEquals(EventCategory.OTHER, EventCategory.valueOf("OTHER"));
    }

    @Test
    void testValueOf_InvalidValue() {
        assertThrows(IllegalArgumentException.class, () -> {
            EventCategory.valueOf("INVALID_CATEGORY");
        });
    }
}
