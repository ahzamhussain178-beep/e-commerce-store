import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: 'black', name: 'Midnight Black', hex: '#000000' },
    { id: 'red', name: 'Crimson Red', hex: '#E63946' },
    { id: 'blue', name: 'Ocean Blue', hex: '#1E40AF' },
    { id: 'clear', name: 'Crystal Clear', hex: 'transparent', border: true }
  ];

  const features = [
    { icon: 'Shield', text: 'Military-grade drop protection' },
    { icon: 'Smartphone', text: 'Wireless charging compatible' },
    { icon: 'Camera', text: 'Raised camera lip protection' },
    { icon: 'Zap', text: 'Anti-fingerprint coating' }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium font-inter">
            BESTSELLER
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium font-inter">
            IN STOCK
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 font-inter mb-2">
          {product?.name}
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600 font-inter ml-2">4.8 (2,847 reviews)</span>
          </div>
          <button className="text-sm text-primary hover:underline font-inter">
            Read reviews
          </button>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900 font-inter">${product?.price}</span>
        <span className="text-lg text-gray-500 line-through font-inter">${product?.originalPrice}</span>
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium font-inter">
          Save ${product?.originalPrice - product?.price}
        </span>
      </div>
      {/* Color Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 font-inter">
          Color: {colors?.find(c => c?.id === selectedColor)?.name}
        </h3>
        <div className="flex space-x-3">
          {colors?.map((color) => (
            <button
              key={color?.id}
              onClick={() => setSelectedColor(color?.id)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color?.id
                  ? 'border-primary shadow-brand scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              } ${color?.border ? 'border-gray-400' : ''}`}
              style={{
                backgroundColor: color?.hex === 'transparent' ? 'white' : color?.hex,
                border: color?.border ? '2px solid #9CA3AF' : undefined
              }}
            >
              {selectedColor === color?.id && (
                <Icon name="Check" size={16} className="text-white mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Key Features */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 font-inter">Key Features</h3>
        <div className="grid grid-cols-2 gap-3">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
              <span className="text-sm text-gray-700 font-inter">{feature?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Compatibility */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CheckCircle" size={16} className="text-blue-600" />
          <span className="font-semibold text-blue-900 font-inter">Compatible with iPhone 15 Pro</span>
        </div>
        <p className="text-sm text-blue-700 font-inter">
          Perfectly designed for your device with precise cutouts for all ports and buttons.
        </p>
      </div>
      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
              disabled={quantity <= 1}
            >
              <Icon name="Minus" size={16} className="text-gray-600" />
            </button>
            <span className="px-4 py-2 font-medium font-inter">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
              disabled={quantity >= 10}
            >
              <Icon name="Plus" size={16} className="text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={onAddToWishlist}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Icon name="Heart" size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={() => onAddToCart(quantity, selectedColor)}
            className="flex-1"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          
          <Button variant="outline" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} className="text-green-600" />
          <span className="text-sm text-gray-700 font-inter">Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={16} className="text-blue-600" />
          <span className="text-sm text-gray-700 font-inter">30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-purple-600" />
          <span className="text-sm text-gray-700 font-inter">2-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;