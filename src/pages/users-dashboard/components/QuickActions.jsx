import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'track-order',
      label: 'Track Order',
      description: 'Check your order status',
      icon: 'Truck',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => onAction('track-order')
    },
    {
      id: 'browse-new',
      label: 'New Arrivals',
      description: 'Discover latest cases',
      icon: 'Sparkles',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => onAction('browse-new')
    },
    {
      id: 'protection-lab',
      label: 'Protection Lab',
      description: 'Learn about protection',
      icon: 'Shield',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => onAction('protection-lab')
    },
    {
      id: 'refer-friend',
      label: 'Refer Friends',
      description: 'Earn loyalty points',
      icon: 'Users',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => onAction('refer-friend')
    },
    {
      id: 'customer-support',
      label: 'Support',
      description: 'Get help & assistance',
      icon: 'MessageCircle',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      action: () => onAction('customer-support')
    },
    {
      id: 'account-settings',
      label: 'Settings',
      description: 'Manage your account',
      icon: 'Settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      action: () => onAction('account-settings')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Frequently used features and shortcuts
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-200 text-left"
            >
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {action?.label}
              </h4>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;