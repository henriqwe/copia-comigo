import * as operators from '&erp/domains/production/identifiable/Chips/Operators'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Operators() {
  return (
    <operators.OperatorProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </operators.OperatorProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { operatorsRefetch, operatorsLoading } = operators.useOperator()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<operators.InternalNavigation />}
      title="Operadoras de estoque"
      reload={{
        action: operatorsRefetch,
        state: operatorsLoading
      }}
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
          title: 'Operadoras',
          url: rotas.producao.identificaveis.chips.operadoras
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <operators.List />
      <operators.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
