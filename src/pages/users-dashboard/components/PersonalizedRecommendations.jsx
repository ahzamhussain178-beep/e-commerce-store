import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-yellow-500" />
            <span>Recommended for You</span>
          </h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Based on your recent purchases and browsing history
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations?.map((product) => (
            <div key={product?.id} className="group">
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                <div className="aspect-square w-full mb-4 bg-white rounded-lg overflow-hidden relative">
                  <Image
                    src={product?.image}
                    alt={product?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product?.isNew && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {product?.discount && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{product?.discount}%
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2">
                    {product?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {product?.compatibility}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < Math.floor(product?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product?.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-primary">
                        ${product?.price}
                      </span>
                      {product?.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product?.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      {product?.matchPercentage}% match
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => onAddToCart(product?.id)}
                      iconName="ShoppingCart"
                      iconPosition="left"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddToWishlist(product?.id)}
                      iconName="Heart"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;