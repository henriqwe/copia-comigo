import * as inputKits from '&erp/domains/production/Kits/InputKits'
import * as kitsTypes from '&erp/domains/production/Kits/InputKits/KitsTypes'

import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function CreateInputKit() {
  return (
    <inputKits.CreateProvider>
      <kitsTypes.ListProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </kitsTypes.ListProvider>
    </inputKits.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { kitsTypesRefetch, kitsTypesLoading } = kitsTypes.useList()
  return (
    <templates.Base
      title="Cadastro de Kits de insumo"
      reload={{ action: kitsTypesRefetch, state: kitsTypesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Kits de insumo',
          url: rotas.producao.kits.kitsDeInsumo.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.kits.kitsDeInsumo.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <inputKits.Create />
    </templates.Base>
  )
}
