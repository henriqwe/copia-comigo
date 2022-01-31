import * as plans from '&crm/domains/commercial/Plans'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Plans() {
  return (
    <plans.ListProvider>
      <Page />
    </plans.ListProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { plansRefetch, plansLoading } = plans.useList()
  const refetch = () => {
    plansRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<plans.InternalNavigation />}
      title="Planos"
      reload={{ action: refetch, state: plansLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Planos',
          url: rotas.comercial.planos.index
        }
      ]}
    >
      <plans.List />
    </templates.InternalNavigationAndSlide>
  )
}
