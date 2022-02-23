import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getItemById(Id: string) {
  const { data } = await useTypedClientQuery({
    estoque_Itens_by_pk: [
      {
        Id
      },
      {
        Movimentacoes: [{}, { Tipo: true, Quantidade: true }],
        Produto: {
          Nome: true
        }
      }
    ]
  })

  return data.estoque_Itens_by_pk
}
