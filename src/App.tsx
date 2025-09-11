import { ThemeProvider } from "./components/Theme";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SignUp } from "./components/pages/user/SignUp";
import { Login } from "./components/pages/user/Login";
import { Dashboard } from "./components/pages/Dashboard";
import { SharedContent } from "./components/pages/content/SharedContent";
import ProtectedRoute from "./auth/ProtectRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen relative bg-background text-foreground">
        <div className="p-6 flex flex-col gap-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/content/:hash" element={<SharedContent />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
