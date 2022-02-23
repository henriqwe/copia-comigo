import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getInputKitsIdentifierByItemId(
  InputKitId?: string,
  Id?: string,
  Ativo = false
) {
  const { data } = await useTypedClientQuery({
    producao_KitsDeInsumo: [
      {
        where: {
          deleted_at: { _is_null: true },
          Item_Id: Id ? { _eq: Id } : { _is_null: false },
          Ativo: { _eq: Ativo },
          Id: InputKitId ? { _eq: InputKitId } : { _is_null: false }
        },
        order_by: [{ created_at: order_by.desc }]
      },
      {
        Id: true,
        CodigoReferencia: true,
        Item: {
          Id: true,
          Produto: {
            Nome: true
          }
        }
      }
    ]
  })

  return data.producao_KitsDeInsumo
}
