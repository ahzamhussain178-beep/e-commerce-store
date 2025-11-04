import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/Appimage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Premium Protection Meets Style",
      subtitle:
        "Discover cases that amplify your device's design while providing military-grade protection.",
      image: "/assets/images/iphone.jpg.jpg",
      alt: "Stylish smartphone with premium case",
      cta: "Shop Premium Cases",
      badge: "New Collection",
    },
    {
      id: 2,
      title: "Next-Gen Gaming Experience",
      subtitle:
        "Engineered for gamers — enhanced grip, cooling vents, and precision performance.",
      image: "/assets/images/onica.jpg.jpg",
      alt: "Gaming smartphone setup with RGB lighting",
      cta: "Explore Gaming Cases",
      badge: "Pro Series",
    },
    {
      id: 3,
      title: "Elegance for Professionals",
      subtitle:
        "Sophisticated designs that complement your lifestyle and device perfectly.",
      image: "/assets/images/leafs.jpg.jpg",
      alt: "Business smartphone in leather case",
      cta: "View Executive Line",
      badge: "Executive",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSlideChange = (index) => setCurrentSlide(index);
  const handleShopNow = () => navigate("/smart-shop");

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#330000] via-[#550000] to-[#220000] overflow-hidden">
      {/* 🔥 Floating Logo - use public path, do NOT import */}
      <div className="absolute top-6 right-6 z-20">
        <img
          src="/assets/images/logo.png"
          alt="ZZQ Logo"
          className="w-20 h-20 object-contain drop-shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/homepage")}
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220%200%2060%2060%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium">
              <Icon name="Zap" size={16} className="mr-2" />
              {heroSlides[currentSlide].badge}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground drop-shadow-lg">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleShopNow}
                className="bg-primary text-primary-foreground hover:bg-accent transform hover:scale-105 transition-all duration-300 shadow-brand-lg"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {heroSlides[currentSlide].cta}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/product-detail")}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                iconName="Play"
                iconPosition="left"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-sm text-gray-300">
                  Military Grade Protection
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={20} className="text-primary" />
                <span className="text-sm text-gray-300">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={20} className="text-primary" />
                <span className="text-sm text-gray-300">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right side - Image carousel */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-brand-xl">
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].alt}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute top-6 right-6 bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-brand">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="Star"
                    size={16}
                    className="text-yellow-500 fill-current"
                  />
                  <span className="text-sm font-semibold text-muted-foreground">
                    4.9/5
                  </span>
                  <span className="text-xs text-gray-600">(2.1k reviews)</span>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-card/40 hover:bg-card/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/60" />
      </div>
    </section>
  );
};

export default HeroSection;
