import * as entries from '&erp/domains/inventory/Moves/Entries'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'


export default function ValidateEntries() {
  return (
    <entries.ValidateProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </entries.ValidateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      title="Entrada de pedidos de compra"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        {
          title: 'Movimentações',
          url: rotas.estoque.movimentacoes.index
        },
        {
          title: 'Entradas',
          url: rotas.estoque.movimentacoes.entradas.index
        }
      ]}
    >
      <entries.Validate />
    </templates.Base>
  )
}
