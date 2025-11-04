import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TopProductsWidget = () => {
  const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max Clear Case",
    image: "https://images.unsplash.com/photo-1605000977407-2771f2f8e908",
    imageAlt: "Clear transparent phone case for iPhone showing sleek design and precise cutouts",
    sales: 1247,
    revenue: "$62,350",
    growth: "+12%",
    growthType: "increase"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Leather Case",
    image: "https://images.unsplash.com/photo-1666037747152-0ba470abaa17",
    imageAlt: "Premium black leather phone case with textured surface and elegant stitching",
    sales: 892,
    revenue: "$71,360",
    growth: "+8%",
    growthType: "increase"
  },
  {
    id: 3,
    name: "Google Pixel 8 Rugged Case",
    image: "https://images.unsplash.com/photo-1625465329894-9cfaf8a63332",
    imageAlt: "Heavy-duty rugged phone case in black with reinforced corners and drop protection",
    sales: 756,
    revenue: "$45,360",
    growth: "+15%",
    growthType: "increase"
  },
  {
    id: 4,
    name: "iPhone 14 MagSafe Compatible Case",
    image: "https://images.unsplash.com/photo-1664363535302-6f71e41a176a",
    imageAlt: "Sleek blue phone case with visible MagSafe ring and wireless charging compatibility",
    sales: 634,
    revenue: "$25,360",
    growth: "-3%",
    growthType: "decrease"
  },
  {
    id: 5,
    name: "OnePlus 12 Carbon Fiber Case",
    image: "https://images.unsplash.com/photo-1595251086458-75a52f751b67",
    imageAlt: "Modern carbon fiber phone case with textured black surface and premium finish",
    sales: 523,
    revenue: "$31,380",
    growth: "+5%",
    growthType: "increase"
  }];


  return (
  <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <button className="text-primary hover:text-red-700 text-sm font-medium flex items-center space-x-1">
            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {topProducts?.map((product, index) =>
          <div key={product?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{product?.name}</h4>
                  <p className="text-xs text-gray-500">{product?.sales} sales</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{product?.revenue}</p>
                <div className="flex items-center justify-end space-x-1">
                  <Icon
                  name={product?.growthType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                  size={12}
                  className={product?.growthType === 'increase' ? 'text-green-600' : 'text-red-600'} />

                  <span className={`text-xs font-medium ${
                product?.growthType === 'increase' ? 'text-green-600' : 'text-red-600'}`
                }>
                    {product?.growth}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default TopProductsWidget;