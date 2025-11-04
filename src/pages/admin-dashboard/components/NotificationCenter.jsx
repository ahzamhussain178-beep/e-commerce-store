import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #ORD-001 from John Smith for $79.99',
      type: 'order',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'ProShield Elite is running low (5 items left)',
      type: 'inventory',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Payment of $89.99 received for Order #ORD-002',
      type: 'payment',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Customer Review',
      message: 'New 5-star review for GameMax Pro',
      type: 'review',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'System Update',
      message: 'Scheduled maintenance completed successfully',
      type: 'system',
      time: '3 hours ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'ShoppingBag';
      case 'inventory':
        return 'Package';
      case 'payment':
        return 'CreditCard';
      case 'review':
        return 'Star';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-blue-600 bg-blue-50';
      case 'inventory':
        return 'text-orange-600 bg-orange-50';
      case 'payment':
        return 'text-green-600 bg-green-50';
      case 'review':
        return 'text-yellow-600 bg-yellow-50';
      case 'system':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          System alerts and important updates
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getPriorityColor(notification?.priority)} ${
                  !notification?.read ? 'bg-blue-50/30' : ''
                }`}
                onClick={() => markAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${!notification?.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification?.title}
                      </h4>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification?.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {notifications?.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Bell"
            iconPosition="left"
            onClick={() => console.log('View All Notifications clicked')}
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;