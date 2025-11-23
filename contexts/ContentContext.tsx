import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CompanyInfo, PortfolioItem, ServiceCategory, TeamMember, ContentContextType } from '../types';
import { COMPANY_INFO as DEFAULT_COMPANY, TEAM_MEMBERS as DEFAULT_TEAM, PORTFOLIO_DATA as DEFAULT_PORTFOLIO } from '../content';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [portfolioData, setPortfolioData] = useState<ServiceCategory[]>(DEFAULT_PORTFOLIO);

  // Load from LocalStorage on mount to persist edits during session
  useEffect(() => {
    const savedCompany = localStorage.getItem('yidao_company');
    const savedTeam = localStorage.getItem('yidao_team');
    const savedPortfolio = localStorage.getItem('yidao_portfolio');

    if (savedCompany) setCompanyInfo(JSON.parse(savedCompany));
    if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
    if (savedPortfolio) setPortfolioData(JSON.parse(savedPortfolio));
  }, []);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('yidao_company', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('yidao_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('yidao_portfolio', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const toggleAdmin = () => setIsAdmin(!isAdmin);

  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  const updateTeamMember = (id: string, updatedMember: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  };

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const updatePortfolioItem = (categoryId: string, itemId: string, updatedItem: Partial<PortfolioItem>) => {
    setPortfolioData(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, ...updatedItem } : item)
      };
    }));
  };

  const addPortfolioItem = (categoryId: string, newItem: PortfolioItem) => {
    setPortfolioData(prev => prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
            ...cat,
            items: [newItem, ...cat.items]
        }
    }))
  }

  const deletePortfolioItem = (categoryId: string, itemId: string) => {
    setPortfolioData(prev => prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
        }
    }))
  }

  const resetToDefault = () => {
    if(confirm('确定要重置所有修改吗？这将恢复到初始状态。(Are you sure you want to reset all changes?)')) {
        setCompanyInfo(DEFAULT_COMPANY);
        setTeamMembers(DEFAULT_TEAM);
        setPortfolioData(DEFAULT_PORTFOLIO);
        localStorage.removeItem('yidao_company');
        localStorage.removeItem('yidao_team');
        localStorage.removeItem('yidao_portfolio');
        window.location.reload();
    }
  };

  const generateConfigFile = () => {
    // Generate the content.ts string
    return `
import { CompanyInfo, ServiceCategory, ServiceType, TeamMember } from './types';

export const COMPANY_INFO: CompanyInfo = ${JSON.stringify(companyInfo, null, 2)};

export const TEAM_MEMBERS: TeamMember[] = ${JSON.stringify(teamMembers, null, 2)};

export const PORTFOLIO_DATA: ServiceCategory[] = ${JSON.stringify(portfolioData, null, 2)};

export const FULL_CONTEXT = \`
Company Name: \${COMPANY_INFO.name}
Slogan: \${COMPANY_INFO.slogan}
Phone Numbers: \${COMPANY_INFO.phones.join(', ')}
Description: \${COMPANY_INFO.description}
Team Members: \${TEAM_MEMBERS.map(m => \`\${m.name} (\${m.role})\`).join(', ')}
Services:
\${PORTFOLIO_DATA.map(cat => \`- \${cat.name}: \${cat.items.map(item => item.title).join(', ')}\`).join('\\n')}
\`;
    `.trim();
  };

  return (
    <ContentContext.Provider value={{
      isAdmin,
      toggleAdmin,
      companyInfo,
      updateCompanyInfo,
      teamMembers,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      portfolioData,
      updatePortfolioItem,
      addPortfolioItem,
      deletePortfolioItem,
      generateConfigFile,
      resetToDefault
    }}>
      {children}
    </ContentContext.Provider>
  );
};