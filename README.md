# Kubenine Hackathon/ Hirethon 2025

## Task: Slack like react application with rocket chat api integration

# Tools:

| Package             | Purpose                              |
| ------------------- | ------------------------------------ |
| `axios`             | For making API requests              |
| `zustand`           | Lightweight global state management  |
| `tailwindcss`       | Utility-first CSS framework          |
| `@tailwindcss/vite` | Tailwind integration with Vite       |
| `@heroicons/react`  | SVG icons for React                  |
| `react-router-dom`  | Routing between pages                |
| `react-hook-form`   | Form state management and validation |
| `react-calendar`    | Calendar component                   |
| `react-hot-toast`   | Toast notifications                  |


# Code Structure

```
collab/
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── axios/
    │   └── axios.js
    ├── components/
    │   ├── AvailabilityPage.jsx
    │   ├── CreateChannel.jsx
    │   ├── CreateTeam.jsx
    │   ├── Home.jsx
    │   ├── LoginForm.jsx
    │   ├── Navbar.jsx
    │   ├── ShortcutsJunction.jsx
    │   ├── Sidebar.jsx
    │   ├── SignupForm.jsx
    │   ├── TeamMembers.jsx
    │   ├── TodosPage.jsx
    │   └── chat/
    │       ├── ChatHeader.jsx
    │       ├── ChatInput.jsx
    │       ├── ChatMessage.jsx
    │       ├── ChatPage.jsx
    │       ├── ChatUserModal.jsx
    │       └── MessageBubble.jsx
    ├── constants/
    │   ├── constants.js
    │   └── endpoints.js
    ├── hooks/
    │   ├── useAllUsers.js
    │   ├── useChannelUsers.js
    │   ├── useChatSocket.js
    │   ├── useFetchChannels.jsx
    │   ├── useGetMessages.js
    │   ├── useLoginUserDetails.jsx
    │   ├── useOnlineMembers.js
    │   ├── usePinnedMessages.jsx
    │   ├── useTeamMembers.js
    │   └── useTeams.js
    ├── layouts/
    │   ├── Layout.jsx
    │   ├── ProtectedRoute.jsx
    │   └── PublicRoute.jsx
    ├── modals/
    │   ├── AddTeamMemberModal.jsx
    │   ├── CreateTeamModal.jsx
    │   └── PinnedMessagesModal.jsx
    ├── utils/
    │   └── GlobalShortcutHandler.js
    └── zustand/
        ├── useAuthStore.js
        ├── useChannelStore.js
        └── useTodoStore.js

```

# Features

1. Real Time chat using web sockets.
2. Shortcuts based on our desired keyword.
3. Add Users to Channels
4. Responsive UI

# Running the react app
```cmd
git clone https://github.com/SriragHariharan/Kubenine-Hackathon-Collab/ 

npm install

npm run dev
```

### Happy Coding 💖