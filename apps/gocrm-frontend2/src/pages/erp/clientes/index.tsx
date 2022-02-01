// import * as clients from '&test/components/domains/erp/clients'

// import rotas from '&test/components/domains/routes'
// import BaseTemplate from '&test/components/templates/Base'

export default function Providers() {
  return (
    <div/>
    // <clients.ClientProvider>
    //   <Page />
    // </clients.ClientProvider>
  )
}

// export function Page() {
//   const { clientsRefetch, clientsLoading } = clients.useClient()
//   const refetch = () => {
//     clientsRefetch()
//   }
//   return (
//     <BaseTemplate
//       title="Clientes"
//       reload={{ action: refetch, state: clientsLoading }}
//       currentLocation={[
//         { title: 'Rastreamento', url: rotas.erp.home },
//         { title: 'Clientes', url: rotas.erp.clientes }
//       ]}
//     >
//       <clients.List />
//     </BaseTemplate>
//   )
// }
