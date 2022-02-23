import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as queries from '../../operations/queries'
import * as api from '../../api'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  BRLMoneyFormat,
  CNPJFormat,
  CPFFormat,
  ptBRtimeStamp
} from '@comigo/utils'
import { ClientType } from '../../types/client'
import { VehicleType } from '../../types/vehicle'
import { ProductItensType } from '../../types/productItens'
import { useRouter } from 'next/router'
import { CollectionType } from '../../types/collection'
import { ProductCollectionType } from '../../types/productCollection'

export function Update() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeEdit, setActiveEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [accessionValue, setAccessionValue] = useState('0')
  const [benefitsValue, setBenefitsValue] = useState('0')
  const [client, setClient] = useState<ClientType>()
  const [benefits, setBenefits] = useState<CollectionType[]>()
  const [vehicle, setVehicle] = useState<VehicleType>()
  const [productCollection, setProductCollection] =
    useState<ProductCollectionType[]>()
  const [servicesCollection, setServicesCollection] =
    useState<Omit<CollectionType, 'Type'>[]>()
  const [productItens, setProductItens] = useState<ProductItensType[]>([])
  const {
    serviceOrderData,
    serviceOrderRefetch,
    rejectSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch
  } = serviceOrders.useUpdate()

  const address = client?.Pessoa.DadosDaApi.enderecos[0]

  const {
    register: rejectRegister,
    formState: { errors: rejectErros },
    handleSubmit: rejectSubmit
  } = useForm({ resolver: yupResolver(rejectSchema) })

  const tableColumns = [
    {
      title: 'Nome',
      fieldName: 'Name'
    },
    {
      title: 'Adesão',
      fieldName: 'MembershipPrice',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (price: string) => BRLMoneyFormat(price)
    },
    {
      title: 'Recorrência',
      fieldName: 'RecurrencePrice',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (price: string) => BRLMoneyFormat(price)
    }
  ]

  const productTableColumns = [
    ...tableColumns,
    {
      title: 'Identificador',
      fieldName: 'Identifier',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    },
    {
      title: 'Item de Estoque',
      fieldName: 'ItemId',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    },
    {
      title: 'Retirado',
      fieldName: 'Retirado',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    }
  ]

  function getVehicle() {
    queries
      .getServiceOrderVehicle(serviceOrderData?.Veiculo_Id as string)
      .then((vehicle) => {
        setVehicle(vehicle)
      })
  }

  function getOSSituation() {
    if (serviceOrderData?.Situacao.Comentario === 'agendada') {
      switch (serviceOrderData.Agendamentos[0].Situacao.Valor) {
        case 'criada':
          return 'Agendamento criado'
        case 'iniciada':
          return 'Serviços iniciados'
        case 'concluida':
          return 'Serviços concluidos'
        case 'frustada':
          return 'Agendamento frustrado'
        default:
          break
      }
    }
    return serviceOrderData?.Situacao.Comentario
  }

  useEffect(() => {
    if (serviceOrderData) {
      if (serviceOrderData.Proposta) {
        queries
          .getProposalClient(serviceOrderData.Proposta?.Cliente_Id as string)
          .then((client) => {
            setClient(client)
          })
      }

      if (
        serviceOrderData.Proposta === null &&
        client === undefined &&
        serviceOrderData.Situacao.Valor !== 'finalizada'
      ) {
        queries
          .getClientByVehicle(serviceOrderData.Veiculo_Id as string)
          .then((client) => {
            if (client.VeiculosAtivos.length > 0) {
              setClient(client.VeiculosAtivos[0].Cliente)
            }
          })
      }

      api.getBenefits({
        serviceOrderData,
        setBenefits
      })
      api.getProducts({
        serviceOrderData,
        setProductCollection,
        setProductItens
      })
      api.getServices({
        serviceOrderData,
        setServicesCollection
      })
      getVehicle()
    }
  }, [serviceOrderData])

  useEffect(() => {
    if (benefits) {
      api.getBenefitsTotalValue({
        benefits,
        serviceOrderData,
        setBenefitsValue
      })
      api.getAccessionTotalValue({
        benefits,
        serviceOrderData,
        setAccessionValue
      })
    }
  }, [benefits])

  return (
    <div className="flex flex-col col-span-12 gap-4">
      <header className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Dados gerais
          </h3>
          <p>
            {address?.logradouro} - {address?.numero} - {address?.bairro} -{' '}
            {address?.cidade} - {address?.estado}
          </p>
          <div className="flex gap-4">
            <p>Tipo da OS: {serviceOrderData?.Tipo.Comentario}</p>
          </div>

          <p>
            Situação:{' '}
            <span
              className={`${
                serviceOrderData?.Situacao.Valor === 'cancelada'
                  ? 'text-primary-3'
                  : 'text-primary-9'
              }`}
            >
              {getOSSituation()}
            </span>
          </p>

          {(serviceOrderData?.Agendamentos?.length || 0) > 0 && (
            <p>
              Data de agendamento:{' '}
              {ptBRtimeStamp(
                serviceOrderData?.Agendamentos[0].Agendamento as Date
              )}
            </p>
          )}
          <p>
            Veículo: {vehicle?.Apelido}{' '}
            {vehicle?.Placa ? vehicle.Placa : vehicle?.NumeroDoChassi}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Detalhes do cliente
          </h3>
          <p className="text-lg font-bold">{client?.Pessoa.Nome}</p>
          <p className="text-sm">
            {client?.Pessoa.PessoaJuridica ? 'CNPJ: ' : 'CPF: '}{' '}
            {client?.Pessoa.PessoaJuridica
              ? CNPJFormat(client?.Pessoa.Identificador)
              : CPFFormat(client?.Pessoa.Identificador as string)}
          </p>
        </div>
      </header>

      <form>
        <common.Separator className="mb-4" />
        <div>
          <h3 className="text-xl font-bold">Serviços</h3>

          {serviceOrderData?.Servicos ? (
            <blocks.Table
              colection={servicesCollection}
              columnTitles={tableColumns}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </div>
        <common.Separator className="mt-4 mb-4" />
        <div>
          <h3 className="text-xl font-bold">Produtos</h3>

          {serviceOrderData?.Produtos ? (
            <blocks.Table
              colection={productCollection}
              columnTitles={productTableColumns}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </div>
        <common.Separator className="mt-4" />
        <h3 className="text-xl">Beneficios contratados</h3>
        {benefits ? (
          <blocks.Table colection={benefits} columnTitles={tableColumns} />
        ) : (
          <blocks.TableSkeleton />
        )}
      </form>
      <common.Separator className="mt-0 mb-2" />

      <div className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Dados gerais
          </h3>

          <p>Recorrência: Mensal</p>
          <p>Valor: {benefitsValue}</p>
          <common.Separator className="my-2" />
          <p>Pagamento de adesão: Recibo</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg text-gray-600 dark:text-zinc-400">Adesão</p>
          <p className="text-2xl font-bold">
            Total: <span className="text-primary-4">{accessionValue}</span>
          </p>
        </div>
      </div>

      <common.Separator />

      <div className="flex">
        <div className="flex items-center w-2/6 gap-4">
          <common.buttons.GoBackButton />
          <common.buttons.PrimaryButton
            title={'Ver atividades'}
            onClick={() => {
              event?.preventDefault()
              if (!activeEdit) {
                setSlidePanelState({
                  open: true,
                  type: 'activities'
                })
                return
              }
            }}
          />
          <common.buttons.CancelButton
            onClick={() => setShowModal(true)}
            title="Frustrar"
            disabled={
              loading ||
              serviceOrderData?.Situacao.Valor !== 'agendada' ||
              serviceOrderData?.Agendamentos[0].Situacao.Valor === 'frustada' ||
              serviceOrderData?.Agendamentos[0].Situacao.Valor === 'concluida'
            }
            loading={loading}
          />
        </div>
        <div className="flex items-center justify-end w-4/6 gap-4">
          {(serviceOrderData?.Situacao.Valor === 'aberta' ||
            serviceOrderData?.Situacao.Valor === 'frustada') && (
            <common.buttons.PrimaryButton
              title={'Agendar'}
              onClick={() => {
                event?.preventDefault()
                if (!activeEdit) {
                  setSlidePanelState({
                    open: true,
                    type: 'schedule'
                  })
                  return
                }
              }}
            />
          )}

          {(serviceOrderData?.Agendamentos.length || 0) > 0 ? (
            <>
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'criada' && (
                <common.buttons.SecondaryButton
                  handler={() =>
                    api.movimentationSubmit({
                      OS_Id: router.query.id as string,
                      serviceOrderData,
                      serviceOrderRefetch,
                      setActiveEdit,
                      setLoading
                    })
                  }
                  title="Retirar itens"
                  disabled={
                    loading || serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={loading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'itensRetirados' && (
                <common.buttons.SecondaryButton
                  handler={() =>
                    api.initializeServiceOrdersSubmit({
                      OS_Id: router.query.id as string,
                      serviceOrderData,
                      serviceOrderRefetch,
                      setActiveEdit,
                      setLoading
                    })
                  }
                  title="Iniciar serviço"
                  disabled={
                    loading || serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={loading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'iniciada' && (
                <common.buttons.SecondaryButton
                  handler={() =>
                    api.concludeServiceOrdersSubmit({
                      OS_Id: router.query.id as string,
                      serviceOrderData,
                      serviceOrderRefetch,
                      setActiveEdit,
                      setLoading
                    })
                  }
                  title="Concluir serviço"
                  disabled={
                    loading || serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={loading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'concluida' && (
                <common.buttons.SecondaryButton
                  handler={() =>
                    api.finishServiceOrderSubmit({
                      OS_Id: router.query.id as string,
                      client,
                      productItens,
                      serviceOrderActivitiesRefetch,
                      serviceOrderData,
                      serviceOrderRefetch,
                      setActiveEdit,
                      vehicle,
                      setLoading
                    })
                  }
                  title="Finalizar ordem de serviço"
                  disabled={
                    loading || serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={loading}
                />
              )}
            </>
          ) : null}
        </div>
        <common.Modal
          handleSubmit={rejectSubmit(({ MotivoRecusado }) =>
            api.rejectServiceOrderSubmit({
              MotivoRecusado,
              OS_Id: router.query.id as string,
              productItens,
              serviceOrderActivitiesRefetch,
              serviceOrderData,
              serviceOrderRefetch,
              setActiveEdit,
              setShowModal,
              setLoading
            })
          )}
          open={showModal}
          disabled={loading}
          description="Deseja mesmo frustrar o agendamento dessa ordem de serviço?"
          onClose={() => setShowModal(false)}
          buttonTitle="Frustrar o agendamento ordem de serviço"
          modalTitle="Frustrar o agendamento ordem de serviço?"
          color="red"
        >
          <div className="my-2">
            <common.form.Input
              fieldName="MotivoRecusado"
              title="Motivo da recusa"
              register={rejectRegister}
              error={rejectErros.MotivoRecusado}
            />
          </div>
        </common.Modal>
      </div>

      <serviceOrders.UpdateSlidePanel />
    </div>
  )
}
