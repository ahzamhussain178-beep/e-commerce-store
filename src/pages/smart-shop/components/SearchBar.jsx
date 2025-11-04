import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const recentSearches = [
    "iPhone 15 Pro cases",
    "Military grade protection",
    "Wireless charging compatible",
    "Samsung Galaxy S24"
  ];

  const popularSearches = [
    "Clear cases",
    "Leather cases",
    "Gaming cases",
    "Waterproof cases",
    "Minimalist design",
    "Professional cases"
  ];

  const quickSuggestions = [
    { text: "iPhone 15 Pro Max", category: "Device" },
    { text: "Military Grade Protection", category: "Protection Level" },
    { text: "Professional Style", category: "Style" },
    { text: "Wireless Charging", category: "Feature" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef?.current && !inputRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={inputRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search for cases, brands, or device models..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={handleInputFocus}
            className={`w-full pl-12 pr-12 py-4 bg-background border border-border rounded-lg font-inter transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              isExpanded ? 'shadow-brand-lg' : 'shadow-brand'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                inputRef?.current?.querySelector('input')?.focus();
              }}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
          >
            <Icon name="Search" size={20} />
          </button>
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-xl z-50 animate-slide-up">
          <div className="p-4">
            {/* Quick Suggestions */}
            {searchQuery?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-secondary mb-2 font-inter">Suggestions</h4>
                <div className="space-y-2">
                  {quickSuggestions?.filter(item => item?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.slice(0, 4)?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion?.text)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Search" size={16} className="text-text-secondary" />
                        <span className="text-sm text-secondary font-inter">{suggestion?.text}</span>
                      </div>
                      <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                        {suggestion?.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {searchQuery?.length === 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary font-inter">Recent Searches</h4>
                  <button className="text-xs text-text-secondary hover:text-primary transition-colors">
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-sm text-secondary font-inter">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {searchQuery?.length === 0 && (
              <div>
                <h4 className="text-sm font-medium text-secondary mb-2 font-inter">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="text-xs bg-muted text-text-secondary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;