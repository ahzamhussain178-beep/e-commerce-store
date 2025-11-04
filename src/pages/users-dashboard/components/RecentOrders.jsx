import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentOrders = ({ orders, onViewAll, onReorder, onTrackOrder }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {orders?.map((order) => (
          <div key={order?.id} className="p-6 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={order?.image}
                    alt={order?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {order?.productName}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Order #{order?.orderNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order?.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  ${order?.total}
                </p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order?.id)}
                  iconName="Truck"
                  iconPosition="left"
                >
                  Track
                </Button>
                {order?.status?.toLowerCase() === 'delivered' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReorder(order?.id)}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reorder
                  </Button>
                )}
              </div>
              
              {order?.status?.toLowerCase() === 'delivered' && !order?.reviewed && (
                <Button variant="ghost" size="sm" iconName="Star" iconPosition="left">
                  Review
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;