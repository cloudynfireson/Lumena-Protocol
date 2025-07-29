# Lumena Protocol

A blockchain-based decentralized advertising and marketing platform that connects advertisers and publishers through smart contracts, ensuring transparent campaigns, fraud prevention, and performance-based rewards.

## Overview

This system consists of ten main smart contracts that automate and secure various aspects of decentralized advertising:

1. **AdvertiserProfile Contract** – Registers and verifies advertisers
2. **PublisherProfile Contract** – Registers and manages publishers and traffic data
3. **CampaignFactory Contract** – Creates and manages campaign contracts
4. **CampaignContract** – Holds campaign-specific settings, creatives, and status
5. **AdBidEngine Contract** – Enables real-time bidding (RTB) for ad slots
6. **EngagementTracker Contract** – Tracks verified impressions and clicks
7. **ReputationManager Contract** – Maintains trust scores for users
8. **EscrowVault Contract** – Locks and releases payments based on results
9. **RewardToken Contract** – ERC-20-style token for incentives and DAO participation
10. **GovernanceDAO Contract** – Manages community proposals and upgrades

## Features

- Transparent and fraud-resistant ad transactions  
- Real-time bidding system  
- Decentralized performance tracking  
- Verified publisher and advertiser registries  
- Automated payouts via escrow  
- Tokenized rewards and staking  
- Community-driven governance

## Smart Contracts

### **AdvertiserProfile Contract**

- Advertiser registration and verification  
- KYC and ad budget limits  
- Access control enforcement

### **PublisherProfile Contract**

- Publisher onboarding  
- Website and category registration  
- Reputation tracking integration

### **CampaignFactory Contract**

- Campaign creation and cloning  
- Budget and duration parameters  
- Permissioned campaign deployment

### **CampaignContract**

- Campaign-specific data and creative hashes  
- Impression and click thresholds  
- Performance completion logic

### **AdBidEngine Contract**

- Real-time bidding mechanics  
- Publisher slot auctions  
- Fair bid settlement

### **EngagementTracker Contract**

- Impression/click validation  
- Fraud prevention mechanisms  
- Oracle and/or zk-proof support

### **ReputationManager Contract**

- Dynamic scoring for all actors  
- Performance-based adjustments  
- Public score visibility

### **EscrowVault Contract**

- Fund locking and milestone-based release  
- Refund logic for underperformance  
- Token or STX payment support

### **RewardToken Contract**

- Utility token (fungible)  
- Incentive payouts and fee coverage  
- Staking for publishers and advertisers

### **GovernanceDAO Contract**

- Proposal and voting system  
- Smart contract upgrade control  
- Dispute resolution input

## Installation

1. Install Clarinet CLI  
2. Clone this repository  
3. Run tests: `npm run test`  

## Usage

Each contract can be deployed individually and configured per campaign or user. Refer to the `/contracts` folder and inline documentation for deployment parameters and function usage.

## Testing

Tests are written using Clarinet’s testing framework and can be run with:

```bash
npm run test
```

## License

MIT License