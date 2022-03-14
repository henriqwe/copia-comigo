import * as utils from '@comigo/utils'
import { Tab } from '@headlessui/react'

type RenderTabsListProps = {
  tabsForPage: {
    id?: number
    title: string
    type: string
  }[]
  format: (value: string) => unknown
}

export const RenderTabsList = ({
  tabsForPage,
  format = (value: string) => value
}: RenderTabsListProps) => {
  return (
    <>
      {tabsForPage.map((tab) => (
        <Tab
          key={tab.title}
          className={({ selected }) =>
            // Enviar função para lib utils
            utils.classNames(
              'flex py-2.5 px-2.5 text-xs leading-5 flex-nowrap font-medium rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'bg-blue-900/20 text-gray-400 hover:bg-white/[0.50] hover:text-gray-400'
            )
          }
        >
          {tab.title.length === 7
            ? format(tab.title)
            : tab.title}
        </Tab>
      ))}
    </>
  )
}
