import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StyleCollections = () => {
  const navigate = useNavigate();

  const collections = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Sophisticated cases for business environments',
    image: "https://images.unsplash.com/photo-1727418826230-26601ca0efd9",
    imageAlt: 'Professional businessman in navy suit holding sleek black phone case in modern office setting',
    productCount: 38,
    color: 'from-gray-900 to-gray-700',
    icon: 'Briefcase'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Performance cases with enhanced grip and cooling',
    image: "https://images.unsplash.com/photo-1683891324706-8257193d00da",
    imageAlt: 'Gaming setup with RGB lighting and specialized phone case with cooling vents and textured grip',
    productCount: 22,
    color: 'from-purple-600 to-blue-600',
    icon: 'Gamepad2'
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    description: 'Rugged protection for adventure enthusiasts',
    image: "https://images.unsplash.com/photo-1596838232468-c5b74f6e8953",
    imageAlt: 'Hiker with rugged waterproof phone case attached to backpack in mountain wilderness setting',
    productCount: 19,
    color: 'from-green-600 to-emerald-600',
    icon: 'Mountain'
  },
  {
    id: 'fashion',
    name: 'Fashion-Forward',
    description: 'Trendy designs that make a statement',
    image: "https://images.unsplash.com/photo-1577954732026-2071521acdfb",
    imageAlt: 'Fashion model in colorful outfit holding designer phone case with geometric patterns and metallic accents',
    productCount: 41,
    color: 'from-pink-500 to-rose-500',
    icon: 'Sparkles'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple designs for purists',
    image: "https://images.unsplash.com/photo-1669699872550-a47782e7acfb",
    imageAlt: 'Clean white desk with minimalist clear phone case next to modern laptop in bright natural lighting',
    productCount: 35,
    color: 'from-slate-600 to-gray-600',
    icon: 'Minus'
  }];


  const handleCollectionClick = (collection) => {
    navigate('/smart-shop', {
      state: {
        filters: { style: [collection?.id] },
        searchQuery: collection?.name
      }
    });
  };

  return (
    <section className="py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4 font-inter">
            Shop by Style
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover curated collections designed for your lifestyle. From professional elegance to rugged adventure gear.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {collections?.map((collection) =>
          <div
            key={collection?.id}
            className="group relative overflow-hidden rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCollectionClick(collection)}>

              {/* Background Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                src={collection?.image}
                alt={collection?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

              </div>

              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${collection?.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Icon */}
                  <div className="mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon name={collection?.icon} size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Collection Info */}
                  <h3 className="text-xl font-bold mb-2 font-inter">
                    {collection?.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {collection?.description}
                  </p>
                  
                  {/* Product Count & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {collection?.productCount} products
                    </span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <span className="text-sm font-medium">Explore</span>
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Collections Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/smart-shop')}
            iconName="Grid3x3"
            iconPosition="left"
            className="bg-background">

            View All Collections
          </Button>
        </div>
      </div>
    </section>);

};

export default StyleCollections;