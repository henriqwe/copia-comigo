import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateChipProps = {
  Id: string
  Ativo: boolean
}

export async function updateChip({ Id, Ativo }: UpdateChipProps) {
  useTypedClientMutation({
    update_producao_Chips_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          Ativo
        }
      },
      { Id: true }
    ]
  })
}
