import { movimentacoes_Motivos_enum } from '&erp/graphql/generated/zeus'
import * as utils from '@comigo/utils'
import * as mutations from '../operations/mutations'
import { Dispatch, SetStateAction } from 'react'
import { ServiceOrderData } from '../types/serviceOrder'
import { ProductItensType } from '../types/productItens'

type ConcludeServiceOrdersSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  serviceOrderRefetch: () => void
  serviceOrderActivitiesRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  setShowModal: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  MotivoRecusado: string
  productItens: ProductItensType[]
}
export async function rejectServiceOrderSubmit({
  serviceOrderData,
  OS_Id,
  serviceOrderRefetch,
  setActiveEdit,
  MotivoRecusado,
  serviceOrderActivitiesRefetch,
  productItens,
  setShowModal,
  setLoading
}: ConcludeServiceOrdersSubmitProps) {
  setLoading(true)
  await mutations
    .rejectServiceOrder({
      Id: serviceOrderData?.Agendamentos[0].Id,
      MotivoRecusado: MotivoRecusado,
      OS_Id
    })
    .then(async () => {
      const productsItensIds = productItens.map(
        (product) => product.Identificador
      )
      await Promise.all(
        serviceOrderData.Agendamentos[0].Itens.map(async (item) => {
          await Promise.all(
            item.Item.Chips.map(async (chip) => {
              if (productsItensIds.includes(chip.Id)) {
                await mutations.updateChip({
                  Id: chip.Id,
                  Ativo: false
                })
              }
            })
          )

          await Promise.all(
            item.Item.Equipamentos.map(async (equipment) => {
              if (productsItensIds.includes(equipment.Id)) {
                await mutations.updateEquipment({
                  Id: equipment.Id,
                  Ativo: false
                })
              }
            })
          )

          await Promise.all(
            item.Item.Identificadores.map(async (identifier) => {
              if (productsItensIds.includes(identifier.Id)) {
                await mutations.updateIdentifier({
                  Id: identifier.Id,
                  Ativo: false
                })
              }
            })
          )

          await Promise.all(
            item.Item.Rastreadores.map(async (tracker) => {
              if (productsItensIds.includes(tracker.Id)) {
                await mutations.updateTracker({
                  Id: tracker.Id,
                  Ativo: false
                })
              }
            })
          )

          await Promise.all(
            item.Item.KitsDeInsumo.map(async (inputKit) => {
              if (productsItensIds.includes(inputKit.Id)) {
                await mutations.updateInputKit({
                  Id: inputKit.Id,
                  Ativo: false
                })
              }
            })
          )

          await Promise.all(
            item.Item.KitsDeInstalacao.map(async (installationKit) => {
              if (productsItensIds.includes(installationKit.Id)) {
                await mutations.updateInstallationKit({
                  Id: installationKit.Id,
                  Ativo: false
                })
              }
            })
          )
          await Promise.all(
            serviceOrderData.Produtos.map(async (product) => {
              await mutations.updateServiceOrdersProduct({
                Id: product.Id,
                Identificavel_Id: null,
                TipoDeIdentificavel_Id: null
              })
            })
          )

          if (item.RetiradoDoEstoque) {
            mutations
              .registerItemMovimentation({
                Quantidade: 1,
                Tipo: 'entrada',
                Item_Id: item.Item.Id,
                Motivo_Id: movimentacoes_Motivos_enum.frustracaoDeOS
              })
              .catch((err) => {
                utils.showError(err)
              })

            mutations
              .updateServiceOrderScheduleItem({
                Id: item.Id,
                RetiradoDoEstoque: false
              })
              .catch((err) => {
                utils.showError(err)
              })
          }
        })
      )
      setLoading(false)
      serviceOrderRefetch()
      serviceOrderActivitiesRefetch()
      setActiveEdit(false)
      setShowModal(false)
      utils.notification('Ordem de serviço frustrada com sucesso', 'success')
    })
    .catch((err) => {
      setLoading(false)
      utils.showError(err)
    })
}
