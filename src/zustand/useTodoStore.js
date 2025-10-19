// src/zustand/useTodoStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      // Add a new todo
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: nanoid(),
              text,
              completed: false,
            },
          ],
        })),

      // Toggle completed status
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      // Delete a todo
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'kullabe-todo-storage', // key in localStorage
      getStorage: () => localStorage, // optional, defaults to localStorage
    }
  )
);

export default useTodoStore;
