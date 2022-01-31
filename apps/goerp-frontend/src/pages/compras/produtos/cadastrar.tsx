import * as products from '&erp/domains/purchases/Products'

import rotas from '&erp/domains/routes'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'

export default function CreateProduct() {
  return (
    <products.CreateProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </products.CreateProvider>
  )
}

export function Page() {
  const { theme } = useTheme()
  return (
    <templates.Base
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      title="Cadastro de produto"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Produtos',
          url: rotas.compras.produtos.index
        },
        {
          title: 'Cadastro',
          url: rotas.compras.produtos.cadastrar
        }
      ]}
    >
      <products.Create />
    </templates.Base>
  )
}
