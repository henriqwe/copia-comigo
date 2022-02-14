import { Tab } from '@headlessui/react'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

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
            <proposals.Resume />
          ) : category.title === 'Geral' ? (
            <proposals.General />
          ) : (
            <proposals.Vehicle />
          )}
          {/* {proposals[category.type]()} */}
        </Tab.Panel>
      ))}
    </>
  )
}
