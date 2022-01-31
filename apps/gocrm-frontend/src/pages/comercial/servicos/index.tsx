import * as services from '&crm/domains/commercial/Services'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Products() {
  return (
    <services.ServiceProvider>
      <Page />
    </services.ServiceProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { servicesRefetch, servicesLoading } = services.useService()
  const refetch = () => {
    servicesRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<services.InternalNavigation />}
      title="Serviços"
      reload={{ action: refetch, state: servicesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Serviços',
          url: rotas.comercial.servicos
        }
      ]}
    >
      <services.List />
      <services.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
