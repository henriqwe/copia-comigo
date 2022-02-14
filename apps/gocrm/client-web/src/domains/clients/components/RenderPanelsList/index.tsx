import { Tab } from '@headlessui/react'
import * as utils from '@comigo/utils'
import * as client from '&crm/domains/clients'

type RenderPanelsListProps = {
  categories: {
    id?: number
    title: string
    type: string
  }[]
}
// FIXME: verificar erro de renderizar mais hooks do que a renderização anterior
export const RenderPanelsList = ({ categories }: RenderPanelsListProps) => {
  return (
    <>
      {categories.map((category) => (
        <Tab.Panel
          key={category.title}
          className={utils.classNames('bg-white rounded-lg')}
        >
          {category.title === 'Resumo' ? (
            <client.Resume />
          ) : category.title === 'Geral' ? (
            <div />
          ) : (
            <client.Vehicle />
          )}
          {/* {proposals[category.type]()} */}
        </Tab.Panel>
      ))}
    </>
  )
}
