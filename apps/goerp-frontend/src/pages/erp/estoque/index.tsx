import BaseTemplate from '@/templates/Base'
import rotas from '@/domains/routes'

export default function Home() {
  return (
    <BaseTemplate
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Estoque', url: rotas.erp.estoque.index },
        {
          title: 'Dashboard',
          url: rotas.erp.estoque.index
        }
      ]}
    >
      <div>Teste</div>
    </BaseTemplate>
  )
}
