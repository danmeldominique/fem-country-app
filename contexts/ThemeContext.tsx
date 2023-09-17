import { Region, Theme } from "lib/types";
import { createContext, useContext, useState } from "react";

type GlobalContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    region: Region;
    setRegion: React.Dispatch<React.SetStateAction<Region>>;
}

const GlobalContext = createContext<GlobalContextType|null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState<Region>('All');

    const value = {
        search,
        setSearch,
        theme,
        setTheme,
        region,
        setRegion,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === null) {
        throw new Error('useGlobalContext must be used within a ThemeProvider');
    }
    return context;
}