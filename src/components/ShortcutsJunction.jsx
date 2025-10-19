import React, { useState, useEffect } from "react";

const SHORTCUTS_KEY = "app-shortcuts";

export default function ShortcutsJunction() {
  const [shortcuts, setShortcuts] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(SHORTCUTS_KEY) || "{}");
    setShortcuts(saved);
  }, []);

  const [keyInput, setKeyInput] = useState("");
  const [routeInput, setRouteInput] = useState("");

  const handleAdd = () => {
    if (!keyInput || !routeInput) return alert("Both key and route are required");

    const newShortcuts = { ...shortcuts, [keyInput.toLowerCase()]: routeInput };
    setShortcuts(newShortcuts);
    localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(newShortcuts));
    setKeyInput("");
    setRouteInput("");
  };

  const handleRemove = (key) => {
    const newShortcuts = { ...shortcuts };
    delete newShortcuts[key];
    setShortcuts(newShortcuts);
    localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(newShortcuts));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Shortcuts</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Shortcut key (a-z)"
          value={keyInput}
          maxLength={1}
          onChange={(e) => setKeyInput(e.target.value.toLowerCase())}
          className="border p-2 flex-1"
        />
        <input
          placeholder="Route (e.g. /profile)"
          value={routeInput}
          onChange={(e) => setRouteInput(e.target.value)}
          className="border p-2 flex-2"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      <ul>
        {Object.entries(shortcuts).map(([key, path]) => (
          <li key={key} className="flex justify-between border p-2 mb-1 rounded">
            <span>
              <strong>Alt + {key.toUpperCase()}</strong> → <code>{path}</code>
            </span>
            <button
              onClick={() => handleRemove(key)}
              className="text-red-600 font-bold"
              aria-label={`Remove shortcut Alt + ${key}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
