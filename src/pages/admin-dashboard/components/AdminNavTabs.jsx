import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AdminNavTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Dashboard summary and key metrics'
    },
    {
      id: 'products',
      name: 'Products',
      icon: 'Package',
      description: 'Product catalog and inventory management'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: 'ShoppingBag',
      description: 'Order processing and fulfillment'
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: 'Users',
      description: 'Customer management and communication'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: 'BarChart3',
      description: 'Sales reports and performance metrics'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'Settings',
      description: 'System configuration and preferences'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-red-50' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              title={tab?.description}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavTabs;