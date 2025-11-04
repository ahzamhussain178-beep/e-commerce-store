import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (!email?.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        alert(data?.message || 'Failed to subscribe. Try again later.');
      }
    } catch (e) {
      console.error('subscribe error', e);
      alert('Failed to subscribe. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: 'Gift',
      title: 'Exclusive Discounts',
      description: 'Get 10% off your first order plus member-only deals'
    },
    {
      icon: 'Bell',
      title: 'Early Access',
      description: 'Be the first to know about new product launches'
    },
    {
      icon: 'Star',
      title: 'Special Offers',
      description: 'Receive personalized recommendations and offers'
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-card/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to the ZZQ Family!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Thank you for subscribing! Check your email for your exclusive welcome discount.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSubscribed(false)}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
  <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stay in the Loop
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Get exclusive access to new collections, special offers, and insider tips for protecting your device.
              </p>
              
              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon name={benefit?.icon} size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{benefit?.title}</h4>
                      <p className="text-white/80 text-sm">{benefit?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-card rounded-2xl p-8 shadow-brand-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-muted-foreground">
                  Get updates delivered straight to your inbox
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  className="w-full"
                />
                
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  iconName="Mail"
                  iconPosition="left"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} />
                    <span>Privacy Protected</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="X" size={14} />
                    <span>Unsubscribe Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;