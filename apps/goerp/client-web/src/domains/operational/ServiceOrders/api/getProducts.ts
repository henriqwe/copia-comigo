import * as queries from '../operations/queries'
import * as utils from '@comigo/utils'
import { ServiceOrderData } from '../types/serviceOrder'
import { ProductCollectionType } from '../types/productCollection'
import { Dispatch, SetStateAction } from 'react'
import { ProductItensType } from '../types/productItens'

type GetProductsProps = {
  serviceOrderData: ServiceOrderData
  setProductCollection: Dispatch<SetStateAction<ProductCollectionType[]>>
  setProductItens: Dispatch<SetStateAction<ProductItensType[]>>
}

export async function getProducts({
  serviceOrderData,
  setProductCollection,
  setProductItens
}: GetProductsProps) {
  const productsItens = []

  const products = serviceOrderData.Produtos.map(async (product) => {
    const scheduleItem = await queries.getItemIdByProductId(product.Produto.Id)
    let identifier = ''
    let itemName = ''
    if (
      serviceOrderData.Situacao.Valor !== 'aberta' &&
      serviceOrderData.Situacao.Valor !== 'cancelada' &&
      serviceOrderData.Situacao.Valor !== 'frustada'
    ) {
      switch (product.TipoDeIdentificavel_Id) {
        case 'chips':
          await queries
            .getChipIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((chip) => {
              if (chip.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'chips',
                  Identificador: chip[0].Id
                })
                identifier = utils.phoneFormat(chip[0].NumeroDaLinha)
                itemName = chip[0].Item.Produto.Nome
              }
            })
          break
        case 'equipamentos':
          await queries
            .getEquipmentIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((equipment) => {
              if (equipment.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'equipamentos',
                  Identificador: equipment[0].Id
                })
                identifier = equipment[0].Imei
                itemName = equipment[0].Item.Produto.Nome
              }
            })
          break
        case 'identificadores':
          await queries
            .getIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((identifierResponse) => {
              if (identifierResponse.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'identificadores',
                  Identificador: identifierResponse[0].Id
                })
                identifier =
                  identifierResponse[0].CodigoIdentificador.toString()
                itemName = identifierResponse[0].Item.Produto.Nome
              }
            })
          break
        case 'rastreadores':
          await queries
            .getTrackerIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((tracker) => {
              if (tracker.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'rastreadores',
                  Identificador: tracker[0].Id
                })
                identifier =
                  'RTDR - ' +
                  tracker[0].CodigoReferencia +
                  ' - ' +
                  utils.phoneFormat(tracker[0].Chip.NumeroDaLinha) +
                  ' - ' +
                  tracker[0].Equipamento.Imei
                itemName = tracker[0].Item.Produto.Nome
              }
            })
          break
        case 'kitsDeInsumo':
          await queries
            .getInputKitsIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((inputKit) => {
              if (inputKit.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'kitsDeInsumo',
                  Identificador: inputKit[0].Id
                })
                identifier = 'KTISM - ' + inputKit[0].CodigoReferencia
                itemName = inputKit[0].Item.Produto.Nome
              }
            })
          break
        case 'kitsDeInstalacao':
          await queries
            .getInstallationKitsIdentifierByItemId(
              product.Identificavel_Id,
              scheduleItem[0].Item_Id,
              true
            )
            .then((installationKit) => {
              if (installationKit.length > 0) {
                productsItens.push({
                  Id: product.Produto.Id,
                  TipoItem_Id: 'kitsDeInstalacao',
                  Identificador: installationKit[0].Id
                })
                identifier =
                  'KTIST - ' +
                  installationKit[0].CodigoReferencia +
                  ' - ' +
                  utils.phoneFormat(
                    installationKit[0].Rastreador.Chip.NumeroDaLinha
                  ) +
                  ' - ' +
                  installationKit[0].Rastreador.Equipamento.Imei
                itemName = installationKit[0].Item.Produto.Nome
              }
            })
          break
        default:
          identifier = '-'
          itemName = (await queries.getItemById(scheduleItem[0].Item_Id))
            .Produto.Nome
          productsItens.push({
            Id: product.Produto.Id,
            TipoItem_Id: null,
            Identificador: null
          })
          break
      }
    }

    return {
      Name: product.Produto.Nome,
      MembershipPrice: product.PrecoDeAdesao_Id
        ? (await queries.getProductPriceById(product.PrecoDeAdesao_Id)).Valor
        : 0,
      RecurrencePrice: product.PrecoDeRecorrencia_Id
        ? (await queries.getProductPriceById(product.PrecoDeRecorrencia_Id))
            .Valor
        : 0,
      Identifier: identifier,
      ItemId: itemName,
      Retirado:
        (serviceOrderData.Agendamentos.length > 0
          ? serviceOrderData.Agendamentos[0].Situacao.Valor
          : false) !== 'criada' &&
        serviceOrderData.Situacao.Valor !== 'aberta' &&
        serviceOrderData.Situacao.Valor !== 'frustada' &&
        serviceOrderData.Situacao.Valor !== 'cancelada'
          ? 'Sim'
          : 'Não',
      Amount: product.Quantidade
    }
  })

  setProductCollection(await Promise.all(products))
  setProductItens(productsItens)
}
