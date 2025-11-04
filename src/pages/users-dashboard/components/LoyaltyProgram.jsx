import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyProgram = ({ loyaltyData, onRedeemPoints, onViewRewards }) => {
  const { currentPoints, nextTierPoints, currentTier, nextTier, recentEarnings, availableRewards } = loyaltyData;
  
  const progressPercentage = (currentPoints / nextTierPoints) * 100;
  const pointsToNextTier = nextTierPoints - currentPoints;

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'bronze':
        return 'text-orange-600 bg-orange-50';
      case 'silver':
        return 'text-gray-600 bg-gray-50';
      case 'gold':
        return 'text-yellow-600 bg-yellow-50';
      case 'platinum':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-yellow-500" />
            <span>Loyalty Program</span>
          </h3>
          <Button variant="outline" size="sm" onClick={onViewRewards}>
            View Rewards
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Current Status */}
        <div className="text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${getTierColor(currentTier)}`}>
            <Icon name="Crown" size={16} className="mr-1" />
            {currentTier} Member
          </div>
          <p className="text-2xl font-bold text-foreground">
            {currentPoints?.toLocaleString()} Points
          </p>
          <p className="text-sm text-muted-foreground">
            {pointsToNextTier?.toLocaleString()} points to {nextTier}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{currentTier}</span>
            <span className="text-muted-foreground">{nextTier}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-brand h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Recent Earnings */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Earnings</h4>
          <div className="space-y-2">
            {recentEarnings?.map((earning) => (
              <div key={earning?.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon name="Plus" size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {earning?.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {earning?.date}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +{earning?.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Available Rewards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableRewards?.slice(0, 4)?.map((reward) => (
              <div key={reward?.id} className="border border-border rounded-lg p-3 hover:border-primary/20 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-medium text-foreground">
                    {reward?.title}
                  </h5>
                  <span className="text-xs font-medium text-primary">
                    {reward?.points} pts
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {reward?.description}
                </p>
                <Button
                  variant={currentPoints >= reward?.points ? "default" : "ghost"}
                  size="sm"
                  className="w-full"
                  disabled={currentPoints < reward?.points}
                  onClick={() => onRedeemPoints(reward?.id)}
                >
                  {currentPoints >= reward?.points ? 'Redeem' : 'Not Enough Points'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;