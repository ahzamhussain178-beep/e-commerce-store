import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
  {
    url: "https://images.unsplash.com/photo-1680268101608-a2edbc3291f8",
    alt: "Black premium phone case with textured grip pattern on white background"
  },
  {
    url: "https://images.unsplash.com/photo-1669914077161-e20aaafe267b",
    alt: "Side view of black phone case showing raised edges and camera protection"
  },
  {
    url: "https://images.unsplash.com/photo-1597646053494-71809e4b147f",
    alt: "Back view of phone case displaying brand logo and premium finish"
  },
  {
    url: "https://images.unsplash.com/photo-1625465329894-9cfaf8a63332",
    alt: "Phone case installed on device showing perfect fit and button alignment"
  }];


  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
    prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
    prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
        <Image
          src={images?.[selectedImageIndex]?.url}
          alt={images?.[selectedImageIndex]?.alt}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
          isZoomed ? 'scale-150' : 'scale-100'}`
          }
          onClick={() => setIsZoomed(!isZoomed)} />

        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-brand transition-all duration-200">

          <Icon name="ChevronLeft" size={20} className="text-gray-700" />
        </button>
        
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-brand transition-all duration-200">

          <Icon name="ChevronRight" size={20} className="text-gray-700" />
        </button>

        {/* Zoom Indicator */}
        {isZoomed &&
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-inter">
            Click to zoom out
          </div>
        }

        {/* 360° View Badge */}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium font-inter flex items-center space-x-1">
          <Icon name="RotateCcw" size={14} />
          <span>360° View</span>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {images?.map((image, index) =>
        <button
          key={index}
          onClick={() => setSelectedImageIndex(index)}
          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
          selectedImageIndex === index ?
          'border-primary shadow-brand' :
          'border-gray-200 hover:border-gray-300'}`
          }>

            <Image
            src={image?.url}
            alt={image?.alt}
            className="w-full h-full object-cover" />

          </button>
        )}
      </div>
      {/* Video Demo Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 font-inter">Protection Demo</h3>
          <Icon name="Play" size={20} className="text-primary" />
        </div>
        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors duration-200">
          <div className="text-center">
            <Icon name="PlayCircle" size={32} className="text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-inter">Watch Drop Test Video</p>
          </div>
        </div>
      </div>
    </div>);

};

export default ProductImageGallery;