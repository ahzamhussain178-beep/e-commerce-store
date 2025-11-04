import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us - ZZQ Stores";
  }, []);

  const breadcrumbs = [
    { name: "Home", path: "/homepage" },
    { name: "About", path: "/about", current: true },
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <h1 className="text-4xl font-bold text-gray-900 font-inter mb-6">About ZZQ Stores</h1>
        <p className="text-gray-600 text-lg font-inter max-w-3xl">
          ZZQ Stores was founded with a single goal — to bring premium quality phone accessories that combine protection, functionality, and elegant design.
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/assets/images/logo.png"
            alt="ZZQ Logo"
            className="w-80 mx-auto"
          />
          <div className="space-y-4 text-gray-600">
            <p className="font-inter">
              We started as a small design team passionate about technology and craftsmanship. Today, ZZQ has grown into a trusted brand known for excellence, durability, and innovation.
            </p>
            <p className="font-inter">
              Every product undergoes rigorous testing to ensure it meets the highest standards of protection and comfort. Your satisfaction drives our continuous improvement.
            </p>
          </div>
        </div>
      </main>

      <TrustFooter />
    </div>
  );
};

const TrustFooter = ({}) => (
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

export default About;
