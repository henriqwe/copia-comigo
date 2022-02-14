import * as identifiers from '&erp/domains/production/identifiable/Identifiers'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'

import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function CreateIdentifiers() {
  return (
    <identifiers.CreateProvider>
       <ThemeProvider>
        <Page />
      </ThemeProvider>
    </identifiers.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      title="Cadastro de Identificadores"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Identificadores',
          url: rotas.producao.identificaveis.identificadores.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.identificaveis.identificadores.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <identifiers.Create />
    </templates.Base>
  )
}
