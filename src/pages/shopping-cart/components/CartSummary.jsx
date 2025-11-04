import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartSummary = ({ subtotal, shipping, tax, total, onApplyPromo, promoCode, promoDiscount }) => {
  const [promoInput, setPromoInput] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  const handleApplyPromo = async () => {
    if (!promoInput?.trim()) return;
    
    setIsApplyingPromo(true);
    await onApplyPromo(promoInput);
    setIsApplyingPromo(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground font-inter mb-4">
        Order Summary
      </h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal || 0)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shipping === 0 ? 'Free' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(tax || 0)}</span>
        </div>
        
        {promoDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Promo Discount ({promoCode})</span>
            <span className="text-success font-medium">-{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(promoDiscount || 0)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-foreground font-inter">Total</span>
            <span className="text-lg font-semibold text-primary font-inter">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total || 0)}</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e?.target?.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            loading={isApplyingPromo}
            disabled={!promoInput?.trim()}
          >
            Apply
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          size="lg"
          iconName="CreditCard"
          iconPosition="left"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Continue Shopping
        </Button>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={16} />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={16} />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;