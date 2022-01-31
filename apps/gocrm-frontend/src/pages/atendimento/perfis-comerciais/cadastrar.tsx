import * as businessProfiles from '&crm/domains/services/BusinessProfiles'
import * as leads from '&crm/domains/services/Leads'
import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

import { GetServerSideProps } from 'next'

type CreateBusinessProfileProps = {
  Lead_Id: string | null
  Lead_Nome: string | null
}

export default function CreateBusinessProfile({
  Lead_Id,
  Lead_Nome
}: CreateBusinessProfileProps) {
  return (
    <businessProfiles.CreateProvider>
      <leads.LeadProvider>
        <questionsGroups.ListProvider>
          <Page Lead_Id={Lead_Id} Lead_Nome={Lead_Nome} />
        </questionsGroups.ListProvider>
      </leads.LeadProvider>
    </businessProfiles.CreateProvider>
  )
}

export function Page({ Lead_Id, Lead_Nome }: CreateBusinessProfileProps) {
  const {theme} = useTheme()
  const { leadsRefetch, leadsLoading } = leads.useLead()
  const { questionsGroupsRefetch } = questionsGroups.useList()
  const refetch = () => {
    questionsGroupsRefetch()
    leadsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.Base
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Perfis Comerciais"
      reload={{ action: refetch, state: leadsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Perfis Comerciais',
          url: rotas.atendimento.perfisComerciais.index
        },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index
        }
      ]}
    >
      <businessProfiles.Create Lead_Id={Lead_Id} Lead_Nome={Lead_Nome} />
    </templates.Base>
  )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  return {
    props: {
      Lead_Id: props.query?.Lead_Id || null,
      Lead_Nome: props.query?.Lead_Nome || null
    }
  }
}
