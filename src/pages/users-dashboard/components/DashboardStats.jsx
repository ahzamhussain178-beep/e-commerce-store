import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      id: 1,
      label: 'Total Orders',
      value: stats?.totalOrders,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      label: 'Loyalty Points',
      value: stats?.loyaltyPoints?.toLocaleString(),
      icon: 'Star',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      label: 'Wishlist Items',
      value: stats?.wishlistItems,
      icon: 'Heart',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 4,
      label: 'Active Cases',
      value: stats?.activeCases,
      icon: 'Smartphone',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems?.map((item) => (
        <div
          key={item?.id}
          className="bg-card rounded-lg p-6 border border-border shadow-brand hover:shadow-brand-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {item?.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {item?.value}
              </p>
            </div>
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;