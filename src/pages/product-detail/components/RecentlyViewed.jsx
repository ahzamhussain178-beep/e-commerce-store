import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentlyViewed = () => {
  const navigate = useNavigate();

  const recentlyViewedProducts = [
  {
    id: 1,
    name: "ZZQ Wireless Charger Pro",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1526774759780-84d68f48f74d",
    imageAlt: "Sleek black wireless charging pad with LED indicator and modern design",
    category: "Accessories"
  },
  {
    id: 2,
    name: "ZZQ Screen Protector Ultra",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1727170570674-25b6338b6d3d",
    imageAlt: "Crystal clear tempered glass screen protector with installation kit",
    category: "Protection"
  },
  {
    id: 3,
    name: "ZZQ Car Mount Magnetic",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1729067218696-90ef6f67840c",
    imageAlt: "Magnetic car phone mount with adjustable arm and strong grip",
    category: "Accessories"
  },
  {
    id: 4,
    name: "ZZQ Cable Lightning Pro",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1499741601805-e4e2c9743f77",
    imageAlt: "Premium braided lightning cable with reinforced connectors in black",
    category: "Cables"
  }];


  const handleProductClick = (productId) => {
    navigate('/product-detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-inter">
              Recently Viewed
            </h2>
            <p className="text-gray-600 font-inter">
              Continue shopping from where you left off
            </p>
          </div>
          
          <button
            onClick={() => navigate('/smart-shop')}
            className="text-primary hover:underline font-medium font-inter flex items-center space-x-1">

            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewedProducts?.map((product) =>
          <div
            key={product?.id}
            onClick={() => handleProductClick(product?.id)}
            className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-brand transition-all duration-300 cursor-pointer group">

              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                src={product?.image}
                alt={product?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                
                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium font-inter">
                    {product?.category}
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium font-inter hover:bg-gray-100 transition-colors duration-200">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 font-inter line-clamp-2">
                  {product?.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 font-inter">
                    ${product?.price}
                  </span>
                  
                  <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Add to cart logic
                  }}
                  className="p-2 text-gray-400 hover:text-primary transition-colors duration-200">

                    <Icon name="ShoppingCart" size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Hint */}
        <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          <span className="font-inter">Scroll horizontally to see more products</span>
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </div>
      </div>
    </div>);

};

export default RecentlyViewed;