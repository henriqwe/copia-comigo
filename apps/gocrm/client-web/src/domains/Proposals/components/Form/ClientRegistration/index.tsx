import * as proposals from '&crm/domains/Proposals'
import * as common from '@comigo/ui-common'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import routes from '&crm/domains/routes'

export function ClientRegistration() {
  const router = useRouter()
  const [phones, setPhones] = useState([])
  const [emails, setEmails] = useState([])
  const [address, setAddress] = useState([])
  const {
    proposalData,
    getClientById,
    setCurrentStage,
    currentStage,
    client,
    setClient,
    getClientPhonesByClientId,
    getClientAddressByClientId,
    getClientEmailsByClientId,
    hasDependencies,
    setHasDependencies
  } = proposals.useUpdate()

  const documents = client?.Pessoa.Documentos.map((document) => document.Nome)

  async function loadClient() {
    if (proposalData.Cliente_Id) {
      const client = await getClientById(proposalData.Cliente_Id)
      setClient(client)
      const phones = await getClientPhonesByClientId(client.Id)
      setPhones(phones || [])
      const address = await getClientAddressByClientId(client.Id)
      setAddress(address)
      const emails = await getClientEmailsByClientId(client.Id)
      setEmails(emails || [])

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
        return
      }

      setCurrentStage(currentStage + 1)
    }
  }

  useEffect(() => {
    if (proposalData && hasDependencies === undefined) {
      loadClient()
    }
  }, [proposalData])

  if (proposalData?.Cliente_Id === null) {
    return <proposals.CreateClient />
  }

  if (hasDependencies) {
    return (
      <common.Card className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">{client?.Pessoa.Nome}</h2>

        <div className="w-full max-w-2xl pl-4 mb-2">
          <common.Separator />
          {(phones.length === 0 ||
            address?.length === 0 ||
            emails?.length === 0) && (
            <>
              <p
                className={`my-4 font-bold ${
                  phones.length === 0 ||
                  address?.length === 0 ||
                  emails?.length === 0
                    ? 'text-primary'
                    : ''
                }`}
              >
                Contato
              </p>
              {address?.length === 0 && (
                <p className="text-gray-600">
                  Você deve cadastrar ao menos um endereço válido para o cliente
                  selecionado
                </p>
              )}
              {phones?.length === 0 && (
                <p className="text-gray-600">
                  Você deve cadastrar ao menos um telefone válido para o cliente
                  selecionado
                </p>
              )}

              {emails?.length === 0 && (
                <p className="text-gray-600">
                  Você deve cadastrar ao menos um email válido para o cliente
                  selecionado
                </p>
              )}
              <common.Separator />
            </>
          )}

          {(!documents?.includes('CNH') ||
            !documents?.includes('Comprovante de endereço') ||
            !documents?.includes('RG')) && (
            <>
              <p
                className={`my-4 font-bold ${
                  !documents?.includes('CNH') ||
                  !documents?.includes('Comprovante de endereço') ||
                  !documents?.includes('RG')
                    ? 'text-primary'
                    : ''
                }`}
              >
                Documentação
              </p>

              {!documents?.includes('CNH') && (
                <p className="text-gray-600">
                  Você deve cadastrar o CNH para o cliente selecionado
                </p>
              )}
              {!documents?.includes('Comprovante de endereço') && (
                <p className="text-gray-600">
                  Você deve cadastrar o Comprovante de endereço para o cliente
                  selecionado
                </p>
              )}
              {!documents?.includes('RG') && (
                <p className="text-gray-600">
                  Você deve cadastrar o RG para o cliente selecionado
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-end justify-end w-full">
          <common.buttons.PrimaryButton
            onClick={() => {
              router.push(routes.clientes + '/' + client.Id)
            }}
            title="Clique aqui para concluir cadastro na tela do cliente   >>>"
          />
        </div>
      </common.Card>
    )
  }

  return <div />
}
