import { InfoDetails } from '../InfoDetails'
import { ClientType } from '../../../types/client'
import { ServiceOrderData } from '../../../types/serviceOrder'
import { itensChecklistType } from '../../../types/checklist'
import { VehicleType } from '../../../types/vehicle'
import { ItensInfoContract } from './ItensInfoContract'
import { CheckListTable } from './ChecklistTable'
import { ProductsList } from './Lists/ProductsList'
import { ServicesOSList } from './Lists/ServicesOSList'
import { BenefitsList } from './Lists/BenefitsList'

import * as utils from '@comigo/utils'
import * as common from '@comigo/ui-common'

export function Content({
  client,
  serviceOrderData,
  itensChecklist,
  collaborator,
  vehicle
}: {
  client: ClientType
  serviceOrderData: ServiceOrderData
  itensChecklist: itensChecklistType[]
  collaborator: {
    Id: string
    Pessoa: {
      Nome: string
    }
  }
  vehicle: VehicleType
}) {
  console.log('client', client)
  console.log('serviceOrderData', serviceOrderData)
  console.log('itensChecklist', itensChecklist)
  console.log('collaborator', collaborator)
  console.log('vehicle', vehicle)
  console.log('---')

  const detailsDadosDoCliente = [
    {
      key: '',
      value: client?.Pessoa?.PessoaJuridica
        ? utils.CNPJFormat(client?.Pessoa?.Identificador)
        : utils.CPFFormat(client?.Pessoa?.Identificador)
    },
    {
      key: '',
      value: `${utils.camelCaseFormat(
        client.Pessoa.DadosDaApi.enderecos?.[0].logradouro
      )} ${
        client.Pessoa.DadosDaApi.enderecos?.[0].numero
      }, ${utils.camelCaseFormat(
        client.Pessoa.DadosDaApi.enderecos?.[0].bairro
      )}`
    },
    {
      key: '',
      value: `${utils.camelCaseFormat(
        client.Pessoa.DadosDaApi.enderecos?.[0].cidade
      )} - ${client.Pessoa.DadosDaApi.enderecos?.[0].estado}, ${utils.CEPformat(
        client.Pessoa.DadosDaApi.enderecos?.[0].cep
      )}`
    },
    {
      key: '',
      value: utils.phoneFormat(client.Pessoa.DadosDaApi.telefones[0].telefone)
    }
  ]
  const detailsEnderecoDoServico = [
    {
      key: 'Endereço do serviço',
      value: `${utils.camelCaseFormat(
        serviceOrderData.Agendamentos?.[0].Endereco.Logradouro
      )} ${
        serviceOrderData.Agendamentos?.[0].Endereco.Numero
      }, ${utils.camelCaseFormat(
        serviceOrderData.Agendamentos?.[0].Endereco.Bairro
      )}, ${utils.camelCaseFormat(
        serviceOrderData.Agendamentos?.[0].Endereco.Cidade
      )} - ${
        serviceOrderData.Agendamentos?.[0].Endereco.Estado
      }, ${utils.CEPformat(serviceOrderData.Agendamentos?.[0].Endereco.Cep)}`
    },
    {
      key: 'Responsável',
      value: `${utils.camelCaseFormat(
        serviceOrderData.Agendamentos?.[0].Responsavel
      )} - ${utils.phoneFormat(serviceOrderData.Agendamentos?.[0].Contato)}`
    },

    {
      key: 'Data do agendamento',
      value: utils.ptBRtimeStamp(serviceOrderData.Agendamentos?.[0].Agendamento)
    }
  ]

  const detailsVeiculo = [
    {
      key: '',
      value: vehicle?.Apelido
    },
    {
      key: '',
      value: vehicle?.Placa
        ? vehicle?.DadosDaApi.length > 0
          ? vehicle?.DadosDaApi[0][0].CHASSI[0]
          : ''
        : ''
    },
    {
      key: '',
      value:
        vehicle?.DadosDaApi.length > 0
          ? `${utils.camelCaseFormat(vehicle?.DadosDaApi[0][0].MODELO[0])} - ${
              vehicle?.DadosDaApi[0][0].ANO_FABRICACAO[0]
            }`
          : ''
    },
    {
      key: '',
      value:
        vehicle?.DadosDaApi.length > 0
          ? utils.camelCaseFormat(vehicle?.DadosDaApi[0][0].COR[0])
          : ''
    }
  ]

  return (
    <div>
      {/* PAGE 1 */}
      <div className="break-before-page">
        <div className="flex justify-between">
          <div className="grid content-between	">
            <img
              alt="GoERP"
              className="w-32"
              src={'/imagens/logoRastreamento.png'}
            />
          </div>
          <></>
        </div>
        <div className="flex justify-between mt-8">
          <InfoDetails
            title={`Dados do cliente`}
            subtitle={utils.camelCaseFormat(client?.Pessoa?.Nome)}
            details={detailsDadosDoCliente}
          />
          <InfoDetails
            title={`Veículo`}
            subtitle={vehicle?.Placa ? vehicle.Placa : vehicle?.NumeroDoChassi}
            details={detailsVeiculo}
            textAlignRight
          />
        </div>
        <div className="flex  justify-between mt-8">
          <div className="flex flex-col">
            <div className={`text-xs text-slate-500`}>Dados do serviço</div>
            <div className="flex space-x-10 my-3">
              {detailsEnderecoDoServico.map((item, index) => (
                <div key={index}>
                  <ItensInfoContract title={item.key} subtitle={item.value} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className={`text-xs text-slate-500 flex justify-end`}>
              Técnico
            </div>
            <div className="flex my-3 justify-end">
              <ItensInfoContract
                textAlignRigth
                title={'Nome do técnico'}
                subtitle={utils.camelCaseFormat(collaborator.Pessoa.Nome)}
              />
            </div>
          </div>
        </div>
        <common.Separator className="!my-3 !border-gray-200" />
        <CheckListTable
          itensChecklist={itensChecklist}
          title={'Check-list pré-serviço'}
          signature
        />
      </div>

      {/* PAGE 2 */}
      <div className="break-before-page mt-4">
        <CheckListTable
          itensChecklist={itensChecklist}
          title={'Check-list pós-serviço'}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <ServicesOSList
              title={'Serviços da OS'}
              services={serviceOrderData.Servicos}
            />
          </div>
          <div className="col-span-6">
            <BenefitsList
              title={'Benefícios'}
              benefits={serviceOrderData.Beneficios}
            />
          </div>
          <div className="col-span-12">
            <ProductsList
              title={'Produtos'}
              produtos={serviceOrderData.Produtos}
            />
          </div>
        </div>
        <div className="mt-3">
          <InfoDetails title={''} subtitle={'Informações contratuais'} />
          <div className="grid grid-cols-5 grid-flow-row gap-1 mt-3">
            <ItensInfoContract
              title={'OS'}
              subtitle={serviceOrderData.CodigoIdentificador.toString()}
            />
            <ItensInfoContract title={'Nº contrato'} subtitle={'2050'} />
            <ItensInfoContract title={'Valor mensal'} subtitle={'R$ 79,97'} />
            <ItensInfoContract
              title={'Valor instalação'}
              subtitle={'R$ 150,00'}
            />
            <ItensInfoContract
              title={'Forma Pgto Instalação'}
              subtitle={'Cartão Crédito'}
            />
            <ItensInfoContract
              title={'Valor desinstalação'}
              subtitle={'R$ 80,00'}
            />
            <ItensInfoContract title={'Valor km extra'} subtitle={'R$ 1,20'} />
            <ItensInfoContract title={'Valor visita'} subtitle={'R$ 50,00'} />

            <ItensInfoContract
              title={'Valor indenizatório'}
              subtitle={'R$  700,00'}
            />
          </div>
          <div className="text-xs mt-3">
            Declaro ter verificado junto com o técnico antes e após a conclusão
            do serviço prestado, o funcionamento de todos os itens do veículo
            constantes neste Check List, informo estar ciente sobre as condições
            na qual este documento poderá ser usado como comprovante do estado
            em que o veículo me foi entregue, e que recebi uma cópia da ordem de
            serviço, deste modo concordamos com o conteúdo assinalado acima.
          </div>
          <div className="font-semibold mt-6 text-xs"> Cliente / Preposto:</div>
          <div className="grid grid-cols-12">
            <div className="font-semibold col-span-8 pr-20">
              <div className="flex mt-4 items-baseline">
                <div className="mr-2 text-xs">CPF:</div>
                <common.Separator className=" !border-gray-400" />
              </div>
              <div className="flex mt-4 items-baseline">
                <div className="mr-2 text-xs">Nome:</div>
                <common.Separator className=" !border-gray-400" />
              </div>
            </div>

            <div className="font-semibold col-span-4 flex flex-col items-center mt-[1.2rem]">
              <div className="flex w-full items-baseline">
                <common.Separator className=" !border-gray-400" />
              </div>
              <div className="w-full flex justify-center text-xs">
                Assinatura
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
