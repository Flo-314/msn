# ON PROGRESS. 🚧

## Key Files and Their Purpose

### `app` Directory

- **[`globals.css`](src/app/globals.css)**: Contains global CSS styles for the application.
- **[`page.tsx`](src/app/page.tsx)**: Only entry point. this is a spa

### `lib` Directory

#### `common` Subdirectory

Contains common components used throughout the application.

- **[`Input.tsx`](src/lib/common/Input.tsx)**: Component for input fields.
- **[`Window.tsx`](src/lib/common/Window.tsx)**: Component for creating draggable windows.
- **[`WindowButton.tsx`](src/lib/common/WindowButton.tsx)**: Component for window control buttons.
- **[`toast.tsx`](src/lib/common/toast.tsx)**: Component for displaying notifications.

#### `hooks` Subdirectory

- **[`ZIndexContext.tsx`](src/lib/hooks/ZIndexContext.tsx)**: Context for managing Z-index in a multi-window interface like Window OS.
- **[`SessionContext.tsx`](src/lib/hooks/SessionContext.tsx)**: Context for managing supabase sessions.
- **[`chatContext.tsx`](src/lib/hooks/chatContext.tsx)**: Context for managing a singleChat instance.
- **[`chatsContext.tsx`](src/lib/hooks/chatsContext.tsx)**: Context for managing the multiple chatInstances.
- **[`contactsContext.tsx`](src/lib/hooks/contactsContext.tsx)**: Context for managing contacts.
- **[`notifications.tsx`](src/lib/hooks/notifications.tsx)**: Hooks for managing notifications (a friend is now online; a friend send you a message).
- **[`userContext.tsx`](src/lib/hooks/userContext.tsx)**: Context for managing user state. Not the same as session. Session is only for supabase auth. User has the needed information for the app.

#### [`supabase`](supabase) Subdirectory

- **[`auth.ts`](src/lib/supabase/auth.ts)**: Functions for handling user authentication.
- **[`models.ts`](src/lib/supabase/models.ts)**: Functions for interacting with Supabase tables.
- **[`subscriptions.ts`](src/lib/supabase/subscriptions.ts)**: Functions for managing Supabase table subscriptions.
- **`utils/client.ts`**: Supabase client configuration for the client-side.
- **`utils/server.ts`**: Supabase client configuration for the server-side (uses supabase super user api key).

#### `utils` Subdirectory

- **[`partykit/partykitUtils.ts`](src/lib/utils/partykit/partykitUtils.ts)**: Utility functions for PartyKit.

### `modules` Directory

#### [`chat`](src/lib/hooks/chatsContext.tsx) Subdirectory

- **[`Chat.tsx`](src/modules/chat/Chat.tsx)**: Component for individual chat windows.
- **[`Chats.tsx`](src/modules/chat/Chats.tsx)**: Component for managing multiple chat windows.
- **`subcomponents/`**: Contains various subcomponents for the chat module

#### `login` Subdirectory

- **[`Login.tsx`](src/modules/login/Login.tsx)**: Component for the login screen.

#### `mensagger` Subdirectory

- **[`mensagger.tsx`](src/modules/mensagger/mensagger.tsx)**: Main component for the messenger interface.
- **`userHeader/`**: Contains components for the user header, s
- **`contactList/`**: Contains components for managing the contact list,
- **[`Ad.tsx`](src/modules/mensagger/Ad.tsx)**: Component for displaying advertisements.

### `types` Directory

- **[`types.ts`](src/types/types.ts)**: Defines TypeScript types used throughout the application.

## Running the Project

### Environment Variables

NEXT_PUBLIC_SUPABASE_ANON_KEY
supabase_private_key
NEXT_PUBLIC_PARTYKIT_URL

### To run the project locally, follow these steps:

npm install
npm run dev
npx partykit dev

### ON PROGRESS. 🚧

## Key Files and Their Purpose

### `app` Directory

- **[`globals.css`](src/app/globals.css)**: Contains global CSS styles for the application.
- **[`page.tsx`](src/app/page.tsx)**: Only entry point. this is a spa

### `lib` Directory

#### `common` Subdirectory

Contains common components used throughout the application.

- **[`Input.tsx`](src/lib/common/Input.tsx)**: Component for input fields.
- **[`Window.tsx`](src/lib/common/Window.tsx)**: Component for creating draggable windows.
- **[`WindowButton.tsx`](src/lib/common/WindowButton.tsx)**: Component for window control buttons.
- **[`toast.tsx`](src/lib/common/toast.tsx)**: Component for displaying notifications.

#### `hooks` Subdirectory

- **[`ZIndexContext.tsx`](src/lib/hooks/ZIndexContext.tsx)**: Context for managing Z-index in a multi-window interface like Window OS.
- **[`SessionContext.tsx`](src/lib/hooks/SessionContext.tsx)**: Context for managing supabase sessions.
- **[`chatContext.tsx`](src/lib/hooks/chatContext.tsx)**: Context for managing a singleChat instance.
- **[`chatsContext.tsx`](src/lib/hooks/chatsContext.tsx)**: Context for managing the multiple chatInstances.
- **[`contactsContext.tsx`](src/lib/hooks/contactsContext.tsx)**: Context for managing contacts.
- **[`notifications.tsx`](src/lib/hooks/notifications.tsx)**: Hooks for managing notifications (a friend is now online; a friend send you a message).
- **[`userContext.tsx`](src/lib/hooks/userContext.tsx)**: Context for managing user state. Not the same as session. Session is only for supabase auth. User has the needed information for the app.

#### [`supabase`](supabase) Subdirectory

- **[`auth.ts`](src/lib/supabase/auth.ts)**: Functions for handling user authentication.
- **[`models.ts`](src/lib/supabase/models.ts)**: Functions for interacting with Supabase tables.
- **[`subscriptions.ts`](src/lib/supabase/subscriptions.ts)**: Functions for managing Supabase table subscriptions.
- **`utils/client.ts`**: Supabase client configuration for the client-side.
- **`utils/server.ts`**: Supabase client configuration for the server-side (uses supabase super user api key).

#### `utils` Subdirectory

- **[`partykit/partykitUtils.ts`](src/lib/utils/partykit/partykitUtils.ts)**: Utility functions for PartyKit.

### `modules` Directory

#### [`chat`](src/lib/hooks/chatsContext.tsx) Subdirectory

- **[`Chat.tsx`](src/modules/chat/Chat.tsx)**: Component for individual chat windows.
- **[`Chats.tsx`](src/modules/chat/Chats.tsx)**: Component for managing multiple chat windows.
- **`subcomponents/`**: Contains various subcomponents for the chat module

#### `login` Subdirectory

- **[`Login.tsx`](src/modules/login/Login.tsx)**: Component for the login screen.

#### `mensagger` Subdirectory

- **[`mensagger.tsx`](src/modules/mensagger/mensagger.tsx)**: Main component for the messenger interface.
- **`userHeader/`**: Contains components for the user header, s
- **`contactList/`**: Contains components for managing the contact list,
- **[`Ad.tsx`](src/modules/mensagger/Ad.tsx)**: Component for displaying advertisements.

### `types` Directory

- **[`types.ts`](src/types/types.ts)**: Defines TypeScript types used throughout the application.

## Running the Project

### Environment Variables

NEXT_PUBLIC_SUPABASE_ANON_KEY
supabase_private_key
NEXT_PUBLIC_PARTYKIT_URL

### To run the project locally, follow these steps:

npm install
npm run dev
npx partykit dev

![plan](/plan.PNG)
