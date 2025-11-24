export enum ServiceType {
  BRANDING = 'branding',
  VIDEO = 'video',
  MUSIC = 'music',
  EVENT = 'event',
  PRINTING = 'printing'
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Optional link to video
  gallery?: string[]; // Optional array of additional images
  tags: string[];
}

export interface ServiceCategory {
  id: ServiceType;
  name: string;
  icon: string;
  items: PortfolioItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  tags: string[];
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  phones: string[];
  description: string;
  locations: string[];
  heroBackgroundImage?: string; // Optional custom background
  logoUrl?: string; // Optional company logo
}

// Edit Context Types
export interface ContentContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: CompanyInfo) => void;
  
  teamMembers: TeamMember[];
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;

  portfolioData: ServiceCategory[];
  updatePortfolioItem: (categoryId: string, itemId: string, item: Partial<PortfolioItem>) => void;
  addPortfolioItem: (categoryId: string, item: PortfolioItem) => void;
  deletePortfolioItem: (categoryId: string, itemId: string) => void;
  
  generateConfigFile: () => string;
  resetToDefault: () => void;
}