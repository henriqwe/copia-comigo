import * as exits from '&erp/domains/inventory/Moves/Exits'

import rotas from '&erp/domains/routes'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'

export default function Exits() {
  return (
    <exits.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </exits.ListProvider>
  )
}

export function Page() {
  const { theme } = useTheme()
  const { outgoingOrdersRefetch, outgoingOrdersLoading } = exits.useList()
  return (
    <templates.InternalNavigationAndSlide
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      SubMenu={<exits.InternalNavigation />}
      title="Listagem de Saídas"
      reload={{
        action: outgoingOrdersRefetch,
        state: outgoingOrdersLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Movimentações',
          url: rotas.estoque.movimentacoes.index
        },
        { title: 'Saídas', url: rotas.estoque.movimentacoes.saidas.index }
      ]}
    >
      <exits.List />
    </templates.InternalNavigationAndSlide>
  )
}
