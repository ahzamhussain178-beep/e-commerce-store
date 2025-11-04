import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#330000] via-[#550000] to-[#220000] text-white">
      <Navbar />

      <section className="flex-1 container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary-foreground">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions? We’d love to hear from you. Drop us a message and our support team will get back shortly.
          </p>
        </div>

        <form className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input type="text" className="w-full p-3 rounded-lg bg-white/20 text-white outline-none" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input type="email" className="w-full p-3 rounded-lg bg-white/20 text-white outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea rows="5" className="w-full p-3 rounded-lg bg-white/20 text-white outline-none" placeholder="Type your message..."></textarea>
          </div>
          <Button variant="default" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent transition-all">
            Send Message
          </Button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
