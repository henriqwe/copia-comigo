import axios from 'axios'
import { ProposalsDataType } from '../types/proposal'
import { getActiveVehicleById } from './vehicles'
import { ProposalsVehicleDataType } from '../types/proposalVehicle'
import { QueryType } from '../types/query'
import { Benefits } from '../types/benefits'
import {
  acceptProposal,
  changeVehicleOwnership,
  changeVehicleSituation,
  createActiveVehicle,
  createActiveVehicleBenefit,
  createActiveVehicleProduct,
  createActiveVehicleService,
  disableActiveVehicleBenefit,
  updateActiveVehicleBenefit
} from '&crm/domains/Proposals/operations/mutations'
import * as utils from '@comigo/utils'
import { clientes_VeiculosAtivos_Situacao_enum } from '&crm/graphql/generated/zeus'

export async function acceptNewProposal(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  proposalData.Veiculos?.map(async (vehicle) => {
    await handleVehicle(vehicle, proposalData, query, proposalRefetch)
  })
  await acceptProposal(query)
    .then(() => {
      proposalRefetch()
      utils.notification('Proposta concluida com sucesso', 'success')
    })
    .catch((err) => utils.notification(err, 'error'))
}

export async function acceptProposalForExistentVehicle(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  proposalData.Veiculos?.map(async (vehicle) => {
    const { hasActiveVehicle, activeVehicles } = await getHasActiveVehicle(
      proposalData.Veiculos?.[0]
    )

    // ver se existe um veiculo
    if (hasActiveVehicle) {
      // ids dos planos da proposta
      const plansIds = vehicle.PropostasPlanos.map((plan) => plan.Plano.Id)

      // ids dos serviços da propostas
      const servicesIds = vehicle.PropostasServicos.filter(
        (service) => !service.Servico.GeraOS
      ).map((service) => service.Servico.Id)

      // ids dos combos da proposta
      const combosIds = vehicle.PropostasCombos.map((combo) => combo.Combo.Id)

      const plans = activeVehicles?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'plano'
      )

      // remove os beneficios que não estão mais presentes na proposta
      await removeBenefit(plans, plansIds)
      // Ações para os planos
      vehicle.PropostasPlanos.map((plan) => {
        // pega o benefecio plano se existir
        const planBenefit = plans?.filter(
          (benefit) => benefit.Portfolio_Id === plan.Plano.Id
        )
        // verificar se exite o plano no veiculo ativo
        if ((planBenefit?.length || 0) > 0) {
          updateActiveVehicleBenefit(query, {
            Id: planBenefit?.[0].Id,
            PortfolioPreco_Id: plan.PlanoPreco.Id,
            PrecoDeAdesao_Id: null,
            PrecoDeRecorrencia_Id: null
          })
          return
        }
        createActiveVehicleBenefit({
          Portfolio_Id: plan.Plano.Id,
          PortfolioPreco_Id: plan.PlanoPreco.Id,
          TipoPortfolio: 'plano',
          VeiculoAtivo_Id: activeVehicles?.[0].Id,
          PrecoDeAdesao_Id: null,
          PrecoDeRecorrencia_Id: null
        })
        return
      })

      // serviços dos beneficios
      const services = activeVehicles?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'serviço'
      )

      // remove os beneficios que não estão mais presentes na proposta
      await removeBenefit(services, servicesIds)

      // Ações para os serviços
      vehicle.PropostasServicos.filter(
        (service) => !service.Servico.GeraOS
      ).map((service) => {
        // pega o benefecio serviço se existir
        const serviceBenefit = services?.filter(
          (benefit) => benefit.Portfolio_Id === service.Servico.Id
        )
        // verificar se exite o serviço no veiculo ativo
        if ((serviceBenefit?.length || 0) > 0) {
          updateActiveVehicleBenefit(query, {
            Id: serviceBenefit?.[0].Id,
            PortfolioPreco_Id: null,
            PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id
          })
          return
        }
        createActiveVehicleBenefit({
          Portfolio_Id: service.Servico.Id,
          PortfolioPreco_Id: null,
          TipoPortfolio: 'serviço',
          VeiculoAtivo_Id: activeVehicles?.[0].Id,
          PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id
        })

        return
      })

      // combos dos beneficios
      const combos = activeVehicles?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'combo'
      )

      // remove os beneficios que não estão mais presentes na proposta
      await removeBenefit(combos, combosIds)

      // proposalData?.Combos.filter(
      //   (combo) => combo.Veiculo_Id === installation.Veiculo_Id
      // ).map((combo) => {
      //   // confere se esse combo existe nos beneficios do veiculo ativo, caso sim ele tira do array de ids dos combos do veiculo ativo
      //   if (combosIds?.includes(combo.Combo.Id)) {
      //     combosIds = combosIds.filter(
      //       (comboId) => comboId !== combo.Combo.Id
      //     )
      //   }
      // })

      // Ações para os combos
      vehicle.PropostasCombos.map(async (combo) => {
        // pega os ids dos planos desse combo
        const comboPlansId = combo.Combo.Planos.map((plan) => plan.Plano.Id)

        // verifica se existe beneficio que esse combo tem dentro, caso sim remove esse beneficio e deixa o combo
        plans?.map((plan) => {
          if (comboPlansId.includes(plan.Portfolio_Id)) {
            disableActiveVehicleBenefit(plan.Id)
          }
        })

        // produtos do veiculo ativo
        const vehicleProducts = activeVehicles?.[0].Produtos

        // pega os ids dos produtos do veiculo
        const vehicleProductsIds = vehicleProducts?.map(
          (product) => product.Produto_Id
        )

        // confere se esse produto do combo não existe no veiculo ativo, caso ele não exista ele cria
        combo.Combo.Produtos.map(async (product) => {
          if (!vehicleProductsIds?.includes(product.Produto.Id)) {
            await createActiveVehicleProduct({
              VeiculoAtivo_Id: activeVehicles?.[0].Id,
              PrecoDeAdesao_Id: product.Produto.Fornecedores[0].Precos.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id:
                product.Produto.Fornecedores[0].Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'recorrencia'
                )[0]?.Id,
              Produto_Id: product.Produto.Id
            })
          }
        })

        // pega os ids dos serviços que não geram OS desse combo
        const comboServicesId = combo.Combo.Servicos.filter(
          (service) => !service.Servico.GeraOS
        ).map((service) => service.Servico.Id)

        // verifica se existe beneficio que esse combo tem dentro, caso sim remove esse beneficio e deixa o combo
        services?.map((service) => {
          if (comboServicesId.includes(service.Portfolio_Id)) {
            disableActiveVehicleBenefit(service.Id)
          }
        })

        // serviços do veiculo ativo
        const vehicleServices = activeVehicles?.[0].Servicos

        const vehicleServicesIds = vehicleServices?.map(
          (service) => service.Servico_Id
        )

        // confere se esse produto do combo não existe no veiculo ativo, caso ele não exista ele cria
        combo.Combo.Servicos.filter((service) => service.Servico.GeraOS).map(
          async (service) => {
            if (!vehicleServicesIds?.includes(service.Servico.Id)) {
              createActiveVehicleService({
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                PrecoDeAdesao_Id:
                  service.Servico.PrestadoresDeServicos[0].Precos.filter(
                    (price) => price.TipoDePreco.Valor === 'adesao'
                  )[0]?.Id,
                PrecoDeRecorrencia_Id:
                  service.Servico.PrestadoresDeServicos[0].Precos.filter(
                    (price) => price.TipoDePreco.Valor === 'recorrencia'
                  )[0]?.Id,
                Servico_Id: service.Servico.Id
              })
            }
          }
        )

        // pega o benefecio combo se existir
        const comboBenefit = combos?.filter(
          (benefit) => benefit.Portfolio_Id === combo.Combo.Id
        )
        // verificar se exite o combo no veiculo ativo
        if ((comboBenefit?.length || 0) > 0) {
          updateActiveVehicleBenefit(query, {
            Id: comboBenefit?.[0].Id,
            PortfolioPreco_Id: combo.ComboPreco.Id,
            PrecoDeAdesao_Id: null,
            PrecoDeRecorrencia_Id: null
          })
          return
        }
        await createActiveVehicleBenefit({
          Portfolio_Id: combo.Combo.Id,
          PortfolioPreco_Id: combo.ComboPreco.Id,
          TipoPortfolio: 'combo',
          VeiculoAtivo_Id: activeVehicles?.[0].Id,
          PrecoDeAdesao_Id: null,
          PrecoDeRecorrencia_Id: null
        })
      })
    }
    await handleVehicle(vehicle, proposalData, query, proposalRefetch)
  })
  await acceptProposal(query)
    .then(() => {
      proposalRefetch()
      utils.notification('Proposta concluida com sucesso', 'success')
    })
    .catch((err) => utils.notification(err, 'error'))
}

