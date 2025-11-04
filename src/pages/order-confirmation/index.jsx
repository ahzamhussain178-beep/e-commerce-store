import React from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Icon name="CheckCircle" size={36} className="text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order placed successfully</h1>
          <p className="text-muted-foreground mb-8">Thanks for your purchase! We have emailed your order confirmation and will notify you when it ships.</p>
          <div className="flex justify-center gap-4">
            <Button variant="default" onClick={() => window.location.href = '/'}>Continue Shopping</Button>
            <Button variant="outline" onClick={() => window.location.href = '/user-dashboard'}>View Order</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
