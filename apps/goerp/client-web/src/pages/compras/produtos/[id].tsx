import * as products from '&erp/domains/purchases/Products'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function ProductDetails() {
  return (
    <ThemeProvider>
      <products.UpdateProvider>
        <Page />
      </products.UpdateProvider>
    </ThemeProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const {
    //logRefetch,
    updateProductLoading,
    productRefetch,
    productData
  } = products.useUpdate()
  function refetch() {
    //logRefetch()
    productRefetch()
  }
  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      Form={<products.Update />}
      title={`${productData?.Nome}`}
      reload={{ action: refetch, state: updateProductLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Produtos',
          url: rotas.compras.produtos.cadastrar
        }
      ]}
    >
      <div />
      {/* <produtos.ListarLogs /> */}
    </templates.FormAndTabs>
  )
}
