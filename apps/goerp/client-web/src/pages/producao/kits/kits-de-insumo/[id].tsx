import * as inputKits from '&erp/domains/production/Kits/InputKits'

import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function GiveBackInputKit() {
  return (
    <inputKits.GiveBackProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </inputKits.GiveBackProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      title="Devolução de itens do Kit de insumo"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Kits de insumo',
          url: rotas.producao.kits.kitsDeInsumo.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <inputKits.GiveBack />
    </templates.Base>
  )
}
