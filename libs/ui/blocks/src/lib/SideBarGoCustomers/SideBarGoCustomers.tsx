import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  MenuIcon
} from '@heroicons/react/outline'
import { ReactChild, useState } from 'react'
// TODO: Refatorar nome desses componentes
import { Level1 } from './MenuItens/Level1'
import { Level2 } from './MenuItens/Level2'
import { Level3 } from './MenuItens/Level3'

/* eslint-disable-next-line */
export interface MainNavigationProps {
  MainMenuItems: {
    title: string
    icon: ReactChild
    url: string
    children?: {
      title: string
      url: string
      icon: ReactChild
      children?: {
        title: string
        url: string
        icon: ReactChild
      }[]
    }[]
  }[]
}

export function SideBarGoCustomers({ MainMenuItems }: MainNavigationProps) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <aside
      className={`flex flex-col side-nav ${
        openMenu ? 'w-64' : 'w-20'
      } h-full bg-gray-900`}
    >
      {/* Logo */}
      <div className="block px-6 pt-8 ">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="  bg-blue-600 w-7 h-7 rounded flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {openMenu ? (
              <svg
                className="w-5 h-5 m-1.5 text-white stroke-current"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.25 12L4.75 15L12 19.25L19.25 15L14.6722 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div
                className="w-full h-full items-center justify-center flex"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <MenuIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </a>
          {openMenu && (
            <button
              className={`flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 ${
                !openMenu && 'ml-8'
              }`}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <ChevronDoubleLeftIcon className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
      {/* Separator */}
      <div className="px-6 pt-4">
        <hr className="border-gray-700" />
      </div>
      {/* items */}
      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        <ul className="flex flex-col space-y-2">
          {MainMenuItems.map((item, index) => {
            return item.children?.length === 0 ? (
              <div
                className="relative text-gray-500 focus-within:text-white"
                key={item.title}
              >
                <Level1
                  item={item}
                  key={`item-menu-${index}`}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              </div>
            ) : (
              <div
                className="relative text-gray-500 focus-within:text-white"
                key={item.title}
              >
                <Level1
                  item={item}
                  key={`item-menu-${index}`}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                >
                  {item.children?.map((subitem, contagem) => (
                    <Level2
                      subitem={subitem}
                      key={`subitem-menu-${contagem}`}
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                    >
                      {subitem.children?.map((item3, contagem3) => (
                        <Level3 key={`item3-menu-${contagem3}`} item3={item3} />
                      ))}
                    </Level2>
                  ))}
                </Level1>
              </div>
            )
          })}
        </ul>
      </div>
      {/* User*/}
      <div
        className={`pl-6 pr-4 py-4 bg-gray-800 flex items-center justify-between bottom-0 ${
          openMenu ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center">
          <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:rigth-0 before:bottom-0 before:ring-1 before:ring-white">
            <img
              className="rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU"
              alt="user image"
            />
          </div>
          <div className={`flex flex-col pl-3 ${!openMenu && 'invisible'}`}>
            <div className="text-sm text-gray-50">User Name</div>
            <span className="text-xs font-light tracking-tight text-gray-200">
              Email@user.com
            </span>
          </div>
        </div>
        <button
          className={`text-gray-400 bg-gray-700 rounded ${
            !openMenu && 'invisible'
          }`}
        >
          <ChevronDownIcon className="w-4 h-4 text-white " />
        </button>
      </div>
    </aside>
  )
}
