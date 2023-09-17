type Theme = 'light' | 'dark';

export const Regions = ['All','Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
type Region = typeof Regions[number];

type CountryTile = {
    code: string;
    name: string;
    population: number;
    region: string;
    capital: string;
    imageUrl: string;
}

type Country = {
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: string;
    languages: string;
    borders: BorderCountry[];
    flag: string;
}

type BorderCountry = {
    name: string;
    cca3: string;
}


export type { Theme, Region, CountryTile, Country, BorderCountry };