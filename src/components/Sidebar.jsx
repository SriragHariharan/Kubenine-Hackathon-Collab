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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const teams = ['Team One', 'Team Two', 'Team Three'];
  const channels = [
    { name: 'general', unread: 2 },
    { name: 'random', unread: 0 },
    { name: 'dev-updates', unread: 5 },
  ];

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
            <div className="flex items-center justify-between text-gray-400 uppercase px-2 py-1 tracking-wide text-xs">
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                {!isCollapsed && <span>Teams</span>}
              </div>
              {!isCollapsed && (
                <button className="hover:text-white">
                  <PlusIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {teams.map((team, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between hover:bg-gray-800 rounded px-2 py-1"
              >
                <span className="truncate">{!isCollapsed && team}</span>
                <EyeIcon className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
              </div>
            ))}
          </div>

          {/* Channels Section */}
          <div>
            <div className="flex items-center justify-between text-gray-400 uppercase px-2 py-1 tracking-wide text-xs">
              <div className="flex items-center">
                <HashtagIcon className="w-4 h-4 mr-2" />
                {!isCollapsed && <span>Channels</span>}
              </div>
              {!isCollapsed && (
                <button className="hover:text-white">
                  <PlusIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {channels.map((channel, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between hover:bg-gray-800 rounded px-2 py-1"
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
          <SidebarItem icon={CalendarDaysIcon} label="Calendar" isCollapsed={isCollapsed} />
          <SidebarItem icon={BookmarkIcon} label="Pinned Messages" isCollapsed={isCollapsed} />
          <SidebarItem icon={BoltIcon} label="Shortcuts" isCollapsed={isCollapsed} />
          <SidebarItem icon={ClockIcon} label="Scheduler" isCollapsed={isCollapsed} />
          <SidebarItem icon={BellIcon} label="Notifications" isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-xl font-semibold">Main Content Area</h1>
        <p className="text-gray-600">This is where your app content will go.</p>
      </div>
    </div>
  );
};

// ✅ Reusable Sidebar Item
const SidebarItem = ({ icon: Icon, label, isCollapsed }) => (
  <div className="flex items-center hover:bg-gray-800 rounded px-2 py-2 cursor-pointer">
    <Icon className="w-5 h-5 text-gray-400" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </div>
);

export default Sidebar;
