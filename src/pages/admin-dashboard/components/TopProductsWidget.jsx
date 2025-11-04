import React from 'react';
import Icon from '../../../components/AppIcon';

const TopProductsWidget = () => {
  const topProducts = [
    {
      id: 1,
      name: "ProShield Elite",
      sales: 1247,
      revenue: 98765,
      growth: 12.5,
      image: "https://images.unsplash.com/photo-1667862714290-f44b8e1c257b",
      alt: "Premium black leather smartphone case"
    },
    {
      id: 2,
      name: "GameMax Pro",
      sales: 892,
      revenue: 80280,
      growth: 8.3,
      image: "https://images.unsplash.com/photo-1683891358030-46610982e059",
      alt: "Gaming smartphone case with RGB lighting"
    },
    {
      id: 3,
      name: "AdventureGuard",
      sales: 654,
      revenue: 62046,
      growth: 15.2,
      image: "https://images.unsplash.com/photo-1564133471861-7068d2014198",
      alt: "Rugged waterproof smartphone case"
    },
    {
      id: 4,
      name: "StyleFlex Marble",
      sales: 1893,
      revenue: 94647,
      growth: 22.1,
      image: "https://images.unsplash.com/photo-1592535557118-fc979e971bcf",
      alt: "Fashionable marble pattern smartphone case"
    },
    {
      id: 5,
      name: "ClearVision Ultra",
      sales: 2156,
      revenue: 75460,
      growth: 18.7,
      image: "https://images.unsplash.com/photo-1706379062668-5685e457c10d",
      alt: "Crystal clear minimalist smartphone case"
    }
  ];

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
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-green-600" />
            <span className="text-sm text-gray-600">This Month</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Best performing products by sales volume
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {topProducts?.map((product, index) => (
            <div key={product?.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    #{index + 1}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product?.name}
                </h4>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">
                    {product?.sales?.toLocaleString()} sales
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(product?.revenue)}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name="TrendingUp" 
                    size={12} 
                    className="text-green-600" 
                  />
                  <span className="text-sm font-medium text-green-600">
                    +{product?.growth}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">Growth</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center space-x-2">
            <span>View All Products</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopProductsWidget;


