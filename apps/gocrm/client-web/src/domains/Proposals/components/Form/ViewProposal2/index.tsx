import * as proposals from '&crm/domains/Proposals'
import * as common from '@comigo/ui-common'

import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'

export function ViewProposal() {
  const [loaded, setLoaded] = useState(false)
  const {
    currentStage,
    setCurrentStage,
    proposalData,
    getClientById,
    getClientPhonesByClientId,
    getClientAddressByClientId,
    getClientEmailsByClientId,
    setHasDependencies
  } = proposals.useUpdate()

  const proposalStages = [
    'Elaboração',
    'Proposta enviada',
    'Cadastro de cliente',
    'Termos de contrato',
    'Contrato Assinado'
  ]

  async function checkProposalStage() {
    let hasNotDependencies = true
    if (proposalData.Cliente_Id) {
      const client = await getClientById(proposalData.Cliente_Id)
      const phones = await getClientPhonesByClientId(client.Id)
      const address = await getClientAddressByClientId(client.Id)
      const emails = await getClientEmailsByClientId(client.Id)

      const documents = client?.Pessoa.Documentos.map(
        (document) => document.Nome
      )

      if (
        !((phones?.length || 0) > 0) ||
        !((emails?.length || 0) > 0) ||
        !((address?.length || 0) > 0) ||
        !documents?.includes('CNH') ||
        !documents?.includes('Comprovante de endereço') ||
        !documents?.includes('RG')
      ) {
        setHasDependencies(true)
        hasNotDependencies = false
      }
    }
    if(proposalData.PropostaGerada){
      setCurrentStage(1)
    }
    if (proposalData.Situacao.Comentario === 'Aceito') {
      setCurrentStage(2)
    }

    if (
      proposalData.Situacao.Comentario === 'Aceito' &&
      proposalData.Cliente_Id &&
      hasNotDependencies
    ) {
      setCurrentStage(3)
    }
    setLoaded(true)
  }

  useEffect(() => {
    if (proposalData && !loaded) {
      checkProposalStage()
    }
  }, [proposalData])

  return (
    <div className={`flex flex-col items-center my-3 w-full`}>
      <Tab.Group selectedIndex={currentStage}>
        <Tab.List className="flex items-center justify-between w-full max-w-6xl my-2">
          {proposalStages.map((proposalStage, index) => (
            <Tab
              className={
                'relative flex flex-col items-center justify-center cursor-default pointer-events-none'
              }
              key={index}
            >
              <p
                className={`px-4 py-2.5 rounded-full w-min before:block before:top-4 before:absolute before:h-0.5 before:ml-6 ${
                  index + 1 === proposalStages.length
                    ? 'before:w-0'
                    : 'before:w-60'
                } ${
                  currentStage > index
                    ? 'before:bg-success bg-success text-white'
                    : currentStage === index
                    ? 'bg-primary text-white before:bg-blue-400 '
                    : 'bg-white text-primary before:bg-blue-400 '
                }`}
              >
                {index + 1}
              </p>
              <p>{proposalStage}</p>
            </Tab>
          ))}
        </Tab.List>

        <button
          type="button"
          onClick={() => {
            setCurrentStage(currentStage + 1)
          }}
        >
          Avançar
        </button>
        <Tab.Panels className="w-full mt-2">
          {proposalStages.map((proposalStage, index) => (
            <Tab.Panel key={index}>
              {proposalStage === 'Elaboração' ? (
                <proposals.Preparation />
              ) : proposalStage === 'Proposta enviada' ? (
                <proposals.Accept />
              ) : proposalStage === 'Cadastro de cliente' ? (
                <proposals.ClientRegistration />
              ) : proposalStage === 'Termos de contrato' ? (
                <proposals.Contract />
              ) : (
                <proposals.Conclude />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
