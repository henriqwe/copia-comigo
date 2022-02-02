import * as addresses from '&erp/domains/inventory/Registration/Addresses';
import * as addressingTypes from '&erp/domains/inventory/Registration/Addresses/AddressingTypes';

import rotas from '&erp/domains/routes';
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function Addresses() {
  return (
    <addressingTypes.AddressingTypeProvider>
      <addresses.AddressingProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </addresses.AddressingProvider>
    </addressingTypes.AddressingTypeProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { adresssesRefetch, adresssesLoading } = addresses.useAddressing();
  const { addressingTypesRefetch } = addressingTypes.useAddressingType();

  const refetch = () => {
    addressingTypesRefetch();
    adresssesRefetch();
  };
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<addresses.InternalNavigation />}
      title="Endereçamentos de estoque"
      reload={{
        action: refetch,
        state: adresssesLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Endereçamento',
          url: rotas.estoque.cadastros.enderecamentos.index,
        },
      ]}
    >
      <addresses.List />
      <addresses.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
