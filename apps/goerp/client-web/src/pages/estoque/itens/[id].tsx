import * as itens from '&erp/domains/inventory/Itens'
import * as families from '&erp/domains/inventory/Registration/Families'
import * as groups from '&erp/domains/inventory/Registration/Groups'
import * as products from '&erp/domains/purchases/Products'
import * as addressing from '&erp/domains/inventory/Registration/Addresses'
import * as models from '&erp/domains/inventory/Registration/Models'

import rotas from '&erp/domains/routes'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Produtos() {
  return (
    <itens.UpdateProvider>
      <families.FamilyProvider>
        <groups.GroupProvider>
          <products.ListProvider>
            <addressing.AddressingProvider>
              <models.ModelProvider>
                <ThemeProvider>
                  <Page />
                </ThemeProvider>
              </models.ModelProvider>
            </addressing.AddressingProvider>
          </products.ListProvider>
        </groups.GroupProvider>
      </families.FamilyProvider>
    </itens.UpdateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { logsItensRefetch, updateItemLoading, itemRefetch, itemData } =
    itens.useUpdate()
  const { familiesRefetch, parentsFamiliesRefetch } = families.useFamily()
  const { groupsRefetch } = groups.useGroup()
  const { productsRefetch } = products.useList()
  const { adresssesRefetch } = addressing.useAddressing()
  const { modelsRefetch } = models.useModel()

  const refetch = () => {
    modelsRefetch()
    adresssesRefetch()
    productsRefetch()
    groupsRefetch()
    parentsFamiliesRefetch()
    familiesRefetch()
    logsItensRefetch()
    itemRefetch()
  }

  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      Form={<itens.Update />}
      title={`${itemData?.Familia.Nome}`}
      reload={{ action: refetch, state: updateItemLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        { title: 'Itens', url: rotas.estoque.itens.index }
      ]}
    >
      <div />
      <itens.LogsList />
    </templates.FormAndTabs>
  )
}
