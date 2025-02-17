MVP PLAN

### Frontend

- UI with Windows XP design.
- Window manager to open MSN in pseudo-windows.

### Backend (API REST + WebSockets)

- **API REST** for authentication and user management.
- **WebSockets** for real-time messaging, contacts requests, and status updates.

### Database

- Supabase.
- Relationships between users, contacts, and chats.

## 2. models

- **User**: id, username, email, password_hash, avatar.
- **contacts**: user_id, contacts_id, status (pending, accepted).
- **Chat**: chat_id, users (array of user_id if 1-1 or group).
- **Message**: message_id, chat_id, sender_id, content, timestamp.

## 3. MVP Features

### Authentication

- Register and login with JWT.
- Credential validation and session management.

### UI and UX

- Layout with "desktop" style Windows XP.
- Floating window manager for chat.

### Contacts Management

- Add contacts by username.
- View contacts list with real-time status updates.

### Real-Time Chat

- Send and receive messages with WebSockets.
- Instant update of user status.

![plan](/plan.PNG)

## 4. Roadmap

### Sketchy UI

skethcy ui for chat

### Real-Time Chat

- Integrate WebSockets.
- Send and receive messages.

### Authentication

- Implement API REST for login/registration.
- Forms in the frontend.

### contacts System

- Manage requests and contacts list.

### UI

- Implement Windows XP "desktop, with Pseudo-window system."
- Implements Login
- Implements contacts List
- Implements Chat

### Testing and Optimization

-
-
