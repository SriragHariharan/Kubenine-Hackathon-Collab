import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TodosPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Store todos as { 'YYYY-MM-DD': [{ id, text, completed }] }
  const [todosByDate, setTodosByDate] = useState({});
  const [newTodo, setNewTodo] = useState('');

  // Format date as YYYY-MM-DD string
  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const dateKey = formatDate(selectedDate);
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodosByDate((prev) => {
      const existingTodos = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...existingTodos, newTodoItem],
      };
    });

    setNewTodo('');
  };

  const toggleTodo = (id) => {
    const dateKey = formatDate(selectedDate);
    setTodosByDate((prev) => {
      const updatedTodos = prev[dateKey].map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return { ...prev, [dateKey]: updatedTodos };
    });
  };

  const todos = todosByDate[formatDate(selectedDate)] || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-semibold">Todo Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="shadow-md rounded"
      />

      <div>
        <h3 className="text-xl font-semibold mt-4 mb-2">
          Todos for {selectedDate.toDateString()}
        </h3>

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
