import * as itens from '&erp/domains/inventory/Itens'

import rotas from '&erp/domains/routes'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Itens() {
  return (
    <itens.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </itens.ListProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { itensRefetch, itensLoading } = itens.useList()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<itens.InternalNavigation />}
      title="Listagem de Itens"
      reload={{ action: itensRefetch, state: itensLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        { title: 'Itens', url: rotas.estoque.itens.index }
      ]}
    >
      <itens.List />
    </templates.InternalNavigationAndSlide>
  )
}
