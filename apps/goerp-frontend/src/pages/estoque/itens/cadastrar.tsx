import * as itens from '&erp/domains/inventory/Itens'
import * as families from '&erp/domains/inventory/Registration/Families'
import * as groups from '&erp/domains/inventory/Registration/Groups'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'
import * as products from '&erp/domains/purchases/Products'
import * as addressing from '&erp/domains/inventory/Registration/Addresses'
import * as models from '&erp/domains/inventory/Registration/Models'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'


export default function Itens() {
  return (
    <itens.CreateProvider>
      <manufacturers.ManufacturerProvider>
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
      </manufacturers.ManufacturerProvider>
    </itens.CreateProvider>
  )
}

export function Page() {
  const { theme } = useTheme()
  const { manufacturersRefetch, manufacturersLoading } =
    manufacturers.useManufacturer()
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
    manufacturersRefetch()
  }
  return (
    <templates.Base
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      title="Cadastro de item"
      reload={{ action: refetch, state: manufacturersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        { title: 'Itens', url: rotas.estoque.itens.index },
        {
          title: 'Cadastro',
          url: rotas.estoque.itens.cadastrar
        }
      ]}
    >
      <itens.Create />
    </templates.Base>
  )
}
