# ReverieStories Server - API Documentation

## Overview
ReverieStories is an AI-powered creative writing platform where users can write stories, create chapters, and interact with AI-driven characters through chat. This API provides endpoints for authentication, story management, tagging, and character interactions.

**Base URL:** `http://localhost:3000`

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Stories](#stories)
4. [My Stories](#my-stories)
5. [Chapters](#chapters)
6. [Author Notes](#author-notes)
7. [Tags](#tags)
8. [AI Chat](#ai-chat)

---

## Authentication

### Overview
ReverieStories uses JWT (JSON Web Tokens) for authentication. After login or registration, you'll receive an `access_token` that must be included in subsequent requests.

### Header Format
```
Authorization: Bearer <access_token>
```

---

## Users

### Register
Create a new user account.

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "Account for john_doe has been created successfully",
  "data": {
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error (username taken, invalid email, password too short)
- `422 Unprocessable Entity` - Missing required fields

---

### Login
Authenticate and receive a JWT token.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid email or password

---

## Stories

### List All Stories
Retrieve all published stories with pagination, filtering, and search capabilities.

**Endpoint:** `GET /stories`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `tag` | string | Filter by tag name (case-insensitive) |
| `search` | string | Search by story title (case-insensitive) |

**Response (200 OK):**
```json
{
  "message": "Successfully fetched Stories",
  "count": 45,
  "page": 1,
  "data": [
    {
      "title": "The Mystic Quest",
      "author": "john_doe",
      "chapters": 5,
      "Tags": [
        { "id": 1, "tagName": "Fantasy" },
        { "id": 2, "tagName": "Adventure" }
      ],
      "votes": 42
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Invalid query parameters (e.g., non-numeric page)
- `500 Internal Server Error` - Unexpected server error

**Example Requests:**
```
GET /stories?page=1
GET /stories?tag=fantasy&page=1
GET /stories?search=quest&page=1
GET /stories?tag=romance&search=love&page=1
```

---

### Get Story Details
Retrieve detailed information about a specific story including chapters and tags.

**Endpoint:** `GET /stories/:storyId`

**Response (200 OK):**
```json
{
  "message": "Successfully fetched story",
  "data": {
    "id": 1,
    "title": "The Mystic Quest",
    "description": "An epic adventure through magical lands",
    "storyImageUrl": "https://example.com/image.jpg",
    "votes": 42,
    "UserId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z",
    "User": {
      "id": 1,
      "username": "john_doe"
    },
    "Tags": [
      { "id": 1, "tagName": "Fantasy" },
      { "id": 2, "tagName": "Adventure" }
    ],
    "Chapters": [
      {
        "id": 1,
        "name": "The Beginning",
        "body": "Once upon a time...",
        "chapterImageUrl": "https://example.com/chapter1.jpg"
      }
    ]
  }
}
```

**Error Responses:**
- `404 Not Found` - Story does not exist

---

### Vote on Story
Upvote a story to increase its popularity.

**Endpoint:** `PATCH /stories/:storyId/vote`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "message": "Story upvoted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Story not found

---

## My Stories

### List My Stories
Retrieve all stories created by the authenticated user.

**Endpoint:** `GET /mystories`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by story title |

**Response (200 OK):**
```json
{
  "message": "Successfully fetched myStories",
  "data": [
    {
      "id": 1,
      "title": "The Mystic Quest",
      "description": "An epic adventure",
      "storyImageUrl": "https://example.com/image.jpg",
      "votes": 42,
      "UserId": 1,
      "Tags": [...],
      "Chapters": [...]
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required

---

### Create Story
Create a new story.

**Endpoint:** `POST /mystories`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "My New Adventure",
  "description": "An exciting tale of discovery",
  "storyImageUrl": "https://example.com/cover.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "Story details updated",
  "data": {
    "id": 1,
    "title": "My New Adventure",
    "description": "An exciting tale of discovery",
    "storyImageUrl": "https://example.com/cover.jpg",
    "votes": 0,
    "UserId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error (title too long or empty)
- `401 Unauthorized` - Authentication required
- `422 Unprocessable Entity` - Missing required fields

---

### Update Story
Update story details (title, description, image).

**Endpoint:** `PUT /mystories/:storyId`

**Authentication:** Required  
**Authorization:** Must be story owner

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "storyImageUrl": "https://example.com/newimage.jpg"
}
```

**Response (200 OK):**
```json
{
  "message": "Story details updated"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner
- `404 Not Found` - Story not found

---

### Delete Story
Delete a story and all its chapters.

**Endpoint:** `DELETE /mystories/:storyId`

**Authentication:** Required  
**Authorization:** Must be story owner

**Response (200 OK):**
```json
{
  "message": "Story has been deleted"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner
- `404 Not Found` - Story not found

---

### Add Tag to Story
Add a genre tag to a story.

**Endpoint:** `POST /mystories/:storyId/tag/:tagId`

**Authentication:** Required  
**Authorization:** Must be story owner

**Response (201 Created):**
```json
{
  "message": "Tag added to story"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner
- `404 Not Found` - Story or tag not found

---

## Chapters

### Create Chapter
Add a new chapter to a story.

**Endpoint:** `POST /mystories/:storyId/chapters`

**Authentication:** Required  
**Authorization:** Must be story owner

**Request Body:**
```json
{
  "name": "The Beginning",
  "body": "Once upon a time in a land far away...",
  "chapterImageUrl": "https://example.com/chapter1.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "Successfully added chapter",
  "data": {
    "id": 1,
    "name": "The Beginning",
    "body": "Once upon a time in a land far away...",
    "chapterImageUrl": "https://example.com/chapter1.jpg",
    "StoryId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error (name too long, body empty)
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner

---

### Get Chapter
Retrieve a specific chapter with author notes.

**Endpoint:** `GET /stories/:storyId/:chapterId`

**Response (200 OK):**
```json
{
  "message": "Successfully fetched chapter",
  "data": {
    "id": 1,
    "name": "The Beginning",
    "body": "Once upon a time...",
    "chapterImageUrl": "https://example.com/chapter1.jpg",
    "StoryId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z",
    "AuthorNote": {
      "id": 1,
      "note": "This was inspired by...",
      "ChapterId": 1
    }
  }
}
```

**Error Responses:**
- `404 Not Found` - Chapter not found

---

### Update Chapter
Update chapter content.

**Endpoint:** `PUT /mystories/:storyId/chapters/:chapterId`

**Authentication:** Required  
**Authorization:** Must be story owner

**Request Body:**
```json
{
  "name": "The Beginning (Revised)",
  "body": "Updated chapter content...",
  "chapterImageUrl": "https://example.com/chapter1-v2.jpg"
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully updated chapter"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner
- `404 Not Found` - Chapter not found

---

### Delete Chapter
Delete a chapter from a story.

**Endpoint:** `DELETE /mystories/:storyId/chapters/:chapterId`

**Authentication:** Required  
**Authorization:** Must be story owner

**Response (200 OK):**
```json
{
  "message": "Successfully deleted chapter"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner
- `404 Not Found` - Chapter not found

---

## Author Notes

### Create Author Note
Add a private note to a chapter (author reflections, writing notes, etc.).

**Endpoint:** `POST /stories/:storyId/:chapterId/notes`

**Authentication:** Required  
**Authorization:** Must be story owner

**Request Body:**
```json
{
  "note": "This chapter was inspired by my trip to the mountains."
}
```

**Response (201 Created):**
```json
{
  "message": "Successfully added author note",
  "data": {
    "id": 1,
    "note": "This chapter was inspired by my trip to the mountains.",
    "ChapterId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner

---

### Get Author Note
Retrieve a chapter's author note.

**Endpoint:** `GET /stories/:storyId/:chapterId/notes`

**Response (200 OK):**
```json
{
  "message": "Successfully fetched author note",
  "data": {
    "id": 1,
    "note": "This chapter was inspired by my trip to the mountains.",
    "ChapterId": 1
  }
}
```

**Error Responses:**
- `404 Not Found` - Note not found

---

### Update Author Note
Update an existing author note.

**Endpoint:** `PUT /stories/:storyId/:chapterId/notes`

**Authentication:** Required  
**Authorization:** Must be story owner

**Request Body:**
```json
{
  "note": "Updated reflection about this chapter..."
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully updated author note"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner

---

### Delete Author Note
Delete a chapter's author note.

**Endpoint:** `DELETE /stories/:storyId/:chapterId/notes`

**Authentication:** Required  
**Authorization:** Must be story owner

**Response (200 OK):**
```json
{
  "message": "Successfully deleted author note"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the story owner

---

## Tags

### List All Tags
Retrieve all available genre tags.

**Endpoint:** `GET /tags`

**Response (200 OK):**
```json
{
  "message": "Successfully fetched all tags",
  "data": [
    { "id": 1, "tagName": "Fantasy" },
    { "id": 2, "tagName": "Adventure" },
    { "id": 3, "tagName": "Romance" },
    { "id": 4, "tagName": "Mystery" }
  ]
}
```

**Error Responses:**
- `500 Internal Server Error` - Unexpected server error

---

### Create Tag
Create a new genre tag (Admin only).

**Endpoint:** `POST /tags`

**Authentication:** Required  
**Authorization:** Must be admin

**Request Body:**
```json
{
  "tagName": "Sci-Fi"
}
```

**Response (201 Created):**
```json
{
  "message": "Sci-Fi tag has been added"
}
```

**Error Responses:**
- `400 Bad Request` - Tag name empty or exceeds 15 characters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Must be admin

---

### Delete Tag
Delete a tag (Admin only).

**Endpoint:** `DELETE /tags/:tagId`

**Authentication:** Required  
**Authorization:** Must be admin

**Response (200 OK):**
```json
{
  "message": "Fantasy tag has been deleted"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Must be admin
- `404 Not Found` - Tag not found

---

## AI Chat

### List User Chats
Retrieve all chats created by the authenticated user.

**Endpoint:** `GET /mycharacter`

**Authentication:** Required

**Response (200 OK):**
```json
{
  "message": "Successfully fetched all user chats",
  "data": [
    {
      "id": 1,
      "characterDescription": "A wise wizard who speaks in riddles",
      "UserId": 1,
      "createdAt": "2026-02-18T10:30:00Z",
      "updatedAt": "2026-02-18T10:30:00Z",
      "Messages": [
        {
          "id": 1,
          "role": "user",
          "content": "Hello, what can you teach me?",
          "ChatId": 1
        },
        {
          "id": 2,
          "role": "assistant",
          "content": "Wisdom is not given, but sought...",
          "ChatId": 1
        }
      ]
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required

---

### Chat with Character (Continue Existing Chat)
Send a message to an AI character and receive a response.

**Endpoint:** `POST /mycharacter/chat/:chatId`

**Authentication:** Required  
**Authorization:** Must be chat owner

**Request Body:**
```json
{
  "message": "Tell me a story about ancient times"
}
```

**Response (200 OK):**
```json
{
  "message": "Chat response received",
  "data": {
    "id": 1,
    "characterDescription": "A wise wizard...",
    "UserId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z",
    "Messages": [
      {
        "id": 1,
        "role": "user",
        "content": "Tell me a story...",
        "ChatId": 1,
        "createdAt": "2026-02-18T10:35:00Z"
      },
      {
        "id": 2,
        "role": "assistant",
        "content": "In the days of old...",
        "ChatId": 1,
        "createdAt": "2026-02-18T10:35:10Z"
      }
    ]
  }
}
```

**Error Responses:**
- `400 Bad Request` - Message is empty or missing
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the chat owner
- `404 Not Found` - Chat not found

---

### Chat with Character (Start New Chat)
Create a new chat with an AI character and send the first message.

**Endpoint:** `POST /mycharacter/chat`

**Authentication:** Required

**Request Body:**
```json
{
  "characterDescription": "A mysterious fortune teller with mysterious powers and cryptic insights",
  "message": "Can you predict my future?"
}
```

**Response (201 Created):**
```json
{
  "message": "Chat created and response received",
  "data": {
    "id": 1,
    "characterDescription": "A mysterious fortune teller...",
    "UserId": 1,
    "createdAt": "2026-02-18T10:30:00Z",
    "updatedAt": "2026-02-18T10:30:00Z",
    "Messages": [
      {
        "id": 1,
        "role": "user",
        "content": "Can you predict my future?",
        "ChatId": 1
      },
      {
        "id": 2,
        "role": "assistant",
        "content": "The cards reveal...",
        "ChatId": 1
      }
    ]
  }
}
```

**Error Responses:**
- `400 Bad Request` - Character description or message missing/empty
- `401 Unauthorized` - Authentication required

---

### Text to Speech (TTS)
Convert input text into speech audio using ElevenLabs.

**Endpoint:** `POST /mycharacter/tts`

**Authentication:** Required

**Request Body:**
```json
{
  "text": "Welcome back to Reverie Stories.",
  "voiceId": "JBFqnCBsd6RMkjVDRZzb",
  "modelId": "eleven_multilingual_v2"
}
```

**Request Notes:**
- `text` is required.
- `voiceId` is optional. If omitted, server default voice is used.
- `modelId` is optional. If omitted, server default model is used.

**Response (200 OK):**
- Content-Type: `audio/mpeg`
- Binary MP3 stream in response body

**Error Responses:**
- `400 Bad Request` - Text missing/empty
- `401 Unauthorized` - Authentication required
- `502 Bad Gateway` - ElevenLabs request failed

---

### Delete Chat
Delete a chat and all its messages.

**Endpoint:** `DELETE /mycharacter/:chatId`

**Authentication:** Required  
**Authorization:** Must be chat owner

**Response (200 OK):**
```json
{
  "message": "Chat has been deleted"
}
```

**Error Responses:**
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not the chat owner
- `404 Not Found` - Chat not found

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description",
  "name": "ErrorType"
}
```

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

---

## Data Validation

### Username
- Required
- Must be unique
- No specific length limits in validation

### Email
- Required
- Must be unique
- Must be valid email format

### Password
- Required
- Minimum 6 characters
- Hashed before storage

### Story Title
- Required
- Maximum 30 characters
- Cannot be empty

### Chapter Name
- Required
- Maximum 30 characters
- Cannot be empty

### Chapter Body
- Required
- Cannot be empty
- Supports rich text

### Tag Name
- Required
- 1-15 characters
- Cannot be empty

---

## Rate Limiting

Currently, there is no rate limiting implemented. This should be considered for production.

---

## Pagination

Stories list pagination uses:
- **Default page:** 1
- **Default limit:** 10 items per page
- **Offset calculation:** `(page - 1) * limit`

---

## Filtering & Search

### Stories Filter
- **Tag filter:** Case-insensitive partial match
- **Search:** Case-insensitive title search
- **Combined:** Can use both tag and search together

### My Stories Search
- **Search:** Case-insensitive title search within user's stories

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-18 | Initial API Documentation |

---

## Support & Contact

For API issues or questions, please contact the development team.

---

## License

This API is part of the ReverieStories project and is proprietary.
