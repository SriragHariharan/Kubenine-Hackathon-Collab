import React, { useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CalendarDaysIcon,
  BellIcon,
  ClockIcon,
  HashtagIcon,
  EyeIcon,
  BookmarkIcon,
  UserGroupIcon,
  BoltIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import TeamModal from '../modals/AddTeamMemberModal';
import { Link, useNavigate } from 'react-router-dom';
import useChannelStore from '../zustand/useChannelStore';
import useFetchChannels from '../hooks/useFetchChannels';
import useTeams from '../hooks/useTeams';



const Sidebar = () => {
    //fetch all channels
    const { loading, error } = useFetchChannels();
    const channels = useChannelStore((store) => store.channels);

    //fetch all teams
    const {teams} = useTeams();
    console.log("teams:", teams)
    console.log("team ID:", teams[0]?._id);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const openTeamModal = (team) => {
        setSelectedTeam(team);
        setModalOpen(true);
    };

    const closeTeamModal = () => {
        setModalOpen(false);
        setSelectedTeam(null);
    };

    const navigate = useNavigate();
    const setSelectedChannel = useChannelStore((state) => state.setSelectedChannel);
    
    // Function to handle channel selection
    const handleOpenChannel = (data) => {
        console.log("selected channel:",data)
        setSelectedChannel({name: data?.name, id: data?.channelID});
        navigate('/chat?channel=' + data?.channelID);
    }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-[calc(100vh-4rem)] bg-gray-900 text-white transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'} overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          {!isCollapsed && <span className="text-lg font-semibold">Sidebar</span>}
          <button onClick={toggleSidebar}>
            {isCollapsed ? (
              <ChevronDoubleRightIcon className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-4 px-2 text-sm">

          {/* Teams Section */}
          <div>
            <Link to="/create-team" className="flex items-center justify-between text-gray-400 uppercase px-2 py-1 tracking-wide text-xs">
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                {!isCollapsed && <span>Teams</span>}
              </div>
              {!isCollapsed && (
                <button className="hover:text-white">
                  <PlusIcon className="w-4 h-4" />
                </button>
              )}
            </Link>
            {teams?.map((team, idx) => (
              <Link to={`/teams/${team?._id}`}
                key={idx}
                className="flex items-center justify-between hover:bg-gray-800 rounded px-2 py-1 cursor-pointer"
                onClick={() => openTeamModal(team)}
              >
                <span className="truncate">{!isCollapsed && team?.name}</span>
                {/* <EyeIcon className="w-4 h-4 text-gray-400 hover:text-gray-200" /> */}
              </Link>
            ))}
          </div>

          {/* Channels Section */}
          <div>
            <Link to="/create-channel" className="flex items-center justify-between text-gray-400 uppercase px-2 py-1 tracking-wide text-xs">
              <div className="flex items-center">
                <HashtagIcon className="w-4 h-4 mr-2" />
                {!isCollapsed && <span>Channels</span>}
              </div>
              {!isCollapsed && (
                <button className="hover:text-white">
                  <PlusIcon className="w-4 h-4" />
                </button>
              )}
            </Link>
            {channels.map((channel, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between hover:bg-gray-800 rounded px-2 py-1"
                onClick={() => handleOpenChannel({name: channel.name, channelID: channel._id})}
              >
                <span className="truncate text-gray-200">
                  {!isCollapsed && `# ${channel.name}`}
                </span>
                {channel.unread > 0 && !isCollapsed && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Other Items */}
          {/* TODO: Availability option removed */}
          {/* <SidebarItem icon={CalendarDaysIcon} label="Availability" isCollapsed={isCollapsed} /> */}
          {/* <SidebarItem icon={BookmarkIcon} label="Pinned Messages" isCollapsed={isCollapsed} /> */}
          <Link to='/shortcuts'>
              <SidebarItem icon={BoltIcon} label="Shortcuts" isCollapsed={isCollapsed} />
          </Link>
          <Link to="/todos">
            <SidebarItem icon={ClockIcon} label="Todos" isCollapsed={isCollapsed} />
          </Link>
          <SidebarItem icon={BellIcon} label="Notifications" isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* Team Modal */}
      <TeamModal
        isOpen={modalOpen}
        onClose={closeTeamModal}
        teamName={selectedTeam?.name || ''}
        members={selectedTeam?.members || []}
      />
    </div>
  );
};

// Reusable Sidebar Item
const SidebarItem = ({ icon: Icon, label, isCollapsed }) => (
  <div className="flex items-center hover:bg-gray-800 rounded px-2 py-2 cursor-pointer">
    <Icon className="w-5 h-5 text-gray-400" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </div>
);

export default Sidebar;
