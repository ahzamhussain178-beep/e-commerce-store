import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustSignals = [
    {
      icon: 'Shield',
      title: 'Military-Grade Protection',
      description: 'Tested to withstand extreme conditions and drops up to 12 feet',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Truck',
      title: 'Free Shipping',
      description: 'Free delivery on all orders over $50 with tracking included',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'RotateCcw',
      title: '30-Day Returns',
      description: 'Hassle-free returns within 30 days of purchase',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: 'Award',
      title: '2-Year Warranty',
      description: 'Comprehensive coverage for manufacturing defects',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Expert customer service team available around the clock',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: 'Lock',
      title: 'Secure Payments',
      description: 'SSL encrypted checkout with multiple payment options',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '1M+', label: 'Cases Sold' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '99.9%', label: 'Satisfaction Rate' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose ZZQ Stores?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're committed to providing the highest quality phone protection with exceptional customer service and innovative designs.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trustSignals?.map((signal, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${signal?.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon name={signal?.icon} size={32} className={signal?.color} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {signal?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {signal?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-brand">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Trusted by Customers Worldwide
            </h3>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers who trust ZZQ Stores for their phone protection needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat?.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Featured In
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">TechCrunch</div>
            <div className="text-2xl font-bold text-gray-400">Wired</div>
            <div className="text-2xl font-bold text-gray-400">The Verge</div>
            <div className="text-2xl font-bold text-gray-400">Gizmodo</div>
            <div className="text-2xl font-bold text-gray-400">Engadget</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;