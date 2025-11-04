import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import CartSummary from '../shopping-cart/components/CartSummary';
import Icon from '../../components/AppIcon';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('zzq_cart');
    setCartItems(saved ? JSON.parse(saved) : []);
  }, []);

  const subtotal = cartItems?.reduce((s, it) => s + (it?.price || 0) * (it?.quantity || 1), 0);
  const shipping = subtotal > 5000 ? 0 : 99; // simple rule
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // placeholder: create order on server and direct to payment
    await new Promise((r) => setTimeout(r, 800));
    // For now simulate success and redirect to a confirmation
    localStorage.removeItem('zzq_cart');
    window.location.href = '/order-confirmation';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary p-2 rounded-md text-primary-foreground"><Icon name="CreditCard" size={18} /></div>
              <div>
                <h1 className="text-2xl font-semibold">Checkout</h1>
                <p className="text-sm text-muted-foreground">Complete your purchase — secure checkout powered by Stripe/Razorpay</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-medium mb-4">Shipping address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input value={shippingAddress.name} onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})} placeholder="Full name" className="p-3 border border-border rounded" />
                  <input value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} placeholder="Phone" className="p-3 border border-border rounded" />
                  <input value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} placeholder="Address line" className="p-3 border border-border rounded md:col-span-2" />
                  <input value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} placeholder="City" className="p-3 border border-border rounded" />
                  <input value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} placeholder="State" className="p-3 border border-border rounded" />
                  <input value={shippingAddress.pincode} onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})} placeholder="PIN code" className="p-3 border border-border rounded" />
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-medium mb-4">Payment</h2>
                <p className="text-sm text-muted-foreground mb-4">Select payment method to continue</p>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-border rounded cursor-pointer">
                    <input type="radio" name="payment" defaultChecked />
                    <span className="font-medium">Card / UPI (Stripe / Razorpay)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} onApplyPromo={() => {}} promoCode={null} promoDiscount={0} />
                <div className="mt-4">
                  <Button variant="default" fullWidth size="lg" loading={isPlacingOrder} onClick={handlePlaceOrder}>Pay {new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(total || 0)}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
