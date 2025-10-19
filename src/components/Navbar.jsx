import React, { useState, useEffect, useRef } from 'react';
import {
  MagnifyingGlassIcon,
  BellIcon,
  BellSlashIcon,
  MoonIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import useLoginUserDetails from '../hooks/useLoginUserDetails';
import useAuthStore from '../zustand/useAuthStore';
import { constants } from '../constants/constants';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [userStatus, setUserStatus] = useState('online');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  //get details of the user
  useLoginUserDetails();
  const userDetails = useAuthStore(store => store?.user);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
  };

  // Feature: Logout
  const clearAuthContext = useAuthStore(store => store.logout);
  const handleLogout = () => {
    localStorage.removeItem(constants.AUTH_TOKEN);
    localStorage.removeItem(constants.USER_ID);
    clearAuthContext();
    window.location.href = '/login';
  }

  return (
    <>
      {/* Search Modal */}
        {isSearchOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search..."
                        className="w-full outline-none text-gray-800 placeholder-gray-500"
                    />
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="ml-2 p-1 rounded hover:bg-gray-100"
                    >
                        <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                    </div>
                </div>
                <div className="p-4 text-sm text-gray-500">
                    <p>Type to search through your content...</p>
                </div>
                </div>
            </div>
        )}


      {/* Navbar */}
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">kullabe</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span className="text-sm text-gray-300">Search</span>
                <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-mono border border-gray-600 rounded">
                  Ctrl K
                </kbd>
              </button>

              {/* Notification Toggle */}
            <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-800"
                title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
            >
                {notificationsEnabled ? (
                    <BellIcon className="w-5 h-5 text-green-400" />
                ) : (
                    <BellSlashIcon className="w-5 h-5 text-red-400" />
                )}
                </button>

              {/* DND Toggle */}
              <button
                onClick={() => {
                  setDndEnabled(!dndEnabled);
                  setUserStatus(dndEnabled ? 'online' : 'dnd');
                }}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  dndEnabled ? 'bg-red-900 hover:bg-red-800' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                title={dndEnabled ? 'Disable Do Not Disturb' : 'Enable Do Not Disturb'}
              >
                <MoonIcon className="w-5 h-5 text-white" />
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-2 border-l border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[userStatus]} border-2 border-black rounded-full`}
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium">{userDetails?.username}</div>
                    <div className="text-xs text-gray-400">{statusLabels[userStatus]}</div>
                  </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
              </div>
            </div>

            {/* Mobile menu buttons */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg hover:bg-gray-800">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <Bars3Icon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <div className="flex flex-col space-y-4">
                {/* Notification Toggle */}
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800"
                >
                  <span>Notifications</span>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      notificationsEnabled ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-200 ${
                        notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
                      } mt-1`}
                    />
                  </div>
                </button>

                {/* DND Toggle */}
                <button
                  onClick={() => {
                    setDndEnabled(!dndEnabled);
                    setUserStatus(dndEnabled ? 'online' : 'dnd');
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800"
                >
                  <span>Do Not Disturb</span>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      dndEnabled ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-200 ${
                        dndEnabled ? 'translate-x-5' : 'translate-x-1'
                      } mt-1`}
                    />
                  </div>
                </button>

                {/* Status Selector */}
                <div className="p-3">
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="online">Online</option>
                    <option value="away">Away</option>
                    <option value="dnd">Do Not Disturb</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 border-t border-gray-700 pt-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[userDetails?.status]} border-2 border-black rounded-full`}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Username</div>
                    <div className="text-xs text-gray-400">{statusLabels[userDetails?.status]}</div>
                  </div>
                  <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        aria-label="Logout"
                    >
                        Logout
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
