// NOTE: eventually to be removed due to time consuming process
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const statusStyles = {
  available: 'bg-green-100 text-green-800',
  dnd: 'bg-red-100 text-red-800',
  away: 'bg-yellow-100 text-yellow-800',
};

// Example users list (replace with real data as needed)
const initialUsers = [
  {
    id: 1,
    name: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    status: 'available',
    message: 'Working remotely',
  },
  {
    id: 2,
    name: 'John Smith',
    avatarUrl: 'https://i.pravatar.cc/150?img=48',
    status: 'dnd',
    message: 'In a meeting',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?img=49',
    status: 'away',
    message: '',
  },
];

// Example current user data
const currentUser = {
  id: 4,
  name: 'You',
  avatarUrl: 'https://i.pravatar.cc/150?img=50',
};

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const [users, setUsers] = useState(initialUsers);

  // For current user's editable status + message
  const [status, setStatus] = useState('available');
  const [message, setMessage] = useState('');

  // On submit, update or add current user's status in the users list
  const handleStatusUpdate = (e) => {
    e.preventDefault();

    setUsers((prevUsers) => {
      // Check if current user already in the list
      const existingUserIndex = prevUsers.findIndex(u => u.id === currentUser.id);

      if (existingUserIndex !== -1) {
        // Update existing user status and message
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          status,
          message,
        };
        return updatedUsers;
      } else {
        // Add current user to the list
        return [
          ...prevUsers,
          {
            id: currentUser.id,
            name: currentUser.name,
            avatarUrl: currentUser.avatarUrl,
            status,
            message,
          }
        ];
      }
    });

    // Optionally clear message input
    // setMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Calendar</h2>

      <Calendar
        onChange={setDate}
        value={date}
        className="shadow-md rounded"
      />

      {/* Users Status List */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="text-lg font-medium mb-4">User Statuses</h3>

        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">{user.name}</span>
                </div>
                <p className="text-gray-600">{user.message || 'No status message set.'}</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[user.status]}`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Status Settings Form */}
      <section className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Set Your Status</h3>

        <form onSubmit={handleStatusUpdate} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="status" className="font-medium min-w-[80px]">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="available">Available</option>
              <option value="dnd">Do Not Disturb</option>
              <option value="away">Away</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium mb-1">
              Message:
            </label>
            <input
              id="message"
              type="text"
              placeholder="Add a status message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            Update Status
          </button>
        </form>
      </section>
    </div>
  );
};

export default CalendarPage;
