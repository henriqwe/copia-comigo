import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getEquipmentIdentifierByItemId(
  EquipmentId?: string,
  Id?: string,
  Ativo = false
) {
  const { data } = await useTypedClientQuery({
    producao_Equipamentos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Item_Id: Id ? { _eq: Id } : { _is_null: false },
          Ativo: { _eq: Ativo },
          Id: EquipmentId ? { _eq: EquipmentId } : { _is_null: false }
        },
        order_by: [{ created_at: order_by.desc }]
      },
      {
        Id: true,
        Imei: true,
        Item: {
          Id: true,
          Produto: {
            Nome: true
          }
        }
      }
    ]
  })

  return data.producao_Equipamentos
}