import * as services from '@/domains/erp/commercial/Services'
import * as combos from '@/domains/erp/commercial/Combos'
import * as plans from '@/domains/erp/commercial/Plans'
import * as products from '@/domains/erp/commercial/Products'

import rotas from '@/domains/routes'

import Base from '@/templates/Base'

export default function CreateCombo() {
  return (
    <combos.CreateProvider>
      <plans.ListProvider>
        <services.ServiceProvider>
          <products.ProductProvider>
            <Page />
          </products.ProductProvider>
        </services.ServiceProvider>
      </plans.ListProvider>
    </combos.CreateProvider>
  )
}

export function Page() {
  const { productsRefetch, productsLoading } = products.useProduct()
  const { plansRefetch } = plans.useList()
  const { serviceRefetch } = services.useUpdate()

  const refetch = () => {
    productsRefetch()
    plansRefetch()
    serviceRefetch()
  }
  return (
    <Base
      title="Cadastro de Combo"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Combos',
          url: rotas.erp.comercial.combos.index
        },
        {
          title: 'Cadastro',
          url: rotas.erp.comercial.combos.cadastrar
        }
      ]}
    >
      <combos.Create />
    </Base>
  )
}
