import * as trackers from '&erp/domains/production/Trackers'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Trackers() {
  return (
    <trackers.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </trackers.ListProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { trackersRefetch, trackersLoading } = trackers.useList()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<trackers.InternalNavigation />}
      title="Rastreadores de estoque"
      reload={{
        action: trackersRefetch,
        state: trackersLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Rastreadores',
          url: rotas.producao.rastreadores.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <trackers.List />
    </templates.InternalNavigationAndSlide>
  )
}
