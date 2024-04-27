export interface CampaignData {
  campaign: Campaign
}

export interface Campaign {
  information: Information;
  subCampaigns: subCampaigns[];
}

export interface Information {
  name: string;
  describe: string;
}

export interface subCampaigns {
  name: string;
  status: boolean;
  ads: Ads[]
}

export interface Ads {
  name: string;
  quantity: number;
}