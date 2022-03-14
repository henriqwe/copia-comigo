import numero from 'numero-por-extenso'
import { InfoDetails } from '../InfoDetails'
import * as utils from '@comigo/utils'
import * as common from '@comigo/ui-common'
import { ClientType } from '../../../types/client'
import { ServiceOrderData } from '../../../types/serviceOrder'

export function Content({
  client,
  accessionValue,
  serviceOrderData
}: {
  client: ClientType
  accessionValue: string
  serviceOrderData: ServiceOrderData
}) {
  const tipoRecibo =
    serviceOrderData.Tipo.Valor === 'instalacao'
      ? 'adesão / instalação'
      : 'desinstalação'
  return (
    <div>
      <div className="flex justify-between">
        <div className="grid content-between	">
          <img
            alt="GoERP"
            className="w-32"
            src={'/imagens/logoRastreamento.png'}
          />
          <InfoDetails
            title={`Recibo de ${tipoRecibo}`}
            subtitle={`Nº ${serviceOrderData.CodigoIdentificador.toString()}`}
          />
        </div>
        <InfoDetails
          title={`RN RASTREAMENTO LTDA`}
          subtitle={'RN RASTREAMENTO'}
          details={[
            {
              key: '',
              value: '17.595.275/0001-18'
            },
            {
              key: '',
              value: 'Rua Rio Beberibe, 30, Emaus'
            },
            {
              key: '',
              value: 'Parnamirim, RN, 59.149-240'
            },

            {
              key: '',
              value: '(84) 3003-0498'
            }
          ]}
          textAlignRight
        />
      </div>
      <div className="my-8">
        <div className="">
          <span className="font-semibold">RN Rastreamento</span> declara para os
          devidos fins a ciência dos serviço prestado referente a{' '}
          <span className="font-semibold">{tipoRecibo}</span> dando plena
          quitação e finalização do mesmo ao cliente{' '}
          <span className="font-semibold">
            {utils.camelCaseFormat(client?.Pessoa?.Nome)}
          </span>{' '}
          inscrito no CPF/CNPJ nº{' '}
          <span className="font-semibold">
            {client?.Pessoa?.PessoaJuridica
              ? utils.CNPJFormat(client?.Pessoa?.Identificador)
              : utils.CPFFormat(client?.Pessoa?.Identificador)}
          </span>
          , residente no endereço{' '}
          <span className="font-semibold">
            {utils.camelCaseFormat(
              client.Pessoa.DadosDaApi.enderecos?.[0].logradouro
            )}
            {client.Pessoa.DadosDaApi.enderecos?.[0].numero},{' '}
            {utils.camelCaseFormat(
              client.Pessoa.DadosDaApi.enderecos?.[0].bairro
            )}
            ,{' '}
            {utils.camelCaseFormat(
              client.Pessoa.DadosDaApi.enderecos?.[0].cidade
            )}{' '}
            - {client.Pessoa.DadosDaApi.enderecos?.[0].estado}
          </span>
          .
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <span>Este Recibo não quita débitos anteriores.</span>
        <InfoDetails
          title={`Valor do recibo`}
          subtitle={`${accessionValue}`}
          details={[
            {
              key: '',
              value: numero.porExtenso(
                Number(utils.BRLMoneySymbolUnformat(accessionValue)),
                numero.estilo.monetario
              )
            }
          ]}
          textAlignRight
        />
      </div>
      <div className="flex justify-evenly my-14">
        <div className="flex flex-col">
          <common.Separator className="!w-72" />
          <div className="flex justify-center">
            {utils.camelCaseFormat(client?.Pessoa?.Nome)}
          </div>
        </div>
        <div className="flex flex-col">
          <common.Separator className="!w-72" />
          <div className="flex justify-center">
            Milena Gabrielly Bezerra Da Silva Lima
          </div>
        </div>
      </div>
      <div>Natal-RN, {utils.datetimeFormatPtBR(new Date())}</div>
    </div>
  )
}
