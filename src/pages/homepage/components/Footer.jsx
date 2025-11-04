import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    shop: [
      { name: 'All Cases', path: '/smart-shop' },
      { name: 'Professional', path: '/smart-shop?category=professional' },
      { name: 'Gaming', path: '/smart-shop?category=gaming' },
      { name: 'Outdoor', path: '/smart-shop?category=outdoor' },
      { name: 'Fashion', path: '/smart-shop?category=fashion' },
      { name: 'Minimalist', path: '/smart-shop?category=minimalist' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Warranty', path: '/warranty' },
      { name: 'Size Guide', path: '/size-guide' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' },
      { name: 'Partners', path: '/partners' },
      { name: 'Investors', path: '/investors' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
      { name: 'Sitemap', path: '/sitemap' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/zzqstores' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/zzqstores' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/zzqstores' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/zzqstores' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/zzqstores' }
  ];

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <span className="text-xl font-bold">ZZQ Stores</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Premium phone protection that enhances your device's style. Where function meets fashion.
              </p>
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                {footerLinks?.shop?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks?.support?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks?.company?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks?.legal?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on new products, exclusive offers, and protection tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date()?.getFullYear()} ZZQ Stores. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={16} />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={16} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;