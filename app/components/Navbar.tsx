import ThemeButton from './ThemeButton';

export default function Navbar() {
  return (
    <div className='py-3 flex flex-row flex-nowrap w-full justify-between px-8 shadow-sm items-center bg-white dark:bg-EL_DarkBlue'>
        <h1 className='font-bold text-base dark:text-white'>Where in the world?</h1>
        <ThemeButton />
    </div>
  )
}
