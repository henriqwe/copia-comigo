import * as coverages from '&crm/domains/commercial/Registration/Coverages'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Conditionals() {
  return (
    <coverages.CoverageProvider>
      <ThemeProvider>       <Page />     </ThemeProvider>
    </coverages.CoverageProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { coveragesRefetch, coveragesLoading } = coverages.useCoverage()
  const refetch = () => {
    coveragesRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<coverages.InternalNavigation />}
      title="Coberturas"
      reload={{ action: refetch, state: coveragesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.comercial.cadastros.index
        },
        {
          title: 'Coberturas',
          url: rotas.comercial.cadastros.coberturas
        }
      ]}
    >
      <coverages.List />
      <coverages.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
