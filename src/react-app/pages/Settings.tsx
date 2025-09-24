import { ChevronLeft, Bell, Shield, Globe, Smartphone, Volume2, Eye, Database, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

interface ToggleItem {
  icon: any;
  label: string;
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
  description: string;
}

interface LinkItem {
  icon: any;
  label: string;
  type: 'link';
  value?: string;
  path: string;
  description: string;
}

interface ButtonItem {
  icon: any;
  label: string;
  type: 'button';
  description: string;
}

type SettingsItem = ToggleItem | LinkItem | ButtonItem;

interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const settingsGroups: SettingsGroup[] = [
    {
      title: 'General',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
          description: 'Push notifications and alerts'
        },
        {
          icon: Volume2,
          label: 'Sound',
          type: 'toggle',
          value: soundEnabled,
          onChange: setSoundEnabled,
          description: 'App sounds and notification tones'
        },
        {
          icon: Globe,
          label: 'Language',
          type: 'link',
          value: 'English',
          path: '/settings/language',
          description: 'App display language'
        }
      ]
    },
    {
      title: 'Display',
      items: [
        {
          icon: Eye,
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
          description: 'Switch between light and dark theme'
        },
        {
          icon: Smartphone,
          label: 'Display Size',
          type: 'link',
          value: 'Medium',
          path: '/settings/display',
          description: 'Adjust text and icon size'
        }
      ]
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: Database,
          label: 'Auto Backup',
          type: 'toggle',
          value: autoBackup,
          onChange: setAutoBackup,
          description: 'Automatically backup app data'
        },
        {
          icon: Database,
          label: 'Clear Cache',
          type: 'button',
          description: 'Free up storage space'
        }
      ]
    },
    {
      title: 'Security',
      items: [
        {
          icon: Shield,
          label: 'Privacy Settings',
          type: 'link',
          path: '/privacy',
          description: 'Manage your privacy preferences'
        },
        {
          icon: Shield,
          label: 'Two-Factor Authentication',
          type: 'link',
          path: '/settings/2fa',
          description: 'Add extra security to your account'
        }
      ]
    }
  ];

  const handleClearCache = () => {
    // Handle cache clearing
    console.log('Clearing cache...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">Customize your app experience</p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="px-6 py-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={group.title} className={`mb-8 ${groupIndex === settingsGroups.length - 1 ? 'mb-0' : ''}`}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{group.title}</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;

                return (
                  <div key={item.label} className={`p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>

                      {/* Control based on type */}
                      <div className="ml-3">
                        {item.type === 'toggle' && (
                          <button
                            onClick={() => item.onChange(!item.value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2 ${
                              item.value ? 'bg-[#50c2c9]' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}

                        {item.type === 'link' && (
                          <Link 
                            to={item.path}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {item.value && <span className="text-sm">{item.value}</span>}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}

                        {item.type === 'button' && (
                          <button
                            onClick={handleClearCache}
                            className="px-3 py-1.5 text-sm font-medium text-[#50c2c9] bg-[#50c2c9] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">SafeMediDisposal</h3>
            <p className="text-sm text-gray-500 mb-1">Version 1.0.0</p>
            <p className="text-xs text-gray-400">Built for safe medical waste management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
