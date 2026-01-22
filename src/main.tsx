import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ThemeProvider } from "@/providers"
import { AuthProvider } from "@/auth/AuthProvider"
import { OrgProvider } from "@/org/OrgProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
        <OrgProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
      </OrgProvider>
    </AuthProvider>
  </React.StrictMode>
)
