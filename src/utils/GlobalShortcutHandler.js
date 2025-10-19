import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SHORTCUTS_KEY = "app-shortcuts";

export default function ShortcutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const key = e.key.toLowerCase();
        const shortcuts = JSON.parse(localStorage.getItem(SHORTCUTS_KEY) || "{}");
        const path = shortcuts[key];
        if (path) {
          e.preventDefault();
          //open as a new tab
          window.open(path, "_blank");
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  return null;
}
