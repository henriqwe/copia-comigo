import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'
import * as combos from '&crm/domains/commercial/Combos'
import * as attributes from '&crm/domains/commercial/Registration/Attributes'
import * as tariffs from '&crm/domains/commercial/Registration/Tariffs'

export default function UpdateService() {
  return (
    <services.UpdateProvider>
      <products.ProductProvider>
        <services.upSelling.UpSellingProvider>
          <services.products.ProductProvider>
            <services.services.ServiceProvider>
              <services.attributes.AttributeProvider>
                <services.tariffs.TariffProvider>
                  <services.alerts.AlertsProvider>
                    <combos.ListProvider>
                      <attributes.AttributeProvider>
                        <tariffs.TariffsProvider>
                          <ThemeProvider>
                            <Page />
                          </ThemeProvider>
                        </tariffs.TariffsProvider>
                      </attributes.AttributeProvider>
                    </combos.ListProvider>
                  </services.alerts.AlertsProvider>
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
  const { theme, changeTheme } = useTheme()
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
    <templates.FormAndTabs
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      Form={<services.Update />}
      title="Servi??os"
      reload={{
        action: refetch,
        state: serviceLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Servi??os',
          url: rotas.comercial.servicos
        }
      ]}
    >
      <services.Tabs />
    </templates.FormAndTabs>
  )
}
