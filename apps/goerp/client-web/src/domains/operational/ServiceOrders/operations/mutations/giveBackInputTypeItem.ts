import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type GiveBackInputTypeItemProps = {
  Id: string
  Quantidade: number
}

export async function giveBackInputTypeItem({
  Id,
  Quantidade
}: GiveBackInputTypeItemProps) {
  useTypedClientMutation({
    update_producao_KitDeInsumo_Itens_by_pk: [
      {
        pk_columns: { Id },
        _set: { updated_at: new Date(), Quantidade }
      },
      { Id: true }
    ]
  })
}
