import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ products, onAddToCart }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground font-inter mb-4 flex items-center space-x-2">
        <Icon name="Star" size={20} />
        <span>Recommended for You</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="border border-border rounded-lg p-4 hover:shadow-brand transition-shadow duration-200">
            <div className="w-full h-32 overflow-hidden rounded-lg mb-3">
              <Image
                src={product?.image}
                alt={product?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h4 className="text-sm font-medium text-foreground font-inter mb-1 line-clamp-2">
              {product?.name}
            </h4>
            
            <p className="text-xs text-muted-foreground mb-2">
              {product?.compatibility}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-primary font-inter">
                ${product?.price?.toFixed(2)}
              </span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground">
                  {product?.rating}
                </span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onAddToCart(product)}
              iconName="Plus"
              iconPosition="left"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;