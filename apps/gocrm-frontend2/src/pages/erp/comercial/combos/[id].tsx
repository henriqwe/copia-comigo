import * as combos from '&test/components/domains/erp/commercial/Combos'
import * as plans from '&test/components/domains/erp/commercial/Plans'
import * as products from '&test/components/domains/erp/commercial/Products'
import * as services from '&test/components/domains/erp/commercial/Services'

import rotas from '&test/components/domains/routes'

import FormAndTabs from '&test/components/templates/FormAndTabs'
import Base from '&test/components/templates/Base'

export default function ProposalDetails() {
  return (
    <combos.ViewProvider>
      <plans.ListProvider>
        <products.ProductProvider>
          <services.ServiceProvider>
            <combos.combos.DependenceComboProvider>
              <Page />
            </combos.combos.DependenceComboProvider>
          </services.ServiceProvider>
        </products.ProductProvider>
      </plans.ListProvider>
    </combos.ViewProvider>
  )
}

export function Page() {
  const { comboRefetch, comboLoading, comboData } = combos.useView()
  const { combosRefetch, dependenciesCombosRefetch } =
    combos.combos.useDependenceCombo()
  const { productsRefetch } = products.useProduct()
  const { plansRefetch } = plans.useList()
  const { servicesRefetch } = services.useService()

  const refetch = () => {
    productsRefetch()
    plansRefetch()
    servicesRefetch()
    combosRefetch()
    dependenciesCombosRefetch()
    comboRefetch()
  }

  if ((comboData?.ComboPai.length || 0) > 0) {
    return (
      <Base
        title="Detalhe de Combo"
        reload={{ action: refetch, state: comboLoading }}
        currentLocation={[
          { title: 'Rastreamento', url: rotas.erp.home },
          { title: 'Comercial', url: rotas.erp.comercial.index },
          {
            title: 'Combos',
            url: rotas.erp.comercial.combos.index
          }
        ]}
      >
        <combos.View />
      </Base>
    )
  }
  return (
    <FormAndTabs
      Form={<combos.View />}
      title="Detalhe de Combo"
      reload={{ action: refetch, state: comboLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Combos',
          url: rotas.erp.comercial.combos.index
        }
      ]}
    >
      <combos.Tabs />
    </FormAndTabs>
  )
}
