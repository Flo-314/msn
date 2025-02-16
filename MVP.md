### Frontend

- UI with Windows XP design.
- Window manager to open MSN in pseudo-windows.

### Backend (API REST + WebSockets)

- **API REST** for authentication and user management.
- **WebSockets** for real-time messaging, friend requests, and status updates.

### Database

- Supabase.
- Relationships between users, friends, and chats.

## 2. Entities

- **User**: id, username, email, password_hash, avatar.
- **Friends**: user_id, friend_id, status (pending, accepted).
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

- Add friends by username.
- View friend list with real-time status updates.

### Real-Time Chat

- Send and receive messages with WebSockets.
- Instant update of user status.

## 4. Roadmap

### Authentication

- Implement API REST for login/registration.
- Forms in the frontend.

### Sketchy UI

- Implement Windows XP "desktop, with Pseudo-window system."
- Implements Login
- Implements Friend List
- Implements Chat

### Friends System

- Manage requests and friend list.

### Real-Time Chat

- Integrate WebSockets.
- Send and receive messages.

### Testing and Optimization

-
-
