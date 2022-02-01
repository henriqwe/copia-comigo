import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'

type ChangeThemeProps = {
  theme: string
  changeTheme: () => void
}

export default function ChangeTheme({
  changeTheme }: ChangeThemeProps) {
  const { setTheme, theme } = useTheme()
  return (
    <div className="relative inline-block pl-2 align-middle transition duration-200 ease-in select-none">
      <button
        className={`flex justify-center w-8 h-8 items-center ${theme === 'dark' ? 'bg-darkmode-300' : 'bg-zinc-300'
          } rounded-full`}
        onClick={() => {
          theme !== 'dark' ? setTheme('dark') : setTheme('light')
          changeTheme()
        }}
      >
        {theme === 'dark' ? (
          <SunIcon className="w-6 h-6 text-white" />
        ) : (
          <MoonIcon className="w-6 h-6 text-theme-7" />
        )}
      </button>
    </div>
  )
}
