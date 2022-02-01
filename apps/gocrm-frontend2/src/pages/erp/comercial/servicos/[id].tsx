import rotas from '&test/components/domains/routes'

import FormAndTabs from '&test/components/templates/FormAndTabs'

import * as products from '&test/components/domains/erp/commercial/Products'
import * as services from '&test/components/domains/erp/commercial/Services'
import * as combos from '&test/components/domains/erp/commercial/Combos'
import * as attributes from '&test/components/domains/erp/commercial/Registration/Attributes'
import * as tariffs from '&test/components/domains/erp/commercial/Registration/Tariffs'

export default function UpdateService() {
  return (
    <services.UpdateProvider>
      <products.ProductProvider>
        <services.upSelling.UpSellingProvider>
          <services.products.ProductProvider>
            <services.services.ServiceProvider>
              <services.attributes.AttributeProvider>
                <services.tariffs.TariffProvider>
                  <combos.ListProvider>
                    <attributes.AttributeProvider>
                      <tariffs.TariffsProvider>
                        <Page />
                      </tariffs.TariffsProvider>
                    </attributes.AttributeProvider>
                  </combos.ListProvider>
                </services.tariffs.TariffProvider>
              </services.attributes.AttributeProvider>
            </services.services.ServiceProvider>
          </services.products.ProductProvider>
        </services.upSelling.UpSellingProvider>
      </products.ProductProvider>
    </services.UpdateProvider>
  )
}

function Page() {
  const { serviceLoading, serviceRefetch } = services.useUpdate()
  const { productsRefetch, mainProductsRefetch, dependentsProductsRefetch } =
    services.products.useProduct()
  const { upSellingRefetch } = services.upSelling.useUpSelling()
  const { servicesRefetch, mainServicesRefetch, dependentsServicesRefetch } =
    services.services.useService()
  const { attributesRefetch } = services.attributes.useAttribute()
  const { attributeRefetch } = attributes.useAttribute()
  const { tariffsRefetch } = services.tariffs.useTariff()
  const { tariffsRefetch: mainTariffsRefetch } = services.tariffs.useTariff()

  function refetch() {
    productsRefetch()
    mainProductsRefetch()
    dependentsProductsRefetch()
    upSellingRefetch()
    servicesRefetch()
    mainServicesRefetch()
    dependentsServicesRefetch()
    attributesRefetch()
    attributeRefetch()
    tariffsRefetch()
    mainTariffsRefetch()
    serviceRefetch()
  }

  return (
    <FormAndTabs
      Form={<services.Update />}
      title="Serviços"
      reload={{
        action: refetch,
        state: serviceLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Serviços',
          url: rotas.erp.comercial.servicos
        }
      ]}
    >
      <services.Tabs />
    </FormAndTabs>
  )
}