import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-red-50 text-red-600 border-red-200';
    }
  };

  const getChangeColor = () => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  return (
  <div className="bg-card rounded-lg border border-border p-6 shadow-brand hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={getChangeColor()}
              />
              <span className={`text-sm font-medium ml-1 ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;