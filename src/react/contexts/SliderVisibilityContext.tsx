import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface WPMContextType {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const WPMContext = createContext<WPMContextType>({
  isVisible: false,
  setIsVisible: () => {},
});

interface WPMProviderProps {
  children: ReactNode;
}

export const WPMProvider: React.FC<WPMProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <WPMContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </WPMContext.Provider>
  );
};

export const useWPMContext = () => useContext(WPMContext);
