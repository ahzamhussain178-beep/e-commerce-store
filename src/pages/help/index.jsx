import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

const Help = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Help Center - ZZQ Stores";
  }, []);

  const breadcrumbs = [
    { name: "Home", path: "/homepage" },
    { name: "Help Center", path: "/help", current: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.name}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={14} className="text-gray-400" />
                )}
                <button
                  onClick={() => item.path && navigate(item.path)}
                  className={`font-inter ${
                    item.current
                      ? "text-gray-900 font-medium cursor-default"
                      : "text-gray-600 hover:text-gray-900 transition-colors"
                  }`}
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
        <section>
          <h1 className="text-4xl font-bold text-gray-900 font-inter mb-4">
            Help Center
          </h1>
          <p className="text-gray-600 text-lg font-inter max-w-3xl">
            We’re here to help. Find answers to your questions, learn how to manage your orders, and contact our support team for personalized assistance.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <Icon name="Package" size={32} className="text-primary mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Order Tracking</h3>
            <p className="text-gray-600 text-sm font-inter mb-4">
              Track your shipment and check delivery updates anytime.
            </p>
            <button
              className="text-primary font-medium hover:underline text-sm"
              onClick={() => navigate("/user-dashboard")}
            >
              Track Order →
            </button>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <Icon name="RotateCcw" size={32} className="text-primary mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Returns & Refunds</h3>
            <p className="text-gray-600 text-sm font-inter mb-4">
              Learn how to return or exchange your items with ease.
            </p>
            <button className="text-primary font-medium hover:underline text-sm">
              View Return Policy →
            </button>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <Icon name="MessageCircle" size={32} className="text-primary mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Customer Support</h3>
            <p className="text-gray-600 text-sm font-inter mb-4">
              Our friendly support team is available 24/7 to assist you.
            </p>
            <button
              className="text-primary font-medium hover:underline text-sm"
              onClick={() => navigate("/contact")}
            >
              Contact Us →
            </button>
          </div>
        </section>
      </main>

      {/* Trust Footer */}
      <TrustFooter />
    </div>
  );
};

const TrustFooter = () => (
  <div className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: "Shield", title: "Premium Protection", desc: "Military-grade materials tested to withstand extreme conditions" },
          { icon: "Award", title: "2-Year Warranty", desc: "Comprehensive coverage for defects and wear" },
          { icon: "Truck", title: "Free Shipping", desc: "Fast, secure delivery on orders over $50" },
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
);

export default Help;
