import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersTable = () => {
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Smith',
      product: 'ProShield Elite',
      amount: 79.99,
      status: 'Shipped',
      date: '2024-10-15',
      priority: 'high'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Johnson',
      product: 'GameMax Pro',
      amount: 89.99,
      status: 'Processing',
      date: '2024-10-14',
      priority: 'medium'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Davis',
      product: 'AdventureGuard',
      amount: 94.99,
      status: 'Delivered',
      date: '2024-10-13',
      priority: 'low'
    },
    {
      id: 'ORD-004',
      customer: 'Emily Brown',
      product: 'StyleFlex Marble',
      amount: 49.99,
      status: 'Pending',
      date: '2024-10-12',
      priority: 'high'
    },
    {
      id: 'ORD-005',
      customer: 'David Wilson',
      product: 'ClearVision Ultra',
      amount: 34.99,
      status: 'Shipped',
      date: '2024-10-11',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => console.log('View All Orders clicked')}
          >
            View All
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Latest customer orders and their status
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-gray-200">
            {recentOrders?.map((order) => (
              <tr key={order?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {order?.id}
                    </span>
                    <Icon 
                      name="AlertCircle" 
                      size={14} 
                      className={`ml-2 ${getPriorityColor(order?.priority)}`}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order?.customer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order?.product}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${order?.amount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order?.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;