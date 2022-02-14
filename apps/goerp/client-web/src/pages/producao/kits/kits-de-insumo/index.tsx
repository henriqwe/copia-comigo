import * as inputKits from '&erp/domains/production/Kits/InputKits'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function InputKit() {
  return (
    <inputKits.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </inputKits.ListProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { inputKitsRefetch, inputKitsLoading } = inputKits.useList()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<inputKits.InternalNavigation />}
      title="Kits de insumo de produção"
      reload={{
        action: inputKitsRefetch,
        state: inputKitsLoading
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
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <inputKits.List />
    </templates.InternalNavigationAndSlide>
  )
}
