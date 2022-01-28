import rotas from '&crm/domains/routes'

import FormAndTabs from '@/templates/FormAndTabs'

import * as products from '&crm/domains/erp/commercial/Products'
import * as services from '&crm/domains/erp/commercial/Services'
import * as combos from '&crm/domains/erp/commercial/Combos'
import * as attributes from '&crm/domains/erp/commercial/Registration/Attributes'

export default function UpdateProduct() {
  return (
    <products.UpdateProvider>
      <products.ProductProvider>
        <products.products.ProductProvider>
          <products.services.ServiceProvider>
            <products.upSelling.UpSellingProvider>
              <products.attributes.AttributeProvider>
                <combos.ListProvider>
                  <attributes.AttributeProvider>
                    <services.ServiceProvider>
                      <Page />
                    </services.ServiceProvider>
                  </attributes.AttributeProvider>
                </combos.ListProvider>
              </products.attributes.AttributeProvider>
            </products.upSelling.UpSellingProvider>
          </products.services.ServiceProvider>
        </products.products.ProductProvider>
      </products.ProductProvider>
    </products.UpdateProvider>
  )
}

function Page() {
  const { productLoading, productRefetch } = products.useUpdate()
  const { productsRefetch } = products.products.useProduct()
  const { servicesRefetch } = products.services.useService()
  const { upSellingRefetch } = products.upSelling.useUpSelling()
  const { attributesRefetch } = products.attributes.useAttribute()
  const { combosRefetch } = combos.useList()
  const { attributeRefetch } = attributes.useAttribute()

  const refetch = () => {
    productsRefetch()
    servicesRefetch()
    upSellingRefetch()
    combosRefetch()
    attributesRefetch()
    attributeRefetch()
    productRefetch()
  }

  return (
    <FormAndTabs
      Form={<products.Update />}
      title="Produtos"
      reload={{
        action: refetch,
        state: productLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Produtos',
          url: rotas.erp.comercial.produtos
        }
      ]}
    >
      <products.Tabs />
    </FormAndTabs>
  )
}
