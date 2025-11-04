import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import RequireAuth from './components/RequireAuth';

// 🔹 Main Pages
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import SmartShop from "./pages/smart-shop";
import ProductDetail from "./pages/product-detail";
import ShoppingCart from "./pages/shopping-cart";
import Checkout from './pages/checkout';
import OrderConfirmation from './pages/order-confirmation';

// 🔹 Dashboards
import AdminDashboard from "./pages/admin-dashboard";
import UserDashboard from "./pages/users-dashboard";

// 🔹 Informational Pages (matching lowercase folder names)
import HelpCenter from "./pages/help";
import About from "./pages/about";
import Contact from "./pages/contact";
import StaticPage from './pages/StaticPage';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Returns from './pages/returns';

// 🔹 Fallback
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
  <AuthProvider>
  <ThemeProvider>
        <ScrollToTop />
        
        <RouterRoutes>
          {/* 🏠 Main Pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/smart-shop" element={<SmartShop />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* 👥 Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <RequireAuth requireAdmin>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* 🧭 Informational Pages */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Footer extra pages */}
          <Route path="/shipping" element={<StaticPage title="Shipping Information">We offer free and expedited shipping options. Delivery times vary by region.</StaticPage>} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/warranty" element={<StaticPage title="Warranty">ZZQ Stores offers a 2-year warranty on most products. Details and exclusions listed here.</StaticPage>} />
          <Route path="/size-guide" element={<StaticPage title="Size Guide">Find the right fit for your device with our size guide and compatibility charts.</StaticPage>} />
          <Route path="/careers" element={<StaticPage title="Careers">Explore open roles and join our growing team.</StaticPage>} />
          <Route path="/press" element={<StaticPage title="Press">Press releases and media resources for ZZQ Stores.</StaticPage>} />
          <Route path="/blog" element={<StaticPage title="Blog">Latest news, product releases, and stories from the team.</StaticPage>} />
          <Route path="/partners" element={<StaticPage title="Partners">Information about our retail and manufacturing partners.</StaticPage>} />
          <Route path="/investors" element={<StaticPage title="Investors">Investor relations and financial information.</StaticPage>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<StaticPage title="Cookie Policy">How we use cookies and how to control them.</StaticPage>} />
          <Route path="/accessibility" element={<StaticPage title="Accessibility">Accessibility statement and resources.</StaticPage>} />
          <Route path="/sitemap" element={<StaticPage title="Sitemap">Quick links to all important pages on the site.</StaticPage>} />

          {/* ❌ 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
  </ThemeProvider>
  </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
