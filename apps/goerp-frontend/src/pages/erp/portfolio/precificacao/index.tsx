import rotas from '@/domains/routes'

import FormAndTabs from '@/templates/FormAndTabs'

import * as providers from '@/domains/erp/portfolio/Pricing'
import * as itens from '@/domains/erp/inventory/Itens'

export default function UpdateProvider() {
  return (
    <providers.UpdateProvider>
      <providers.Products.ProductProvider>
        <providers.Services.ServiceProvider>
          <itens.ListProvider>
            <Page />
          </itens.ListProvider>
        </providers.Services.ServiceProvider>
      </providers.Products.ProductProvider>
    </providers.UpdateProvider>
  )
}

function Page() {
  const { providerLoading, providerRefetch } = providers.useUpdate()
  const { productsRefetch } = providers.Products.useProduct()
  const { servicesRefetch } = providers.Services.useService()
  const { itensRefetch } = itens.useList()

  const refetch = () => {
    itensRefetch()
    productsRefetch()
    servicesRefetch()
    providerRefetch()
  }

  return (
    <FormAndTabs
      Form={<providers.Update />}
      title="Parceiro"
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Portfolio', url: rotas.erp.portfolio.index },
        {
          title: 'Precificação',
          url: rotas.erp.portfolio.precificacao
        }
      ]}
    >
      <providers.Tabs />
    </FormAndTabs>
  )
}
