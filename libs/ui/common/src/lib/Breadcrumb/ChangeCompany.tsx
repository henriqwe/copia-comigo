import { OfficeBuildingIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react'

type ChangeCompanyProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  theme: string
}

export default function ChangeCompany({ setOpen, theme }: ChangeCompanyProps) {
  return (
    <div className="relative inline-block pl-2 align-middle transition duration-200 ease-in select-none">
      <button
        className={`flex justify-center w-8 h-8 items-center ${
          theme === 'dark' ? 'bg-theme-7' : 'bg-theme-8'
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
