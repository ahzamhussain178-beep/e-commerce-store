import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import StyleCollections from './components/StyleCollections';
import ProductGrid from './components/ProductGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SmartShop = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(true);

  // Mock product data
  const mockProducts = [
  {
    id: 1,
    name: "ZZQ Professional Leather Case",
    brand: "ZZQ Premium",
    category: "Professional",
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    rating: 4.8,
    reviewCount: 234,
    image: "https://images.unsplash.com/flagged/photo-1565366315292-15edf8d9509a",
    imageAlt: "Premium black leather phone case with gold accents on marble surface in professional office lighting",
    compatibility: "iPhone 15 Pro, iPhone 15 Pro Max",
    features: ["Genuine Leather", "Wireless Charging", "Card Slots", "Drop Protection"],
    colors: ["Black", "Brown", "Navy"],
    stock: 15,
    isNew: false,
    isBestseller: true,
    description: "Crafted from premium genuine leather with precision stitching and reinforced corners for ultimate protection and style.",
    gallery: [
    "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    "https://images.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg"]

  },
  {
    id: 2,
    name: "Military Grade Rugged Defender",
    brand: "ZZQ Premium",
    category: "Outdoor",
    price: 124.99,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1625465329894-9cfaf8a63332",
    imageAlt: "Heavy-duty military grade phone case with reinforced corners and shock-absorbing materials in tactical black finish",
    compatibility: "Samsung Galaxy S24, S24+, S24 Ultra",
    features: ["Military Grade", "Waterproof", "Shock Resistant", "Belt Clip"],
    colors: ["Black", "Olive", "Desert"],
    stock: 8,
    isNew: true,
    isBestseller: false,
    description: "Military-grade protection meets everyday functionality with IP68 waterproof rating and 15ft drop protection.",
    gallery: [
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37",
    "https://images.unsplash.com/photo-1583897679617-eadb4d15c6bb"]

  },
  {
    id: 3,
    name: "Crystal Clear Minimalist",
    brand: "ZZQ Premium",
    category: "Minimalist",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.6,
    reviewCount: 456,
    image: "https://images.unsplash.com/photo-1662348317959-6f3fd13fd0d2",
    imageAlt: "Ultra-clear transparent phone case showcasing phone design with minimal bezels on clean white background",
    compatibility: "iPhone 15, iPhone 14, iPhone 13",
    features: ["Crystal Clear", "Anti-Yellow", "Wireless Charging", "Slim Profile"],
    colors: ["Clear", "Frost"],
    stock: 25,
    isNew: false,
    isBestseller: true,
    description: "Ultra-clear protection that showcases your phone's original design while providing reliable drop protection.",
    gallery: [
    "https://images.pixabay.com/photo/2017/01/13/01/22/mobile-phone-1976684_1280.jpg"]

  },
  {
    id: 4,
    name: "Gaming Pro RGB Case",
    brand: "ZZQ Premium",
    category: "Gaming",
    price: 159.99,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewCount: 123,
    image: "https://images.unsplash.com/photo-1655796043542-0044be7f870d",
    imageAlt: "Gaming phone case with RGB lighting strips and cooling vents in dark gaming setup with colorful backlighting",
    compatibility: "ROG Phone 7, RedMagic 8 Pro",
    features: ["RGB Lighting", "Cooling Vents", "Gaming Triggers", "Anti-Slip Grip"],
    colors: ["Black", "Red", "Blue"],
    stock: 12,
    isNew: true,
    isBestseller: false,
    description: "Ultimate gaming protection with customizable RGB lighting and advanced cooling technology for peak performance.",
    gallery: [
    "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg"]

  },
  {
    id: 5,
    name: "Fashion Forward Marble",
    brand: "ZZQ Premium",
    category: "Fashion-Forward",
    price: 67.99,
    originalPrice: 79.99,
    discount: 15,
    rating: 4.5,
    reviewCount: 298,
    image: "https://images.unsplash.com/photo-1592535557118-fc979e971bcf",
    imageAlt: "Elegant marble pattern phone case with gold veining and metallic accents displayed on luxury fashion accessories",
    compatibility: "iPhone 15 Pro, Samsung Galaxy S24",
    features: ["Marble Design", "Metallic Accents", "Scratch Resistant", "Grip Ring"],
    colors: ["White Marble", "Black Marble", "Rose Gold"],
    stock: 18,
    isNew: false,
    isBestseller: true,
    description: "Sophisticated marble design with metallic accents that transforms your phone into a fashion statement.",
    gallery: [
    "https://images.unsplash.com/photo-1556656793-08538906a9f8"]

  },
  {
    id: 6,
    name: "Executive Business Elite",
    brand: "ZZQ Premium",
    category: "Professional",
    price: 199.99,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewCount: 87,
    image: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg",
    imageAlt: "Luxury executive phone case in premium black leather with gold hardware on mahogany desk in corporate boardroom",
    compatibility: "iPhone 15 Pro Max, Samsung Galaxy S24 Ultra",
    features: ["Premium Leather", "Card Wallet", "Stand Function", "Magnetic Closure"],
    colors: ["Black", "Cognac", "Navy"],
    stock: 6,
    isNew: true,
    isBestseller: false,
    description: "Executive-grade protection with premium materials and sophisticated design for the discerning professional.",
    gallery: [
    "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg"]

  }];


  // Initialize from location state if available
  useEffect(() => {
    if (location?.state) {
      if (location?.state?.filters) {
        setFilters(location?.state?.filters);
        setShowCollections(false);
      }
      if (location?.state?.searchQuery) {
        setSearchQuery(location?.state?.searchQuery);
        setShowCollections(false);
      }
    }
  }, [location?.state]);

  // Simulate API call for products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      let filteredProducts = [...mockProducts];

      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts?.filter((product) =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.features?.some((feature) =>
        feature?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
        );
      }

      // Apply filters
      Object.entries(filters)?.forEach(([key, values]) => {
        if (values && values?.length > 0) {
          switch (key) {
            case 'device':
              filteredProducts = filteredProducts?.filter((product) =>
              product?.compatibility?.toLowerCase()?.includes(values?.toLowerCase())
              );
              break;
            case 'protection':
              filteredProducts = filteredProducts?.filter((product) =>
              values?.some((value) =>
              product?.features?.some((feature) =>
              feature?.toLowerCase()?.includes(value?.replace('-', ' '))
              )
              )
              );
              break;
            case 'style':
              filteredProducts = filteredProducts?.filter((product) =>
              values?.some((value) =>
              product?.category?.toLowerCase()?.includes(value?.replace('-', ' '))
              )
              );
              break;
            case 'price':
              filteredProducts = filteredProducts?.filter((product) => {
                return values?.some((range) => {
                  switch (range) {
                    case 'under-25':return product?.price < 25;
                    case '25-50':return product?.price >= 25 && product?.price <= 50;
                    case '50-100':return product?.price >= 50 && product?.price <= 100;
                    case 'over-100':return product?.price > 100;
                    default:return true;
                  }
                });
              });
              break;
            case 'brand':
              filteredProducts = filteredProducts?.filter((product) =>
              values?.some((brand) =>
              product?.brand?.toLowerCase()?.includes(brand?.replace('-', ' '))
              )
              );
              break;
          }
        }
      });

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filteredProducts?.sort((a, b) => a?.price - b?.price);
          break;
        case 'price-high':
          filteredProducts?.sort((a, b) => b?.price - a?.price);
          break;
        case 'rating':
          filteredProducts?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'popularity':
          filteredProducts?.sort((a, b) => b?.reviewCount - a?.reviewCount);
          break;
        case 'newest':
          filteredProducts?.sort((a, b) => b?.isNew - a?.isNew);
          break;
        case 'name':
          filteredProducts?.sort((a, b) => a?.name?.localeCompare(b?.name));
          break;
        default:
          // Relevance - bestsellers first, then by rating
          filteredProducts?.sort((a, b) => {
            if (a?.isBestseller && !b?.isBestseller) return -1;
            if (!a?.isBestseller && b?.isBestseller) return 1;
            return b?.rating - a?.rating;
          });
      }

      setProducts(filteredProducts);
      setHasMore(false); // For demo, we're showing all products at once
      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery, filters, sortBy]);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value
    }));
    setCurrentPage(1);
    setShowCollections(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
    setShowCollections(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setShowCollections(false);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleAddToCart = (product) => {
  // Get existing cart from localStorage (unified key: zzq_cart)
  const existingCart = JSON.parse(localStorage.getItem('zzq_cart') || '[]');

    // Check if product already exists in cart
    const existingItemIndex = existingCart?.findIndex((item) =>
    item?.id === product?.id &&
    item?.selectedColor === product?.selectedColor
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += product?.quantity || 1;
    } else {
      // Add new item to cart
      existingCart?.push({
        ...product,
        quantity: product?.quantity || 1,
        addedAt: new Date()?.toISOString()
      });
    }

  // Save updated cart to localStorage
  localStorage.setItem('zzq_cart', JSON.stringify(existingCart));

    // Show success feedback (in a real app, this would be a toast notification)
    console.log('Product added to cart:', product);
  };

  const activeFiltersCount = Object.values(filters)?.reduce((count, filterValues) => {
    if (Array.isArray(filterValues)) {
      return count + filterValues?.length;
    }
    return filterValues ? count + 1 : count;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Search */}
        <section className="bg-gradient-brand text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-inter">
              Smart Product Discovery
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Find the perfect protection for your device with our advanced filtering and intelligent search
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearch={handleSearch} />

            </div>
          </div>
        </section>

        {/* Style Collections (shown when no active search/filters) */}
        {showCollections &&
        <StyleCollections />
        }

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              {/* Filter Sidebar */}
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)} />


              {/* Main Content Area */}
              <div className="flex-1 md:ml-8">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
                  {/* Results Info & Mobile Filter Button */}
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="md:hidden"
                      iconName="Filter"
                      iconPosition="left">

                      Filters
                      {activeFiltersCount > 0 &&
                      <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {activeFiltersCount}
                        </span>
                      }
                    </Button>
                    
                    <div className="text-sm text-text-secondary">
                      {loading ? 'Searching...' : `${products?.length} products found`}
                      {(searchQuery || activeFiltersCount > 0) &&
                      <button
                        onClick={handleClearFilters}
                        className="ml-2 text-primary hover:underline">

                          Clear all
                        </button>
                      }
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown
                    currentSort={sortBy}
                    onSortChange={handleSortChange} />

                </div>

                {/* Active Filters Display */}
                {(searchQuery || activeFiltersCount > 0) &&
                <div className="mb-6 p-4 bg-muted rounded-lg">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-secondary">Active filters:</span>
                      
                      {searchQuery &&
                    <span className="inline-flex items-center space-x-1 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                          <Icon name="Search" size={12} />
                          <span>"{searchQuery}"</span>
                          <button
                        onClick={() => setSearchQuery('')}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5">

                            <Icon name="X" size={12} />
                          </button>
                        </span>
                    }
                      
                      {Object.entries(filters)?.map(([category, values]) => {
                      if (!values || Array.isArray(values) && values?.length === 0) return null;

                      const displayValues = Array.isArray(values) ? values : [values];
                      return displayValues?.map((value, index) =>
                      <span
                        key={`${category}-${index}`}
                        className="inline-flex items-center space-x-1 bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full">

                            <span>{value?.replace('-', ' ')}</span>
                            <button
                          onClick={() => {
                            if (Array.isArray(values)) {
                              const newValues = values?.filter((v) => v !== value);
                              handleFilterChange(category, newValues);
                            } else {
                              handleFilterChange(category, '');
                            }
                          }}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5">

                              <Icon name="X" size={12} />
                            </button>
                          </span>
                      );
                    })}
                    </div>
                  </div>
                }

                {/* Product Grid */}
                <ProductGrid
                  products={products}
                  loading={loading}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                  onAddToCart={handleAddToCart} />

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>);

};

export default SmartShop;