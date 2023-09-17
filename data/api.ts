import { BorderCountry, Country } from "lib/types"

export const ToCountries = async (data:any[]) => {
    return await Promise.all(data.map(async (c:any) => {
        return ToCountry(c);
    }))
}

export const ToCountry = (data:any):Country => {
    const hasCommonNativeName:boolean = 'common' in data.name.nativeName;
    return {
        name: data.name.common,
        nativeName: hasCommonNativeName ? data.name.nativeName.common : data.name.nativeName[Object.keys(data.name.nativeName)[0]].common,
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital.join(', '),
        topLevelDomain: data.tld.join(', '),
        currencies: Object.values(data.currencies).map((c:any) => c.name).join(', '),
        languages: Object.values(data.languages).join(', '),
        borders: 'borders' in data ? Object.values(data.borders).map((b) => {return {cca3: b as string, name: ''}}) : [],
        flag: data.flags.png,
    }
}