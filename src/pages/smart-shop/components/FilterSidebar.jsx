import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    device: true,
    protection: true,
    style: true,
    price: true,
    brand: true
  });

  const deviceOptions = [
    { value: 'iphone-15-pro', label: 'iPhone 15 Pro' },
    { value: 'iphone-15', label: 'iPhone 15' },
    { value: 'iphone-14-pro', label: 'iPhone 14 Pro' },
    { value: 'samsung-s24', label: 'Samsung Galaxy S24' },
    { value: 'samsung-s23', label: 'Samsung Galaxy S23' },
    { value: 'pixel-8', label: 'Google Pixel 8' }
  ];

  const protectionLevels = [
    { id: 'basic', label: 'Basic Protection', count: 45 },
    { id: 'military', label: 'Military Grade', count: 32 },
    { id: 'rugged', label: 'Rugged Defense', count: 28 },
    { id: 'waterproof', label: 'Waterproof', count: 15 }
  ];

  const styleCategories = [
    { id: 'professional', label: 'Professional', count: 38 },
    { id: 'gaming', label: 'Gaming', count: 22 },
    { id: 'outdoor', label: 'Outdoor', count: 19 },
    { id: 'fashion', label: 'Fashion-Forward', count: 41 },
    { id: 'minimalist', label: 'Minimalist', count: 35 }
  ];

  const priceRanges = [
    { id: 'under-25', label: 'Under $25', count: 67 },
    { id: '25-50', label: '$25 - $50', count: 89 },
    { id: '50-100', label: '$50 - $100', count: 45 },
    { id: 'over-100', label: 'Over $100', count: 23 }
  ];

  const brands = [
    { id: 'zzq', label: 'ZZQ Premium', count: 156 },
    { id: 'otterbox', label: 'OtterBox', count: 78 },
    { id: 'spigen', label: 'Spigen', count: 65 },
    { id: 'pelican', label: 'Pelican', count: 34 },
    { id: 'lifeproof', label: 'LifeProof', count: 28 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleCheckboxChange = (category, value, checked) => {
    const currentValues = filters?.[category] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    onFilterChange(category, newValues);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="font-semibold text-secondary font-inter">{title}</h3>
        <Icon 
          name={expandedSections?.[sectionKey] ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-text-secondary group-hover:text-primary transition-colors"
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="space-y-3 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-secondary font-inter">Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-primary"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Device Model */}
        <FilterSection title="Device Model" sectionKey="device">
          <Select
            placeholder="Select your device"
            options={deviceOptions}
            value={filters?.device || ''}
            onChange={(value) => onFilterChange('device', value)}
            searchable
            clearable
          />
        </FilterSection>

        {/* Protection Level */}
        <FilterSection title="Protection Level" sectionKey="protection">
          {protectionLevels?.map((level) => (
            <div key={level?.id} className="flex items-center justify-between">
              <Checkbox
                label={level?.label}
                checked={(filters?.protection || [])?.includes(level?.id)}
                onChange={(e) => handleCheckboxChange('protection', level?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({level?.count})</span>
            </div>
          ))}
        </FilterSection>

        {/* Style Category */}
        <FilterSection title="Style Category" sectionKey="style">
          {styleCategories?.map((style) => (
            <div key={style?.id} className="flex items-center justify-between">
              <Checkbox
                label={style?.label}
                checked={(filters?.style || [])?.includes(style?.id)}
                onChange={(e) => handleCheckboxChange('style', style?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({style?.count})</span>
            </div>
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          {priceRanges?.map((range) => (
            <div key={range?.id} className="flex items-center justify-between">
              <Checkbox
                label={range?.label}
                checked={(filters?.price || [])?.includes(range?.id)}
                onChange={(e) => handleCheckboxChange('price', range?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({range?.count})</span>
            </div>
          ))}
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brand" sectionKey="brand">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.label}
                checked={(filters?.brand || [])?.includes(brand?.id)}
                onChange={(e) => handleCheckboxChange('brand', brand?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({brand?.count})</span>
            </div>
          ))}
        </FilterSection>
      </div>

      {/* Apply Button (Mobile) */}
      <div className="p-6 border-t border-border md:hidden">
        <Button
          variant="default"
          fullWidth
          onClick={onClose}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-card border-r border-border">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute right-0 top-0 h-full w-80 bg-card shadow-brand-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;