export async function acceptProposalForChangeVehicle(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  const { hasActiveVehicle, activeVehicles } = await getHasActiveVehicle(
    proposalData.Veiculos?.[0]
  )

  if (hasActiveVehicle) {
    await removeBenefit(
      activeVehicles?.[0].Beneficios,
      activeVehicles?.[0].Beneficios.map((benefit) => benefit.Id)
    )

    await acceptProposal(query).then(async () => {
      if (typeof window !== 'undefined') {
        createOs(query, proposalRefetch, 'mudaVeiculo')
      }
    })
    return
  }

  await acceptProposal(query).then(() => {
    proposalRefetch()
    utils.notification('Proposta concluida com sucesso', 'success')
  })
}

export async function acceptProposalForChangeOwner(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  proposalData.Veiculos?.map(async (vehicle) => {
    const { activeVehicles } = await getHasActiveVehicle(vehicle)

    const benefits = getBenefits(vehicle)

    const plansIds = vehicle.PropostasPlanos.map((plan) => plan.Plano.Id)

    // ids dos serviços da propostas
    const servicesIds = vehicle.PropostasServicos.filter(
      (service) => !service.Servico.GeraOS
    ).map((service) => service.Servico.Id)

    // ids dos combos da proposta
    const combosIds = vehicle.PropostasCombos.map((combo) => combo.Combo.Id)

    // produtos da proposta
    const products = vehicle.PropostasProdutos.map((product) => {
      const activeVehicleProduct = activeVehicles[0].Produtos.filter(
        (item) => item.Produto_Id === product.Produto.Id
      )[0]
      return {
        Ativo: true,
        Produto_Id: product.Produto.Id,
        PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
        PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
        TipoItem_Id: activeVehicleProduct.TipoItem_Id,
        Identificador: activeVehicleProduct.Identificador
      }
    })

    // serviços da proposta
    const services = vehicle.PropostasServicos.filter(
      (service) => service.Servico.GeraOS
    ).map((service) => {
      return {
        PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id,
        Servico_Id: service.Servico.Id,
        Ativo: true
      }
    })

    // veiculo inativo em outro cliente
    const inativeVehicle = activeVehicles?.filter(
      (vehicle) => vehicle.Cliente_Id === proposalData?.Cliente_Id
    )
    if ((inativeVehicle?.length || 0) > 0) {
      // ids dos beneficios do veiculo inativo
      const inativeBenefitsIds = inativeVehicle?.[0].Beneficios.map(
        (benefit) => benefit.Portfolio_Id
      )
      // ids dos serviços do veiculo inativo
      const inativeServicesIds = inativeVehicle?.[0].Servicos.map(
        (service) => service.Servico_Id
      )
      // ids dos produtos do veiculo inativo
      const inativeProductsIds = inativeVehicle?.[0].Produtos.map(
        (product) => product.Produto_Id
      )

      // planos dos beneficios dos veiculos inativos
      const plans = inativeVehicle?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'plano'
      )

      // remove planos dos veiculos inativos
      await removeBenefit(plans, plansIds)

      const inativeServices = inativeVehicle?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'serviço'
      )

      await removeBenefit(inativeServices, servicesIds)

      const combos = inativeVehicle?.[0].Beneficios.filter(
        (benefit) => benefit.TipoPortfolio === 'combo'
      )

      await removeBenefit(combos, combosIds)

      benefits?.map((benefit) => {
        if (inativeBenefitsIds?.includes(benefit.Portfolio_Id)) {
          updateActiveVehicleBenefit(query, {
            Id: inativeVehicle?.[0].Beneficios.filter(
              (vehicle) => vehicle.Portfolio_Id === benefit.Portfolio_Id
            )[0].Id,
            PortfolioPreco_Id: benefit.PortfolioPreco_Id,
            PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
          })
          return
        }
        createActiveVehicleBenefit({
          Portfolio_Id: benefit.Portfolio_Id,
          PortfolioPreco_Id: benefit.PortfolioPreco_Id,
          TipoPortfolio: benefit.TipoPortfolio,
          VeiculoAtivo_Id: inativeVehicle?.[0].Id,
          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
        })
      })
      products?.map((product) => {
        if (!inativeProductsIds?.includes(product.Produto_Id)) {
          createActiveVehicleProduct({
            VeiculoAtivo_Id: inativeVehicle?.[0].Id,
            Produto_Id: product.Produto_Id,
            PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
            TipoItem_Id: product.TipoItem_Id,
            Identificador: product.Identificador
          })
          return
        }
      })

      services?.map((service) => {
        if (!inativeServicesIds?.includes(service.Servico_Id)) {
          createActiveVehicleService({
            VeiculoAtivo_Id: inativeVehicle?.[0].Id,
            PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
            Servico_Id: service.Servico_Id
          })
          return
        }
      })
      await changeVehicleSituation({
        Id: inativeVehicle?.[0].Id,
        Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo
      })
      await changeVehicleSituation({
        Id: activeVehicles?.[0].Id,
        Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.inativo
      })
      return
    }

    await changeVehicleOwnership({
      Id: activeVehicles?.[0].Id,
      Veiculo_Id: vehicle.Veiculo_Id,
      Cliente_Id: proposalData?.Cliente_Id,
      Franquia_Id: activeVehicles?.[0].Franquia_Id,
      OS_Id: activeVehicles?.[0].OS_Id,
      Beneficios: benefits,
      Produtos: products,
      Servicos: services
    })
  })
  await acceptProposal(query)
    .then(() => {
      proposalRefetch()
      utils.notification('Proposta concluida com sucesso', 'success')
    })
    .catch((err) => utils.notification(err, 'error'))
}

