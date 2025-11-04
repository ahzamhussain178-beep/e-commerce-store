import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistPreview = ({ wishlistItems, onViewAll, onAddToCart, onRemoveFromWishlist }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Heart" size={20} className="text-pink-600" />
            <span>Wishlist</span>
          </h3>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </div>
      <div className="p-6">
        {wishlistItems?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Your wishlist is empty</p>
            <Button variant="outline" size="sm" className="mt-4">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems?.slice(0, 4)?.map((item) => (
              <div key={item?.id} className="group relative">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="aspect-square w-full mb-3 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item?.image}
                      alt={item?.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground truncate mb-1">
                    {item?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item?.compatibility}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      ${item?.price}
                    </span>
                    {item?.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => onAddToCart(item?.id)}
                      iconName="ShoppingCart"
                      iconPosition="left"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFromWishlist(item?.id)}
                      iconName="X"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPreview;