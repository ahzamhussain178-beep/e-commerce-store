import React from 'react';
import Image from '../../../components/Appimage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  return (
    <div className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border">
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
        <Image
          src={item?.image}
          alt={item?.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-foreground font-inter mb-1">
          {item?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {item?.variant}
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          Compatible with: {item?.compatibility}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1}
              className="h-8 w-8"
            >
              <Icon name="Minus" size={14} />
            </Button>
            
            <span className="text-sm font-medium text-foreground min-w-[2rem] text-center">
              {item?.quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item?.quantity + 1)}
              className="h-8 w-8"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item?.id)}
            className="text-destructive hover:text-destructive"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-foreground font-inter">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.price * item?.quantity)}
        </p>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.price)} each
        </p>
      </div>
    </div>
  );
};

export default CartItem;