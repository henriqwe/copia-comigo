import * as queries from '&crm/domains/clients/operations/queries'
import * as types from '&crm/domains/clients/types'
import { Dispatch, SetStateAction } from 'react'

type GetCollectionProps = {
  clientData: types.ClientType
  setBenefits: Dispatch<SetStateAction<types.ListBenefitType[]>>
  setCollection: Dispatch<SetStateAction<CollectionType[]>>
}

type CollectionType = {
  Vehicle?: string
} & types.CollectionType

export async function getResumeCollection({
  clientData,
  setBenefits,
  setCollection
}: GetCollectionProps) {
  const proposalsItens: CollectionType[] = []
  await Promise.all(
    clientData.VeiculosAtivos.map(async (activeVehicle) => {
      const plans = await Promise.all(
        activeVehicle.Planos.map(async (plan) => {
          const response = await queries.getPlanById(
            plan.Plano_Id,
            plan.PlanoPreco_Id
          )
          return {
            Id: response.plan?.Id,
            PriceId: response.price?.Id,
            Name: (
              <span
                className={plan.VeiculoAtivoCombo_Id !== null ? 'ml-4' : ''}
              >
                {response?.plan?.Nome}
              </span>
            ),
            MembershipPrice: response?.price?.ValorDeAdesao || '0',
            RecurrencePrice: response?.price?.ValorDeRecorrencia || '0',
            ActivationDate: plan.DataDeAtivacao,
            DesactivationDate: plan.DataDeDesativacao,
            Active: plan.Ativo,
            Type: 'Beneficio - Plano'
          }
        })
      )

      const combos = await Promise.all(
        activeVehicle.Combos.map(async (combo) => {
          const response = await queries.getComboById(
            combo.Combo_Id,
            combo.ComboPreco_Id
          )

          return {
            Id: response.combo?.Id,
            PriceId: response.price?.Id,
            Name: response?.combo?.Nome as string,
            MembershipPrice: response?.price?.ValorDeAdesao || '0',
            RecurrencePrice: response?.price?.ValorDeRecorrencia || '0',
            ActivationDate: combo.DataDeAtivacao,
            DesactivationDate: combo.DataDeDesativacao,
            Active: combo.Ativo,
            Type: 'Beneficio - Combo'
          }
        })
      )

      const services = await Promise.all(
        activeVehicle.Servicos.map(async (service) => {
          return await queries
            .getServiceById(
              service.Servico_Id,
              service.PrecoDeAdesao_Id,
              service.PrecoDeRecorrencia_Id
            )
            .then((response) => {
              return {
                Id: response.service?.Id,
                PriceId: response.price?.Id,
                Name: (
                  <span
                    className={
                      service.VeiculoAtivoCombo_Id !== null ||
                      service.VeiculoAtivoPlano_Id !== null
                        ? 'ml-4'
                        : ''
                    }
                  >
                    {response?.service?.Nome}
                  </span>
                ),
                MembershipPrice: response?.price ? response?.price?.Valor : '0',
                RecurrencePrice: response?.secondPrice
                  ? response?.secondPrice.Valor
                  : '0',
                ActivationDate: service.DataDeAtivacao,
                DesactivationDate: service.DataDeDesativacao,
                Active: service.Ativo,
                Benefit: service.Beneficio,
                Type: service.Beneficio ? 'Beneficio - Serviço' : 'Serviço'
              }
            })
        })
      )

      const products = await Promise.all(
        activeVehicle.Produtos.map(async (product) => {
          const Identifier = await queries.getItemIdentifier(
            product.TipoItem_Id,
            product.Identificador
          )
          return await queries
            .getProductById(
              product.Produto_Id,
              product.PrecoDeAdesao_Id,
              product.PrecoDeRecorrencia_Id
            )
            .then((response) => {
              return {
                Id: response?.product?.Id,
                PriceId: response?.price?.Id,
                Name: (
                  <span
                    className={
                      product.VeiculoAtivoCombo_Id !== null ||
                      product.VeiculoAtivoPlano_Id !== null
                        ? 'ml-4'
                        : ''
                    }
                  >
                    {response?.product?.Nome}
                  </span>
                ),
                MembershipPrice: response?.price ? response?.price.Valor : '0',
                RecurrencePrice: response?.secondPrice
                  ? response?.secondPrice?.Valor
                  : '0',
                ActivationDate: product.DataDeAtivacao,
                DesactivationDate: product.DataDeDesativacao,
                Type: 'Produto',
                Amount: product.Quantidade,
                Identifier
              }
            })
        })
      )

      setBenefits([
        ...combos.map((benefit) => {
          return {
            Name: benefit.Name,
            MembershipPrice: benefit.MembershipPrice,
            RecurrencePrice: benefit.RecurrencePrice,
            ActivationDate: benefit.ActivationDate,
            DesactivationDate: benefit.DesactivationDate,
            Type: benefit.Type,
            Active: benefit.Active
          }
        }),
        ...plans.map((benefit) => {
          return {
            Name: benefit.Name,
            MembershipPrice: benefit.MembershipPrice,
            RecurrencePrice: benefit.RecurrencePrice,
            ActivationDate: benefit.ActivationDate,
            DesactivationDate: benefit.DesactivationDate,
            Type: benefit.Type,
            Active: benefit.Active
          }
        }),
        ...services
          .filter((service) => service.Benefit)
          .map((service) => {
            return {
              Name: service.Name,
              MembershipPrice: service.MembershipPrice,
              RecurrencePrice: service.RecurrencePrice,
              ActivationDate: service.ActivationDate,
              DesactivationDate: service.DesactivationDate,
              Type: service.Type,
              Active: service.Active
            }
          })
      ])

      if (activeVehicle.Situacao_Id === 'inativo') {
        return
      }
      proposalsItens.push(
        {
          Vehicle: `${
            activeVehicle.Veiculo.Placa
              ? activeVehicle.Veiculo.Placa
              : activeVehicle.Veiculo.NumeroDoChassi
          } ${
            activeVehicle.Veiculo.Apelido
              ? ' - ' + activeVehicle.Veiculo.Apelido
              : ''
          }`
        },
        ...combos.map((combo) => {
          return {
            Name: combo.Name,
            MembershipPrice: combo.MembershipPrice,
            RecurrencePrice: combo.RecurrencePrice,
            ActivationDate: combo.ActivationDate,
            DesactivationDate: combo.DesactivationDate,
            Type: combo.Type
          }
        }),
        ...plans.map((plan) => {
          return {
            Name: plan.Name,
            MembershipPrice: plan.MembershipPrice,
            RecurrencePrice: plan.RecurrencePrice,
            ActivationDate: plan.ActivationDate,
            DesactivationDate: plan.DesactivationDate,
            Type: plan.Type
          }
        }),
        ...services.map((service) => {
          return {
            Name: service.Name,
            MembershipPrice: service.MembershipPrice,
            RecurrencePrice: service.RecurrencePrice,
            ActivationDate: service.ActivationDate,
            DesactivationDate: service.DesactivationDate,
            Type: service.Type
          }
        }),
        ...products.map((product) => {
          return {
            Name: product.Name,
            MembershipPrice: product.MembershipPrice,
            RecurrencePrice: product.RecurrencePrice,
            ActivationDate: product.ActivationDate,
            DesactivationDate: product.DesactivationDate,
            Type: product.Type,
            Identifier: product.Identifier,
            Amount: product.Amount
          }
        })
      )
    })
  )
  setCollection(proposalsItens)
}
