import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: "Add New Product",
      description: "Create a new product listing",
      icon: "Plus",
      color: "bg-blue-50 text-blue-600",
      action: () => console.log("Add new product")
    },
    {
      id: 2,
      title: "Process Orders",
      description: "Review and process pending orders",
      icon: "Package",
      color: "bg-green-50 text-green-600",
      action: () => console.log("Process orders")
    },
    {
      id: 3,
      title: "Inventory Alert",
      description: "Check low stock items",
      icon: "AlertTriangle",
      color: "bg-yellow-50 text-yellow-600",
      action: () => console.log("Check inventory")
    },
    {
      id: 4,
      title: "Customer Support",
      description: "View support tickets",
      icon: "MessageCircle",
      color: "bg-purple-50 text-purple-600",
      action: () => console.log("Customer support")
    },
    {
      id: 5,
      title: "Sales Report",
      description: "Generate sales analytics",
      icon: "BarChart3",
      color: "bg-red-50 text-red-600",
      action: () => console.log("Sales report")
    },
    {
      id: 6,
      title: "User Management",
      description: "Manage user accounts",
      icon: "Users",
      color: "bg-indigo-50 text-indigo-600",
      action: () => console.log("User management")
    }
  ];

  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600 mt-1">Frequently used admin functions</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-brand transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color} group-hover:scale-105 transition-transform duration-200`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{action?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;