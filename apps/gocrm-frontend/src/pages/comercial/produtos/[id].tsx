import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'
import * as combos from '&crm/domains/commercial/Combos'
import * as attributes from '&crm/domains/commercial/Registration/Attributes'

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
                      <ThemeProvider>       <Page />     </ThemeProvider>
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
  const {theme, changeTheme} = useTheme()
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
    <templates.FormAndTabs setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<products.Update />}
      title="Produtos"
      reload={{
        action: refetch,
        state: productLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Produtos',
          url: rotas.comercial.produtos
        }
      ]}
    >
      <products.Tabs />
    </templates.FormAndTabs>
  )
}
