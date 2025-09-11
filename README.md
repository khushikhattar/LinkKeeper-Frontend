# 📑 LinkKeeper (Frontend)

LinkKeeper is a modern web application for **saving, tagging, and sharing content**.  
Built with **React + TypeScript + Vite**, it uses **Context API** for authentication and **TailwindCSS + shadcn/ui** for styling.  
It connects to the backend hosted at [`https://linkkeeper-backend.onrender.com`](https://linkkeeper-backend.onrender.com).

---

## 🚀 Features

- 🔐 **Authentication**: Register, login, logout with secure JWT cookies
- 📝 **Content Management**: Add, view, and manage saved content
- 🏷️ **Tags**: Create and organize content with tags
- 👤 **User Profile**: Update profile or delete account
- 🌗 **Theme Toggle**: Light / Dark / System theme support
- 🖥️ **Protected Dashboard**: Only accessible to logged-in users

---

## 📂 Project Structure

```
src/
┣ api/
┃ ┗ axiosInstance.ts        # Axios setup with refresh token handling
┣ auth/
┃ ┣ AuthContext.tsx         # Authentication context provider
┃ ┣ ProtectedRoute.tsx      # Protects routes for logged-in users
┃ ┗ useAuth.tsx             # Custom hook for accessing auth state
┣ components/
┃ ┣ Sidebar.tsx             # Sidebar navigation with tabs
┃ ┣ Theme.tsx               # Theme provider (light/dark/system)
┃ ┣ ThemeToggle.tsx         # Theme toggle dropdown
┃ ┗ ui/                     # shadcn/ui components (button, card, dropdown-menu, etc.)
┣ pages/
┃ ┣ Home.tsx                # Landing page
┃ ┣ Dashboard.tsx           # Main dashboard (protected)
┃ ┣ content/
┃ ┃ ┣ AddContent.tsx        # Add new content
┃ ┃ ┣ UserContent.tsx       # View user’s saved content
┃ ┃ ┣ SharedContent.tsx     # View shared content by hash
┃ ┃ ┗ ContentCard.tsx       # UI card for content
┃ ┣ tags/
┃ ┃ ┗ TagManager.tsx        # Manage tags
┃ ┗ user/
┃ ┃ ┣ SignUp.tsx            # User registration
┃ ┃ ┣ Login.tsx             # User login
┃ ┃ ┣ UpdateProfile.tsx     # Update profile info
┃ ┃ ┣ Logout.tsx            # Logout flow
┃ ┃ ┗ DeleteAccount.tsx     # Delete account
┣ lib/
┃ ┗ utils.ts                # Utility for class merging (clsx + tailwind-merge)
┣ App.tsx                   # Defines routes
┣ main.tsx                  # Root entry point
┣ index.css                 # Global styles
```

---

## ⚙️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: Context API (Auth + Theme)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/linkkeeper-frontend.git
   cd linkkeeper-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

- Create a .env file in the root:

```bash
VITE_API_BASE_URL=https://linkkeeper-backend.onrender.com/api/v1
```

- (This is already set inside axiosInstance.ts, but env support is recommended.)

4. **Start development server**

```bash
npm run dev
```

- The app will be running at:
  👉 http://localhost:5173

## 🔒 Authentication Flow

1. Login/Register via /users/login & /users/register
2. Access/Refresh tokens are stored in HTTP-only cookies
3. axiosInstance handles 401 errors and automatically retries failed requests after refreshing tokens
4. Protected routes are wrapped with <ProtectedRoute>

## ✅ To-Do / Improvements

1. Add pagination for content
2. Add search & filter for tags
3. Offline mode with local storage
4. Better error handling & UI feedback

## 🧑‍💻 Author

- Made with ❤️ by Khushi Khattar
