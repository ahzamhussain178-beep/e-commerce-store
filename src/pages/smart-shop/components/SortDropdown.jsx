import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'name', label: 'Name A-Z', icon: 'AlphabeticalOrder' }
  ];

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[180px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentSortOption?.icon} size={16} />
          <span className="font-inter">Sort: {currentSortOption?.label}</span>
        </div>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="ml-2"
        />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-brand-lg z-50 animate-slide-up">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-border">
              <h4 className="text-sm font-medium text-secondary font-inter">Sort Options</h4>
            </div>
            <div className="py-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors duration-200 ${
                    currentSort === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={currentSort === option?.value ? 'text-primary-foreground' : 'text-text-secondary'}
                  />
                  <span className="font-inter">{option?.label}</span>
                  {currentSort === option?.value && (
                    <Icon name="Check" size={16} className="ml-auto text-primary-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;