import clsx from 'clsx';
import ThemeButton from './ThemeButton';

type NavbarProps = {
    className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <div className={clsx(`py-3 flex flex-row flex-nowrap w-full justify-between px-8 shadow-sm items-center`, className)}>
        <h1 className='font-bold text-base dark:text-white'>Where in the world?</h1>
        <ThemeButton />
    </div>
  )
}
