import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Icon from "../components/AppIcon";

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#330000] via-[#550000] to-[#220000] text-white">
      <Navbar />

      <section className="flex-1 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-primary-foreground">Help Center</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We're here to assist you. Browse our FAQs, get in touch, or track your orders with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:bg-white/20 transition">
            <Icon name="HelpCircle" size={40} className="text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">FAQs</h3>
            <p className="text-gray-300 mb-4">
              Find quick answers to your most common questions about orders, returns, and shipping.
            </p>
            <Button variant="default" onClick={() => window.location.href = "/faq"}>View FAQs</Button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:bg-white/20 transition">
            <Icon name="MessageCircle" size={40} className="text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Contact Support</h3>
            <p className="text-gray-300 mb-4">
              Need personal help? Reach out to our team via chat, email, or social media.
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/contact"}>Get Help</Button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:bg-white/20 transition">
            <Icon name="Truck" size={40} className="text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Track Orders</h3>
            <p className="text-gray-300 mb-4">
              Stay updated on your delivery status and manage your orders effortlessly.
            </p>
            <Button variant="default" onClick={() => window.location.href = "/track-order"}>Track Now</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
