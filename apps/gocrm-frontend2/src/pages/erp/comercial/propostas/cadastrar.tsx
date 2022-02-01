// import { GetServerSideProps } from 'next'

// // TODO: Retirar todos os UserProvider de páginas para usar middlewares

// import * as proposals from '&test/components/domains/erp/commercial/Proposals'
// import * as services from '&test/components/domains/erp/commercial/Services'
// import * as combos from '&test/components/domains/erp/commercial/Combos'
// import * as plans from '&test/components/domains/erp/commercial/Plans'
// import * as products from '&test/components/domains/erp/commercial/Products'
// import * as tickets from '&test/components/domains/erp/services/Tickets'

// import * as leads from '&test/components/domains/erp/services/Leads'
// import * as users from '&test/components/domains/erp/identities/Users'

// import { CreateProposalPage } from '&test/components/pages/CreateProposal'

type CreateProposalProps = {
  Ticket: {
    Id: string
    CodigoReferencia: number
  } | null
}

export default function CreateProposal({ Ticket }: CreateProposalProps) {
  return (
    <div/>
    // TODO: analisar comportamento e estrutura de contextos no uso de páginas
    // <proposals.CreateProvider>
    //   <combos.ListProvider>
    //     <plans.ListProvider>
    //       <services.ServiceProvider>
    //         <products.ProductProvider>
    //           <tickets.TicketProvider>
    //             <leads.LeadProvider>
    //               <users.UserProvider>
    //                 <CreateProposalPage Ticket={Ticket} />
    //               </users.UserProvider>
    //             </leads.LeadProvider>
    //           </tickets.TicketProvider>
    //         </products.ProductProvider>
    //       </services.ServiceProvider>
    //     </plans.ListProvider>
    //   </combos.ListProvider>
    // </proposals.CreateProvider>
  )
}

// export const getServerSideProps: GetServerSideProps = async (props) => {
//   return {
//     props: {
//       Ticket: props.query.Ticket || null
//     }
//   }
// }
