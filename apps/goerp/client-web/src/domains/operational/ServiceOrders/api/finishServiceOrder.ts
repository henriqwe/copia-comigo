import { movimentacoes_Motivos_enum } from '&erp/graphql/generated/zeus'
import * as utils from '@comigo/utils'
import { Dispatch, SetStateAction } from 'react'
import * as mutations from '../operations/mutations'
import * as queries from '../operations/queries'
import { ClientType } from '../types/client'
import { ProductItensType } from '../types/productItens'
import { ServiceOrderData } from '../types/serviceOrder'
import { VehicleType } from '../types/vehicle'

type FinishServiceOrderSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  client: ClientType
  vehicle: VehicleType
  serviceOrderRefetch: () => void
  serviceOrderActivitiesRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  productItens: ProductItensType[]
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function finishServiceOrderSubmit({
  OS_Id,
  serviceOrderData,
  client,
  vehicle,
  serviceOrderRefetch,
  serviceOrderActivitiesRefetch,
  setActiveEdit,
  productItens,
  setLoading
}: FinishServiceOrderSubmitProps) {
  try {
    setLoading(true)
    // Pega os veiculos ativos desse cliente
    const activeVehicles = await queries.getActiveVehicles(
      client.Id,
      vehicle.Id
    )

    // Se esse cliente já tiver um veiculo ativo entra no if para atualizar
    if (activeVehicles.length > 0) {
      if (serviceOrderData?.Tipo.Valor === 'desinstalacao') {
        await mutations.disableActiveVehicle({
          Id: activeVehicles[0].Id
        })
        await Promise.all(
          activeVehicles[0].Produtos.map(async (product) => {
            await productsMovimentation(
              product.TipoItem_Id,
              product.Identificador
            )

            await mutations.updateActiveVehicleProduct({
              Id: product.Id,
              Ativo: false
            })
          })
        )

        serviceOrderData?.Servicos.map(async (service) => {
          await mutations.insertActiveVehicleService({
            PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
            Servico_Id: service.Servico.Id,
            VeiculoAtivo_Id: activeVehicles[0].Id
          })
        })
        return
      }
      // Atualiza o veiculo
      const response = await mutations.updateActiveVehicle({
        Id: activeVehicles[0].Id,
        OS_Id
      })

      serviceOrderData?.Beneficios.map(async (benefit) => {
        let duplatedItemId = ''
        // verifica se o beneficio existe no veiculo ativo, caso sim atualiza
        if (
          activeVehicles[0].Beneficios.findIndex((activeBenefit) => {
            const validation =
              activeBenefit.Portfolio_Id === benefit.Portfolio_Id &&
              activeBenefit.TipoPortfolio === benefit.TipoPortfolio
            if (validation) {
              duplatedItemId = activeBenefit.Id
            }

            return validation
          }) > -1
        ) {
          // atualizar o beneficio do veiculo
          await mutations.updateActiveVehicleBenefit({
            Id: duplatedItemId,
            PortfolioPreco_Id: benefit.PortfolioPreco_Id,
            PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
          })
          return
        }

        // inseri um beneficio para o veiculo ativo
        await mutations.insertActiveVehicleBenefit({
          Portfolio_Id: benefit.Portfolio_Id,
          TipoPortfolio: benefit.TipoPortfolio,
          PortfolioPreco_Id: benefit.PortfolioPreco_Id,
          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id,
          VeiculoAtivo_Id: response.data.update_clientes_VeiculosAtivos_by_pk.Id
        })
      })
      serviceOrderData?.Produtos.map(async (product) => {
        const item = productItens.filter(
          (productItem) => productItem.Id === product.Produto.Id
        )[0]
        // scheduleItem[0].
        await mutations.insertActiveVehicleProducts({
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          Produto_Id: product.Produto.Id,
          VeiculoAtivo_Id:
            response.data.update_clientes_VeiculosAtivos_by_pk.Id,
          TipoItem_Id: item.TipoItem_Id,
          Identificador: item.Identificador
        })
      })

      serviceOrderData?.Servicos.map(async (service) => {
        await mutations.insertActiveVehicleService({
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          Servico_Id: service.Servico.Id,
          VeiculoAtivo_Id: response.data.update_clientes_VeiculosAtivos_by_pk.Id
        })
      })

      return
    }
    // caso o cliente não tenha o veiculo ativo ele cria um
    await mutations.insertActiveVehicle({
      Veiculo_Id: serviceOrderData?.Veiculo_Id,
      Cliente_Id: client?.Id,
      Franquia_Id: null,
      OS_Id: serviceOrderData?.Id,
      Beneficios: serviceOrderData?.Beneficios.map((benefit) => {
        return {
          Portfolio_Id: benefit.Portfolio_Id,
          TipoPortfolio: benefit.TipoPortfolio,
          PortfolioPreco_Id: benefit.PortfolioPreco_Id,
          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id,
          Ativo: true
        }
      }),
      Produtos: serviceOrderData?.Produtos.map((product) => {
        // const item = productItens.filter(
        //   (productItem) => productItem.Id === product.Produto.Id
        // )[0]
        return {
          Produto_Id: product.Produto.Id,
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          TipoItem_Id: product.TipoDeIdentificavel_Id,
          Identificador: product.Identificavel_Id,
          Ativo: true
        }
      }),
      Servicos: serviceOrderData?.Servicos.map((service) => {
        return {
          Servico_Id: service.Servico.Id,
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          Ativo: true
        }
      })
    })

    // Conclui a OS
    await mutations.finishServiceOrder({ OS_Id })
    setLoading(false)
    serviceOrderRefetch()
    serviceOrderActivitiesRefetch()
    setActiveEdit(false)
    utils.notification('Ordem de serviço finalizada com sucesso', 'success')
  } catch (err) {
    setLoading(false)
    utils.showError(err)
  }
}

async function productsMovimentation(type: string, identifier_Id: string) {
  try {
    let chips = []
    let equipments = []
    let identifiers = []
    let trackers = []
    let inputKits = []
    let installationKits = []
    switch (type) {
      case 'chips':
        chips = await queries.getChipIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )
        chips.map((chip) => {
          registerMovement(
            chip,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })
        break
      case 'equipamentos':
        equipments = await queries.getEquipmentIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        equipments.map((equipment) => {
          registerMovement(
            equipment,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'identificadores':
        identifiers = await queries.getIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        identifiers.map((identifierResponse) => {
          registerMovement(
            identifierResponse,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'rastreadores':
        trackers = await queries.getTrackerIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        trackers.map((tracker) => {
          registerMovement(
            tracker,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'kitsDeInsumo':
        inputKits = await queries.getInputKitsIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        inputKits.map((inputKit) => {
          registerMovement(
            inputKit,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'kitsDeInstalacao':
        installationKits = await queries.getInstallationKitsIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        installationKits.map((installationKit) => {
          registerMovement(
            installationKit,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
    }
  } catch (err) {
    utils.showError(err)
  }
}

export async function registerMovement(
  item: { Item: { Id: string } },
  amount: number,
  type: string,
  motive: movimentacoes_Motivos_enum
) {
  mutations
    .registerItemMovimentation({
      Quantidade: amount,
      Tipo: type,
      Item_Id: item.Item.Id,
      Motivo_Id: motive
    })
    .catch((err) => {
      utils.showError(err)
    })
}
