# MediZen Memory Design

This document defines how the MediZen agent stores and uses memory for a better booking experience.

## What to Store

### User Preferences
- Preferred specialty or doctor type (e.g., cardiology, dermatologist)
- Preferred appointment time window (morning, afternoon, evening)
- Location or clinic preference
- Language preference and accessibility needs
- Preferred consultation mode if supported

### Past Bookings
- Most recent confirmed appointment
- Frequent doctor or clinic choices
- Recurring booking patterns
- Canceled or rescheduled appointments

### Conversation State
- Active booking flow step
- Partial booking selections that are waiting for confirmation
- Clarification questions already asked

## Memory Types

### Short-Term Memory (Session)
- Stores the current interaction state during a single session.
- Example:
  - selected specialty: `dermatology`
  - requested date: `2026-05-11`
  - candidate slot: `Dr. Singh, 14:00`
- Use cases:
  - carrying booking flow context between question and confirmation
  - preventing repeated clarification questions
- Duration:
  - lasts for the current conversation/session only

### Long-Term Memory (Persistent)
- Stores persistent user preferences and previous booking metadata.
- Storage location:
  - database records in PostgreSQL
  - optionally vector store for semantic retrieval of user preferences
- Example:
  - `preferredSpecialty: dermatology`
  - `preferredTimeOfDay: afternoon`
  - `lastBookedDoctor: Dr. Maya Singh`
- Use cases:
  - personalization of recommendations
  - reuse of stable preference signals across sessions
  - faster appointment discovery

## Read / Write Strategy

### Read Strategy
- On every booking request, read long-term preferences for personalization.
- For ongoing session flows, read short-term session state from the context builder.
- If the user explicitly updates preferences, merge that data into long-term memory.

### Write Strategy
- Write session state immediately after an explicit slot confirmation or when the user provides a new preference.
- Persist long-term preferences after successful booking or explicit preference changes.
- Avoid writing incomplete or uncertain data.

## Example Memory Entries

### Short-Term Session Entry
```json
{
  "sessionId": "sess-45a",
  "userId": "user-122",
  "currentFlow": "booking",
  "requestedSpecialty": "cardiology",
  "requestedDateRange": {"from": "2026-05-05", "to": "2026-05-07"},
  "pendingSlot": {"doctorId": "d-128", "date": "2026-05-05", "time": "10:00"}
}
```

### Long-Term Persistent Entry
```json
{
  "userId": "user-122",
  "preferredSpecialty": "cardiology",
  "preferredTimeOfDay": "morning",
  "preferredLocation": "Downtown Clinic",
  "lastBookedDoctorId": "d-128",
  "bookingHistory": [
    {"appointmentId": "appt-901", "doctorId": "d-128", "date": "2026-04-20", "status": "completed"}
  ]
}
```

## Privacy Considerations
- Only store data needed for faster booking and personalization.
- Do not store medical diagnoses, symptom descriptions, or sensitive clinical details in memory.
- Anonymize or encrypt user identifiers where required by policy.
- Respect user opt-out preferences for personalization.
- Use short-term session memory for transient booking context and avoid persisting that data unless the user explicitly confirms.

## Implementation Notes
- Persist long-term memory in PostgreSQL as a dedicated `user_preferences` and `booking_history` model.
- Keep session state in the BFF layer or session store, not in the primary LLM prompt.
- Use memory reads to pre-fill recommendation filters and improve slot ranking.
- Use memory writes after confirmed bookings and explicit preference updates only.
