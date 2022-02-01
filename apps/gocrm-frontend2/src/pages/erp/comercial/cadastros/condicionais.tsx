import * as conditionals from '&test/components/domains/erp/commercial/Registration/Conditionals'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Conditionals() {
  return (
    <conditionals.ConditionalProvider>
      <Page />
    </conditionals.ConditionalProvider>
  )
}

export function Page() {
  const { conditionalRefetch, conditionalLoading } =
    conditionals.useConditional()
  const refetch = () => {
    conditionalRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<conditionals.InternalNavigation />}
      title="Condicionais"
      reload={{ action: refetch, state: conditionalLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.erp.comercial.cadastros.index
        },
        {
          title: 'Condicionais',
          url: rotas.erp.comercial.cadastros.condicionais
        }
      ]}
    >
      <conditionals.List />
      <conditionals.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
