import * as atributos from '&test/components/domains/erp/commercial/Registration/Attributes'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Atributos() {
  return (
    <atributos.AttributeProvider>
      <Page />
    </atributos.AttributeProvider>
  )
}

export function Page() {
  const { attributeRefetch, attributeLoading } = atributos.useAttribute()
  const refetch = () => {
    attributeRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<atributos.InternalNavigation />}
      title="Atributos"
      reload={{ action: refetch, state: attributeLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.erp.comercial.cadastros.index
        },
        {
          title: 'Atributos',
          url: rotas.erp.comercial.cadastros.atributos
        }
      ]}
    >
      <atributos.List />
      <atributos.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
