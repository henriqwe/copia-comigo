import { useTypedClientMutation, $ } from '&erp/graphql/generated/zeus/apollo'

type GiveBackInputTypeProps = {
  Id: string
  data: {
    Data: Date
    Item_Id: string
    Valor: number
    Quantidade: number
    Tipo: string
    Motivo_Id: string
  }[]
}

export async function giveBackInputType({ Id, data }: GiveBackInputTypeProps) {
  useTypedClientMutation({
    update_producao_KitsDeInsumo_by_pk: [
      {
        pk_columns: { Id },
        _set: { updated_at: new Date() }
      },
      { Id: true }
    ],
    insert_movimentacoes_Movimentacoes: [
      {
        objects: $`data`
      },
      {
        returning: { Id: true }
      }
    ]
  }, {
    data
  })
}
