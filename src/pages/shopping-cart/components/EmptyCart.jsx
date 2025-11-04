import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground font-inter mb-4">
        Your cart is empty
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any phone cases to your cart yet. 
        Discover our premium collection and find the perfect protection for your device.
      </p>
      
      <div className="space-y-4 max-w-sm mx-auto">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={() => navigate('/smart-shop')}
          iconName="Search"
          iconPosition="left"
        >
          Browse Products
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => navigate('/homepage')}
          iconName="Home"
          iconPosition="left"
        >
          Back to Home
        </Button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground font-inter mb-1">
            Premium Protection
          </h3>
          <p className="text-xs text-muted-foreground">
            Military-grade cases for ultimate device safety
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Palette" size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground font-inter mb-1">
            Style Variety
          </h3>
          <p className="text-xs text-muted-foreground">
            Hundreds of designs to match your personality
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Truck" size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground font-inter mb-1">
            Fast Shipping
          </h3>
          <p className="text-xs text-muted-foreground">
            Free delivery on orders over $50
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;