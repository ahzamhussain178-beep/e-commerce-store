import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import TrendingProducts from './components/TrendingProducts';
import TrustSignals from './components/TrustSignals';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ZZQ Stores - Premium Phone Cases & Protection | Style Meets Function</title>
        <meta 
          name="description" 
          content="Discover premium phone cases that amplify your style while providing military-grade protection. Shop curated collections for Professional, Gaming, Outdoor, Fashion-Forward, and Minimalist lifestyles at ZZQ Stores." 
        />
        <meta name="keywords" content="phone cases, premium protection, mobile accessories, smartphone cases, wireless charging compatible, military grade protection, fashion phone cases" />
        <meta property="og:title" content="ZZQ Stores - Premium Phone Cases & Protection" />
        <meta property="og:description" content="Where function meets fashion. Premium phone protection that amplifies your device's design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zzqstores.com" />
        <link rel="canonical" href="https://zzqstores.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Navigation */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Collections */}
          <FeaturedCollections />

          {/* Trending Products */}
          <TrendingProducts />

          {/* Trust Signals & Social Proof */}
          <TrustSignals />

          {/* Newsletter Signup */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;