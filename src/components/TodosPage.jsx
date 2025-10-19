import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useTodoStore from '../zustand/useTodoStore';

const TodosPage = () => {
    const todos = useTodoStore((state) => state.todos);
    const addTodo = useTodoStore((state) => state.addTodo);

    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
        addTodo(newTodo);
        setNewTodo('');
        }
    };

    const toggleTodo = useTodoStore((state) => state.toggleTodo);
  
    return (
        <div className="max-w-3xl mx-auto space-y-6 p-4">
        <h2 className="text-2xl font-semibold">Todos</h2>

        <div>
            {/* Todo input */}
            <div className="flex space-x-2 mb-4">
            <input
                type="text"
                placeholder="Add new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-grow border border-gray-300 rounded px-3 py-2"
                onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTodo();
                }}
            />
            <button
                onClick={handleAddTodo}
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
            >
                Add
            </button>
            </div>

            {/* Todo list */}
            {todos.length === 0 ? (
            <p className="text-gray-500">No todos for this date.</p>
            ) : (
            <ul className="space-y-2">
                {todos.map(({ id, text, completed }) => (
                <li key={id} className="flex items-center space-x-3">
                    <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTodo(id)}
                    className="w-5 h-5 cursor-pointer"
                    />
                    <span className={completed ? 'line-through text-gray-500' : ''}>
                    {text}
                    </span>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
  );
};

export default TodosPage;
