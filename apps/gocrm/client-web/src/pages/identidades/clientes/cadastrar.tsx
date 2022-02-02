import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

import * as clients from '&crm/domains/identities/Clients';

export default function CreateClient() {
  return (
    <clients.CreateProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </clients.CreateProvider>
  );
}

function Page() {
  const { theme, changeTheme } = useTheme();
  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Cliente"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Identidades',
          url: '',
        },
        {
          title: 'Clientes',
          url: rotas.identidades.clientes.index,
        },
        {
          title: 'Cadastro',
          url: rotas.identidades.clientes.cadastrar,
        },
      ]}
    >
      <clients.Create />
    </templates.Base>
  );
}
