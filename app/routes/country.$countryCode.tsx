import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { ToCountry } from 'data/api';
import { BorderCountry, Country } from 'lib/types';
import { Suspense } from 'react';

const getBorderNames = async (borders: string[]) => {
    const data = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}&fields=cca3,name`)
        .then((res) => res.json())
        .then((_data:any[]) => _data.map((country: any): BorderCountry => {return {cca3: country.cca3, name: country.name.common}}));
    return data;
  };

export const loader = async ({ params }: { params: { countryCode: string } }) => {
    
  const data = await fetch(`https://restcountries.com/v3.1/alpha/${params.countryCode}`)
    .then((res) => res.json())
    .then(async (_data) => {
      const country = ToCountry(_data[0])
      country.borders = country.borders.length > 0 ? await getBorderNames(country.borders.map(border => border.cca3)) : [];
      return {
        country,
      };
    });
  return data;
};

const renderCountry = (data: Country) => {
  return (
    <div className="flex flex-col w-11/12 mx-auto dark:text-white">
      <Link
        to="/"
        className="dark:text-white dark:bg-EL_DarkBlue flex flex-row px-4 py-2 space-x-2 items-center shadow-md bg-white rounded-sm w-fit mt-6"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <span className="">Back</span>
      </Link>
    <div className='flex flex-row space-x-8 mt-[7rem]'>
    <div className="w-1/2" >       
        <img src={data.flag} height={'100%'} width={'100%'} className=''  />
      </div>
      <div className="flex flex-col w-1/2">
        <h1 className="font-bold text-2xl">{data.name}</h1>
        <div className="flex mt-6 flex-col mb-4 space-y-2">
          <div className="flex flex-row">
            <p className="font-bold">Native Name: </p>
            <p className="font-light ml-2">{data.nativeName}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">Population: </p>
            <p className="font-light ml-2">{data.population}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">Region: </p>
            <p className="font-light ml-2">{data.region}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">Sub Region: </p>
            <p className="font-light ml-2">{data.subregion}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">Capital: </p>
            <p className="font-light ml-2">{data.capital}</p>
          </div>
        </div>
        <div className="flex flex-col mt-6 space-y-2">
          <div className="flex flex-row">
            <p className="font-bold">Top Level Domain: </p>
            <p className="font-light ml-2">{data.topLevelDomain}</p>
          </div>

          <div className="flex flex-row">
            <p className="font-bold">Currencies: </p>
            <p className="font-light ml-2">{data.currencies}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">Languages: </p>
            <p className="font-light ml-2">{data.languages}</p>
          </div>
        </div>
        <div className="flex flex-row mt-6 space-x-8">
          <div className="flex flex-col">
            <p className="font-bold mb-3">Border Countries:</p>
            <p className="font-light flex flex-row flex-wrap items-center">
                {
                    data.borders.length > 0 ? (
                        data.borders.map(border => 
                            <Link to={`/country/${border.cca3}`} key={border.cca3} className='shadow-md rounded-sm m-1 dark:bg-EL_DarkBlue dark:text-white'>
                                <span className=" block w-24 text-center px-1 text-sm py-1">{border.name}</span>
                            </Link>
                            )
                    ) : (
                        <span className="">No bordering countries</span>
                    )
                }</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default function CountryDetail() {
  const { country } = useLoaderData<typeof loader>();
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={country}>
                {renderCountry}
            </Await>
        </Suspense>
    </>
  );
}
