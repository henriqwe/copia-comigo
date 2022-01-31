import { ChevronDoubleDownIcon} from "@heroicons/react/outline";
import Router from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type MenuItemType = {
  children?: React.ReactChild[]
  title: string
  url: string
  icon: React.ReactChild
  active?: boolean
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  openMenu:boolean
  setOpenMenu:Dispatch<SetStateAction<boolean>>
}

export function MenuItemLevel1({
  children,
  title,
  icon,
  url,
  open = false,
  active = false,
  setOpen = () => null,
  openMenu,
  setOpenMenu
}: MenuItemType) {
  useEffect(() => {
    if(open && !openMenu){
      setOpen(false)
    }
  },[openMenu])
  return (
    <li className=" relative text-gray-500  focus-within:text-white">
      <div
        className={`side-menu cursor-pointer ${active && 'side-menu--active'} left-0 flex items-center hover:bg-gray-800  hover:text-white py-2 rounded`}
        onClick={() => {
          if (url && !children) {
            Router.push(url)
            return
          }
          setOpen(!open)
          setOpenMenu(true)
        }}
      >
        <div className="side-menu__icon">{icon}</div>
        <div className="side-menu__title flex justify-between items-center w-full">
          
            <div className={`${!openMenu && 'invisible'}`}>{title}</div>
      
          {children && (
            <div className="transform side-menu__sub-icon">
              <ChevronDoubleDownIcon
                className={`w-4 h-4 transition mx-4 ${open && 'rotate-180'} ${!openMenu && 'invisible'}`}
              />
            </div>
          )}
        </div>
        
       
        <span className={`${openMenu && 'invisible'} tooltip absolute rounded shadow-lg p-1 bg-gray-800 text-white ml-16`}>{title}</span>
      
     
      </div>
      {children && open && <ul className="side-menu__sub-open side-menu__sub-open flex flex-col pl-1 ml-4 text-gray-500 border-l border-gray-700">{children}</ul>}
    </li>
  )
}
