import React, { createContext, useContext, useState } from 'react';

type SubTabState = {
  activeDashboardSubTab: string;
  setActiveDashboardSubTab: (tab: string) => void;
  activeSettingsSubTab: string;
  setActiveSettingsSubTab: (tab: string) => void;
};

const SubTabContext = createContext<SubTabState | undefined>(undefined);

export const SubTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDashboardSubTab, setActiveDashboardSubTab] = useState('kpis');
  const [activeSettingsSubTab, setActiveSettingsSubTab] = useState('PROFILE');

  return (
    <SubTabContext.Provider
      value={{
        activeDashboardSubTab,
        setActiveDashboardSubTab,
        activeSettingsSubTab,
        setActiveSettingsSubTab,
      }}
    >
      {children}
    </SubTabContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSubTab = () => {
  const context = useContext(SubTabContext);
  if (!context) {
    throw new Error('useSubTab must be used within a SubTabProvider');
  }
  return context;
};
