import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Smart Shop', path: '/smart-shop', icon: 'Store' },
    { name: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' },
    { name: 'Dashboard', path: '/user-dashboard', icon: 'User' },
  ];

  const moreItems = [
    { name: 'Admin', path: '/admin-dashboard', icon: 'Settings' },
  ];

  const { user, logout } = useAuth() || {};
  const { theme, toggle, isTransitioning } = useTheme() || {};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // consider routes that start with the path (so `/product/1` highlights `/product`)
  const isActivePath = (path) => {
    try {
      const current = location?.pathname || '';
      return path === '/' ? current === '/' : current.startsWith(path);
    } catch (e) {
      return false;
    }
  };

  // ✅ Accessible Logo: rendered as a button so it's keyboard-focusable
  const Logo = () => (
    <button
      type="button"
      onClick={() => {
        // smooth scroll to top then navigate
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => handleNavigation('/homepage'), 220);
      }}
      className="h-12 w-auto cursor-pointer select-none p-0 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary rounded"
      aria-label="Go to homepage"
      title="Go to homepage"
    >
      <img
        src="/assets/images/logo.png"
        alt="ZZQ Stores"
        className="h-12 w-auto object-contain pointer-events-none transform transition-all duration-200 hover:scale-105 hover:shadow-brand-lg"
        loading="lazy"
        draggable="false"
      />
    </button>
  );


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-brand border-b border-border'
          : 'bg-background'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium font-inter transition-all duration-200 flex items-center space-x-2 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-brand-red'
                    : 'text-text-primary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium font-inter text-text-primary hover:text-primary hover:bg-muted transition-all duration-200 flex items-center space-x-2">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <div className="py-2">
                  {moreItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full px-4 py-2 text-left text-sm font-inter transition-colors duration-200 flex items-center space-x-3 ${
                        isActivePath(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right side (logo + controls) */}
          <div className="absolute top-3 right-4 flex items-center space-x-3">
            <div className="hidden sm:block">
              <Button variant="ghost" size="icon" onClick={toggle} title="Toggle theme">
                <Icon name={theme === 'dark' ? 'Moon' : 'Sun'} size={18} />
              </Button>
            </div>

            {user ? (
              <div className="hidden md:flex items-center space-x-3 relative">
                <div className="text-sm text-text-secondary">{user.email}</div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="px-3 py-2 rounded-md border border-border bg-popover text-popover-foreground"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <Icon name="User" size={16} />
                  </button>

                  <div className={`absolute right-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-brand-lg ${userMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="py-3 px-3 space-y-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          navigate('/user-dashboard');
                          setUserMenuOpen(false);
                        }}
                      >
                        Profile
                      </Button>

                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          navigate('/homepage');
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="ml-2">
              <Logo />
            </div>
          </div>
          {isTransitioning && (
            <div className="fixed inset-0 pointer-events-none transition-opacity duration-300 bg-background/70" />
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="py-4 space-y-2">
              {[...navigationItems, ...moreItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full px-4 py-3 text-left rounded-lg font-inter transition-all duration-200 flex items-center space-x-3 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-brand-red'
                      : 'text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;