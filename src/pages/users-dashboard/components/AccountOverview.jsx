import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AccountOverview = ({ userProfile, onEditProfile, onChangePassword }) => {
  const accountItems = [
    {
      id: 'personal-info',
      label: 'Personal Information',
      description: 'Update your name, email, and phone',
      icon: 'User',
      action: () => onEditProfile('personal')
    },
    {
      id: 'addresses',
      label: 'Address Book',
      description: 'Manage shipping and billing addresses',
      icon: 'MapPin',
      action: () => onEditProfile('addresses')
    },
    {
      id: 'payment-methods',
      label: 'Payment Methods',
      description: 'Add or update payment options',
      icon: 'CreditCard',
      action: () => onEditProfile('payment')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Control email and SMS preferences',
      icon: 'Bell',
      action: () => onEditProfile('notifications')
    },
    {
      id: 'security',
      label: 'Security',
      description: 'Change password and security settings',
      icon: 'Shield',
      action: onChangePassword
    },
    {
      id: 'privacy',
      label: 'Privacy Settings',
      description: 'Manage data and privacy preferences',
      icon: 'Lock',
      action: () => onEditProfile('privacy')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Account Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="p-6">
        {/* Profile Summary */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={userProfile?.avatar}
              alt={userProfile?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-semibold text-foreground">
              {userProfile?.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {userProfile?.email}
            </p>
            <p className="text-sm text-muted-foreground">
              Member since {userProfile?.memberSince}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEditProfile('personal')}>
            Edit Profile
          </Button>
        </div>

        {/* Account Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accountItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                  <Icon name={item?.icon} size={20} className="text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-foreground mb-1">
                    {item?.label}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {item?.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </button>
          ))}
        </div>

        {/* Account Status */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-green-800">
                Account Verified
              </h5>
              <p className="text-xs text-green-600">
                Your account is fully verified and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;