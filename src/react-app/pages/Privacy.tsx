import { ChevronLeft, Shield, Eye, Database, Users, FileText, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

interface ToggleItem {
  icon: any;
  label: string;
  description: string;
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
}

interface ButtonItem {
  icon: any;
  label: string;
  description: string;
  type: 'button';
  action: string;
  destructive?: boolean;
}

type PrivacyItem = ToggleItem | ButtonItem;

interface PrivacyGroup {
  title: string;
  description: string;
  items: PrivacyItem[];
}

export default function Privacy() {
  const [dataCollection, setDataCollection] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const privacyGroups: PrivacyGroup[] = [
    {
      title: 'Data Collection',
      description: 'Control what information we collect',
      items: [
        {
          icon: Database,
          label: 'Usage Data',
          description: 'Help improve the app by sharing usage statistics',
          type: 'toggle',
          value: dataCollection,
          onChange: setDataCollection
        },
        {
          icon: Globe,
          label: 'Location Data',
          description: 'Allow location tracking for waste collection optimization',
          type: 'toggle',
          value: locationTracking,
          onChange: setLocationTracking
        },
        {
          icon: Eye,
          label: 'Analytics',
          description: 'Share anonymous usage data for app improvements',
          type: 'toggle',
          value: analytics,
          onChange: setAnalytics
        }
      ]
    },
    {
      title: 'Communications',
      description: 'Manage how we communicate with you',
      items: [
        {
          icon: Users,
          label: 'Marketing Communications',
          description: 'Receive updates about new features and services',
          type: 'toggle',
          value: marketing,
          onChange: setMarketing
        }
      ]
    },
    {
      title: 'Account & Data',
      description: 'Manage your personal information',
      items: [
        {
          icon: FileText,
          label: 'Download My Data',
          description: 'Get a copy of all your data stored in the app',
          type: 'button',
          action: 'download'
        },
        {
          icon: Lock,
          label: 'Delete Account',
          description: 'Permanently delete your account and all associated data',
          type: 'button',
          action: 'delete',
          destructive: true
        }
      ]
    }
  ];

  const handleDownloadData = () => {
    console.log('Downloading user data...');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested...');
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
            <h1 className="text-xl font-semibold text-gray-900">Privacy</h1>
            <p className="text-sm text-gray-500">Control your data and privacy</p>
          </div>
        </div>
      </div>

      {/* Privacy Introduction */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Your Privacy Matters</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are committed to protecting your privacy and giving you control over your personal information. 
                These settings allow you to customize what data we collect and how we use it.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Groups */}
        {privacyGroups.map((group, groupIndex) => (
          <div key={group.title} className={`mb-8 ${groupIndex === privacyGroups.length - 1 ? 'mb-0' : ''}`}>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">{group.title}</h2>
              <p className="text-sm text-gray-500">{group.description}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;

                return (
                  <div key={item.label} className={`p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.label}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Control based on type */}
                      <div className="ml-3 flex-shrink-0">
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

                        {item.type === 'button' && (
                          <button
                            onClick={item.action === 'download' ? handleDownloadData : handleDeleteAccount}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                              item.destructive
                                ? 'text-red-700 bg-red-50 hover:bg-red-100'
                                : 'text-[#50c2c9] bg-[#50c2c9] bg-opacity-10 hover:bg-opacity-20'
                            }`}
                          >
                            {item.action === 'download' ? 'Download' : 'Delete'}
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

        {/* Privacy Policy Link */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-2">Questions about Privacy?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Read our detailed privacy policy to understand how we handle your data
              </p>
              <Link 
                to="/privacy-policy" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#50c2c9] bg-[#50c2c9] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
