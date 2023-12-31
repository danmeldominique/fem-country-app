import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {  Form, MetaFunction, useActionData, useLoaderData } from '@remix-run/react';
import { useGlobalContext } from 'contexts/ThemeContext';
import { CountryTile } from 'lib/types';
import CountryList from '~/components/CountryList';
import RegionFilter from '~/components/RegionFilter';
import SearchBar from '~/components/SearchBar';

export const meta: MetaFunction = () => {
  return [
    {title : "Countries App"},
    {name: "description", content: "A simple app to view countries and their details"},
  ]
};

export const loader = async({params}: LoaderFunctionArgs) => {
  const countries:CountryTile[] = await fetch(`https://restcountries.com/v3.1/all`)
  // Fetch data from api
  .then((res) => res.json())
  // Map data to CountryTile type
  .then((_data) => {
    return _data.map((country:any) => {
      return {
        code: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        imageUrl: country.flags.svg,
      };
    })
  })
  return {
    countries: countries.sort((a,b) => (a.name < b.name ? -1 : 1)) as CountryTile[],
    search: '',
    region: 'All',
  };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  
  const countries:CountryTile[] = await fetch(`https://restcountries.com/v3.1/all`)
  // Fetch data from api
  .then((res) => res.json())
  // Map data to CountryTile type
  .then((_data) => {
    return _data.map((country:any) => {
      return {
        code: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        imageUrl: country.flags.svg,
      };
    })
  })
  // Get form data
  .then(async (__data) => {
    const form = await request.formData();
    return {
      countries: __data as CountryTile[],
      search: form.get('search') as string,
      region: form.get('region') as string,
    };
  })
  // Filter data
  .then(({countries, region, search}) => {
    let filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toString().toLowerCase() || ''));
    if (region !== 'All') {
      filteredCountries = filteredCountries.filter((country) => country.region === region);
    }
    return filteredCountries.sort((a,b) => (a.name < b.name ? -1 : 1));
  });
  return countries.sort((a,b) => (a.name < b.name ? -1 : 1)) as CountryTile[]
}

export default function Index() {
  const {region} = useGlobalContext();
  
  let data = useActionData<typeof action>();
  let {countries} = useLoaderData<typeof loader>();

  return (
          <div className="font-sans h-screen w-11/12 mx-auto">
              {/* Search area */}
              <div className=' flex flex-col items-start mt-4 space-y-4'>
                <Form method='post' className='w-full'>
                  <input type='hidden' name='region' value={ region } />
                  <SearchBar />
                  <RegionFilter />
                </Form>
                {countries && !data && <CountryList data={countries} />}
                {data && <CountryList data={data} />}
              </div>
          </div>
  );
}
