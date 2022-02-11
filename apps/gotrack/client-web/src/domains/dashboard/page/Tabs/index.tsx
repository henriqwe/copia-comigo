import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { PendingCommands } from '../../components/PendingCommands'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Tabs() {
  const [categories] = useState({
    'Comandos pendentes': {
      content: <PendingCommands />
    }
  })

  return (
    <div className="w-full mt-7">
      <Tab.Group>
        <div className="p-1 bg-blue-900/10 rounded-xl">
          <Tab.List className="flex max-w-md ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium  text-gray-900 rounded-lg',
                    ' ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : ' text-gray-500 hover:bg-white/[0.12] hover:text-gray-600'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl p-3 mt-2',
                'ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              {posts.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
