import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';

const StaticPage = ({ title = 'Page', children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} - ZZQ Stores`;
  }, [title]);

  const breadcrumbs = [
    { name: 'Home', path: '/homepage' },
    { name: title, path: '#', current: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

  {/* Breadcrumb */}
  <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.name}>
                {index > 0 && <Icon name="ChevronRight" size={14} className="text-gray-400" />}
                <button
                  onClick={() => item.path && item.path !== '#' && navigate(item.path)}
                  className={`font-inter ${item.current ? 'text-gray-900 font-medium cursor-default' : 'text-gray-600 hover:text-gray-900 transition-colors'}`}
                  disabled={item.current}
                >
                  {item.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-foreground font-inter mb-4">{title}</h1>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                {children || (
                  <>
                    <p className="text-muted-foreground text-lg font-inter">This page covers <strong>{title}</strong>. Here you'll find policies, instructions, and contact information related to this topic.</p>
                    <p className="text-muted-foreground">We provide clear guidance and useful links to help you navigate our policies and procedures. If you need direct assistance, please contact our support team.</p>
                  </>
                )}
              </div>

              <div className="bg-card border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Frequently asked questions</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>How long does shipping take?</li>
                  <li>How do I start a return?</li>
                  <li>What is covered by warranty?</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold mb-3 text-foreground">Need help?</h4>
              <p className="text-muted-foreground mb-4">Contact our support team for personalized help.</p>
              <button onClick={() => navigate('/contact')} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Contact Us</button>
            </div>
          </aside>
        </div>
      </main>

      {/* Trust Footer (copied style used on Help/About/Contact) */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: 'Shield', title: 'Premium Protection', desc: 'Military-grade materials tested to withstand extreme conditions' },
              { icon: 'Award', title: '2-Year Warranty', desc: 'Comprehensive coverage for defects and wear' },
              { icon: 'Truck', title: 'Free Shipping', desc: 'Fast, secure delivery on orders over $50' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name={item.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-semibold font-inter">{item.title}</h3>
                <p className="text-gray-300 text-sm font-inter max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
