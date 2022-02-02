import * as services from '&crm/domains/commercial/Services';
import * as combos from '&crm/domains/commercial/Combos';
import * as plans from '&crm/domains/commercial/Plans';
import * as products from '&crm/domains/commercial/Products';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function CreateCombo() {
  return (
    <combos.CreateProvider>
      <plans.ListProvider>
        <services.ServiceProvider>
          <products.ProductProvider>
            <ThemeProvider>
              {' '}
              <Page />{' '}
            </ThemeProvider>
          </products.ProductProvider>
        </services.ServiceProvider>
      </plans.ListProvider>
    </combos.CreateProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { productsRefetch, productsLoading } = products.useProduct();
  const { plansRefetch } = plans.useList();
  const { serviceRefetch } = services.useUpdate();

  const refetch = () => {
    productsRefetch();
    plansRefetch();
    serviceRefetch();
  };
  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Combo"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Combos',
          url: rotas.comercial.combos.index,
        },
        {
          title: 'Cadastro',
          url: rotas.comercial.combos.cadastrar,
        },
      ]}
    >
      <combos.Create />
    </templates.Base>
  );
}
