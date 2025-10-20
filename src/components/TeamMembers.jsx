import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useTeamMembers from '../hooks/useTeamMembers';
import { PlusIcon } from '@heroicons/react/24/outline'; // Import the icon

const statusColors = {
  online: 'text-green-500',
  away: 'text-yellow-500',
  busy: 'text-red-500',
  offline: 'text-gray-400',
};

const TeamMembers = () => {
  const { teamId } = useParams();
  const { teamMembers = [] } = useTeamMembers(teamId);

  const [inputSearch, setInputSearch] = useState('');
  const [inputStatusFilter, setInputStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Handler for "Add Member" button
  const handleAddMember = () => {
    // Open a modal or navigate to an "Add Team Member" page
    alert('Add member clicked (you can hook this to a modal)');
  };

  const handleSearch = () => {
    setSearch(inputSearch);
    setStatusFilter(inputStatusFilter);
  };

  const handleReset = () => {
    setInputSearch('');
    setInputStatusFilter('all');
    setSearch('');
    setStatusFilter('all');
  };

  const filteredTeam = useMemo(() => {
    return teamMembers.filter((memberObj) => {
      const username = memberObj?.user?.username || 'Unknown';
      const status = memberObj?.user?.status || 'offline';

      const matchesSearch = username.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [teamMembers, search, statusFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header row with title and Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <button
          onClick={handleAddMember}
          className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded hover:bg-gray-800"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Add Member</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          className="px-4 py-2 border rounded w-full md:w-1/3"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded w-full md:w-48"
          value={inputStatusFilter}
          onChange={(e) => setInputStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="online">Online</option>
          <option value="away">Away</option>
          <option value="busy">Busy</option>
          <option value="offline">Offline</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTeam.map((memberObj) => {
          const user = memberObj.user;
          const username = user?.username || 'Unknown';
          const status = user?.status || 'offline';
          const key = user?._id || memberObj._id;

          return (
            <div
              key={key}
              className="bg-white p-4 rounded shadow flex items-center justify-between"
            >
              <div>
                <h4 className="font-medium text-gray-800 capitalize">{username}</h4>
                <p className={`text-sm ${statusColors[status]}`}>{status}</p>
              </div>
            </div>
          );
        })}
        {filteredTeam.length === 0 && (
          <p className="text-gray-500">No team members match your search or filter.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
