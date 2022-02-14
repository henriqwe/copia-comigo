import * as kitsTypes from '&erp/domains/production/Kits/InputKits/KitsTypes'
import * as itens from '&erp/domains/inventory/Itens'

import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function KitsTypes() {
  return (
    <kitsTypes.CreateProvider>
      <itens.ListProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </itens.ListProvider>
    </kitsTypes.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { itensRefetch, itensLoading } = itens.useList()
  return (
    <templates.Base
      title="Cadastro de Tipos De Kit"
      reload={{ action: itensRefetch, state: itensLoading }}
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
          title: 'Tipos',
          url: rotas.producao.kits.kitsDeInsumo.tipos.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.kits.kitsDeInsumo.tipos.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <kitsTypes.Create />
    </templates.Base>
  )
}