async function handleVehicle(
  vehicle: ProposalsVehicleDataType,
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  if (notShouldGenerateOS(vehicle)) {
    await createActiveVehicle({
      Veiculo_Id: vehicle.Veiculo_Id,
      Cliente_Id: proposalData.Cliente_Id,
      Franquia_Id: null,
      Beneficios: getBenefits(vehicle)
    })
    return
  }
  if (typeof window !== 'undefined') {
    createOs(query, proposalRefetch, 'instalacao')
  }
}

function notShouldGenerateOS(vehicle: ProposalsVehicleDataType) {
  return (
    vehicle.PropostasServicos.filter((service) => {
      return service.Servico.GeraOS
    }).length === 0 &&
    vehicle.PropostasCombos.filter((combo) => {
      return (
        combo.Combo.Planos.filter((plan) =>
          plan.Plano.Servicos.filter((service) => {
            return service.Servico.GeraOS
          })
        ).length === 0 &&
        combo.Combo.Servicos.filter((service) => {
          return service.Servico.GeraOS
        })
      )
    }).length === 0 &&
    vehicle.PropostasPlanos.filter((plan) =>
      plan.Plano.Servicos.filter((service) => {
        return service.Servico.GeraOS
      })
    ).length === 0
  )
}

export async function getHasActiveVehicle(vehicle: ProposalsVehicleDataType) {
  const vehicles = await getActiveVehicleById(vehicle.Veiculo_Id as string)
  const activeVehicles = vehicles?.filter(
    (vehicle) => vehicle.Situacao.Valor === 'ativo'
  )

  return {
    hasActiveVehicle: activeVehicles.length > 0,
    activeVehicles
  }
}

