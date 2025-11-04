import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import StatsCard from './components/StatsCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import SalesChart from './components/SalesChart';
import TopProductsWidget from './components/TopProductsWidget';
import QuickActionsPanel from './components/QuickActionsPanel';
import NotificationCenter from './components/NotificationCenter';
import AdminNavTabs from './components/AdminNavTabs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statsData = [
    {
      title: "Total Revenue",
      value: "$847,392",
      change: "+12.5%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Total Orders",
      value: "5,847",
      change: "+8.2%",
      changeType: "increase",
      icon: "ShoppingBag",
      color: "primary"
    },
    {
      title: "Active Customers",
      value: "12,459",
      change: "+15.3%",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Inventory Items",
      value: "2,847",
      change: "-2.1%",
      changeType: "decrease",
      icon: "Package",
      color: "warning"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData?.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat?.title}
                  value={stat?.value}
                  change={stat?.change}
                  changeType={stat?.changeType}
                  icon={stat?.icon}
                  color={stat?.color}
                />
              ))}
            </div>
            {/* Charts and Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SalesChart />
              <TopProductsWidget />
            </div>
            {/* Recent Orders and Quick Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <RecentOrdersTable />
              </div>
              <div className="space-y-6">
                <QuickActionsPanel />
                <NotificationCenter />
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="bg-card rounded-lg border border-border shadow-brand p-8">
            <div className="text-center">
              <Icon name="Package" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Management</h3>
              <p className="text-gray-600 mb-6">
                Manage your product catalog, inventory, and pricing from this section.
              </p>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Add New Product
              </Button>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-card rounded-lg border border-border shadow-brand p-8">
            <div className="text-center">
              <Icon name="ShoppingBag" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Management</h3>
              <p className="text-gray-600 mb-6">
                Process orders, update shipping status, and manage customer communications.
              </p>
              <Button variant="default" iconName="Search" iconPosition="left">
                Search Orders
              </Button>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="bg-card rounded-lg border border-border shadow-brand p-8">
            <div className="text-center">
              <Icon name="Users" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-gray-600 mb-6">
                View customer profiles, manage accounts, and handle support requests.
              </p>
              <Button variant="default" iconName="UserPlus" iconPosition="left">
                Add Customer
              </Button>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-card rounded-lg border border-border shadow-brand p-8">
            <div className="text-center">
              <Icon name="BarChart3" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-6">
                View detailed sales reports, performance metrics, and business insights.
              </p>
              <Button variant="default" iconName="Download" iconPosition="left">
                Export Report
              </Button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-card rounded-lg border border-border shadow-brand p-8">
            <div className="text-center">
              <Icon name="Settings" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600 mb-6">
                Configure system preferences, user roles, and application settings.
              </p>
              <Button variant="default" iconName="Save" iconPosition="left">
                Save Settings
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ZZQ Stores</title>
        <meta name="description" content="Comprehensive admin dashboard for ZZQ Stores - manage inventory, orders, customers, and analytics efficiently." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Admin Header */}
  <div className="bg-card border-b border-border pt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
                  Export Data
                </Button>
                <Button variant="default" iconName="Plus" iconPosition="left" size="sm">
                  Quick Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <AdminNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </main>

        {/* Footer */}
  <footer className="bg-card border-t border-border py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                © {new Date()?.getFullYear()} ZZQ Stores. All rights reserved.
              </p>
              <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                <button className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">
                  Help & Support
                </button>
                <button className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">
                  System Status
                </button>
                <button className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">
                  API Documentation
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

/* Logout moved to global header dropdown */

export default AdminDashboard;