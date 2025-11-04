import React from 'react';
import Icon from '../../../components/AppIcon';

const SalesChart = () => {
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 135 },
    { month: 'Mar', sales: 48000, orders: 110 },
    { month: 'Apr', sales: 61000, orders: 155 },
    { month: 'May', sales: 55000, orders: 140 },
    { month: 'Jun', sales: 67000, orders: 170 },
    { month: 'Jul', sales: 72000, orders: 185 },
    { month: 'Aug', sales: 68000, orders: 175 },
    { month: 'Sep', sales: 75000, orders: 195 },
    { month: 'Oct', sales: 82000, orders: 210 },
    { month: 'Nov', sales: 78000, orders: 200 },
    { month: 'Dec', sales: 85000, orders: 220 }
  ];

  const maxSales = Math.max(...salesData?.map(d => d?.sales));
  const maxOrders = Math.max(...salesData?.map(d => d?.orders));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Monthly sales performance and order volume
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {/* Chart Area */}
          <div className="h-64 flex items-end space-x-2">
            {salesData?.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col items-center space-y-1">
                  {/* Sales Bar */}
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(data?.sales / maxSales) * 120}px` }}
                    title={`Sales: ${formatCurrency(data?.sales)}`}
                  ></div>
                  {/* Orders Bar */}
                  <div 
                    className="w-full bg-green-500 rounded-b"
                    style={{ height: `${(data?.orders / maxOrders) * 60}px` }}
                    title={`Orders: ${data?.orders}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{data?.month}</span>
              </div>
            ))}
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(salesData?.[salesData?.length - 1]?.sales)}
              </div>
              <div className="text-sm text-gray-600">Current Month Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {salesData?.[salesData?.length - 1]?.orders}
              </div>
              <div className="text-sm text-gray-600">Current Month Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(salesData?.[salesData?.length - 1]?.sales / salesData?.[salesData?.length - 1]?.orders)}
              </div>
              <div className="text-sm text-gray-600">Avg Order Value</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center space-x-2">
            <span>View Detailed Analytics</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;