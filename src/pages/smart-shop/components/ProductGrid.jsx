import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ products, loading, onLoadMore, hasMore, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('zzq-wishlist');
    if (savedWishlist) {
      setWishlist(new Set(JSON.parse(savedWishlist)));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zzq-wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
  };

  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist?.has(productId)) {
        newWishlist?.delete(productId);
      } else {
        newWishlist?.add(productId);
      }
      return newWishlist;
    });
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    // Show success feedback (could be a toast notification)
    console.log('Added to cart:', product);
  };

  if (loading && products?.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-square mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-6 bg-muted rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-secondary mb-2 font-inter">
          No products found
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist?.has(product?.id)}
          />
        ))}
      </div>
      {/* Loading More Products */}
      {loading && products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 4 })?.map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-square mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={onLoadMore}
            iconName="Plus"
            iconPosition="left"
            size="lg"
          >
            Load More Products
          </Button>
        </div>
      )}
      {/* End of Results Message */}
      {!hasMore && products?.length > 0 && (
        <div className="text-center mt-12 py-8 border-t border-border">
          <Icon name="CheckCircle" size={24} className="text-green-600 mx-auto mb-2" />
          <p className="text-text-secondary">
            You've seen all {products?.length} products matching your criteria
          </p>
        </div>
      )}
      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={showQuickView}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductGrid;