# MediZen AI Skills

This document defines modular capabilities for the MediZen agent. Each skill is designed to map cleanly to implementation modules.

## Skill: Intent Detection
- Description: Interpret user input and classify it into MediZen booking actions.
- Input:
  - raw user text or structured BFF intent payload
  - session context and previous conversation state
- Output:
  - `intent`: `book_appointment`, `check_availability`, `modify_booking`, `cancel_booking`, or `clarify`
  - `entities`: specialty, doctor name, date range, time preference, location, patient ID
  - `confidence`: numeric score or flag for ambiguity
- When to use:
  - on every user turn before any backend call.
- Example:
```json
{
  "intent": "book_appointment",
  "entities": {
    "specialty": "cardiology",
    "dateRange": {"from": "2026-05-05", "to": "2026-05-05"},
    "timePreference": "morning"
  },
  "confidence": 0.92
}
```

## Skill: Doctor Availability Retrieval (RAG)
- Description: Fetch real doctor availability by combining RAG context with FastAPI backend data.
- Input:
  - validated booking entities (specialty, doctorId, date range, patient constraints)
  - optionally user preference memory
- Output:
  - `availableSlots`: list of slots with doctor metadata, date, time, and location
  - `source`: backend endpoint used and retrieval timestamp
  - `availabilityStatus`: `available`, `partial`, `none`
- When to use:
  - after intent detection and before slot recommendation.
- Example:
```json
{
  "availableSlots": [
    {"doctorId": "d-210", "doctorName": "Dr. Maya Singh", "specialty": "dermatology", "date": "2026-05-11", "time": "14:00", "durationMinutes": 30}
  ],
  "source": "GET /availability",
  "availabilityStatus": "available"
}
```

## Skill: Slot Recommendation
- Description: Rank and select the best appointment slots for the user.
- Input:
  - `availableSlots`
  - user preferences (time, doctor gender, language, location)
  - past booking behavior and urgency signals
- Output:
  - `recommendedSlots`: top 1-3 slot suggestions sorted by relevance
  - `recommendationReason`: text describing why these slots were chosen
- When to use:
  - immediately after availability retrieval.
- Example:
```json
{
  "recommendedSlots": [
    {"doctorId": "d-210", "doctorName": "Dr. Maya Singh", "date": "2026-05-11", "time": "14:00", "reason": "Matches your afternoon preference and is the earliest dermatologist opening."}
  ],
  "recommendationReason": "Afternoon window with a familiar dermatologist."
}
```

## Skill: Appointment Booking (MCP API call)
- Description: Execute the confirmed booking by calling MediZen’s MCP-enabled backend endpoint.
- Input:
  - confirmed slot selection
  - patient profile and booking payload
- Output:
  - `bookingResult`: success or failure status
  - `appointmentId`
  - `confirmationDetails`: doctor, date, time, location
  - `error`: structured error code and message if failed
- When to use:
  - only after explicit user confirmation to book a specific slot.
- Example:
```json
{
  "bookingResult": "success",
  "appointmentId": "appt-789",
  "confirmationDetails": {
    "doctorName": "Dr. Maya Singh",
    "specialty": "dermatology",
    "date": "2026-05-11",
    "time": "14:00",
    "location": "MediZen Downtown Clinic"
  }
}
```

## Skill: Response Formatting
- Description: Convert internal decision outputs into a concise MediZen-safe user response.
- Input:
  - chosen action
  - recommended slots or booking result
  - error or clarification guidance
- Output:
  - `response_text`
  - `displayPayload`: UI-ready structure for slot cards or confirmation banners
  - `nextAction`: `confirm`, `ask`, `done`, `retry`
- When to use:
  - for every response returned to the frontend.
- Example:
```json
{
  "response_text": "I can book you with Dr. Maya Singh on May 11 at 2:00 PM. Confirm this appointment?",
  "displayPayload": {"slots": [...]},
  "nextAction": "confirm"
}
```

## Skill: Clarification & Validation
- Description: Detect missing or conflicting booking requirements and generate a precise follow-up.
- Input:
  - parsed entities
  - availability results
  - session state
- Output:
  - `clarificationQuestion`: exact field to resolve
  - `validationStatus`: `ok`, `missing_date`, `missing_specialty`, `conflict`
- When to use:
  - when the agent cannot safely proceed.
- Example:
```json
{
  "clarificationQuestion": "Which day next week would you like to see a dermatologist?",
  "validationStatus": "missing_date"
}
```

## Skill: Preference Persistence
- Description: Read and write user booking preferences to memory stores.
- Input:
  - user preference signals from current interaction
  - memory access permissions
- Output:
  - `updatedPreferences`
  - `memoryWriteStatus`
- When to use:
  - when a user confirms a preference or completes a booking.
- Example:
```json
{
  "updatedPreferences": {"preferredSpecialty": "dermatology", "preferredTimeOfDay": "afternoon"},
  "memoryWriteStatus": "saved"
}
```

## Skill: Error Recovery
- Description: Normalize failure responses and suggest safe fallback options.
- Input:
  - error details from backend or tool calls
  - current booking context
- Output:
  - `userMessage`
  - `fallbackAction`: `retry`, `suggest_alternative`, `ask_support`
- When to use:
  - whenever backend or tool operations fail.
- Example:
```json
{
  "userMessage": "I couldn’t book that slot because the schedule changed. Would you like me to look for later times?",
  "fallbackAction": "suggest_alternative"
}
```
