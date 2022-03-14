import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'

type Vehicles = {
  Id: string
  Apelido?: string
  Placa?: string
  NumeroDoChassi?: string
}

type PaymentType = {
  Valor: string
  Comentario: string
}

export function Conclude() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicles[]>()
  const [membershipTotalValue, setMembershipTotalValue] = useState(0)
  const [membershipPaymentType, setMembershipPaymentType] =
    useState<PaymentType>()
  const [recurrenceTotalValue, setRecurrenceTotalValue] = useState(0)
  const [recurrencePaymentType, setRecurrencePaymentType] =
    useState<PaymentType>()
  const { proposalData, client, getVehicleById, getPaymentTypeById } =
    proposals.useUpdate()

  async function getProposalItens() {
    setVehicles(
      await Promise.all(
        proposalData.Veiculos.map(async (vehicle) => {
          return await getVehicleById(vehicle.Veiculo_Id)
        })
      )
    )
    if (proposalData.FormaDePagamentoDaAdesao_Id) {
      setMembershipPaymentType(
        await getPaymentTypeById(proposalData.FormaDePagamentoDaAdesao_Id)
      )
    }

    if (client.FormaDePagamento_Id) {
      setRecurrencePaymentType(
        await getPaymentTypeById(client.FormaDePagamento_Id)
      )
    }
    let membershipValue = 0
    let recurrenceValue = 0

    proposalData.Combos.map((combo) => {
      membershipValue += Number(combo.ComboPreco.ValorDeAdesao)
      recurrenceValue += Number(combo.ComboPreco.ValorDeRecorrencia)
    })
    proposalData.Planos.map((plans) => {
      membershipValue += Number(plans.PlanoPreco.ValorDeAdesao)
      recurrenceValue += Number(plans.PlanoPreco.ValorDeRecorrencia)
    })
    proposalData.Servicos.map((services) => {
      if (services.PrecoDeAdesao) {
        membershipValue += Number(services.PrecoDeAdesao.Valor)
      }
      if (services.PrecoDeRecorrencia) {
        recurrenceValue += Number(services.PrecoDeRecorrencia.Valor)
      }
    })
    proposalData.Produtos.map((product) => {
      if (product.PrecoAdesao) {
        membershipValue += Number(product.PrecoAdesao.Valor)
      }
      if (product.PrecoRecorrencia) {
        recurrenceValue += Number(product.PrecoRecorrencia.Valor)
      }
    })

    proposalData.Veiculos.filter(
      (vehicle) => vehicle.Veiculo_Id !== undefined
    ).map(async (proposalVehicle) => {
      proposalVehicle.PropostasCombos.map((combo) => {
        membershipValue += Number(combo.ComboPreco.ValorDeAdesao)
        recurrenceValue += Number(combo.ComboPreco.ValorDeRecorrencia)
      })
      proposalVehicle.PropostasPlanos.map((plans) => {
        if (plans.PlanoPreco) {
          membershipValue += Number(plans.PlanoPreco.ValorDeAdesao)
          recurrenceValue += Number(plans.PlanoPreco.ValorDeRecorrencia)
        }
      })
      proposalVehicle.PropostasServicos.map((services) => {
        if (services.PrecoDeAdesao) {
          membershipValue += Number(services.PrecoDeAdesao.Valor)
        }
        if (services.PrecoDeRecorrencia) {
          recurrenceValue += Number(services.PrecoDeRecorrencia.Valor)
        }
      })
      proposalVehicle.PropostasProdutos.map((product) => {
        if (product.PrecoAdesao) {
          membershipValue += Number(product.PrecoAdesao.Valor)
        }
        if (product.PrecoRecorrencia) {
          recurrenceValue += Number(product.PrecoRecorrencia.Valor)
        }
      })
    })

    setMembershipTotalValue(membershipValue)
    setRecurrenceTotalValue(recurrenceValue)
  }

  useEffect(() => {
    if (proposalData) {
      getProposalItens()
    }
  }, [proposalData])

  return (
    <common.Card className="flex flex-col items-center justify-center">
      <common.icons.AuthorizationIcon className="w-32 h-32" />
      <p>Contrato aceito com sucesso!</p>
      <p className="text-gray-500">
        Para mais informações você pode acessar a proposta aceita ou o perfil do
        cliente nos links abaixo,
      </p>
      <section className="flex justify-between w-3/4 mt-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="mb-2">Nome do cliente: </p>
            <p className="mb-2">Valor mensal: </p>
            <p>Valor de adesão: </p>
          </div>
          <div>
            <p className="text-lg text-gray-500">{client?.Pessoa.Nome}</p>
            <p className="text-lg text-gray-500">
              {utils.BRLMoneyFormat(recurrenceTotalValue)}
            </p>
            <p className="text-lg text-gray-500">
              {utils.BRLMoneyFormat(membershipTotalValue)}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2">
            Quantidade de Veículos:{' '}
            <span className="text-lg text-gray-500">
              {proposalData.Veiculos.length}
            </span>
          </p>
          <p className="mb-2">
            Placas:{' '}
            <span className="text-lg text-gray-500">
              {vehicles?.map((vehicle) => vehicle.Placa)}
            </span>
          </p>
          <p>
            Pagamento:{' '}
            <span className="text-lg text-gray-500">
              {membershipPaymentType?.Comentario} - (adesão) |{' '}
              {recurrencePaymentType?.Comentario} - (recorrência)
            </span>
          </p>
        </div>
      </section>
      <p className="mt-10">
        Próximas etapas:{' '}
        <span className="text-lg font-bold">Agendamento {'>'} Instalação</span>
      </p>

      <div className="flex justify-end w-full gap-4 mt-4">
        <common.buttons.PrimaryButton
          title="Proposta"
          onClick={() => null}
          disabled
        />
        <common.buttons.PrimaryButton
          title="Cliente"
          onClick={() =>
            router.push(routes.clientes + '/' + proposalData.Cliente_Id)
          }
        />
      </div>
    </common.Card>
  )
}
