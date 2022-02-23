import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getItemIdByProductId(Id: string) {
  const { data } = await useTypedClientQuery({
    comercial_PrestadoresDeServicos_Produtos_Itens: [
      {
        where: {
          deleted_at: { _is_null: true },
          PrestadoresDeServicos_Produto: { Produto_Id: { _eq: Id } }
        },
        order_by: [{ created_at: order_by.desc }]
      },
      {
        Id: true,
        Item_Id: true,
        TipoDeItem_Id: true
      }
    ]
  })

  return data.comercial_PrestadoresDeServicos_Produtos_Itens
}