import * as chips from '&erp/domains/production/identifiable/Chips'
import * as operators from '&erp/domains/production/identifiable/Chips/Operators'
import * as templates from '@comigo/ui-templates'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'

import rotas from '&erp/domains/routes'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function CreateChips() {
  return (
    <chips.CreateProvider>
      <operators.OperatorProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </operators.OperatorProvider>
    </chips.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { operatorsRefetch, operatorsLoading } = operators.useOperator()

  const refetch = () => {
    operatorsRefetch()
  }
  return (
    <templates.Base
      title="Cadastro de chips"
      reload={{ action: refetch, state: operatorsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Chips',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.identificaveis.chips.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <chips.Create />
    </templates.Base>
  )
}