function getBenefits(vehicle: ProposalsVehicleDataType) {
  const benefits: Benefits[] = vehicle.PropostasPlanos.map((plans) => {
    return {
      Portfolio_Id: plans.Plano.Id,
      TipoPortfolio: 'plano',
      PortfolioPreco_Id: plans.PlanoPreco.Id,
      Ativo: true
    }
  })
  vehicle.PropostasServicos.filter((service) => !service.Servico.GeraOS).map(
    (service) => {
      benefits?.push({
        Portfolio_Id: service.Servico.Id,
        TipoPortfolio: 'serviço',
        PortfolioPreco_Id: null,
        PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id,
        Ativo: true
      })
    }
  )
  vehicle.PropostasCombos.map((combo) => {
    benefits?.push({
      Portfolio_Id: combo.Combo.Id,
      TipoPortfolio: 'combo',
      PortfolioPreco_Id: combo.ComboPreco.Id,
      Ativo: true
    })
  })

  return benefits
}

async function removeBenefit(
  itens?: {
    Id: string
    Portfolio_Id: string
    PortfolioPreco_Id?: string
    TipoPortfolio: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
  }[],
  itemsIds?: string[]
) {
  // itens dos beneficios para excluir
  let itensToExclude = itens

  itens?.map((item) => {
    // confere se esse item existe nos beneficios do veiculo ativo, caso sim ele tira do array para excluir
    if (itemsIds?.includes(item.Portfolio_Id)) {
      itensToExclude = itensToExclude?.filter(
        (itemToExclude) => itemToExclude.Portfolio_Id !== item.Portfolio_Id
      )
    }
  })

  await Promise.all(
    itensToExclude?.map(async (item) => {
      // desativa cada item que não existir mais no beneficio
      await disableActiveVehicleBenefit(item.Id)
    })
  )
}

export function createOs(query: QueryType, refetch: () => void, type: string) {
  const hostname = window.location.hostname

  switch (type) {
    case 'desinstalacao':
      break
    case 'mudaVeiculo':
      axios
        .get(
          `http://${hostname}:3002/api/acoes/gerar-os-mudar-veiculo?proposalId=${query.id}`
        )
        .then(() => {
          refetch()
          utils.notification('Proposta concluida com sucesso', 'success')
        })
      break
    case 'instalacao':
      axios
        .get(
          `http://${hostname}:3002/api/acoes/gerar-os?proposalId=${query.id}&type=instalacao`
        )
        .then(() => {
          refetch()
        })
      break
  }
}
