import * as queries from '&crm/domains/clients/operations/queries'
import * as types from '&crm/domains/clients/types'
import { Dispatch, SetStateAction } from 'react'

type GetCollectionProps = {
  selectedVehicle: types.ActiveVehicleType
  setBenefits: Dispatch<SetStateAction<types.ListBenefitType[]>>
  setCollection: Dispatch<SetStateAction<types.CollectionType[]>>
}

export async function getVehicleCollection({
  selectedVehicle,
  setBenefits,
  setCollection
}: GetCollectionProps) {
  const proposalsItens: types.CollectionType[] = []

  const combos = await Promise.all(
    selectedVehicle.Combos.map(async (combo) => {
      const response = await queries.getComboById(
        combo.Combo_Id,
        combo.ComboPreco_Id
      )

      return {
        Name: response?.combo?.Nome,
        MembershipPrice: response?.price?.ValorDeAdesao || '0',
        RecurrencePrice: response?.price?.ValorDeRecorrencia || '0',
        ActivationDate: combo.DataDeAtivacao,
        DesactivationDate: combo.DataDeDesativacao,
        Active: combo.Ativo,
        Type: 'Beneficio - Combo'
      }
    })
  )

  const plans = await Promise.all(
    selectedVehicle.Planos.map(async (plan) => {
      const response = await queries.getPlanById(
        plan.Plano_Id,
        plan.PlanoPreco_Id
      )

      return {
        Name: (
          <span className={plan.VeiculoAtivoCombo_Id !== null ? 'ml-4' : ''}>
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

  const services = await Promise.all(
    selectedVehicle.Servicos.map(async (service) => {
      return await queries
        .getServiceById(
          service.Servico_Id,
          service.PrecoDeAdesao_Id,
          service.PrecoDeRecorrencia_Id
        )
        .then((response) => {
          return {
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
            MembershipPrice: response?.price ? response?.price.Valor : '0',
            RecurrencePrice: response?.secondPrice
              ? response?.secondPrice?.Valor
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
    selectedVehicle.Produtos.map(async (product) => {
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
            Active: product.Ativo,
            Identifier
          }
        })
    })
  )

  setBenefits([
    ...combos.map((combo) => {
      return {
        Name: combo.Name,
        MembershipPrice: combo.MembershipPrice,
        RecurrencePrice: combo.RecurrencePrice,
        ActivationDate: combo.ActivationDate,
        DesactivationDate: combo.DesactivationDate,
        Type: combo.Type,
        Active: combo.Active
      }
    }),
    ...plans.map((plan) => {
      return {
        Name: plan.Name,
        MembershipPrice: plan.MembershipPrice,
        RecurrencePrice: plan.RecurrencePrice,
        ActivationDate: plan.ActivationDate,
        DesactivationDate: plan.DesactivationDate,
        Type: plan.Type,
        Active: plan.Active
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
  proposalsItens.push(
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
  setCollection(proposalsItens)
}
