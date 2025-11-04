import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/Appimage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedCollections = () => {
  const navigate = useNavigate();

  const collections = [
  {
    id: 1,
    name: "Professional",
    description: "Sophisticated cases for the modern workplace",
    image: "https://images.unsplash.com/photo-1670885725484-99a856175c1e",
    alt: "Professional businessman in suit holding smartphone with elegant black leather protective case",
    itemCount: 24,
    startingPrice: 49.99,
    badge: "Best Seller",
    color: "from-gray-800 to-gray-900"
  },
  {
    id: 2,
    name: "Gaming",
    description: "Enhanced performance for mobile gaming",
    image: "https://images.unsplash.com/photo-1683891324706-8257193d00da",
    alt: "Gaming smartphone with specialized protective case featuring RGB lighting and cooling vents",
    itemCount: 18,
    startingPrice: 59.99,
    badge: "Pro Series",
    color: "from-purple-800 to-blue-900"
  },
  {
    id: 3,
    name: "Outdoor",
    description: "Rugged protection for adventure seekers",
    image: "https://images.unsplash.com/photo-1547091267-35cfac0e8f76",
    alt: "Rugged smartphone case with reinforced corners and waterproof design in outdoor mountain setting",
    itemCount: 15,
    startingPrice: 69.99,
    badge: "Military Grade",
    color: "from-green-800 to-teal-900"
  },
  {
    id: 4,
    name: "Fashion-Forward",
    description: "Trendy designs that make a statement",
    image: "https://images.unsplash.com/photo-1643969777950-e6129e2608d9",
    alt: "Stylish woman holding smartphone with fashionable rose gold protective case with geometric patterns",
    itemCount: 32,
    startingPrice: 39.99,
    badge: "Trending",
    color: "from-pink-800 to-rose-900"
  },
  {
    id: 5,
    name: "Minimalist",
    description: "Clean, simple designs for purists",
    image: "https://images.unsplash.com/photo-1676300463288-0a1183aef2fa",
    alt: "Minimalist clear smartphone case on clean white surface with subtle shadow and modern aesthetic",
    itemCount: 21,
    startingPrice: 29.99,
    badge: "Essential",
    color: "from-gray-600 to-gray-800"
  },
  {
    id: 6,
    name: "Luxury",
    description: "Premium materials and craftsmanship",
    image: "https://images.unsplash.com/photo-1532969746358-05be64a8ab4f",
    alt: "Luxury smartphone case made from premium leather with gold accents on marble surface",
    itemCount: 12,
    startingPrice: 99.99,
    badge: "Exclusive",
    color: "from-yellow-800 to-amber-900"
  }];


  const handleExploreCollection = (collectionName) => {
    navigate('/smart-shop', { state: { collection: collectionName } });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <Icon name="Layers" size={16} className="mr-2" />
            Featured Collections
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Find Your Perfect Style
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections designed for every lifestyle. From professional elegance to rugged adventure protection, we have the perfect case for your needs.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections?.map((collection) =>
          <div
            key={collection?.id}
            className="group relative bg-card rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 transform hover:-translate-y-2">

              {/* Collection Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                src={collection?.image}
                alt={collection?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${collection?.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {collection?.badge}
                </div>

                {/* Item Count */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                  {collection?.itemCount} items
                </div>

                {/* Collection Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{collection?.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{collection?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-white/80">Starting at </span>
                      <span className="font-bold text-lg">${collection?.startingPrice}</span>
                    </div>
                    
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExploreCollection(collection?.name)}
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    iconName="ArrowRight"
                    iconPosition="right">

                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Collections CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/smart-shop')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="Grid3X3"
            iconPosition="left">

            View All Collections
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedCollections;