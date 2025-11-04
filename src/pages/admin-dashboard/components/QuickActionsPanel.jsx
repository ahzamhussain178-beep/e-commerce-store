import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'Create new product listing',
      icon: 'Plus',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => console.log('Add Product clicked')
    },
    {
      id: 'view-orders',
      title: 'View Orders',
      description: 'Check recent orders',
      icon: 'ShoppingBag',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => console.log('View Orders clicked')
    },
    {
      id: 'manage-inventory',
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: 'Package',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => console.log('Manage Inventory clicked')
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: 'BarChart3',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => console.log('View Analytics clicked')
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Handle support tickets',
      icon: 'MessageCircle',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      action: () => console.log('Customer Support clicked')
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: 'Settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      action: () => console.log('System Settings clicked')
    }
  ];

  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600 mt-1">
          Frequently used admin functions
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="group p-4 rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-gray-50 transition-all duration-200 text-left"
            >
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {action?.title}
              </h4>
              <p className="text-xs text-gray-500">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => console.log('View All Actions clicked')}
          >
            View All Actions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;


