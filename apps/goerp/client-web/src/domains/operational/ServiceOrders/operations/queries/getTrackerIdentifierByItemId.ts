import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getTrackerIdentifierByItemId(
  TrackerId?: string,
  Id?: string,
  Ativo = false
) {
  const { data } = await useTypedClientQuery({
    producao_Rastreadores: [
      {
        where: {
          deleted_at: { _is_null: true },
          Item_Id: Id ? { _eq: Id } : { _is_null: false },
          Ativo: { _eq: Ativo },
          Id: TrackerId ? { _eq: TrackerId } : { _is_null: false }
        },
        order_by: [{ created_at: order_by.desc }]
      },
      {
        Id: true,
        CodigoReferencia: true,
        Chip: {
          NumeroDaLinha: true
        },
        Equipamento: {
          Imei: true
        },
        Item: {
          Id: true,
          Produto: {
            Nome: true
          }
        }
      }
    ]
  })

  return data.producao_Rastreadores
}