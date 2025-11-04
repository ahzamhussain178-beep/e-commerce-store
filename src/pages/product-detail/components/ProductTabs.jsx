import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
  { id: 'description', label: 'Description', icon: 'FileText' },
  { id: 'specifications', label: 'Specifications', icon: 'Settings' },
  { id: 'reviews', label: 'Reviews (2,847)', icon: 'Star' },
  { id: 'qa', label: 'Q&A (156)', icon: 'MessageCircle' }];


  const specifications = [
  { label: 'Material', value: 'Premium TPU + PC' },
  { label: 'Drop Protection', value: 'Up to 12 feet (3.6m)' },
  { label: 'Weight', value: '45g' },
  { label: 'Thickness', value: '2.5mm' },
  { label: 'Wireless Charging', value: 'Compatible' },
  { label: 'Screen Protection', value: 'Raised edges 1.2mm' },
  { label: 'Camera Protection', value: 'Raised lip 1.5mm' },
  { label: 'Certification', value: 'MIL-STD-810G' }];


  const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1633355030475-8195b84873ff",
    avatarAlt: "Professional headshot of blonde woman in white blouse smiling",
    rating: 5,
    date: "2025-10-15",
    title: "Perfect protection and style!",
    content: `I've been using this case for 3 months now and it's exceeded my expectations. The grip is excellent and I've dropped my phone several times with zero damage. The wireless charging works perfectly and the buttons are very responsive.`,
    helpful: 24,
    images: [
    {
      url: "https://images.unsplash.com/photo-1637906270383-d248d00220b5",
      alt: "Customer photo showing phone case in daily use on desk"
    }]

  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
    avatarAlt: "Professional headshot of Asian man with glasses in navy shirt",
    rating: 4,
    date: "2025-10-12",
    title: "Great quality, minor color difference",
    content: `The case quality is outstanding and the protection is top-notch. Only minor issue is the black color is slightly different from the photos - it's more of a dark gray. Still very happy with the purchase.`,
    helpful: 18
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1571303079587-12bcda85c14e",
    avatarAlt: "Professional headshot of Hispanic woman with dark hair in red top",
    rating: 5,
    date: "2025-10-10",
    title: "Survived multiple drops!",
    content: `This case has saved my phone so many times! I work in construction and my phone gets dropped frequently. Not a single crack or damage. Highly recommend for anyone with an active lifestyle.`,
    helpful: 31
  }];


  const qaItems = [
  {
    id: 1,
    question: "Does this case work with MagSafe chargers?",
    answer: "Yes, this case is fully compatible with MagSafe chargers and accessories. The magnetic alignment works perfectly.",
    askedBy: "John D.",
    answeredBy: "ZZQ Support",
    date: "2025-10-16",
    helpful: 45
  },
  {
    id: 2,
    question: "How does this compare to the OtterBox Defender?",
    answer: "Our case offers similar drop protection (12ft vs 10ft) but is 30% thinner and lighter. It also maintains wireless charging compatibility which some OtterBox models don't.",
    askedBy: "Lisa M.",
    answeredBy: "ZZQ Support",
    date: "2025-10-14",
    helpful: 38
  }];


  const renderDescription = () =>
  <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 font-inter">Product Overview</h3>
        <p className="text-gray-700 leading-relaxed font-inter">
          The ZZQ Premium Protection Case represents the perfect fusion of military-grade protection and sophisticated design. 
          Engineered with advanced shock-absorption technology and premium materials, this case provides uncompromising protection 
          while maintaining the sleek profile your device deserves.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 font-inter">Advanced Protection Technology</h3>
        <p className="text-gray-700 leading-relaxed font-inter mb-4">
          Our proprietary impact-dispersion system utilizes a dual-layer construction with TPU shock absorption and PC reinforcement. 
          The raised bezels provide 360-degree protection for your screen and camera, while maintaining full access to all ports and functions.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 font-inter">Key Technologies:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-green-600" />
              <span className="font-inter">Air-Guard corners for enhanced drop protection</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-green-600" />
              <span className="font-inter">Oleophobic coating resists fingerprints and smudges</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-green-600" />
              <span className="font-inter">Precision-molded button covers for tactile response</span>
            </li>
          </ul>
        </div>
      </div>
    </div>;


  const renderSpecifications = () =>
  <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 font-inter">Technical Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications?.map((spec, index) =>
      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-medium text-gray-700 font-inter">{spec?.label}</span>
            <span className="text-gray-900 font-inter">{spec?.value}</span>
          </div>
      )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-blue-900 mb-2 font-inter">Certification & Testing</h4>
        <p className="text-sm text-blue-700 font-inter">
          This case has been rigorously tested and certified to MIL-STD-810G standards, ensuring reliable protection 
          in extreme conditions including drops, vibration, and temperature variations.
        </p>
      </div>
    </div>;


  const renderReviews = () =>
  <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 font-inter">Customer Reviews</h3>
        <button className="text-primary hover:underline font-inter">Write a review</button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-3xl font-bold text-gray-900 font-inter">4.8</div>
          <div>
            <div className="flex items-center space-x-1 mb-1">
              {[...Array(5)]?.map((_, i) =>
            <Icon
              key={i}
              name="Star"
              size={16}
              className={i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'} />

            )}
            </div>
            <p className="text-sm text-gray-600 font-inter">Based on 2,847 reviews</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((stars) =>
        <div key={stars} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-8 font-inter">{stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${stars === 5 ? 75 : stars === 4 ? 20 : 3}%` }}>
            </div>
              </div>
              <span className="text-sm text-gray-600 w-12 font-inter">
                {stars === 5 ? '2,135' : stars === 4 ? '568' : stars === 3 ? '89' : stars === 2 ? '32' : '23'}
              </span>
            </div>
        )}
        </div>
      </div>

      <div className="space-y-6">
        {reviews?.map((review) =>
      <div key={review?.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start space-x-4">
              <img
            src={review?.avatar}
            alt={review?.avatarAlt}
            className="w-10 h-10 rounded-full object-cover" />

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900 font-inter">{review?.name}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) =>
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < review?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />

                )}
                  </div>
                  <span className="text-sm text-gray-500 font-inter">{review?.date}</span>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-2 font-inter">{review?.title}</h4>
                <p className="text-gray-700 mb-3 font-inter">{review?.content}</p>
                
                {review?.images &&
            <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, index) =>
              <img
                key={index}
                src={image?.url}
                alt={image?.alt}
                className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200" />

              )}
                  </div>
            }
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-200">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="font-inter">Helpful ({review?.helpful})</span>
                  </button>
                  <button className="hover:text-gray-700 transition-colors duration-200 font-inter">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
      </div>
    </div>;


  const renderQA = () =>
  <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 font-inter">Questions & Answers</h3>
        <button className="text-primary hover:underline font-inter">Ask a question</button>
      </div>
      
      <div className="space-y-6">
        {qaItems?.map((item) =>
      <div key={item?.id} className="border-b border-gray-200 pb-6">
            <div className="mb-4">
              <div className="flex items-start space-x-2 mb-2">
                <Icon name="MessageCircle" size={16} className="text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 font-inter">{item?.question}</p>
                  <p className="text-sm text-gray-500 font-inter">Asked by {item?.askedBy} on {item?.date}</p>
                </div>
              </div>
            </div>
            
            <div className="ml-6 bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2 font-inter">{item?.answer}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-inter">Answered by {item?.answeredBy}</span>
                <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-200">
                  <Icon name="ThumbsUp" size={14} />
                  <span className="font-inter">Helpful ({item?.helpful})</span>
                </button>
              </div>
            </div>
          </div>
      )}
      </div>
    </div>;


  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return renderDescription();
      case 'specifications':
        return renderSpecifications();
      case 'reviews':
        return renderReviews();
      case 'qa':
        return renderQA();
      default:
        return renderDescription();
    }
  };

  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 flex items-center space-x-2 font-inter ${
            activeTab === tab?.id ?
            'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          )}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="py-8">
        {renderTabContent()}
      </div>
    </div>);

};

export default ProductTabs;