import { GetServerSideProps } from 'next'

//  TODO: Retirar todos os UserProvider de páginas para usar middlewares

import * as proposals from '&crm/domains/commercial/Proposals'
import * as services from '&crm/domains/commercial/Services'
import * as combos from '&crm/domains/commercial/Combos'
import * as plans from '&crm/domains/commercial/Plans'
import * as products from '&crm/domains/commercial/Products'
import * as tickets from '&crm/domains/services/Tickets'

import * as leads from '&crm/domains/services/Leads'
import * as users from '&crm/domains/identities/Users'

import { CreateProposalPage } from '&crm/components/page/CreateProposal'

type CreateProposalProps = {
  Ticket: {
    Id: string
    CodigoReferencia: number
  } | null
}

export default function CreateProposal({ Ticket }: CreateProposalProps) {
  return (
     //TODO: analisar comportamento e estrutura de contextos no uso de páginas
  
        <proposals.CreateProvider> 
        <combos.ListProvider> 
          <plans.ListProvider> 
            <services.ServiceProvider> 
              <products.ProductProvider> 
                <tickets.TicketProvider> 
                  <leads.LeadProvider> 
                    <users.UserProvider> 
                      <CreateProposalPage Ticket={Ticket} /> 
                    </users.UserProvider> 
                   </leads.LeadProvider> 
                  </tickets.TicketProvider> 
                 </products.ProductProvider> 
               </services.ServiceProvider> 
             </plans.ListProvider> 
           </combos.ListProvider> 
    </proposals.CreateProvider>
   
  )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  return {
    props: {
      Ticket: props.query.Ticket || null
    }
  }
}
