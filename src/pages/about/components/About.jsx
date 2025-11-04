import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#330000] via-[#550000] to-[#220000] text-white">
      <Navbar />

      <section className="flex-1 container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 text-primary-foreground">About ZZQ</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
          ZZQ is built to redefine smartphone protection — combining top-tier materials with elegant
          craftsmanship. We believe every phone deserves armor that feels as good as it looks.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-300">To create products that merge durability with aesthetic appeal.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-300">Protect every device with innovation, precision, and care.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
            <p className="text-gray-300">Quality you can trust. Style that stands out. Protection that lasts.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
