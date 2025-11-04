import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Cart', icon: 'ShoppingCart' },
    { id: 2, name: 'Shipping', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step?.id <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={18} />
              </div>
              <div className="hidden sm:block">
                <p className={`text-sm font-medium ${
                  step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.name}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step?.id < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;