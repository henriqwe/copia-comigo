import * as combos from '&crm/domains/commercial/Combos'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Combos() {
  return (
    <combos.ListProvider>
      <Page />
    </combos.ListProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { combosRefetch, combosLoading } = combos.useList()
  const refetch = () => {
    combosRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<combos.InternalNavigation />}
      title="Combos"
      reload={{ action: refetch, state: combosLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Combos',
          url: rotas.comercial.combos.index
        }
      ]}
    >
      <combos.List />
    </templates.InternalNavigationAndSlide>
  )
}
