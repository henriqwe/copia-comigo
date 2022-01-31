import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'
import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme, ThemeProvider} from '&crm/contexts/ThemeContext'

// TODO: Analisar separação de páginas em componentes no nível de domínio
import * as proposals from '&crm/domains/commercial/Proposals'
import * as plans from '&crm/domains/commercial/Plans'
import * as leads from '&crm/domains/services/Leads'
import * as tickets from '&crm/domains/services/Tickets'
import * as users from '&crm/domains/identities/Users'
import * as combos from '&crm/domains/commercial/Combos'
import * as services from '&crm/domains/commercial/Services'
import * as products from '&crm/domains/commercial/Products'

type CreateProposalProps = {
  Ticket: {
    Id: string
    CodigoReferencia: number
  } | null
}


export function CreateProposalPage({ Ticket }: CreateProposalProps) {
    return(
      <ThemeProvider>       
        <Page Ticket={Ticket}/>     
      </ThemeProvider>
    )
}
export function Page({Ticket}: CreateProposalProps){
  const {theme, changeTheme} = useTheme()

  Ticket ? (Ticket = JSON.parse(Ticket as unknown as string)) : null
  const { servicesLoading, refetch } = refetchActions()

  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme} 
      mainMenuItens={mainMenuItens} 
      rotas={rotas} 
      companies={companies} 
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Proposta"
      reload={{ action: refetch, state: servicesLoading }}
      currentLocation={breadCrumbData()}
    >
      {/* <proposals.Create Ticket={Ticket} /> */}
      <div>teste1</div>

    </templates.Base>
  )
}

function refetchActions() {
  const { servicesRefetch, servicesLoading } = services.useService()
  const { combosRefetch } = combos.useList()
  const { plansRefetch } = plans.useList()
  const { productsRefetch } = products.useProduct()
  const { leadsRefetch } = leads.useLead()
  const { ticketsRefetch } = tickets.useTicket()
  const { usersRefetch } = users.useUser()

  const refetch = () => {
    combosRefetch()
    plansRefetch()
    productsRefetch()
    leadsRefetch()
    ticketsRefetch()
    usersRefetch()
    servicesRefetch()
  }
  return { servicesLoading, refetch }
}

function breadCrumbData() {
  return [
    { title: 'Rastreamento', url: rotas.home },
    { title: 'Comercial', url: rotas.comercial.index },
    {
      title: 'Proposta',
      url: rotas.comercial.propostas.index
    },
    {
      title: 'Cadastro',
      url: rotas.comercial.propostas.cadastrar
    }
  ]
}
