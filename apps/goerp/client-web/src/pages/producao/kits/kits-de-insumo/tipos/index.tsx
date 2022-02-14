import * as kitsTypes from '&erp/domains/production/Kits/InputKits/KitsTypes'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function KitsTypes() {
  return (
    <kitsTypes.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </kitsTypes.ListProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { kitsTypesRefetch, kitsTypesLoading } = kitsTypes.useList()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<kitsTypes.InternalNavigation />}
      title="Tipos de Kits de produção"
      reload={{
        action: kitsTypesRefetch,
        state: kitsTypesLoading
      }}
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
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <kitsTypes.List />
    </templates.InternalNavigationAndSlide>
  )
}
