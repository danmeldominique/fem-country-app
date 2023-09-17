import { useGlobalContext } from 'contexts/ThemeContext';

export default function SearchBar() {
    const { search, setSearch } = useGlobalContext();

  
  return (
    <div className='flex flex-row relative'>
        <input
            type='text'
            name='search'
            placeholder='Search for a country...'
            className='w-full h-12 px-8 py-2 rounded-md shadow-sm dark:bg-EL_DarkBlue dark:text-white mb-4'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}
