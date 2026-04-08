import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { ChatsPage } from "./pages/ChatsPage";
import { ChatDetailPage } from "./pages/ChatDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NewChatPage } from "./pages/NewChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ChatsPage /> },
      { path: "chat/:chatId", element: <ChatDetailPage /> },
      { path: "new-chat", element: <NewChatPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);