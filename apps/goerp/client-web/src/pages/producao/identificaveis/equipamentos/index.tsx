import * as equipments from '&erp/domains/production/identifiable/Equipments'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Equipments() {
  return (
    <equipments.EquipmentProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </equipments.EquipmentProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { equipmentRefetch, equipmentLoading } = equipments.useEquipment()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<equipments.InternalNavigation />}
      title="Equipamentos de estoque"
      reload={{
        action: equipmentRefetch,
        state: equipmentLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Equipamentos',
          url: rotas.producao.identificaveis.equipamentos.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <equipments.List />
      <equipments.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
