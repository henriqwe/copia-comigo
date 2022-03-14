import { Menu, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export function Dropdown({
  title,
  items,
  handler,
  titleClassName = '',
  noChevronDownIcon = false,
  disabled = false
}: {
  title: ReactNode
  items: { title: string; action?: () => void }[]
  handler: (value: string) => void
  titleClassName?: string
  noChevronDownIcon?: boolean
  disabled?: boolean
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full lg:flex-row dark:border-dark-5 disabled:cursor-not-allowed">
          <div className={`${titleClassName}`}>{title}</div>
          {!noChevronDownIcon && (
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          )}
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
        <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-dark-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 my-2 border-t border-theme-27 dark:border-dark-3">
            {items.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <button
                    onClick={(event) => {
                      event?.preventDefault()
                      item.action && item.action()
                    }}
                    value={item.title}
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-200 transition text-gray-800 dark:text-theme-8`}
                  >
                    {item.title}
                  </button>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
