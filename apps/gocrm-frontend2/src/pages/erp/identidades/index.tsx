import BaseTemplate from '&test/components/templates/Base'
import rotas from '&test/components/domains/routes'

export default function Home() {
  return (
    <BaseTemplate
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Estoque', url: rotas.erp.identidades.index },
        {
          title: 'Dashboard',
          url: rotas.erp.identidades.index
        }
      ]}
    >
      <div>Dashboard</div>
    </BaseTemplate>
  )
}
