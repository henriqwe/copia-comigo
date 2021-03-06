import * as addressingTypes from '&erp/domains/inventory/Registration/Addresses/AddressingTypes'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function AddressingTypes() {
  return (
    <addressingTypes.AddressingTypeProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </addressingTypes.AddressingTypeProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { addressingTypesRefetch, addressingTypesLoading } =
    addressingTypes.useAddressingType()
  //const {usuario} = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<addressingTypes.InternalNavigation />}
      title="Tipos de Endereçamentos de estoque"
      reload={{
        action: addressingTypesRefetch,
        state: addressingTypesLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Endereçamento',
          url: rotas.estoque.cadastros.enderecamentos.index
        },
        {
          title: 'Tipos',
          url: rotas.estoque.cadastros.enderecamentos.tipos
        }
      ]}
    >
      <addressingTypes.List />
      <addressingTypes.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
