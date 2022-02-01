import { Dispatch, Fragment, SetStateAction } from 'react'


import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import ReloadPage from './ReloadPage'
import ChangeTheme from './ChangeTheme'
import ChangeCompany from './ChangeCompany'
import { ChevronRightIcon } from '@heroicons/react/outline'

type Props = {
  title: string
  reload: { action: () => void; state: boolean }
  currentLocation: { title: string; url: string }[]
  setOpen: Dispatch<SetStateAction<boolean>>
  setShowModal: Dispatch<SetStateAction<boolean>>
  theme: string
  setTheme: () => void
}

export const Breadcrumb = ({
  title,
  reload,
  currentLocation,
  setOpen,
  setShowModal,
  theme,
  setTheme
}: Props) => {
  return (
    <div className="flex items-center justify-between flex-1">
      <div>
        <div className="hidden mr-auto -intro-x breadcrumb sm:flex">
          {/* <Link to="/">GoERP</Link> */}
          {currentLocation.map((item, index) => {
            return (
              // <div key={`link-breadcrumb-${index}`}>
              <Fragment key={`link-breadcrumb-${index}`}>
                <common.Link to={item.url} className="breadcrumb-item active text-tiny">
                  {item.title}
                </common.Link>
              </Fragment>
            )
          })}
        </div>
        <div className="text-xl">{title}</div>
      </div>
      <div className="flex items-center justify-center gap-4 divide-x">
        <ChangeCompany setOpen={setOpen} theme={theme}/>
        <ReloadPage reload={reload} />
        <div className="flex items-center">
          <ChangeTheme theme={theme} changeTheme={setTheme}/>
          <blocks.UserMenu setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  )
}
