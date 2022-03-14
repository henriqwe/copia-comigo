import * as clients from '&crm/domains/clients'
import * as utils from '@comigo/utils'
import * as api from '&crm/domains/clients/api'

import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function ViewClient() {
  const router = useRouter()
  const {
    clientData,
    categories,
    selectedCategory,
    userAndTicketData,
    addressData,
    phonesData,
    emailsData,
    totalValue
  } = clients.useUpdate()
  const address = addressData?.[0]
  const itensFromSelect = [
    { key: 'ativo', title: 'Ativos' },
    { key: 'inativo', title: 'Inativos' }
  ]
  const [filterVehicles, setFilterVehicles] = useState(itensFromSelect[0])
  const [vehiclesActives, setVehiclesActives] = useState([])
  const [vehiclesInactives, setVehiclesInactives] = useState([])
  const [clientDataItens, setClientDataItens] = useState([])

  const documents = clientData?.Pessoa.Documentos.map(
    (document) => document.Nome
  )
  const clientSituation = [
    {
      complete: clientData?.Pessoa.PessoaJuridica
        ? clientData.Pessoa.DadosDaApi.name !== undefined
        : clientData?.Pessoa.DadosDaApi.nome !== undefined,
      title: clientData?.Pessoa.PessoaJuridica ? 'Razão social' : 'Nome',
      section: 'Dados Pessoais'
    },
    {
      complete: phonesData?.length > 0,
      title: 'Telefones',
      section: 'Contatos'
    },
    {
      complete: emailsData?.length > 0,
      title: 'Emails',
      section: 'Contatos'
    },
    {
      complete: addressData?.length > 0,
      title: 'Endereços',
      section: 'Contatos'
    },
    {
      complete: documents?.includes('CNH'),
      title: 'CNH',
      section: 'Documentos'
    },
    {
      complete: documents?.includes('Comprovante de endereço'),
      title: 'Comprovante de endereço',
      section: 'Documentos'
    },
    { complete: documents?.includes('RG'), title: 'RG', section: 'Documentos' },
    { complete: true, title: 'Quitado', section: 'Financeiro' }
  ]

  useEffect(() => {
    if (clientData) {
      const arrayVehiclesActives = []
      const arrayVehiclesInactives = []
      const categoriesIds = categories.map((category) =>
        category.id?.toString()
      )
      clientData.VeiculosAtivos.forEach((activeVehicle) => {
        if (!categoriesIds.includes(activeVehicle.Id)) {
          if (activeVehicle.Situacao.Valor === 'ativo') {
            arrayVehiclesActives.push({
              id: activeVehicle.Id,
              title: activeVehicle.Veiculo.Placa
                ? activeVehicle.Veiculo.Placa
                : activeVehicle.Veiculo.NumeroDoChassi,
              type: 'Vehicle'
            })
            return
          }
          if (activeVehicle.Situacao.Valor === 'inativo') {
            arrayVehiclesInactives.push({
              id: activeVehicle.Id,
              title: activeVehicle.Veiculo.Placa
                ? activeVehicle.Veiculo.Placa
                : activeVehicle.Veiculo.NumeroDoChassi,
              type: 'Vehicle'
            })
            return
          }
        }
      })
      setClientDataItens([
        {
          icon: <div />,
          title: clientData?.Pessoa.DataCriacao
            ? 'Data de criação:'
            : 'Data de nascimento:',
          value: clientData?.Pessoa.DataCriacao
            ? utils.ptBRtimeStamp(clientData.Pessoa.DataCriacao)
            : utils.ptBRtimeStamp(clientData?.Pessoa.DataNascimento)
        },
        // {
        //   icon: <div />,
        //   title: 'Função principal:',
        //   value: clientData?.Pessoa.Profissao
        // },
        clientData.Pessoa.Sexo
          ? {
              icon: <div />,
              title: 'Sexo:',
              value: clientData.Pessoa.Sexo
            }
          : {
              icon: <div />,
              title: '',
              value: ''
            }
      ])
      setVehiclesActives(arrayVehiclesActives)
      setVehiclesInactives(arrayVehiclesInactives)
    }
  }, [clientData])

  return (
    <div className={`flex flex-col my-3 w-full col-span-12`}>
      <clients.ClientCard
        situation={
          clientSituation.filter((situation) => !situation.complete).length ===
          0
            ? 'Ativo e Quitado'
            : 'Dados pendentes'
        }
        color={
          clientSituation.filter((situation) => !situation.complete).length ===
          0
            ? 'green'
            : 'light red'
        }
      >
        <section className="flex flex-col h-full pt-4 pr-2 mr-2 border-r-2 border-gray-200">
          <div className="flex items-center border-gray-200">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt="User"
              className="w-20 h-20 mx-2"
            />
            <div>
              <p className="text-lg">
                {clientData
                  ? utils.capitalizeAllWord(clientData?.Pessoa.Nome)
                  : ''}
              </p>
              <p className="text-sm ">
                {clientData
                  ? clientData.Pessoa.PessoaJuridica
                    ? utils.CNPJFormat(clientData?.Pessoa.Identificador)
                    : utils.CPFFormat(clientData?.Pessoa.Identificador)
                  : ''}
              </p>
            </div>
          </div>
          <p className="mb-4 text-lg font-bold">Situação do Cliente</p>
          <div className="flex gap-4">
            <clients.SituationList
              listName="Documentos"
              itens={clientSituation.filter(
                (situation) => situation.section === 'Documentos'
              )}
            />

            <clients.SituationList
              listName="Contatos"
              itens={clientSituation.filter(
                (situation) => situation.section === 'Contatos'
              )}
            />
            <clients.SituationList
              listName="Financeiro"
              itens={clientSituation.filter(
                (situation) => situation.section === 'Financeiro'
              )}
            />
          </div>
        </section>
        <section className="flex flex-col items-center h-full pr-2 mr-2 border-r-2 border-gray-200 pt-9">
          <p className="mb-4 text-lg font-bold">Veículos</p>
          <div className="flex justify-between w-full">
            <clients.VehicleList
              itens={[
                {
                  activeAmount: clientData?.VeiculosAtivos.filter(
                    (activeVehicle) => activeVehicle.Situacao_Id === 'ativo'
                  ).length,
                  desactiveAmount: 2,
                  title: 'Automóveis'
                },
                { activeAmount: 6, desactiveAmount: 2, title: 'Máquinas' },
                { activeAmount: 8, desactiveAmount: 0, title: 'Caminhões' },
                { activeAmount: 3, desactiveAmount: 1, title: 'Motos' }
              ]}
            />
          </div>
        </section>

        <section className="h-full pr-2 mr-2 border-r-2 border-gray-200 pt-9">
          <p className="mb-4 text-lg font-bold">Financeiro</p>
          <p className="text-xs text-gray-600">Valor mensal:</p>
          <p className="text-2xl text-primary">
            {utils.BRLMoneyFormat(totalValue)}
          </p>
          <p className="text-xs text-gray-600">Método de Pagamento:</p>
          <p>{clientData?.FormaDePagamento_Id || 'Não definida'}</p>
          <p className="text-xs text-gray-600">Fechamento da Fatura:</p>
          <p>{clientData?.DiaDeFaturamento_Id || 'Não definida'}</p>
        </section>

        <section className="flex-1 h-full border-gray-200 pt-9">
          <p className="mb-4 text-lg font-bold">Dados Rápidos</p>
          <div className="grid grid-cols-2">
            <clients.ClientDataList
              itens={[
                {
                  icon: <div />,
                  title: 'Email | Telefone:',
                  value: `${emailsData?.[0]?.Email || ''} - ${
                    (phonesData?.length || 0) > 0
                      ? utils.phoneFormat(phonesData?.[0].Telefone)
                      : ''
                  }`
                },
                {
                  icon: <div />,
                  title: 'Endereço Principal:',
                  value: address
                    ? `${address.Logradouro}, ${address.Numero} ${address.Bairro} - ${address.Cidade}/${address.Estado}`
                    : 'Não definido'
                },
                ...clientDataItens
              ]}
            />
          </div>
        </section>
      </clients.ClientCard>

      <div className="mt-2">
        <Tab.Group>
          <Tab.List className="flex space-x-2 bg-white rounded-md dark:bg-gray-800">
            {Object.keys({
              Resumo: <clients.Resume />,
              Vendas: <div />,
              Veiculos: (
                <clients.Vehicles.Vehicles
                  filterVehicles={filterVehicles}
                  setFilterVehicles={setFilterVehicles}
                  createVehicleProposal={async () => {
                    await api.createVehicleProposal({
                      clientData,
                      router,
                      selectedCategory,
                      userAndTicketData
                    })
                  }}
                  itensFromSelect={itensFromSelect}
                  vehiclesActives={vehiclesActives}
                  vehiclesInactives={vehiclesInactives}
                />
              ),
              Usuários: <clients.users.List />,
              Endereços: <clients.Addresses.List />,
              Emails: <clients.Emails.List />,
              Telefones: <clients.Phones.List />,
              Documentos: <clients.Doucments.Documents />,
              Representantes: <clients.Representative.List />,
              Logs: <clients.Logs.default />
            }).map((categoria) => (
              <Tab
                key={categoria}
                className={({ selected }) =>
                  utils.classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring ring-gray-400 dark:ring-gray-500',
                    selected
                      ? 'dark:bg-gray-700 bg-gray-300 dark:text-zinc-200'
                      : 'text-gray-600 dark:text-white font-light hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 hover:font-semibold'
                  )
                }
              >
                {categoria}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values({
              Resumo: <clients.Resume />,
              Vendas: <div />,
              Veiculos: (
                <clients.Vehicles.Vehicles
                  filterVehicles={filterVehicles}
                  setFilterVehicles={setFilterVehicles}
                  createVehicleProposal={async () => {
                    await api.createVehicleProposal({
                      clientData,
                      router,
                      selectedCategory,
                      userAndTicketData
                    })
                  }}
                  itensFromSelect={itensFromSelect}
                  vehiclesActives={vehiclesActives}
                  vehiclesInactives={vehiclesInactives}
                />
              ),
              Usuários: <clients.users.List />,
              Endereços: <clients.Addresses.List />,
              Emails: <clients.Emails.List />,
              Telefones: <clients.Phones.List />,
              Documentos: <clients.Doucments.Documents />,
              Representantes: <clients.Representative.List />,
              Logs: <clients.Logs.default />
            }).map((secao, idx) => (
              <Tab.Panel key={idx}>{secao}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <clients.UpdateSlidePanel />
    </div>
  )
}
