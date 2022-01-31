import * as common from '@comigo/ui-common'
import { ChevronDoubleDownIcon} from "@heroicons/react/outline";

import { Dispatch, ReactChild, ReactNode, SetStateAction } from 'react'

type SubMenuItemType = {
  title: string
  url: string
  icon: ReactChild
  children: ReactNode
  active?: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  openMenu:boolean
  setOpenMenu:Dispatch<SetStateAction<boolean>>
}

export function MenuItemLevel2({
  title,
  url,
  icon,
  children,
  active,
  open,
  setOpen,
  openMenu,
  setOpenMenu
}: SubMenuItemType) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children ? (
        <li className=' relative text-gray-500 hover:text-white hover:bg-gray-800 py-2 rounded focus-within:text-white'>
          <a
            className={`side-menu cursor-pointer inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 keychainify-checked ${
              active && 'side-menu--active'
            }`}
            onClick={() => {
              setOpen(!open)
            }}
          >
            <div className="side-menu__icon">{icon}</div>
            <div className="side-menu__title absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              {title}
              {children && (
                <div className="transform side-menu__sub-icon">
                  <ChevronDoubleDownIcon
                    className={`w-4 h-4 mx-4 transition ${
                      open && 'rotate-180'
                    }`}
                  />
                </div>
              )}
            </div>
          </a>
          {children && open && (
            <ul className="side-menu__sub-open">{children}</ul>
          )}
        </li>
      ) : (
        <li className='pl-2 relative text-gray-500 hover:text-white hover:bg-gray-800 py-2 rounded  focus-within:text-white'>
          <common.Link
            to={url}
            className={`side-menu ${active && 'side-menu--active'} flex`}
          >
            <div className="side-menu__icon">{icon}</div>
            <div className="side-menu__title inset-y-0 pl-2 pointer-events-none"> {title} </div>
          </common.Link>
        </li>
      )}
    </>
  )
}


             