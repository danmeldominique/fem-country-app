import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useGlobalContext } from 'contexts/ThemeContext';
import { Regions } from 'lib/types';
import React from 'react'

export default function RegionFilter() {
  const {region, setRegion} = useGlobalContext();
  return (
    <div className='top-16'>
        <Listbox value={region} onChange={setRegion}>
            <div className='relative mt-1'>
                <Listbox.Button className='w-40 h-12 rounded-md shadow-sm bg-white dark:bg-EL_DarkBlue dark:text-white'>
                    <div className='flex flex-row justify-between px-3'>
                        <span className='mr-2'>{region}</span>
                        <ChevronDownIcon className='w-5 h-5' />
                    </div>
                </Listbox.Button>
                <Listbox.Options className='absolute w-40 mt-2 py-1 bg-white dark:bg-EL_DarkBlue dark:text-white rounded-md shadow-md text-base'>
                    {
                        Regions.map((region) => (
                            <Listbox.Option key={region} value={region} className='cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 px-8 py-2'>
                                {region}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
            </div>
        </Listbox>
    </div>
  )
}
