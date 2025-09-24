import { ChevronLeft, Check, Newspaper, Gift, Bell, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

interface NotificationItem {
  id: string;
  type: 'points' | 'news' | 'system';
  title: string;
  description?: string;
  time: string;
  isRead?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export default function Notifications() {
  const todayNotifications: NotificationItem[] = [
    {
      id: '1',
      type: 'points',
      title: 'Points Successfully Redeemed',
      description: 'Your 2,000 points have been redeemed to PhonePe wallet',
      time: '09:20 PM',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'news',
      title: 'New Environmental Campaign',
      description: 'SafeMediDisposal launches tree planting initiative',
      time: '08:12 PM',
      isRead: true,
      priority: 'medium'
    }
  ];

  const lastWeekNotifications: NotificationItem[] = [
    {
      id: '3',
      type: 'points',
      title: 'Bonus Points Earned',
      description: 'Congratulations! You earned 500 bonus points',
      time: '10:30 AM',
      isRead: false,
      priority: 'high'
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated',
      time: '10:20 AM',
      isRead: false,
      priority: 'low'
    },
    {
      id: '5',
      type: 'points',
      title: 'Waste Deposit Confirmed',
      description: 'Your waste deposit has been processed and points added',
      time: '10:10 AM',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '6',
      type: 'points',
      title: 'Points Successfully Redeemed',
      description: 'Your redemption request has been completed',
      time: '09:40 AM',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '7',
      type: 'news',
      title: 'Recycling Innovation Update',
      description: 'Learn about our new plastic-to-building-materials technology',
      time: '09:20 AM',
      isRead: true,
      priority: 'low'
    },
    {
      id: '8',
      type: 'news',
      title: 'Weekly Newsletter',
      description: 'Your weekly environmental impact report is ready',
      time: '09:00 AM',
      isRead: true,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    const iconClasses = "w-6 h-6 text-[#50c2c9]";
    
    switch (type) {
      case 'points':
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Gift className={iconClasses} />
          </div>
        );
      case 'news':
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Newspaper className={iconClasses} />
          </div>
        );
      case 'system':
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Bell className={iconClasses} />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Bell className={iconClasses} />
          </div>
        );
    }
  };

  const NotificationsList = ({ notifications, title }: { notifications: NotificationItem[], title: string }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#50c2c9]" />
          {title}
        </h2>
        <span className="text-sm text-gray-500 bg-[#50c2c9] bg-opacity-10 px-3 py-1 rounded-full font-medium">
          {notifications.filter(n => !n.isRead).length} new
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer
                        ${!notification.isRead ? 'bg-gray-50 border border-gray-200' : 'border border-transparent'}`}
            >
              <div className="relative">
                {getNotificationIcon(notification.type)}
                {!notification.isRead && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#50c2c9] rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-gray-900 font-semibold text-base leading-tight">
                    {notification.title}
                  </h3>
                  <span className="text-gray-400 text-xs font-medium flex-shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#50c2c9]" />
                    {notification.time}
                  </span>
                </div>
                
                {notification.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {notification.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-[#50c2c9] bg-opacity-10 text-[#50c2c9]">
                    {notification.type === 'points' && <Gift className="w-3 h-3 text-[#50c2c9]" />}
                    {notification.type === 'news' && <Newspaper className="w-3 h-3 text-[#50c2c9]" />}
                    {notification.type === 'system' && <Bell className="w-3 h-3 text-[#50c2c9]" />}
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                  
                  {notification.isRead && (
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 pt-12 bg-white border-b border-gray-200">
        <Link to="/home" className="p-2 -ml-2">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                         hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
        <button className="p-2 -mr-2 group">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                         group-hover:border-gray-400 group-hover:bg-gray-50 transition-all duration-200">
            <Check className="w-5 h-5 text-gray-600" />
          </div>
        </button>
      </div>

      <div className="px-6 py-8">
        {/* Notification Summary Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Notification Center</h2>
              <p className="text-gray-600 text-sm">
                {todayNotifications.filter(n => !n.isRead).length + lastWeekNotifications.filter(n => !n.isRead).length} unread messages
              </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Bell className="w-8 h-8 text-[#50c2c9]" />
            </div>
          </div>
        </div>

        {/* Notifications Lists */}
        <NotificationsList notifications={todayNotifications} title="Today" />
        <NotificationsList notifications={lastWeekNotifications} title="This Week" />
      </div>
    </div>
  );
}
