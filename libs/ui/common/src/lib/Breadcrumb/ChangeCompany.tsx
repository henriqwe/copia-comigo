import { OfficeBuildingIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react'
import { useTheme } from 'next-themes'

type ChangeCompanyProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  theme: string
}

export default function ChangeCompany({ setOpen }: ChangeCompanyProps) {
  const { theme } = useTheme()
  return (
    <div className="relative inline-block pl-2 align-middle transition duration-200 ease-in select-none">
      <button
        className={`flex justify-center w-8 h-8 items-center ${
          theme === 'dark' ? 'bg-darkmode-300' : 'bg-zinc-300'
        } rounded-full`}
        onClick={() => setOpen(true)}
      >
        <OfficeBuildingIcon
          className="w-5 h-5 dark:text-theme-8"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
