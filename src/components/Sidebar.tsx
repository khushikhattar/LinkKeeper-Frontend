import React, { useState } from "react";
import {
  Sidebar as SidebarIcon,
  PlusCircle,
  User,
  ClipboardList,
  Tag as TagIcon,
  LogOut,
  Trash2,
  Share2,
} from "lucide-react";
import { AddContent } from "./pages/content/AddContent";
import { UserContent } from "./pages/content/UserContent";
import { UpdateProfile } from "./pages/user/UpdateProfile";
import { Logout } from "./pages/user/Logout";
import { Delete } from "./pages/user/Delete";
import { ModeToggle } from "./Toggle";
import { TagManager } from "../components/pages/tags/TagManager";
import { Share } from "./pages/content/Share";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("addContent");

  const renderContent = () => {
    switch (activeTab) {
      case "addContent":
        return <AddContent />;
      case "updateProfile":
        return <UpdateProfile />;
      case "userContent":
        return <UserContent />;
      case "tags":
        return <TagManager />;
      case "shareContent":
        return <Share />;
      case "logout":
        return <Logout />;
      case "delete":
        return <Delete />;
      default:
        return <AddContent />;
    }
  };

  const menuItems = [
    {
      id: "addContent",
      label: "Add Content",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      id: "userContent",
      label: "My Content",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    { id: "tags", label: "Manage Tags", icon: <TagIcon className="w-5 h-5" /> },
    {
      id: "shareContent",
      label: "Share Content",
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      id: "updateProfile",
      label: "Update Profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={`flex flex-col transition-width duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-3 mt-2 mb-6 hover:bg-gray-800 rounded-full mx-auto transition-colors"
          aria-label="Toggle sidebar"
        >
          <SidebarIcon className="w-6 h-6" />
        </button>

        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-gray-800 ${
                activeTab === item.id ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}

          <div className="mt-auto">
            <button
              onClick={() => setActiveTab("logout")}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 w-full"
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span className="font-medium">Logout</span>}
            </button>

            <button
              onClick={() => setActiveTab("delete")}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 w-full mt-2 text-red-500"
            >
              <Trash2 className="w-5 h-5" />
              {isOpen && <span className="font-medium">Delete Account</span>}
            </button>
          </div>
        </nav>
      </div>

      <main className="flex-grow bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 overflow-auto relative">
        <div className="absolute top-4 right-4 z-50">
          <ModeToggle />
        </div>

        {renderContent()}
      </main>
    </div>
  );
};
