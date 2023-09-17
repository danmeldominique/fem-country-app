import { Link } from "@remix-run/react";
import { CountryTile } from "lib/types"

type CountryTileProps = {
    data: CountryTile[] | null;
}

export default function CountryList({ data }: CountryTileProps) {
  return (
    <div className='grid gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
        {
            data && data.map((country) => {
                    return (
                        <Link key={country.code} to={`/country/${country.code}`}>
                            <div className='w-72 h-88 rounded-md shadow-md bg-white dark:bg-EL_DarkBlue dark:text-white'>
                                <img src={country.imageUrl} alt={country.name} className='w-full h-40 rounded-t-md object-cover' />
                                <div className='px-8 py-6'>
                                    <h1 className='font-bold text-lg'>{country.name}</h1>
                                    <p className='mt-4'>Population: {country.population.toLocaleString()}</p>
                                    <p>Region: {country.region}</p>
                                    <p>Capital: {country.capital}</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            )
        }
        
    </div>
  )
}
