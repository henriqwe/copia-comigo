import * as atributos from '&crm/domains/commercial/Registration/Attributes'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Atributos() {
  return (
    <atributos.AttributeProvider>
      <ThemeProvider>       <Page />     </ThemeProvider>
    </atributos.AttributeProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { attributeRefetch, attributeLoading } = atributos.useAttribute()
  const refetch = () => {
    attributeRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<atributos.InternalNavigation />}
      title="Atributos"
      reload={{ action: refetch, state: attributeLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.comercial.cadastros.index
        },
        {
          title: 'Atributos',
          url: rotas.comercial.cadastros.atributos
        }
      ]}
    >
      <atributos.List />
      <atributos.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
