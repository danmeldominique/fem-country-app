import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useGlobalContext } from 'contexts/ThemeContext';
import { Theme } from 'lib/types';


export default function ThemeButton() {
    const {theme, setTheme} = useGlobalContext();
    
    const toggleTheme = () => {
        if (theme === 'light') {
            setThemeMode('dark');
        } else {
            setThemeMode('light');
        }
    }

    const setThemeMode = (theme: Theme) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }

  return (
    <div className='w-7 h-7 dark:text-white hover:bg-gray-200 p-1 rounded-full dark:hover:bg-slate-800'>
        {
            theme === 'light' ? (
                <SunIcon onClick={toggleTheme} className='cursor-pointer' />
            ) : (
                <MoonIcon onClick={toggleTheme} className='cursor-pointer' />
            )
        }
    </div>
  )
}
