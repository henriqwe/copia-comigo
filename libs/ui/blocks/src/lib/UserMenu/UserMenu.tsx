import { Menu, Transition } from '@headlessui/react'
import { LogoutIcon, UserIcon } from '@heroicons/react/outline'
import { Dispatch, Fragment, SetStateAction } from 'react'
import * as common from '@comigo/ui-common'

type UserMenuProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export function UserMenu({ setShowModal }: UserMenuProps) {
  return (
    <div className="pt-1 pl-4">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center justify-center w-full lg:flex-row dark:border-gray-200">
            <div className="w-8 h-8 image-fit">
              <common.icons.UserIcon />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-primary dark:bg-dark-3 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="z-50 py-3">
              <div className="ml-4">
                <h2 className="text-white text-md">Alex</h2>
                <h3 className="text-xs text-white/70 dark:text-slate-500">email@example.com</h3>
              </div>
              <div className="px-2 pt-2 my-4 border-t border-theme-27 dark:border-dark-3">
                <Menu.Item>
                  <button
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-theme-1 transition text-white dark:text-theme-8`}
                  >
                    <UserIcon
                      className="w-5 h-5 mr-2 dark:border-theme-8"
                      aria-hidden="true"
                    />
                    Perfil
                  </button>
                </Menu.Item>
              </div>

              <div className="px-2 pt-2 border-t border-theme-27 dark:border-dark-3">
                <Menu.Item>
                  <button
                    onClick={() => {
                      setShowModal(true)
                    }}
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-theme-1 transition text-white dark:text-theme-8`}
                  >
                    <LogoutIcon
                      className="w-5 h-5 mr-2 dark:border-theme-8"
                      aria-hidden="true"
                    />
                    Sair
                  </button>
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
