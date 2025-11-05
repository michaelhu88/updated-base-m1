import { NavLink } from 'react-router-dom';
import { Bell, Cloud, User } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'HR', path: '/hr' },
    { name: 'Accounting', path: '/accounting' },
    { name: 'R&D', path: '/rd' },
    { name: 'IT', path: '/it' },
    { name: 'Finance', path: '/finance' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-purple-600 text-2xl font-bold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <span className="text-xl font-semibold">Placeholder</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-6 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Cloud size={20} />
          </button>
          <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <User size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
