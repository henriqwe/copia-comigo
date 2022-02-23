import { movimentacoes_Motivos_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type RegisterItemMovimentationProps = {
  Quantidade: number
  Tipo: string
  Item_Id: string
  Motivo_Id: movimentacoes_Motivos_enum
}

export async function registerItemMovimentation({
  Quantidade,
  Tipo,
  Item_Id,
  Motivo_Id
}: RegisterItemMovimentationProps) {
  await useTypedClientMutation({
    insert_movimentacoes_Movimentacoes_one: [
      {
        object: {
          Data: new Date(),
          Quantidade,
          Tipo,
          Item_Id,
          Motivo_Id,
          Valor: 0
        }
      },
      {
        Id: true
      }
    ]
  })
}
