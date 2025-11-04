import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GiftOptions = ({ onGiftOptionsChange }) => {
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [scheduledDelivery, setScheduledDelivery] = useState('');

  const handleGiftToggle = (checked) => {
    setIsGift(checked);
    if (!checked) {
      setGiftMessage('');
      setGiftWrap(false);
      setScheduledDelivery('');
    }
    onGiftOptionsChange({
      isGift: checked,
      giftMessage: checked ? giftMessage : '',
      giftWrap: checked ? giftWrap : false,
      scheduledDelivery: checked ? scheduledDelivery : ''
    });
  };

  const handleOptionsChange = () => {
    onGiftOptionsChange({
      isGift,
      giftMessage,
      giftWrap,
      scheduledDelivery
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Gift" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground font-inter">
          Gift Options
        </h3>
      </div>
      <Checkbox
        label="This is a gift"
        description="Add gift wrapping and personalized message"
        checked={isGift}
        onChange={(e) => handleGiftToggle(e?.target?.checked)}
        className="mb-4"
      />
      {isGift && (
        <div className="space-y-4 pl-6 border-l-2 border-primary/20">
          <Checkbox
            label="Add gift wrapping (+$4.99)"
            description="Beautiful premium gift box with ribbon"
            checked={giftWrap}
            onChange={(e) => {
              setGiftWrap(e?.target?.checked);
              handleOptionsChange();
            }}
          />
          
          <Input
            label="Gift Message"
            type="text"
            placeholder="Write a personalized message (optional)"
            description="Maximum 200 characters"
            value={giftMessage}
            onChange={(e) => {
              setGiftMessage(e?.target?.value);
              handleOptionsChange();
            }}
            maxLength={200}
          />
          
          <Input
            label="Scheduled Delivery"
            type="date"
            description="Choose a specific delivery date"
            value={scheduledDelivery}
            onChange={(e) => {
              setScheduledDelivery(e?.target?.value);
              handleOptionsChange();
            }}
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground font-inter mb-1">
                  Gift Delivery Information
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Gift receipts will not show pricing</li>
                  <li>• Delivery confirmation will be sent to your email</li>
                  <li>• Gift messages are printed on premium cards</li>
                  <li>• Scheduled deliveries require 2-day advance notice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftOptions;