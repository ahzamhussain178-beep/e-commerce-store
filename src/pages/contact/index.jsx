import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us - ZZQ Stores";
  }, []);

  const breadcrumbs = [
    { name: "Home", path: "/homepage" },
    { name: "Contact", path: "/contact", current: true },
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
                {index > 0 && <Icon name="ChevronRight" size={14} className="text-gray-400" />}
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 font-inter mb-6">Get in Touch</h1>
        <p className="text-gray-600 text-lg font-inter mb-10 max-w-3xl">
          Have a question, suggestion, or concern? We’d love to hear from you. Use the form below or reach us through our official channels.
        </p>

        <form className="bg-white border rounded-2xl shadow-sm p-8 max-w-3xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 font-inter">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-inter">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-inter">Message</label>
            <textarea
              rows="4"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-inter px-6 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center space-x-2"
          >
            <Icon name="Send" size={18} />
            <span>Send Message</span>
          </button>
        </form>
      </main>

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

export default Contact;
