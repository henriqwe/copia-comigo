import * as products from '&erp/domains/purchases/Products';

import rotas from '&erp/domains/routes';

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function Products() {
  return (
    <products.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </products.ListProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { productsRefetch, productsLoading } = products.useList();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<products.InternalNavigation />}
      title="Listagem de Produtos"
      reload={{ action: productsRefetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Produtos',
          url: rotas.compras.produtos.cadastrar,
        },
      ]}
    >
      <products.List />
    </templates.InternalNavigationAndSlide>
  );
}
